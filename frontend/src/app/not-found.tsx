'use client';
import Link from 'next/link'

const NotFound = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center"
    >
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">The page you are looking for does not exist.</p>
      <p className="text-lg text-gray-500 mt-2">You can go back to the homepage.</p>
      <Link
        href="/"
        className="mt-6 text-blue-500 underline hover:text-blue-700"
      >
        Homepage
      </Link>
    </section>
  );
};

export default NotFound;
