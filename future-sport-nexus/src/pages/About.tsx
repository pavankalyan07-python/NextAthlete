import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Target,
  Zap,
  Medal,
  Award,
  Users,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const athletes = [
  {
    id: 1,
    name: 'Arjun Patel',
    sport: 'Running',
    achievement: 'National 100m Sprint Champion 2024',
    time: '10.24s',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    icon: <Zap className="w-6 h-6" />,
    verified: true
  },
  {
    id: 2,
    name: 'Priya Sharma',
    sport: 'Swimming',
    achievement: 'State 50m Freestyle Record Holder',
    time: '26.24s',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    icon: <Activity className="w-6 h-6" />,
    verified: true
  },
  {
    id: 3,
    name: 'Vikram Singh',
    sport: 'Strength Training',
    achievement: 'Regional Push-up Challenge Winner',
    reps: '65 reps',
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    icon: <Target className="w-6 h-6" />,
    verified: true
  },
  {
    id: 4,
    name: 'Meera Joshi',
    sport: 'Athletics',
    achievement: 'Youth Long Jump Champion',
    distance: '2.45m',
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    icon: <Medal className="w-6 h-6" />,
    verified: true
  },
  {
    id: 5,
    name: 'Karan Gupta',
    sport: 'Cycling',
    achievement: 'State 1km Time Trial Winner',
    time: '1:28.45',
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    icon: <Award className="w-6 h-6" />,
    verified: true
  },
  {
    id: 6,
    name: 'Sakshi Malik',
    sport: 'High Jump',
    achievement: 'Regional High Jump Record',
    height: '1.65m',
    location: 'Haryana',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    icon: <Star className="w-6 h-6" />,
    verified: true
  }
];

const milestones = [
  {
    year: '2023',
    month: 'Jan',
    title: 'Platform Launch',
    description: 'Launched 21st.dev with AI-powered sports assessment for 3 core sports',
    icon: <Zap className="w-5 h-5" />,
    stats: 'Initial 500 athletes'
  },
  {
    year: '2023',
    month: 'Apr',
    title: 'First 1K Athletes',
    description: 'Reached our first milestone of 1,000 registered athletes nationwide',
    icon: <Users className="w-5 h-5" />,
    stats: '1,000+ athletes'
  },
  {
    year: '2023',
    month: 'Jul',
    title: 'AI Enhancement',
    description: 'Upgraded AI models for better accuracy and introduced real-time feedback',
    icon: <Target className="w-5 h-5" />,
    stats: '95% accuracy'
  },
  {
    year: '2023',
    month: 'Oct',
    title: 'Sports Expansion',
    description: 'Added Swimming, Cycling, and Jump events to our assessment portfolio',
    icon: <Activity className="w-5 h-5" />,
    stats: '7 sports'
  },
  {
    year: '2024',
    month: 'Jan',
    title: 'National Recognition',
    description: 'Partnered with Sports Authority of India for talent identification',
    icon: <Award className="w-5 h-5" />,
    stats: 'Official partner'
  },
  {
    year: '2024',
    month: 'Mar',
    title: '10K Athletes',
    description: 'Crossed 10,000 active athletes with over 50,000 video assessments',
    icon: <Trophy className="w-5 h-5" />,
    stats: '10K+ athletes'
  }
];

export default function About() {
  return (
    <div className="min-h-screen section-spacing">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto content-spacing">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
               
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Democratizing sports talent assessment through cutting-edge AI technology, 
              making world-class evaluation accessible to every athlete in India.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-24">
            <Card className="glass-card">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Our Mission
                      </span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      We believe every athlete deserves fair evaluation and recognition, 
                      regardless of their geographic location or economic background. 
                      Through AI-powered video analysis, we're breaking down barriers 
                      and creating equal opportunities for sports talent across India.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                        <div className="text-muted-foreground">Athletes Assessed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent mb-2">95%</div>
                        <div className="text-muted-foreground">AI Accuracy</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div 
                      className="aspect-square rounded-2xl bg-cover bg-center relative overflow-hidden"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Athletes Achievements */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Champion Athletes
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Meet the extraordinary athletes who have achieved greatness through our platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {athletes.map((athlete) => (
                <Card 
                  key={athlete.id} 
                  className="glass-card group hover:glow-primary transition-all duration-500"
                >
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Athlete Image */}
                      <div className="relative">
                        <div 
                          className="w-full h-48 rounded-xl bg-cover bg-center"
                          style={{ backgroundImage: `url(${athlete.image})` }}
                        />
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                            {athlete.icon}
                          </div>
                          {athlete.verified && (
                            <div className="w-10 h-10 bg-success/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                              <Star className="w-5 h-5 text-success" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Athlete Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {athlete.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {athlete.location}
                          </div>
                        </div>

                        <Badge 
                          variant="outline" 
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {athlete.sport}
                        </Badge>

                        <p className="text-muted-foreground leading-relaxed">
                          {athlete.achievement}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">Record:</span>
                          <span className="font-bold text-lg text-primary">
                            {athlete.time || athlete.reps || athlete.distance || athlete.height}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Milestone Timeline */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Our Journey
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From a vision to transform sports assessment to becoming India's leading AI-powered platform
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "relative flex items-center gap-8",
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    )}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background z-10" />
                    
                    {/* Content */}
                    <div className={cn("w-1/2", index % 2 === 0 ? "text-right pr-12" : "text-left pl-12")}>
                      <Card className="glass-card group hover:glow-primary transition-all duration-300">
                        <CardContent className="p-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                                  {milestone.icon}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {milestone.stats}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                                <div className="text-sm text-muted-foreground">{milestone.month}</div>
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-foreground">
                              {milestone.title}
                            </h3>
                            
                            <p className="text-muted-foreground leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Empty space for opposite side */}
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section>
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                      <Target className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      The Future of Sports
                    </span>
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    We envision a future where every talented athlete gets the recognition they deserve, 
                    where AI-powered assessment becomes the standard for fair evaluation, 
                    and where geographic and economic barriers no longer limit sporting dreams.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-8 pt-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">100K+</div>
                      <div className="text-muted-foreground">Athletes by 2025</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">15+</div>
                      <div className="text-muted-foreground">Sports Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success mb-2">99%</div>
                      <div className="text-muted-foreground">AI Accuracy Goal</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}