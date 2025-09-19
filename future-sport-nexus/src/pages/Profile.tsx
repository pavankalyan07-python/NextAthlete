import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon,
  Trophy,
  Target,
  Plus,
  Edit2,
  Save,
  X,
  Camera,
  Star,
  Medal,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      sport: 'Running',
      title: 'District Champion',
      description: '100m Sprint - First Place in District Athletics Meet',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      sport: 'Push-ups',
      title: 'Personal Best',
      description: 'Achieved 45 push-ups in 60 seconds',
      date: '2024-02-10',
      verified: false
    }
  ]);

  const [profileData, setProfileData] = useState({
    fullName: 'Arjun Patel',
    email: 'arjun.patel@example.com',
    phone: '+91 9876543210',
    dateOfBirth: new Date('2000-05-15'),
    gender: 'male',
    state: 'Maharashtra',
    district: 'Mumbai',
    city: 'Andheri',
    bio: 'Passionate athlete with a focus on sprint running and strength training. Aiming to represent my state in national competitions.',
    preferredSports: ['running', 'pushups'],
    coachName: 'Rajesh Kumar',
    coachContact: '+91 9123456789'
  });

  const [newAchievement, setNewAchievement] = useState({
    sport: '',
    title: '',
    description: '',
    date: new Date()
  });

  const [showAddAchievement, setShowAddAchievement] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91\s\d{10}$/.test(profileData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (+91 XXXXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      // Here you would typically save to backend
      alert('Profile updated successfully!');
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.sport && newAchievement.title && newAchievement.description) {
      const achievement = {
        id: achievements.length + 1,
        sport: newAchievement.sport,
        title: newAchievement.title,
        description: newAchievement.description,
        date: format(newAchievement.date, 'yyyy-MM-dd'),
        verified: false
      };
      
      setAchievements([...achievements, achievement]);
      setNewAchievement({ sport: '', title: '', description: '', date: new Date() });
      setShowAddAchievement(false);
    }
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Profile
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your personal information and athletic achievements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {profileData.fullName.charAt(0)}
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary-glow"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">{profileData.fullName}</h2>
                  <p className="text-muted-foreground mb-4">
                    {calculateAge(profileData.dateOfBirth)} years old
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{profileData.city}, {profileData.state}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Mail className="w-4 h-4 text-accent" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{profileData.phone}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {profileData.preferredSports.map((sport) => (
                        <Badge key={sport} variant="outline" className="text-xs">
                          {sport === 'running' ? 'Running' : 'Push-ups'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Achievements</span>
                      <span className="font-bold">{achievements.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Verified</span>
                      <span className="font-bold text-success">
                        {achievements.filter(a => a.verified).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Sports</span>
                      <span className="font-bold">{profileData.preferredSports.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Details */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Details
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="glass-button"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        disabled={!isEditing}
                        className={cn("glass-button", errors.fullName && "border-destructive")}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Date of Birth *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={!isEditing}
                            className={cn(
                              "w-full justify-start text-left font-normal glass-button",
                              !profileData.dateOfBirth && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {profileData.dateOfBirth ? format(profileData.dateOfBirth, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={profileData.dateOfBirth}
                            onSelect={(date) => date && setProfileData({...profileData, dateOfBirth: date})}
                            disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                        className={cn("glass-button", errors.email && "border-destructive")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={cn("glass-button", errors.phone && "border-destructive")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select 
                        value={profileData.state} 
                        onValueChange={(value) => setProfileData({...profileData, state: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="glass-button">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={profileData.district}
                        onChange={(e) => setProfileData({...profileData, district: e.target.value})}
                        disabled={!isEditing}
                        className="glass-button"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                        disabled={!isEditing}
                        className="glass-button"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      className="glass-button min-h-[100px]"
                      placeholder="Tell us about your athletic journey and goals..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <PrimaryButton label="Save Changes" onClick={handleSave} />
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="glass-button"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Achievements Section */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Achievements
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddAchievement(true)}
                      className="glass-button"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <Medal className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {achievement.sport}
                            </Badge>
                            {achievement.verified && (
                              <CheckCircle className="w-4 h-4 text-success" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(achievement.date), 'MMMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Achievement Form */}
                  {showAddAchievement && (
                    <div className="mt-6 p-4 border border-border rounded-lg bg-surface/20">
                      <h4 className="font-semibold mb-4">Add New Achievement</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Sport</Label>
                          <Select 
                            value={newAchievement.sport} 
                            onValueChange={(value) => setNewAchievement({...newAchievement, sport: value})}
                          >
                            <SelectTrigger className="glass-button">
                              <SelectValue placeholder="Select sport" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="running">Running</SelectItem>
                              <SelectItem value="pushups">Push-ups</SelectItem>
                              <SelectItem value="situps">Sit-ups</SelectItem>
                              <SelectItem value="jump">Vertical Jump</SelectItem>
                              <SelectItem value="endurance">Endurance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={newAchievement.title}
                            onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                            className="glass-button"
                            placeholder="e.g., District Champion"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label>Description</Label>
                        <Textarea
                          value={newAchievement.description}
                          onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                          className="glass-button"
                          placeholder="Describe your achievement..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <PrimaryButton 
                          label="Add Achievement" 
                          size="sm"
                          onClick={handleAddAchievement}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddAchievement(false)}
                          className="glass-button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Coach Information */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Coach Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coachName">Coach Name</Label>
                      <Input
                        id="coachName"
                        value={profileData.coachName}
                        onChange={(e) => setProfileData({...profileData, coachName: e.target.value})}
                        className="glass-button"
                        placeholder="Enter coach name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coachContact">Coach Contact</Label>
                      <Input
                        id="coachContact"
                        value={profileData.coachContact}
                        onChange={(e) => setProfileData({...profileData, coachContact: e.target.value})}
                        className="glass-button"
                        placeholder="Enter coach contact"
                      />
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