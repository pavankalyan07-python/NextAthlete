import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PrimaryButton } from './ui/primary-button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Sports', path: '/sports' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'About Us', path: '/about' },
  { name: 'Profile', path: '/profile' },
];

const authNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Sports', path: '/sports' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'About Us', path: '/about' },
  { name: 'Profile', path: '/profile' },
];

export const Navigation = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: Replace with actual auth state

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Space for balance */}
          <div></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {(isAuthenticated ? authNavItems : navItems).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface/50'
                )}
              >
                {item.name}
                <div 
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300',
                    location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            
            {!isAuthenticated && (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <PrimaryButton label="Sign Up" size="sm" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {(isAuthenticated ? authNavItems : navItems).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'block px-4 py-2 rounded-lg font-medium transition-all duration-300',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface/50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <PrimaryButton label="Sign Up" size="sm" className="w-full" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};