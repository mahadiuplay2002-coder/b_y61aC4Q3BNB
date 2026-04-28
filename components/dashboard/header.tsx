'use client';

import { Search, Bell, Settings, LogOut, User, Moon, Sun, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20 shadow-card">
      {/* Left section - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search servers, deployments..."
            className={cn(
              'w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border',
              'text-foreground placeholder:text-muted-foreground text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all'
            )}
          />
        </div>
      </div>

      {/* Right section - Notifications and User Menu */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-background rounded-lg transition-colors">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Theme Toggle */}
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-background rounded-lg transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
        )}

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-2 hover:bg-background rounded-lg transition-colors"
          >
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jimmy_Fallon%2C_Montclair_Film_Festival%2C_2013-sFSRlNwid9ri1trYFhnZyPHypePxIP.jpg" 
              alt="Jimmy Fallon"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-foreground">Jimmy Fallon</p>
              <p className="text-xs text-muted-foreground">Enterprise Plan</p>
            </div>
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="p-4 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Jimmy Fallon</p>
                <p className="text-xs text-muted-foreground">jimmy@example.com</p>
              </div>
              <nav className="p-2 space-y-1">
                <Link 
                  href="/dashboard/account"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors"
                >
                  <Settings size={16} />
                  Account Settings
                </Link>
                <Link 
                  href="/dashboard/account?tab=ssh-keys"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors"
                >
                  <Lock size={16} />
                  SSH Keys
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                  <LogOut size={16} />
                  Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
