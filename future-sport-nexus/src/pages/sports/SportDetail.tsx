import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { 
  ArrowLeft,
  Play, 
  Upload, 
  Trophy,
   Medal,
  Star,
  Calendar,
  Clock,
   Target,
   Users,
   Video
} from 'lucide-react';

// Sample data for demonstration
const sportsData: Record<string, any> = {
  running: {
    name: 'Running',
    description: 'Sprint and endurance running challenges',
    demoVideos: [
      {
        id: 1,
        title: 'Proper Running Form',
        url: 'https://www.youtube.com/embed/brFHyOtTdWs',
        description: 'Learn the fundamentals of proper running technique'
      },
      {
        id: 2,
        title: 'Sprint Training Techniques',
        url: 'https://www.youtube.com/embed/tkG5mVBYTHk',
        description: 'Advanced sprint training for competitive performance'
      }
    ]
  },
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
  },
  situps: {
    name: 'Sit-ups',
    description: 'Core strength evaluation through sit-up exercises',
    demoVideos: [
      {
        id: 1,
        title: 'Proper Sit-up Technique',
        url: 'https://www.youtube.com/embed/1fbU_MkV7NE',
        description: 'Learn correct sit-up form and breathing'
      }
    ]
  },
  swimming: {
    name: 'Swimming',
    description: 'Aquatic performance tracking and technique assessment',
    demoVideos: [
      {
        id: 1,
        title: 'Freestyle Swimming Technique',
        url: 'https://www.youtube.com/embed/5HLW2AI1Ink',
        description: 'Master freestyle swimming fundamentals'
      }
    ]
  },
  cycling: {
    name: 'Cycling',
    description: 'Endurance and speed challenges on two wheels',
    demoVideos: [
      {
        id: 1,
        title: 'Cycling Performance Tips',
        url: 'https://www.youtube.com/embed/UukHOMdWNaM',
        description: 'Improve your cycling performance and technique'
      }
    ]
  },
  'long-jump': {
    name: 'Long Jump',
    description: 'Distance jumping competitions and technique analysis',
    demoVideos: [
      {
        id: 1,
        title: 'Long Jump Technique',
        url: 'https://www.youtube.com/embed/0-DB-2s8BHA',
        description: 'Perfect your long jump approach and landing'
      }
    ]
  },
  'high-jump': {
    name: 'High Jump',
    description: 'Vertical leap assessments and technique training',
    demoVideos: [
      {
        id: 1,
        title: 'High Jump Basics',
        url: 'https://www.youtube.com/embed/C-T4VzgKqKQ',
        description: 'Learn the Fosbury Flop technique'
      }
    ]
  }
};

const leaderboardData = {
  male: [
    { rank: 1, name: 'Raj Kumar', score: '9.58s', location: 'Delhi', badge: 'gold' },
    { rank: 2, name: 'Arjun Singh', score: '9.63s', location: 'Mumbai', badge: 'silver' },
    { rank: 3, name: 'Vikash Patel', score: '9.72s', location: 'Gujarat', badge: 'bronze' },
    { rank: 4, name: 'Rohit Sharma', score: '9.85s', location: 'Punjab', badge: null },
    { rank: 5, name: 'Amit Verma', score: '9.92s', location: 'Karnataka', badge: null },
  ],
  female: [
    { rank: 1, name: 'Priya Sharma', score: '10.49s', location: 'Haryana', badge: 'gold' },
    { rank: 2, name: 'Anita Devi', score: '10.64s', location: 'Kerala', badge: 'silver' },
    { rank: 3, name: 'Sneha Reddy', score: '10.73s', location: 'Telangana', badge: 'bronze' },
    { rank: 4, name: 'Meera Joshi', score: '10.89s', location: 'Maharashtra', badge: null },
    { rank: 5, name: 'Kavya Nair', score: '10.95s', location: 'Tamil Nadu', badge: null },
  ]
};

const uploadedVideos = [
  {
    id: 1,
    title: 'My 100m Sprint',
    user: 'Current User',
    score: '10.15s',
    feedback: 'Great start! Focus on maintaining form in the final 30m. Your acceleration phase shows excellent technique.',
    date: '2024-01-15',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Training Session',
    user: 'Current User', 
    score: '10.08s',
    feedback: 'Significant improvement! Your stride length has increased and you maintained speed better through the curve.',
    date: '2024-01-20',
    thumbnail: '/placeholder.svg'
  }
];

export default function SportDetail() {
  const { sportSlug } = useParams<{ sportSlug: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.includes('video/')) {
        alert('Please select a video file');
        return;
      }
      if (file.size > 200 * 1024 * 1024) { // 200MB
        alert('File size must be less than 200MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          alert('Video uploaded successfully! It will be processed and added to your uploads.');
          setSelectedFile(null);
          setUploadProgress(0);
        }
      }, 200);
    }
  };

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'gold': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'silver': return <Medal className="w-5 h-5 text-gray-400" />;
      case 'bronze': return <Medal className="w-5 h-5 text-amber-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen section-spacing heavy-spacing">
      <div className="container mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/sports">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Sports
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {sport.name}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {sport.description}
          </p>
        </div>

        <Tabs defaultValue="male" className="space-y-8">
          {/* Category Tabs */}
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 glass-card">
              <TabsTrigger value="male" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Male Category
              </TabsTrigger>
              <TabsTrigger value="female" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Female Category
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Male Category */}
          <TabsContent value="male" className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Demo Videos */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Play className="w-8 h-8 text-primary" />
                  Demo Videos
                </h2>
                <div className="space-y-6">
                  {sport.demoVideos.map((video: any) => (
                    <Card key={video.id} className="glass-card-enhanced">
                      <CardHeader>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                          <iframe
                            src={video.url}
                            title={video.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-muted-foreground">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upload & Leaderboard */}
              <div className="space-y-8">
                {/* Video Upload */}
                <Card className="glass-card-enhanced">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-primary" />
                       Start recording

                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      {!selectedFile ? (
                        <>
                         <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />

<p className="text-muted-foreground mb-4">
  Click "Start Recording" to capture your performance
</p>



                         <label htmlFor="video-upload">
                            <Button className="flex items-center gap-2">
  <Video className="w-5 h-5" />
  record video
</Button>
                          </label>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          {uploadProgress > 0 && (
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button onClick={handleUpload} disabled={uploadProgress > 0}>
                              {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
                            </Button>
                            <Button variant="outline" onClick={() => setSelectedFile(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card className="glass-card-enhanced">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-primary" />
                      Male Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboardData.male.map((athlete) => (
                        <div 
                          key={athlete.rank}
                          className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                            athlete.rank <= 3 ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">#{athlete.rank}</span>
                              {getBadgeIcon(athlete.badge)}
                            </div>
                            <div>
                              <p className="font-semibold">{athlete.name}</p>
                              <p className="text-sm text-muted-foreground">{athlete.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-primary">{athlete.score}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Uploaded Videos Grid */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                Your Uploaded Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uploadedVideos.map((video) => (
                  <Card key={video.id} className="glass-card-enhanced">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{video.title}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(video.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">{video.score}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">4.2</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center">
                        <Play className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="bg-accent/10 rounded-lg p-3 border-l-4 border-accent">
                        <p className="text-sm font-medium mb-1">AI Feedback:</p>
                        <p className="text-sm text-muted-foreground">{video.feedback}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Female Category */}
          <TabsContent value="female" className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Demo Videos */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Play className="w-8 h-8 text-primary" />
                  Demo Videos
                </h2>
                <div className="space-y-6">
                  {sport.demoVideos.map((video: any) => (
                    <Card key={video.id} className="glass-card-enhanced">
                      <CardHeader>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                          <iframe
                            src={video.url}
                            title={video.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-muted-foreground">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upload & Leaderboard */}
              <div className="space-y-8">
                {/* Video Upload */}
                <Card className="glass-card-enhanced">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-primary" />
                      Upload Your Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      {!selectedFile ? (
                        <>
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">
                            Select your video file (.mp4/.mov, max 200MB)
                          </p>
                          <input
                            type="file"
                            accept="video/mp4,video/mov"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="video-upload-female"
                          />
                          <label htmlFor="video-upload-female">
                            <Button className="cursor-pointer">
                              Choose File
                            </Button>
                          </label>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          {uploadProgress > 0 && (
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button onClick={handleUpload} disabled={uploadProgress > 0}>
                              {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
                            </Button>
                            <Button variant="outline" onClick={() => setSelectedFile(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card className="glass-card-enhanced">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-primary" />
                      Female Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboardData.female.map((athlete) => (
                        <div 
                          key={athlete.rank}
                          className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                            athlete.rank <= 3 ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">#{athlete.rank}</span>
                              {getBadgeIcon(athlete.badge)}
                            </div>
                            <div>
                              <p className="font-semibold">{athlete.name}</p>
                              <p className="text-sm text-muted-foreground">{athlete.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-primary">{athlete.score}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Uploaded Videos Grid */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                Your Uploaded Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uploadedVideos.map((video) => (
                  <Card key={video.id} className="glass-card-enhanced">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{video.title}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(video.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">{video.score}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">4.2</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center">
                        <Play className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="bg-accent/10 rounded-lg p-3 border-l-4 border-accent">
                        <p className="text-sm font-medium mb-1">AI Feedback:</p>
                        <p className="text-sm text-muted-foreground">{video.feedback}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}