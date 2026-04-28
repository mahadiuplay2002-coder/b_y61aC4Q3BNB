'use client';

import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface TicketData {
  id: string;
  requesterName: string;
  requesterEmail: string;
  company: string;
  agency: string;
  website: string;
  department: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'emergency';
  assignee?: string;
}

interface TicketDetailsSidebarProps {
  ticketData: TicketData;
}

export function TicketDetailsSidebar({ ticketData }: TicketDetailsSidebarProps) {
  const priorityColors = {
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    emergency: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="space-y-4 sticky top-20">
      {/* Requester Information */}
      <Card className="border-border bg-card p-5 shadow-card">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Requester</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                {ticketData.requesterName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{ticketData.requesterName}</p>
                <p className="text-xs text-muted-foreground truncate">{ticketData.requesterEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Company Information */}
      <Card className="border-border bg-card p-5 shadow-card">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Company Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Company</p>
              <p className="text-foreground">{ticketData.company}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Agency</p>
              <p className="text-foreground">{ticketData.agency}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Website</p>
              <Link
                href={ticketData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1 text-sm"
              >
                {new URL(ticketData.website).hostname}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Department */}
      <Card className="border-border bg-card p-5 shadow-card">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department</h3>
          <p className="text-sm font-medium text-foreground">{ticketData.department}</p>
        </div>
      </Card>

      {/* Priority */}
      <Card className="border-border bg-card p-5 shadow-card">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[ticketData.priority]}`}>
            {ticketData.priority.charAt(0).toUpperCase() + ticketData.priority.slice(1)}
          </span>
        </div>
      </Card>

      {/* Assignee */}
      {ticketData.assignee && (
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Assignee</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                {ticketData.assignee.charAt(0)}
              </div>
              <p className="text-sm font-medium text-foreground">{ticketData.assignee}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tags */}
      {ticketData.tags && ticketData.tags.length > 0 && (
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {ticketData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
