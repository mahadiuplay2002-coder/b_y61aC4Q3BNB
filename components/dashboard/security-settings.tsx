'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Chrome, Github, Mail } from 'lucide-react';

export function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [ssoMethods, setSsoMethods] = useState({
    google: true,
    github: false,
    microsoft: false,
  });

  const toggleSSO = (method: keyof typeof ssoMethods) => {
    setSsoMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  return (
    <Card className="bg-card shadow-card">
      <CardHeader className="border-b border-border">
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your password and authentication methods</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Password Change */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <p className="text-xs text-muted-foreground mb-4">Last changed 45 days ago</p>
          </div>
          
          {isChangingPassword ? (
            <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">New Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => setIsChangingPassword(false)}
                  className="w-full"
                >
                  Confirm Change
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsChangingPassword(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  defaultValue="••••••••••••"
                  disabled
                  className="pr-10 bg-muted/50 font-mono text-lg tracking-wider"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button variant="default" onClick={() => setIsChangingPassword(true)}>
                Change Password
              </Button>
            </div>
          )}
        </div>

        {/* SSO Methods */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div>
            <label className="text-sm font-medium text-foreground">Single Sign-On (SSO)</label>
            <p className="text-xs text-muted-foreground">Connect your account to external authentication providers</p>
          </div>

          <div className="space-y-2">
            {/* Google */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Google</p>
                  <p className="text-xs text-muted-foreground">Sign in with Google Account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {ssoMethods.google && (
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant={ssoMethods.google ? 'outline' : 'default'}
                  onClick={() => toggleSSO('google')}
                >
                  {ssoMethods.google ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-500/10 flex items-center justify-center">
                  <Github className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">GitHub</p>
                  <p className="text-xs text-muted-foreground">Sign in with GitHub Account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {ssoMethods.github && (
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant={ssoMethods.github ? 'outline' : 'default'}
                  onClick={() => toggleSSO('github')}
                >
                  {ssoMethods.github ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>

            {/* Microsoft */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-blue-600/10 flex items-center justify-center">
                  <Chrome className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Microsoft</p>
                  <p className="text-xs text-muted-foreground">Sign in with Microsoft Account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {ssoMethods.microsoft && (
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant={ssoMethods.microsoft ? 'outline' : 'default'}
                  onClick={() => toggleSSO('microsoft')}
                >
                  {ssoMethods.microsoft ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
