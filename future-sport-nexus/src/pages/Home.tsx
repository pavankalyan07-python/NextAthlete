import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Shield, 
  Upload, 
  Trophy, 
  Target,
  Zap,
  Users,
  BarChart3
} from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-8 h-8 text-accent" />,
    title: 'AI Cheat Detection',
    description: 'Advanced computer vision algorithms ensure fair assessment and authentic performance validation.'
  },
  {
    icon: <Upload className="w-8 h-8 text-primary" />,
    title: 'Video Upload & Analysis',
    description: 'Upload your performance videos and get instant AI-powered feedback with detailed analytics.'
  },
  {
    icon: <Trophy className="w-8 h-8 text-accent" />,
    title: 'Dynamic Leaderboards',
    description: 'Compete with athletes nationwide and track your ranking in real-time across multiple sports.'
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: 'Performance Benchmarks',
    description: 'Get personalized benchmarks based on your age, gender, and geographic location.'
  }
];

const stats = [
  { icon: <Users className="w-6 h-6" />, value: '10K+', label: 'Active Athletes' },
  { icon: <Play className="w-6 h-6" />, value: '50K+', label: 'Videos Analyzed' },
  { icon: <Trophy className="w-6 h-6" />, value: '6', label: 'Sports Categories' },
  { icon: <BarChart3 className="w-6 h-6" />, value: '95%', label: 'Accuracy Rate' }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Sports Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-background via-surface to-background">
        {/* Sports Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,179,255,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-32 relative">
          <div className="max-w-6xl mx-auto text-center content-spacing">
            {/* <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-3 mb-12">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-base font-medium text-muted-foreground">
                Powered by Advanced AI Technology
              </span>
            </div> */}
            
            {/* <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent block mb-4">
                AI-Powered Mobile Platform
              </span>
              <span className="text-foreground block mb-4">
                for Democratizing Sports
              </span>
              <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                Talent Assessment
              </span>
            </h1> */}
            
            <div><div></div></div>
            <div></div>
            <div></div>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed" >
              AI-Powered Mobile Platform for Democratizing Sports Talent Assessment
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup">
                <PrimaryButton 
                  label="Get Started" 
                  size="lg"
                  className="glow-primary animate-glow"
                  icon={<Play className="w-6 h-6" />}
                />
              </Link>
              <Link to="/sports">
                <PrimaryButton 
                  label="Explore Sports" 
                  variant="glass"
                  size="lg"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing bg-surface/30 curve-top relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-foreground mb-4">{stat.value}</div>
                <div className="text-muted-foreground text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Advanced Features
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Experience next-generation sports assessment with our innovative technology stack
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card group hover:glow-primary transition-all duration-500 p-4">
                <CardContent className="p-12">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 curve-both relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold">
              Ready to Transform Your Athletic Journey?
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join thousands of athletes who are already using 21st.dev to showcase their talent
            </p>
            <Link to="/signup">
              <PrimaryButton 
                label="Start Your Assessment" 
                size="lg"
                className="glow-primary"
                icon={<Play className="w-6 h-6" />}
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}