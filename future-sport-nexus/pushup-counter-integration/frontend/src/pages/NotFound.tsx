import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;