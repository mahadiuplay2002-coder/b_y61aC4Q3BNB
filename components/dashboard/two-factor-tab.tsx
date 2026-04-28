'use client';

import { Button } from '@/components/ui/button';
import { Shield, Smartphone, MessageSquare, Check, X } from 'lucide-react';

export function TwoFactorTab() {
  const authMethods = [
    {
      id: 'google',
      name: 'Authenticator App',
      description: 'Use Google Authenticator or similar apps to generate time-based codes.',
      icon: Smartphone,
      enabled: false,
      recommended: true,
    },
    {
      id: 'sms',
      name: 'SMS Authentication',
      description: 'Receive verification codes via text message to your phone.',
      icon: MessageSquare,
      enabled: true,
      recommended: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Two-Factor Authentication</h2>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
          <Check className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">2FA is enabled</p>
          <p className="text-xs text-muted-foreground">Your account is protected with SMS authentication.</p>
        </div>
      </div>

      {/* Auth Methods */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Authentication Methods</h3>
        
        <div className="space-y-3">
          {authMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className="flex items-center justify-between p-5 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${method.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`h-5 w-5 ${method.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{method.name}</span>
                      {method.recommended && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-primary/10 text-primary">
                          Recommended
                        </span>
                      )}
                      {method.enabled && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-emerald-500/10 text-emerald-500">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <Button
                  variant={method.enabled ? 'outline' : 'default'}
                  size="sm"
                  className={method.enabled 
                    ? 'border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }
                >
                  {method.enabled ? 'Disable' : 'Setup'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
        <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Security Recommendation</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We recommend using an authenticator app for the most secure two-factor authentication. 
            SMS-based 2FA, while convenient, can be vulnerable to SIM-swapping attacks.
          </p>
        </div>
      </div>
    </div>
  );
}

