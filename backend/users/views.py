from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.utils.crypto import get_random_string
from .models import User
from .serializers import RegisterSerializer, EmailSerializer, ResetPasswordSerializer
from .tasks import send_email_task
from contents.models import SiteSetting

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ActivateAccountView(APIView):
    def get(self, request, auth_code):
        user = User.objects.filter(auth_code__iexact=auth_code).first()
        if user is not None:
            if not user.is_active:
                user.is_active = True
                user.auth_code = get_random_string(72)
                user.save()
                
                return Response({'message': 'Your account has been successfully activated.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Your account is already active.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            raise Http404("Invalid authentication code.")
        
class ForgotPasswordAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email__iexact=email).first()
            if user is not None:
                
                # send email
                email_context ={
                    'user' : user,
                    'site' : SiteSetting.objects.filter(is_main_setting=True).values('site_name', 'domain').first()
                }
                
                send_email_task.delay(
                    subject='Password Recovery',
                    to= user.email,
                    context=email_context,
                    template_name='email/reset_pass.html'
                )
                
                return Response({'message': 'An email with a password reset link has been sent to you.', 'email': email}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'No account found with this email address.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ResetPasswordAPIView(APIView):
    def post(self, request, auth_code):
        user = User.objects.filter(auth_code=auth_code).first()
        
        if user is not None:
            reset_pass_form = ResetPasswordSerializer(data=request.data)
            if reset_pass_form.is_valid():
                user_new_pass = reset_pass_form.validated_data.get('password')
                user.set_password(user_new_pass)
                user.auth_code = get_random_string(72)
                user.is_active = True
                user.save()
            
                return Response({"message": "Your new password has been successfully set."}, status=status.HTTP_200_OK)
            
            return Response(reset_pass_form.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Invalid authentication code."}, status=status.HTTP_404_NOT_FOUND)