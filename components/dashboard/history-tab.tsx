'use client';

import { CheckCircle, AlertCircle, Clock, User, Edit, Archive } from 'lucide-react';

interface HistoryEvent {
  id: string;
  type: 'status_change' | 'priority_change' | 'assignment' | 'comment' | 'created';
  actor: string;
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

interface HistoryTabProps {
  events?: HistoryEvent[];
}

const defaultEvents: HistoryEvent[] = [
  {
    id: '1',
    type: 'created',
    actor: 'Jimmy Fallon',
    action: 'created this ticket',
    description: 'Ticket TKT-1024 was created',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    metadata: { subject: 'Database Connection Error' },
  },
  {
    id: '2',
    type: 'priority_change',
    actor: 'Alex Johnson',
    action: 'changed priority',
    description: 'Priority changed from Low to High',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    metadata: { from: 'Low', to: 'High' },
  },
  {
    id: '3',
    type: 'assignment',
    actor: 'System',
    action: 'assigned ticket',
    description: 'Ticket assigned to Alex Johnson',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    metadata: { assignee: 'Alex Johnson' },
  },
  {
    id: '4',
    type: 'comment',
    actor: 'Alex Johnson',
    action: 'added a comment',
    description: 'Support team replied to the ticket',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'status_change',
    actor: 'System',
    action: 'changed status',
    description: 'Status changed from Open to In Progress',
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    metadata: { from: 'Open', to: 'In Progress' },
  },
  {
    id: '6',
    type: 'comment',
    actor: 'Jimmy Fallon',
    action: 'added a comment',
    description: 'Customer replied with additional information',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    type: 'status_change',
    actor: 'Alex Johnson',
    action: 'changed status',
    description: 'Status changed from In Progress to Pending',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    metadata: { from: 'In Progress', to: 'Pending' },
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'status_change':
      return <AlertCircle className="w-5 h-5 text-blue-400" />;
    case 'priority_change':
      return <AlertCircle className="w-5 h-5 text-orange-400" />;
    case 'assignment':
      return <User className="w-5 h-5 text-purple-400" />;
    case 'comment':
      return <Edit className="w-5 h-5 text-green-400" />;
    case 'created':
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    default:
      return <Clock className="w-5 h-5 text-muted-foreground" />;
  }
};

const getEventColor = (type: string): string => {
  switch (type) {
    case 'status_change':
      return 'bg-blue-500/10 border-blue-500/20';
    case 'priority_change':
      return 'bg-orange-500/10 border-orange-500/20';
    case 'assignment':
      return 'bg-purple-500/10 border-purple-500/20';
    case 'comment':
      return 'bg-green-500/10 border-green-500/20';
    case 'created':
      return 'bg-green-500/10 border-green-500/20';
    default:
      return 'bg-background border-border';
  }
};

const formatTime = (date: string) => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export function HistoryTab({ events = defaultEvents }: HistoryTabProps) {
  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2.5 top-10 bottom-0 w-px bg-border" />

        {/* Events */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No history yet.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div key={event.id} className="relative pl-12">
                {/* Event dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  {getEventIcon(event.type)}
                </div>

                {/* Event card */}
                <div className={`rounded-lg border p-4 ${getEventColor(event.type)}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{event.actor}</span>
                        <span className="text-sm text-muted-foreground">{event.action}</span>
                      </div>

                      <p className="text-sm text-foreground mb-2">{event.description}</p>

                      {/* Metadata badges */}
                      {event.metadata && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {event.metadata.from && event.metadata.to && (
                            <div className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1">
                              <span className="line-through">{event.metadata.from}</span>
                              <span className="mx-1">→</span>
                              <span className="font-semibold">{event.metadata.to}</span>
                            </div>
                          )}
                          {event.metadata.assignee && (
                            <div className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1">
                              {event.metadata.assignee}
                            </div>
                          )}
                          {event.metadata.subject && (
                            <div className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1">
                              {event.metadata.subject}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTime(event.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
