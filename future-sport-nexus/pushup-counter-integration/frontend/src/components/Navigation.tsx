import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/sports" className="text-white hover:text-gray-300">Sports</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;