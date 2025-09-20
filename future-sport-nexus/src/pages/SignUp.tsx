import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Eye, 
  EyeOff, 
  CalendarIcon, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Info,
  Sparkles
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

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: undefined as Date | undefined,
    gender: '',
    contactMethod: 'email' as 'email' | 'phone',
    contact: '',
    password: '',
    confirmPassword: '',
    state: '',
    city: '',
    consent: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [age, setAge] = useState<number | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);

  // Calculate age when date of birth changes
  React.useEffect(() => {
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        setAge(calculatedAge - 1);
      } else {
        setAge(calculatedAge);
      }
    }
  }, [formData.dateOfBirth]);

  // Password strength calculation
  React.useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  // OTP timer countdown
  React.useEffect(() => {
    if (showOtpModal && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showOtpModal, otpTimer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (age !== null && (age < 8 || age > 35)) {
      newErrors.dateOfBirth = 'Age must be between 8 and 35 years';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = formData.contactMethod === 'email' ? 'Email is required' : 'Phone number is required';
    } else if (formData.contactMethod === 'email' && !/\S+@\S+\.\S+/.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid email address';
    } else if (formData.contactMethod === 'phone' && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 100) {
      newErrors.password = 'Password must contain at least 8 characters with uppercase, lowercase, and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must consent to data processing';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowOtpModal(true);
      setOtpTimer(30);
    }
  };

  const handleOtpSubmit = () => {
    // Simulate successful registration
    setShowOtpModal(false);
    // Show success animation (confetti)
    alert('Registration successful! Welcome to 21st.dev!');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
               <span className="text-sm font-medium">Join the Future of Sports</span>
            </div> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Get Started
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create your account and begin your athletic journey
            </p>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className={cn("glass-button", errors.fullName && "border-destructive")}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal glass-button",
                          !formData.dateOfBirth && "text-muted-foreground",
                          errors.dateOfBirth && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={(date) => setFormData({...formData, dateOfBirth: date})}
                        disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {age !== null && (
                    <p className="text-sm text-muted-foreground">Age: {age} years</p>
                  )}
                  {errors.dateOfBirth && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => setFormData({...formData, gender: value})}
                  >
                    <SelectTrigger className={cn("glass-button", errors.gender && "border-destructive")}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Contact Method Toggle */}
                <div className="space-y-2">
                  <Label>Contact Information *</Label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant={formData.contactMethod === 'email' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData({...formData, contactMethod: 'email', contact: ''})}
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={formData.contactMethod === 'phone' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData({...formData, contactMethod: 'phone', contact: ''})}
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Phone
                    </Button>
                  </div>
                  <Input
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className={cn("glass-button", errors.contact && "border-destructive")}
                    placeholder={formData.contactMethod === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                    type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                  />
                  {errors.contact && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={cn("glass-button pr-10", errors.password && "border-destructive")}
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="w-full bg-surface rounded-full h-2">
                        <div 
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            passwordStrength < 50 && "bg-destructive",
                            passwordStrength >= 50 && passwordStrength < 100 && "bg-warning",
                            passwordStrength === 100 && "bg-success"
                          )}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <p className={cn(
                        "text-xs",
                        passwordStrength < 50 && "text-destructive",
                        passwordStrength >= 50 && passwordStrength < 100 && "text-warning",
                        passwordStrength === 100 && "text-success"
                      )}>
                        {passwordStrength < 50 && "Weak password"}
                        {passwordStrength >= 50 && passwordStrength < 100 && "Good password"}
                        {passwordStrength === 100 && "Strong password"}
                      </p>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={cn("glass-button pr-10", errors.confirmPassword && "border-destructive")}
                      placeholder="Confirm your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Location (Optional) */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State (Optional)</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
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
                    <Label htmlFor="city">City (Optional)</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="glass-button"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({...formData, consent: !!checked})}
                      className={errors.consent ? "border-destructive" : ""}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I consent to video processing & data upload *
                      </label>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-muted-foreground">
                          Required for AI analysis and performance assessment.
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-primary hover:text-primary-glow"
                        >
                          <Info className="w-3 h-3 mr-1" />
                          Why we need this?
                        </Button>
                      </div>
                    </div>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <PrimaryButton
                  type="submit"
                  label="Sign Up"
                  size="lg"
                  className="w-full"
                  disabled={!formData.consent || Object.keys(errors).length > 0}
                />

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="glass-card max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <CardTitle>Verify Your Account</CardTitle>
              <p className="text-muted-foreground">
                We've sent a 4-digit code to your {formData.contactMethod}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-bold glass-button"
                  />
                ))}
              </div>
              
              <div className="text-center space-y-4">
                <PrimaryButton
                  label="Verify"
                  onClick={handleOtpSubmit}
                  disabled={otp.some(digit => !digit)}
                  className="w-full"
                />
                
                <div className="text-sm text-muted-foreground">
                  {otpTimer > 0 ? (
                    <p>Resend code in {otpTimer}s</p>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => setOtpTimer(30)}
                      className="text-primary hover:text-primary-glow"
                    >
                      Resend Code
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}