'use client';

import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TicketSearch } from '@/components/dashboard/ticket-search';
import { TicketFilters, type TicketStatus, type TicketPriority } from '@/components/dashboard/ticket-filters';
import { SupportTicketsTable, type SupportTicket } from '@/components/dashboard/support-tickets-table';

// Mock data for demonstration
const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot deploy application',
    status: 'open',
    priority: 'critical',
    lastUpdated: new Date(Date.now() - 2 * 60000).toISOString(),
    requester: 'john.smith@company.com',
    description: 'Getting error when trying to deploy to production',
  },
  {
    id: 'TKT-002',
    subject: 'Need API documentation',
    status: 'pending',
    priority: 'medium',
    lastUpdated: new Date(Date.now() - 15 * 60000).toISOString(),
    requester: 'alice.johnson@company.com',
    description: 'Please provide updated API documentation for v2',
  },
  {
    id: 'TKT-003',
    subject: 'Domain SSL certificate expired',
    status: 'open',
    priority: 'high',
    lastUpdated: new Date(Date.now() - 45 * 60000).toISOString(),
    requester: 'bob.wilson@company.com',
    description: 'SSL certificate needs to be renewed',
  },
  {
    id: 'TKT-004',
    subject: 'Feature request: Dark mode',
    status: 'closed',
    priority: 'low',
    lastUpdated: new Date(Date.now() - 2 * 86400000).toISOString(),
    requester: 'carol.white@company.com',
    description: 'Would love to see dark mode support',
  },
  {
    id: 'TKT-005',
    subject: 'Database connection timeout',
    status: 'open',
    priority: 'high',
    lastUpdated: new Date(Date.now() - 30 * 60000).toISOString(),
    requester: 'david.brown@company.com',
    description: 'Getting connection timeouts on database queries',
  },
  {
    id: 'TKT-006',
    subject: 'Update billing address',
    status: 'pending',
    priority: 'low',
    lastUpdated: new Date(Date.now() - 3 * 60000).toISOString(),
    requester: 'emma.davis@company.com',
    description: 'Need to update company billing address',
  },
  {
    id: 'TKT-007',
    subject: 'Integration with Stripe failing',
    status: 'open',
    priority: 'critical',
    lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(),
    requester: 'frank.martin@company.com',
    description: 'Payment processing failing intermittently',
  },
  {
    id: 'TKT-008',
    subject: 'Bulk user import not working',
    status: 'closed',
    priority: 'medium',
    lastUpdated: new Date(Date.now() - 5 * 86400000).toISOString(),
    requester: 'grace.taylor@company.com',
    description: 'CSV import feature throwing errors',
  },
  {
    id: 'TKT-009',
    subject: 'Request for custom domain support',
    status: 'pending',
    priority: 'medium',
    lastUpdated: new Date(Date.now() - 60000).toISOString(),
    requester: 'henry.anderson@company.com',
    description: 'Need support for custom domain configuration',
  },
  {
    id: 'TKT-010',
    subject: 'Performance optimization needed',
    status: 'open',
    priority: 'medium',
    lastUpdated: new Date(Date.now() - 20 * 60000).toISOString(),
    requester: 'iris.thomas@company.com',
    description: 'Dashboard loading slowly with large datasets',
  },
  {
    id: 'TKT-011',
    subject: 'Two-factor authentication not working',
    status: 'closed',
    priority: 'high',
    lastUpdated: new Date(Date.now() - 1 * 86400000).toISOString(),
    requester: 'jack.moore@company.com',
    description: 'TOTP codes not being accepted',
  },
  {
    id: 'TKT-012',
    subject: 'Email notifications broken',
    status: 'open',
    priority: 'high',
    lastUpdated: new Date(Date.now() - 90 * 60000).toISOString(),
    requester: 'kate.jackson@company.com',
    description: 'Not receiving alert emails from the system',
  },
];

export default function SupportTicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(null);
  const [selectedPriority, setSelectedPriority] = useState<TicketPriority>(null);

  // Filter tickets by search query
  const searchedTickets = mockTickets.filter((ticket) => {
    const query = searchQuery.toLowerCase();
    return (
      ticket.id.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query)
    );
  });

  // Calculate ticket counts by status
  const ticketCounts = {
    open: mockTickets.filter((t) => t.status === 'open').length,
    closed: mockTickets.filter((t) => t.status === 'closed').length,
    pending: mockTickets.filter((t) => t.status === 'pending').length,
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {/* Page Header - Jira Style */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Support Tickets</h1>
        <Button className="gap-2 bg-accent hover:bg-accent/90 text-white font-medium">
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Filter Bar - Jira Style */}
      <Card className="border-border p-6 bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Priority</span>
            <Button variant="outline" size="sm" className="text-xs h-7">Select option</Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Department</span>
            <Button variant="outline" size="sm" className="text-xs h-7">Select option</Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Status</span>
            <div className="flex gap-1 flex-wrap">
              {['Pending', 'WaitingOnCustomer', 'Resolved', 'Closed'].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  className="text-xs h-7 bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30 border border-emerald-500/30"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Company</span>
            <Button
              size="sm"
              className="text-xs h-7 bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30 border border-emerald-500/30"
            >
              Test company
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Agency</span>
            <Button variant="outline" size="sm" className="text-xs h-7">Select option</Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Requester</span>
            <Button variant="outline" size="sm" className="text-xs h-7">Select option</Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Tags</span>
            <Button variant="outline" size="sm" className="text-xs h-7">Select option</Button>
          </div>
        </div>
      </Card>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TicketSearch value={searchQuery} onChange={setSearchQuery} />
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Display:</span>
          <Button variant="outline" size="sm" className="text-sm h-9 bg-primary text-primary-foreground border-primary hover:bg-primary/90">
            2 <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border p-6 bg-card shadow-card">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">Total Open</span>
            <span className="text-3xl font-bold text-primary">{ticketCounts.open}</span>
          </div>
        </Card>
        <Card className="border-border p-6 bg-card shadow-card">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">Pending</span>
            <span className="text-3xl font-bold text-status-warning">{ticketCounts.pending}</span>
          </div>
        </Card>
        <Card className="border-border p-6 bg-card shadow-card">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">Closed</span>
            <span className="text-3xl font-bold text-status-success">{ticketCounts.closed}</span>
          </div>
        </Card>
      </div>

      {/* Tickets Table */}
      <SupportTicketsTable
        tickets={searchedTickets}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority}
      />
    </div>
  );
}
