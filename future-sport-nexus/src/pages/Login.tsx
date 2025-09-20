import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  AlertCircle,
  Shield,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Login() {
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
    rememberMe: false,
    contactMethod: 'email' as 'email' | 'phone'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.contact.trim()) {
      newErrors.contact = formData.contactMethod === 'email' ? 'Email is required' : 'Phone number is required';
    } else if (formData.contactMethod === 'email' && !/\S+@\S+\.\S+/.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid email address';
    } else if (formData.contactMethod === 'phone' && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      if (validateForm()) {
        // Simulate successful login
        alert('Login successful! Welcome back!');
        // Here you would typically update authentication state
      }
  };

  const handleOtpLogin = () => {
    if (!formData.contact.trim()) {
      setErrors({ contact: formData.contactMethod === 'email' ? 'Email is required' : 'Phone number is required' });
      return;
    }
    
    alert(`OTP sent to your ${formData.contactMethod}!`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign in to continue your athletic journey
            </p>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div className="p-4 rounded-lg border flex items-center gap-2 bg-destructive/10 border-destructive/20 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.general}</span>
                  </div>
                )}

                {/* Contact Method Toggle */}
                <div className="space-y-2">
                  <Label>Contact Information</Label>
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
                  <Label htmlFor="password">Password</Label>
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
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({...formData, rememberMe: !!checked})}
                      
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary-glow font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>


                {/* Submit Buttons */}
                <div className="space-y-3">
                    <PrimaryButton
                      type="submit"
                      label="Sign In"
                      size="lg"
                      className="w-full"
                    />
                  
                    {/* <Button
                      type="button"
                      variant="ghost"
                      onClick={handleOtpLogin}
                      className="w-full text-primary hover:text-primary-glow"
                    >
                      Login with OTP
                    </Button> */}
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary hover:text-primary-glow font-medium">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}