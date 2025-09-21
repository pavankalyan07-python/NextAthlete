import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <p className="text-lg text-muted-foreground">You have no new notifications.</p>
      </div>
    </div>
  );
};

export default Notifications;