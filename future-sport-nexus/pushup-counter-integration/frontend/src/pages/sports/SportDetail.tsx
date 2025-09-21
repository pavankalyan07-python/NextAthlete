import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button, Card, CardHeader, CardContent, CardTitle } from '../../components/ui';
import { Play, Upload } from 'lucide-react';

const sportsData = {
  pushups: {
    name: 'Push-ups',
    description: 'Upper body strength assessment through push-up challenges',
    demoVideos: [
      {
        id: 1,
        title: 'Perfect Push-up Form',
        url: 'https://www.youtube.com/embed/IODxDxX7oi4',
        description: 'Master the perfect push-up technique'
      }
    ]
  }
};

export default function SportDetail() {
  const { sportSlug } = useParams<{ sportSlug: string }>();
  const [repCount, setRepCount] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const sport = sportSlug ? sportsData[sportSlug] : null;

  if (!sport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sport Not Found</h1>
          <Link to="/sports">
            <Button>Back to Sports</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStartRecording = async () => {
    setIsRecording(true);
    try {
      const response = await fetch('/api/recording/start-recording', { method: 'POST' });
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setRepCount(data.repCount);
    } catch (error) {
      console.error('Error running recording:', error);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{sport.name}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {sport.description}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Upload className="w-6 h-6 text-primary" />
                Start Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Button 
                  onClick={handleStartRecording} 
                  disabled={isRecording} 
                  className="flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
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
    </div>
  );
}