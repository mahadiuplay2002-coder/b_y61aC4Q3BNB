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

  const tabTriggerClass = "flex items-center gap-2 text-sm py-2.5 px-4 whitespace-nowrap rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/50";

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Scrollable TabsList for better organization */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
          <TabsList className="inline-flex w-max bg-card border border-border rounded-lg p-1.5 gap-1">
            <TabsTrigger value="general" className={tabTriggerClass}>
              <Server size={16} className="shrink-0" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="pods" className={tabTriggerClass}>
              <Boxes size={16} className="shrink-0" />
              <span>Pods</span>
            </TabsTrigger>
            <TabsTrigger value="nodes" className={tabTriggerClass}>
              <HardDrive size={16} className="shrink-0" />
              <span>Nodes</span>
            </TabsTrigger>
            <TabsTrigger value="deployments" className={tabTriggerClass}>
              <GitBranch size={16} className="shrink-0" />
              <span>Deploys</span>
            </TabsTrigger>
            <TabsTrigger value="pipelines" className={tabTriggerClass}>
              <Radio size={16} className="shrink-0" />
              <span>Pipelines</span>
            </TabsTrigger>
            <TabsTrigger value="emails" className={tabTriggerClass}>
              <Mail size={16} className="shrink-0" />
              <span>Emails</span>
            </TabsTrigger>
            <TabsTrigger value="cache-warmer" className={tabTriggerClass}>
              <Zap size={16} className="shrink-0" />
              <span>Cache</span>
            </TabsTrigger>
            <TabsTrigger value="actions" className={tabTriggerClass}>
              <MoreHorizontal size={16} className="shrink-0" />
              <span>Actions</span>
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className={tabTriggerClass}>
              <BarChart3 size={16} className="shrink-0" />
              <span>Diagnostics</span>
            </TabsTrigger>
            <TabsTrigger value="autoscaler" className={tabTriggerClass}>
              <Activity size={16} className="shrink-0" />
              <span>Autoscaler</span>
            </TabsTrigger>
            <TabsTrigger value="monitors" className={tabTriggerClass}>
              <BarChart3 size={16} className="shrink-0" />
              <span>Monitors</span>
            </TabsTrigger>
            <TabsTrigger value="quick-actions" className={tabTriggerClass}>
              <Rocket size={16} className="shrink-0" />
              <span>Quick Acts</span>
            </TabsTrigger>
            <TabsTrigger value="firewall" className={tabTriggerClass}>
              <Shield size={16} className="shrink-0" />
              <span>Firewall</span>
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Fade indicators for scroll */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none rounded-r-lg" />
      </div>

      {/* Fixed min-height container to prevent content shift */}
      <div className="mt-6 min-h-[400px]">
        <TabsContent value="general" className="mt-0">
          <GeneralTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="pods" className="mt-0">
          <PodsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="nodes" className="mt-0">
          <NodesTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="deployments" className="mt-0">
          <DeploymentsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="pipelines" className="mt-0">
          <PipelinesTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="emails" className="mt-0">
          <EmailsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="cache-warmer" className="mt-0">
          <CacheWarmerTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="actions" className="mt-0">
          <ActionsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="diagnostics" className="mt-0">
          <DiagnosticsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="autoscaler" className="mt-0">
          <AutoscalerTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="monitors" className="mt-0">
          <MonitorsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="quick-actions" className="mt-0">
          <QuickActionsTab environmentId={environmentId} />
        </TabsContent>

        <TabsContent value="firewall" className="mt-0">
          <FirewallTab environmentId={environmentId} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
