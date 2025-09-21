import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <header>
        <h1>Push-up Counter Integration</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Push-up Counter Project</p>
      </footer>
    </div>
  );
};

export default Layout;