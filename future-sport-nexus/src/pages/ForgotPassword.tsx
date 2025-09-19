import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  ArrowLeft, 
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Shield,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'contact' | 'otp' | 'reset';

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState<Step>('contact');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpTimer, setOtpTimer] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // OTP timer countdown
  React.useEffect(() => {
    if (currentStep === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, otpTimer]);

  // Lockout timer countdown
  React.useEffect(() => {
    if (isLocked && lockoutTimer > 0) {
      const timer = setTimeout(() => setLockoutTimer(lockoutTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockoutTimer === 0) {
      setIsLocked(false);
      setAttempts(0);
    }
  }, [isLocked, lockoutTimer]);

  // Password strength calculation
  React.useEffect(() => {
    const password = newPassword;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [newPassword]);

  const validateContact = () => {
    const newErrors: Record<string, string> = {};

    if (!contact.trim()) {
      newErrors.contact = contactMethod === 'email' ? 'Email is required' : 'Phone number is required';
    } else if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(contact)) {
      newErrors.contact = 'Please enter a valid email address';
    } else if (contactMethod === 'phone' && !/^\d{10}$/.test(contact)) {
      newErrors.contact = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswords = () => {
    const newErrors: Record<string, string> = {};

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (passwordStrength < 100) {
      newErrors.newPassword = 'Password must contain at least 8 characters with uppercase, lowercase, and numbers';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (validateContact()) {
      setCurrentStep('otp');
      setOtpTimer(30);
      setErrors({});
    }
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

  const handleVerifyOtp = () => {
    if (isLocked) return;

    if (otp.every(digit => digit !== '')) {
      // Simulate OTP verification
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setCurrentStep('reset');
        setAttempts(0);
        setErrors({});
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setErrors({ otp: 'Invalid OTP. Please try again.' });
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockoutTimer(300); // 5 minutes lockout
          setErrors({ otp: 'Too many failed attempts. Please try again in 5 minutes.' });
        }
      }
    } else {
      setErrors({ otp: 'Please enter the complete OTP' });
    }
  };

  const handleResetPassword = () => {
    if (validatePasswords()) {
      // Simulate password reset
      alert('Password reset successful! You can now log in with your new password.');
      // Redirect to login page
    }
  };

  const handleResendOtp = () => {
    setOtpTimer(30);
    setOtp(['', '', '', '']);
    setErrors({});
    alert(`New OTP sent to your ${contactMethod}!`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Reset Password
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {currentStep === 'contact' && 'Enter your contact information to get started'}
              {currentStep === 'otp' && 'Enter the verification code we sent you'}
              {currentStep === 'reset' && 'Create your new password'}
            </p>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="p-2">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <CardTitle className="text-xl">
                  {currentStep === 'contact' && 'Forgot Password'}
                  {currentStep === 'otp' && 'Verify OTP'}
                  {currentStep === 'reset' && 'New Password'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Step 1: Contact Information */}
              {currentStep === 'contact' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Contact Information</Label>
                    <div className="flex gap-2 mb-2">
                      <Button
                        type="button"
                        variant={contactMethod === 'email' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setContactMethod('email');
                          setContact('');
                          setErrors({});
                        }}
                        className="flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                      <Button
                        type="button"
                        variant={contactMethod === 'phone' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setContactMethod('phone');
                          setContact('');
                          setErrors({});
                        }}
                        className="flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Phone
                      </Button>
                    </div>
                    <Input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={cn("glass-button", errors.contact && "border-destructive")}
                      placeholder={contactMethod === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                      type={contactMethod === 'email' ? 'email' : 'tel'}
                    />
                    {errors.contact && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  <PrimaryButton
                    label="Send OTP"
                    onClick={handleSendOtp}
                    className="w-full"
                    size="lg"
                  />

                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Remember your password?{' '}
                      <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 'otp' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      We've sent a 4-digit code to your {contactMethod}
                    </p>
                    <p className="text-sm font-medium">{contact}</p>
                  </div>

                  {/* Lockout Warning */}
                  {isLocked && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2 text-destructive">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Account temporarily locked
                        </span>
                      </div>
                      <p className="text-sm text-destructive mt-1">
                        Too many failed attempts. Try again in{' '}
                        <span className="font-mono">
                          {Math.floor(lockoutTimer / 60)}:{(lockoutTimer % 60).toString().padStart(2, '0')}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          disabled={isLocked}
                          className={cn(
                            "w-12 h-12 text-center text-lg font-bold glass-button",
                            errors.otp && "border-destructive"
                          )}
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-sm text-destructive text-center flex items-center justify-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  {/* Attempts Warning */}
                  {attempts > 0 && attempts < 3 && !isLocked && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning text-center flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {3 - attempts} attempt{3 - attempts !== 1 ? 's' : ''} remaining
                      </p>
                    </div>
                  )}

                  <PrimaryButton
                    label={isLocked ? "Account Locked" : "Verify OTP"}
                    onClick={handleVerifyOtp}
                    disabled={isLocked || otp.some(digit => !digit)}
                    className="w-full"
                    size="lg"
                    icon={isLocked ? <Timer className="w-4 h-4" /> : undefined}
                  />

                  <div className="text-center space-y-2">
                    {otpTimer > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Resend code in {otpTimer}s
                      </p>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={handleResendOtp}
                        disabled={isLocked}
                        className="text-primary hover:text-primary-glow"
                      >
                        Resend Code
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Reset Password */}
              {currentStep === 'reset' && (
                <div className="space-y-6">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">OTP verified successfully!</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password *</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={cn("glass-button pr-10", errors.newPassword && "border-destructive")}
                        placeholder="Enter your new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {/* Password Strength Meter */}
                    {newPassword && (
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
                    
                    {errors.newPassword && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={cn("glass-button pr-10", errors.confirmPassword && "border-destructive")}
                        placeholder="Confirm your new password"
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

                  <PrimaryButton
                    label="Reset Password"
                    onClick={handleResetPassword}
                    className="w-full"
                    size="lg"
                    disabled={!newPassword || !confirmPassword || passwordStrength < 100}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 glass-card">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Security Notice</h3>
                <p className="text-xs text-muted-foreground">
                  For your security, OTP verification is limited to 3 attempts. 
                  After failed attempts, your account will be temporarily locked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}