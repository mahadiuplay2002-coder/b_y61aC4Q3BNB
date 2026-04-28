'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TicketHeader } from '@/components/dashboard/ticket-header';
import { CommentsTab } from '@/components/dashboard/comments-tab';
import { HistoryTab } from '@/components/dashboard/history-tab';
import { TicketDetailsSidebar } from '@/components/dashboard/ticket-details-sidebar';
import { MessageCircle, History } from 'lucide-react';

interface TicketDetailsPageProps {
  params: {
    id: string;
  };
}

// Mock ticket data
const ticketData = {
  id: 'TKT-1024',
  title: 'Database Connection Error in Production',
  status: 'pending' as const,
  priority: 'high' as const,
  createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  assignee: 'Alex Johnson',
  description: 'Our production database is experiencing connection timeouts. The error message shows "Connection refused on port 5432".',
  requesterName: 'Jimmy Fallon',
  requesterEmail: 'jimmy@example.com',
  company: 'Example Corporation',
  agency: 'Tech Solutions Inc',
  website: 'https://www.example.com',
  department: 'Support',
  tags: ['Production', 'Database', 'Urgent'],
};

export default function TicketDetailsPage({ params }: TicketDetailsPageProps) {
  const [activeTab, setActiveTab] = useState('comments');

  const handleAddComment = async (content: string, isInternal: boolean) => {
    // Simulate API call
    console.log('[v0] Adding comment:', { content, isInternal });
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <TicketHeader
        ticketId={ticketData.id}
        title={ticketData.title}
        status={ticketData.status}
        priority={ticketData.priority}
        createdAt={ticketData.createdAt}
        updatedAt={ticketData.updatedAt}
        assignee={ticketData.assignee}
      />

      {/* Main content with sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - left side */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-background/50 border border-border">
              <TabsTrigger value="comments" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Comments
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Comments Tab */}
            <TabsContent value="comments" className="mt-6">
              <CommentsTab onAddComment={handleAddComment} />
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-6">
              <HistoryTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar - Details */}
        <div className="lg:col-span-1">
          <TicketDetailsSidebar ticketData={ticketData} />
        </div>
      </div>
    </div>
  );
}
