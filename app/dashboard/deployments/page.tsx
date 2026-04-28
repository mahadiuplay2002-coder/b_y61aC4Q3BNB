'use client';

import { DeploymentsListTable } from '@/components/dashboard/deployments/deployments-list-table';

export default function DeploymentsPage() {
  return (
    <div className="space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Deployments</h1>
        <p className="text-lg text-muted-foreground">View and manage your application deployments</p>
      </div>

      {/* Deployments Listing */}
      <DeploymentsListTable />
    </div>
  );
}
