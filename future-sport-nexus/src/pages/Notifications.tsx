import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Trophy, 
  CheckCircle, 
  Star, 
  Calendar,
  TrendingUp,
  Users,
  Target,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: 1,
    type: 'achievement',
    title: 'New Personal Best!',
    message: 'Congratulations! You achieved a new personal best in 100m Sprint with a time of 12.45 seconds.',
    timestamp: '2 hours ago',
    icon: <Trophy className="w-5 h-5 text-primary" />,
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'shortlist',
    title: 'You\'ve been shortlisted!',
    message: 'Great news! You have been shortlisted for the State Level Athletics Championship based on your recent performance.',
    timestamp: '5 hours ago',
    icon: <Star className="w-5 h-5 text-accent" />,
    read: false,
    priority: 'high'
  },
  {
    id: 3,
    type: 'ranking',
    title: 'Leaderboard Update',
    message: 'You moved up to #3 in the Regional Push-up Challenge leaderboard! Keep pushing to reach the top.',
    timestamp: '1 day ago',
    icon: <TrendingUp className="w-5 h-5 text-success" />,
    read: true,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'event',
    title: 'Upcoming Assessment',
    message: 'Reminder: Your scheduled Vertical Jump assessment is tomorrow at 3:00 PM. Make sure you\'re warmed up!',
    timestamp: '1 day ago',
    icon: <Calendar className="w-5 h-5 text-warning" />,
    read: true,
    priority: 'medium'
  },
  {
    id: 5,
    type: 'social',
    title: 'New Challenge Available',
    message: 'Join the "30-Day Endurance Challenge" and compete with athletes across India. Registration closes in 3 days.',
    timestamp: '2 days ago',
    icon: <Users className="w-5 h-5 text-accent" />,
    read: true,
    priority: 'low'
  },
  {
    id: 6,
    type: 'feedback',
    title: 'Video Analysis Complete',
    message: 'Your sit-up technique analysis is ready! Check out personalized tips to improve your form and performance.',
    timestamp: '3 days ago',
    icon: <Target className="w-5 h-5 text-primary" />,
    read: true,
    priority: 'medium'
  }
];

export default function Notifications() {
  const [notificationList, setNotificationList] = React.useState(notifications);
  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-primary';
      case 'medium': return 'text-accent';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'achievement': return 'Achievement';
      case 'shortlist': return 'Shortlisted';
      case 'ranking': return 'Ranking';
      case 'event': return 'Event';
      case 'social': return 'Challenge';
      case 'feedback': return 'Analysis';
      default: return 'Update';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Notifications
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with your athletic progress and opportunities
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {unreadCount} unread
                </span>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="glass-button"
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notificationList.map((notification) => (
              <Card 
                key={notification.id} 
                className={cn(
                  "glass-card transition-all duration-300 hover:glow-primary group",
                  !notification.read && "ring-1 ring-primary/30"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon & Status Indicator */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                        {notification.icon}
                      </div>
                      {!notification.read && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse glow-primary" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className={cn(
                            "font-semibold text-lg",
                            !notification.read && "text-foreground",
                            notification.read && "text-muted-foreground"
                          )}>
                            {notification.title}
                          </h3>
                          <Badge 
                            variant="outline"
                            className={cn("text-xs", getPriorityColor(notification.priority))}
                          >
                            {getTypeLabel(notification.type)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {notification.timestamp}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className={cn(
                        "text-sm leading-relaxed mb-4",
                        !notification.read && "text-foreground",
                        notification.read && "text-muted-foreground"
                      )}>
                        {notification.message}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="glass-button text-xs"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                        
                        {notification.type === 'shortlist' && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-xs"
                          >
                            View Details
                          </Button>
                        )}
                        
                        {notification.type === 'event' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-button text-xs"
                          >
                            Add to Calendar
                          </Button>
                        )}
                        
                        {notification.type === 'social' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-button text-xs"
                          >
                            Join Challenge
                          </Button>
                        )}
                        
                        {notification.type === 'feedback' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-button text-xs"
                          >
                            View Analysis
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {notificationList.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Achievement Notifications</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Personal Best Records</span>
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Leaderboard Changes</span>
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Shortlist Updates</span>
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">System Notifications</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Assessment Reminders</span>
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Video Analysis Complete</span>
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Challenge Invitations</span>
                      <div className="w-2 h-2 bg-muted rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}