'use client';

import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TicketSearch } from '@/components/dashboard/ticket-search';
import { TicketFilters, type TicketStatus, type TicketPriority } from '@/components/dashboard/ticket-filters';
import { SupportTicketsTable, type SupportTicket } from '@/components/dashboard/support-tickets-table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = 2; // This would be dynamic in a real app

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
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Support Tickets</h1>
          <p className="text-sm text-muted-foreground">Manage and track customer support requests.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-fit">
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border p-5 bg-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Open</span>
              <span className="text-2xl font-bold text-foreground">{ticketCounts.open}</span>
            </div>
          </div>
        </Card>
        <Card className="border-border p-5 bg-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pending</span>
              <span className="text-2xl font-bold text-foreground">{ticketCounts.pending}</span>
            </div>
          </div>
        </Card>
        <Card className="border-border p-5 bg-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Closed</span>
              <span className="text-2xl font-bold text-foreground">{ticketCounts.closed}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Collapsible Filter Bar */}
      <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
        <Card className="border-border bg-card overflow-hidden">
          {/* Filter Header - Always Visible */}
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {activeFilterCount} active
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7 text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Clear filters logic here
                    }}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                )}
                {filtersOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>
          </CollapsibleTrigger>

          {/* Expandable Filter Content */}
          <CollapsibleContent>
            <div className="border-t border-border p-4 bg-muted/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Priority</label>
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9 border-border">
                    All priorities
                    <ChevronDown className="h-3 w-3 ml-2" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Department</label>
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9 border-border">
                    All departments
                    <ChevronDown className="h-3 w-3 ml-2" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Status</label>
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9 border-border bg-primary/5 border-primary/30 text-foreground">
                    Open, Pending
                    <ChevronDown className="h-3 w-3 ml-2" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Company</label>
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9 border-border bg-primary/5 border-primary/30 text-foreground">
                    Test Company
                    <ChevronDown className="h-3 w-3 ml-2" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Requester</label>
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9 border-border">
                    All requesters
                    <ChevronDown className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TicketSearch value={searchQuery} onChange={setSearchQuery} />
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
