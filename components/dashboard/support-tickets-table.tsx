'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { TicketStatus, TicketPriority } from './ticket-filters';

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  requester: string;
  description: string;
}

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
  selectedStatus: TicketStatus;
  selectedPriority: TicketPriority;
}

type SortField = 'id' | 'subject' | 'status' | 'priority' | 'lastUpdated';
type SortDirection = 'asc' | 'desc' | null;

const statusColors = {
  open: 'bg-primary/10 text-primary border-primary/20',
  pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  closed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const priorityColors = {
  low: 'bg-muted text-muted-foreground border-border',
  medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  critical: 'bg-destructive/10 text-destructive border-destructive/20',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function SupportTicketsTable({
  tickets,
  selectedStatus,
  selectedPriority,
}: SupportTicketsTableProps) {
  const [sortField, setSortField] = useState<SortField>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (selectedStatus && ticket.status !== selectedStatus) return false;
    if (selectedPriority && ticket.priority !== selectedPriority) return false;
    return true;
  });

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField('lastUpdated');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  Ticket ID
                  <SortIcon field="id" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  Subject
                  <SortIcon field="subject" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  Priority
                  <SortIcon field="priority" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('lastUpdated')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  Last Updated
                  <SortIcon field="lastUpdated" />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Clock className="h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">No tickets found</p>
                    <p className="text-xs text-muted-foreground/60">Try adjusting your filters or search terms</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-primary">
                        {ticket.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/support-tickets/${ticket.id}`}>
                      <div className="flex flex-col gap-1 hover:opacity-80 transition-opacity">
                        <p className="font-medium text-sm text-primary hover:underline">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">{ticket.requester}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                        statusColors[ticket.status]
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                        priorityColors[ticket.priority]
                      }`}
                    >
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{formatDate(ticket.lastUpdated)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-card"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/support-tickets/${ticket.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/support-tickets/${ticket.id}?tab=comments`}>
                            Add Reply
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Change Priority</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Close Ticket</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with statistics */}
      <div className="border-t border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{sortedTickets.length}</span> of{' '}
          <span className="font-medium text-foreground">{tickets.length}</span> tickets
        </span>
      </div>
    </Card>
  );
}
