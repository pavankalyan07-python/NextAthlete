import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  Trophy, 
  Users,
  Activity,
  Dumbbell,
  Waves,
  Bike,
  Zap,
  Target
} from 'lucide-react';

const sports = [
  {
    name: 'Running',
    icon: Activity,
    description: 'Sprint and endurance challenges',
    path: '/sports/running',
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'Pushups',
    icon: Dumbbell,
    description: 'Upper body strength assessment',
    path: '/sports/pushups',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Situps',
    icon: Target,
    description: 'Core strength evaluation',
    path: '/sports/situps',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Swimming',
    icon: Waves,
    description: 'Aquatic performance tracking',
    path: '/sports/swimming',
    color: 'from-blue-600 to-teal-500'
  },
  {
    name: 'Cycling',
    icon: Bike,
    description: 'Endurance and speed challenges',
    path: '/sports/cycling',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Long Jump',
    icon: Zap,
    description: 'Distance jumping competitions',
    path: '/sports/long-jump',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'High Jump',
    icon: Trophy,
    description: 'Vertical leap assessments',
    path: '/sports/high-jump',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function Sports() {
  return (
    <div className="min-h-screen section-spacing heavy-spacing">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center content-spacing mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Your Sport
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Select a sport to view categories, leaderboards, and upload your performance videos
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport) => {
            const IconComponent = sport.icon;
            return (
              <Link key={sport.name} to={sport.path}>
                <Card className="glass-card-enhanced hover-lift group cursor-pointer h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${sport.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {sport.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-lg mb-6">
                      {sport.description}
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Male/Female</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        <span>Demo Videos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        <span>Leaderboards</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="glass-card-enhanced p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to showcase your talent?
            </h2>
            <p className="text-muted-foreforeground mb-6 text-lg">
              Join thousands of athletes already using our AI-powered assessment platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="inline-block">
                <button className="px-8 py-3 bg-primary hover:bg-primary-glow text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                  Get Started
                </button>
              </Link>
              <Link to="/about" className="inline-block">
                <button className="px-8 py-3 border border-border hover:bg-accent/10 rounded-lg font-semibold transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}