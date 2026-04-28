'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection } from '@/components/dashboard/profile-section';
import { SecuritySettings } from '@/components/dashboard/security-settings';
import { APITokensTab } from '@/components/dashboard/api-tokens-tab';
import { SSHKeysTab } from '@/components/dashboard/ssh-keys-tab';
import { FirewallIPsTab } from '@/components/dashboard/firewall-ips-tab';
import { TwoFactorTab } from '@/components/dashboard/two-factor-tab';
import { NotificationsTab } from '@/components/dashboard/notifications-tab';
import { Key, Lock, ShieldAlert, Smartphone, Bell } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function AccountSettingsContent() {
  const searchParams = useSearchParams();
  const initTab = searchParams.get('tab') || 'api-tokens';
  const [activeTab, setActiveTab] = useState(initTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="space-y-10 lg:space-y-12">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Account & Security</h1>
        <p className="text-lg text-muted-foreground">
          Manage your profile, authentication methods, and security settings
        </p>
      </div>

      {/* Profile & Security Section - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile & Security Settings */}
        <div className="lg:col-span-1 space-y-8">
          <ProfileSection />
          <SecuritySettings />
        </div>

        {/* Right Column - Security Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 p-2 bg-card shadow-card rounded-lg border border-border h-auto">
              <TabsTrigger
                value="api-tokens"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Key className="h-4 w-4" />
                <span className="hidden sm:inline">API Tokens</span>
              </TabsTrigger>
              <TabsTrigger
                value="ssh-keys"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">SSH Keys</span>
              </TabsTrigger>
              <TabsTrigger
                value="firewall"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ShieldAlert className="h-4 w-4" />
                <span className="hidden sm:inline">Firewall</span>
              </TabsTrigger>
              <TabsTrigger
                value="2fa"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">2FA</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="mt-6">
              <TabsContent value="api-tokens" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <APITokensTab />
                </div>
              </TabsContent>

              <TabsContent value="ssh-keys" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <SSHKeysTab />
                </div>
              </TabsContent>

              <TabsContent value="firewall" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <FirewallIPsTab />
                </div>
              </TabsContent>

              <TabsContent value="2fa" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <TwoFactorTab />
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <NotificationsTab environmentId="" />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading account settings...</div>}>
      <AccountSettingsContent />
    </Suspense>
  );
}
