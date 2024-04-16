import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <Link to='/' className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Echo News</span>
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500">
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">Contact</a>
            </li>
          </ul>
          </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">© 2024 Echo News. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
