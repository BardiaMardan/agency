'use client';

const NotFound = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center"
    >
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! The page you are looking for doesn’t exist.</p>
      <p className="text-lg text-gray-500 mt-2">But don't worry, you can always go back to the homepage.</p>
      <a
        href="/"
        className="mt-6 text-blue-500 underline hover:text-blue-700"
      >
        Go back home
      </a>
    </section>
  );
};

export default NotFound;
