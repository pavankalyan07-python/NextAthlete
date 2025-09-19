import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

const challenges = [
  {
    id: 1,
    title: '30-Day Sprint Challenge',
    description: 'Improve your 100m sprint time over 30 days with daily training videos and AI analysis.',
    category: 'Running',
    status: 'active',
    participants: 1247,
    deadline: '15 days left',
    reward: 'Gold Badge + Certificate',
    difficulty: 'Intermediate',
    icon: <Target className="w-6 h-6" />,
    progress: 65,
    timestamp: '3 hours ago'
  },
  {
    id: 2,
    title: 'Push-up Masters Challenge',
    description: 'Complete the ultimate push-up challenge and compete with athletes nationwide.',
    category: 'Strength',
    status: 'active',
    participants: 892,
    deadline: '22 days left',
    reward: 'Platinum Badge',
    difficulty: 'Advanced',
    icon: <Trophy className="w-6 h-6" />,
    progress: 42,
    timestamp: '1 day ago'
  },
  {
    id: 3,
    title: 'Endurance Run Championship',
    description: 'Test your endurance with graduated running challenges over 6 weeks.',
    category: 'Running',
    status: 'active',
    participants: 2156,
    deadline: '8 days left',
    reward: 'Diamond Badge + Cash Prize',
    difficulty: 'Expert',
    icon: <Timer className="w-6 h-6" />,
    progress: 88,
    timestamp: '2 days ago'
  },
  {
    id: 4,
    title: 'Regional Swimming Challenge',
    description: 'Swimming technique assessment and speed challenge for your region.',
    category: 'Swimming',
    status: 'closed',
    participants: 567,
    deadline: 'Ended',
    reward: 'Silver Badge',
    difficulty: 'Beginner',
    icon: <Star className="w-6 h-6" />,
    progress: 100,
    timestamp: '5 days ago'
  }
];

const updates = [
  {
    id: 1,
    type: 'feedback',
    title: 'Video Analysis Complete',
    message: 'Your sprint technique analysis is ready! You improved by 12% in form consistency.',
    timestamp: '2 hours ago',
    icon: <CheckCircle className="w-5 h-5 text-success" />,
    read: false
  },
  {
    id: 2,
    type: 'leaderboard',
    title: 'Leaderboard Update',
    message: 'You moved up to #7 in the 30-Day Sprint Challenge! Keep pushing to reach top 5.',
    timestamp: '4 hours ago',
    icon: <Trophy className="w-5 h-5 text-primary" />,
    read: false
  },
  {
    id: 3,
    type: 'challenge',
    title: 'New Challenge Available',
    message: 'The "Vertical Jump Championship" is now open for registration.',
    timestamp: '1 day ago',
    icon: <Target className="w-5 h-5 text-accent" />,
    read: true
  }
];

export default function Challenges() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-primary bg-primary/10';
      case 'Expert': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'closed': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="min-h-screen section-spacing">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto content-spacing">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Challenges
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Compete with athletes nationwide, improve your skills, and earn badges and rewards
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12">
            {/* Recent Updates */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <AlertCircle className="w-7 h-7 text-accent" />
                  Recent Updates
                </h2>
                
                <div className="space-y-4">
                  {updates.map((update) => (
                    <Card 
                      key={update.id} 
                      className={cn(
                        "glass-card transition-all duration-300 hover:glow-primary",
                        !update.read && "ring-1 ring-primary/30"
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                              {update.icon}
                            </div>
                            {!update.read && (
                              <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-2 animate-pulse" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className={cn(
                              "font-semibold mb-2",
                              !update.read ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {update.title}
                            </h3>
                            <p className={cn(
                              "text-sm leading-relaxed mb-3",
                              !update.read ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {update.message}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {update.timestamp}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Challenge Stats */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Challenges Completed</span>
                      <span className="font-bold text-2xl text-primary">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Badges Earned</span>
                      <span className="font-bold text-2xl text-accent">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Rank</span>
                      <span className="font-bold text-2xl text-success">#47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="font-bold text-2xl text-warning">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}