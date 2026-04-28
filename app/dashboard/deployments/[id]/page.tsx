'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeploymentDetailsTab } from '@/components/dashboard/deployments/tabs/deployment-details-tab';
import { DeploymentTasksTab } from '@/components/dashboard/deployments/tabs/deployment-tasks-tab';
import { PipelineConfigTab } from '@/components/dashboard/deployments/tabs/pipeline-config-tab';
import { Card } from '@/components/ui/card';

export default function DeploymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [activeTab, setActiveTab] = useState<'details' | 'tasks' | 'pipeline'>('details');

  const tabs = [
    { id: 'details', label: 'Deployment Details' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'pipeline', label: 'Pipeline Configuration' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/deployments">
          <Button variant="ghost" size="sm" className="gap-2 -ml-2 mb-4 text-muted-foreground hover:text-foreground">
            <ChevronLeft size={16} />
            Back to Deployments
          </Button>
        </Link>
        <h1 className="text-3xl font-semibold text-foreground">Deployment Details</h1>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'details' | 'tasks' | 'pipeline')}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              } ${
                activeTab === tab.id
                  ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                  : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Card */}
      <Card className="shadow-card border border-border p-8">
        {activeTab === 'details' && <DeploymentDetailsTab deploymentId={unwrappedParams.id} />}
        {activeTab === 'tasks' && <DeploymentTasksTab deploymentId={unwrappedParams.id} />}
        {activeTab === 'pipeline' && <PipelineConfigTab deploymentId={unwrappedParams.id} />}
      </Card>
    </div>
  );
}
