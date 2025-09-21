import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Video } from 'lucide-react';

export default function Sports() {
  const [isRecording, setIsRecording] = useState(false);
  const [repCount, setRepCount] = useState<number | null>(null);

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
    <div className="min-h-screen section-spacing heavy-spacing">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link to="/sports">
            <Button variant="ghost" className="gap-2">
              Back to Sports
            </Button>
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Push-up Challenge</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start recording your push-ups and track your progress!
          </p>
        </div>

        <Card className="glass-card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Video className="w-6 h-6 text-primary" />
              Start Recording
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Button 
                onClick={handleStartRecording} 
                disabled={isRecording} 
                className="flex items-center gap-2"
              >
                {isRecording ? 'Recording...' : 'Start Recording'}
              </Button>

              {repCount !== null && (
                <p className="mt-2 text-lg font-medium">
                  Reps Counted: {repCount}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}