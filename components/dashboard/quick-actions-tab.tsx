'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickAction {
  title: string;
  onClick: () => void;
}

interface QuickActionsTabProps {
  environmentId: string;
}

export function QuickActionsTab({ environmentId }: QuickActionsTabProps) {
  const actions: QuickAction[] = [
    {
      title: 'Restart Web Pods',
      onClick: () => console.log('Restart Web Pods')
    },
    {
      title: 'Restart Database Pods',
      onClick: () => console.log('Restart Database Pods')
    },
    {
      title: 'Restart Redis Pods',
      onClick: () => console.log('Restart Redis Pods')
    },
    {
      title: 'Restart RabbitMQ Pods',
      onClick: () => console.log('Restart RabbitMQ Pods')
    },
    {
      title: 'Restart Elastic Search Pods',
      onClick: () => console.log('Restart Elastic Search Pods')
    },
    {
      title: 'Restart Cli',
      onClick: () => console.log('Restart Cli')
    },
    {
      title: 'Restart Varnish',
      onClick: () => console.log('Restart Varnish')
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action, idx) => (
          <Card 
            key={idx} 
            className="p-5 flex flex-col justify-between border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200 bg-card/30"
          >
            <h3 className="text-sm font-medium text-foreground">{action.title}</h3>
            <Button
              size="sm"
              onClick={action.onClick}
              className="mt-4 w-fit bg-orange-500 hover:bg-orange-600 text-white rounded-md text-xs font-medium px-3 py-1.5 transition-colors"
            >
              Run
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
