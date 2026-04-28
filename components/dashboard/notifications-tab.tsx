'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, AlertTriangle, Wrench, Activity, Rocket, Mail } from 'lucide-react';

interface NotificationsTabProps {
  environmentId?: string;
}

export function NotificationsTab({ environmentId }: NotificationsTabProps) {
  const notificationSettings = [
    { 
      name: 'Emergency Alerts', 
      description: 'Receive emergency alerts regarding security and availability of your subscribed environments.',
      enabled: true,
      icon: AlertTriangle,
      iconColor: 'text-destructive'
    },
    { 
      name: 'Maintenance Window', 
      description: 'Get notified when maintenance windows are scheduled, created, or completed.',
      enabled: true,
      icon: Wrench,
      iconColor: 'text-amber-500'
    },
    { 
      name: 'Monitoring Alerts', 
      description: 'Receive alerts when monitored services experience downtime.',
      enabled: true,
      icon: Activity,
      iconColor: 'text-primary'
    },
    { 
      name: 'Deployment Alerts', 
      description: 'Get notified on deployment completion or failure events.',
      enabled: true,
      icon: Rocket,
      iconColor: 'text-emerald-500'
    },
    { 
      name: 'Newsletters', 
      description: 'Stay updated with new features, functionalities, and special offers.',
      enabled: true,
      icon: Mail,
      iconColor: 'text-secondary'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">Manage how you receive alerts and updates.</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-1 rounded-lg border border-border bg-card overflow-hidden">
        {notificationSettings.map((setting, idx) => {
          const Icon = setting.icon;
          return (
            <div 
              key={idx} 
              className="flex items-start gap-4 p-5 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <Checkbox 
                defaultChecked={setting.enabled} 
                className="mt-0.5 h-5 w-5 rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted ${setting.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium text-foreground">{setting.name}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{setting.description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Default Subscriptions Section */}
      <div className="space-y-5">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">Ticket Default Subscriptions</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Select which companies&apos; tickets you want to be subscribed to automatically. 
            This can be overridden per ticket using the subscribers section.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 space-y-5">
          {/* Your Company */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Company</span>
            <label className="flex items-center gap-3 cursor-pointer group">
              <Checkbox 
                defaultChecked 
                className="h-5 w-5 rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">Example Agency</span>
            </label>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Inherited Companies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Inherited Companies</span>
              <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                Select / Unselect All
              </button>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group pl-1">
              <Checkbox 
                defaultChecked 
                className="h-5 w-5 rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">Example Company</span>
            </label>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          You will always be subscribed to tickets you have raised, regardless of selections above.
        </p>
      </div>

      {/* Form Action */}
      <div className="flex justify-end pt-2">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
