'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Server, GitBranch, Radio, HardDrive, Boxes, Shield, Mail, Zap, Rocket, BarChart3, Bell, Activity, MoreHorizontal, Wrench } from 'lucide-react';
import { DeploymentsTab } from './deployments-tab';
import { PipelinesTab } from './pipelines-tab';
import { NodesTab } from './nodes-tab';
import { PodsTab } from './pods-tab';
import { FirewallTab } from './firewall-tab';
import { GeneralTab } from './general-tab';
import { EmailsTab } from './emails-tab';
import { CacheWarmerTab } from './cache-warmer-tab';
import { ActionsTab } from './actions-tab';
import { DiagnosticsTab } from './diagnostics-tab';
import { AutoscalerTab } from './autoscaler-tab';
import { MonitorsTab } from './monitors-tab';
import { QuickActionsTab } from './quick-actions-tab';

interface EnvironmentTabsProps {
  environmentId: string;
  environmentName: string;
}

export function EnvironmentTabs({ environmentId, environmentName }: EnvironmentTabsProps) {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full grid grid-cols-4 lg:grid-cols-7 xl:grid-cols-auto-fit bg-card border border-border rounded-lg p-1 h-auto gap-1">
        <TabsTrigger value="general" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Server size={16} />
          <span className="hidden lg:inline">General</span>
        </TabsTrigger>
        <TabsTrigger value="pods" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Boxes size={16} />
          <span className="hidden lg:inline">Pods</span>
        </TabsTrigger>
        <TabsTrigger value="nodes" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <HardDrive size={16} />
          <span className="hidden lg:inline">Nodes</span>
        </TabsTrigger>
        <TabsTrigger value="deployments" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <GitBranch size={16} />
          <span className="hidden lg:inline">Deploys</span>
        </TabsTrigger>
        <TabsTrigger value="pipelines" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Radio size={16} />
          <span className="hidden lg:inline">Pipelines</span>
        </TabsTrigger>
        <TabsTrigger value="emails" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Mail size={16} />
          <span className="hidden lg:inline">Emails</span>
        </TabsTrigger>
        <TabsTrigger value="cache-warmer" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Zap size={16} />
          <span className="hidden lg:inline">Cache Warmer</span>
        </TabsTrigger>
        <TabsTrigger value="actions" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <MoreHorizontal size={16} />
          <span className="hidden lg:inline">Actions</span>
        </TabsTrigger>
        <TabsTrigger value="diagnostics" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <BarChart3 size={16} />
          <span className="hidden lg:inline">Diagnostics</span>
        </TabsTrigger>
        <TabsTrigger value="autoscaler" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Activity size={16} />
          <span className="hidden lg:inline">Autoscaler</span>
        </TabsTrigger>
        <TabsTrigger value="monitors" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <BarChart3 size={16} />
          <span className="hidden lg:inline">Monitors</span>
        </TabsTrigger>
        <TabsTrigger value="quick-actions" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Rocket size={16} />
          <span className="hidden lg:inline">Quick Acts</span>
        </TabsTrigger>
        <TabsTrigger value="firewall" className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
          <Shield size={16} />
          <span className="hidden lg:inline">Firewall</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-6">
        <GeneralTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="pods" className="mt-6">
        <PodsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="nodes" className="mt-6">
        <NodesTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="deployments" className="mt-6">
        <DeploymentsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="pipelines" className="mt-6">
        <PipelinesTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="emails" className="mt-6">
        <EmailsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="cache-warmer" className="mt-6">
        <CacheWarmerTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="actions" className="mt-6">
        <ActionsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="diagnostics" className="mt-6">
        <DiagnosticsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="autoscaler" className="mt-6">
        <AutoscalerTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="monitors" className="mt-6">
        <MonitorsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="quick-actions" className="mt-6">
        <QuickActionsTab environmentId={environmentId} />
      </TabsContent>

      <TabsContent value="firewall" className="mt-6">
        <FirewallTab environmentId={environmentId} />
      </TabsContent>
    </Tabs>
  );
}
