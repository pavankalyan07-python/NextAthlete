import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const Profile = () => {
  const [repCount, setRepCount] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    setIsRecording(true);
    try {
      const response = await fetch('/api/recording/start-recording', { method: 'POST' });
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setRepCount(data.repCount);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <Button onClick={handleStartRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Push-up Counting'}
      </Button>
      {repCount !== null && (
        <p className="mt-4 text-lg">
          Push-ups counted: {repCount}
        </p>
      )}
    </div>
  );
};

export default Profile;