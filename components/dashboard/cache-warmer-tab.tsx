'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface CacheWarmerTabProps {
  environmentId: string;
}

export function CacheWarmerTab({ environmentId }: CacheWarmerTabProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [sitemapMode, setSitemapMode] = useState<'auto' | 'manual'>('auto');
  const [startTime, setStartTime] = useState('01:00');
  const [endTime, setEndTime] = useState('6:00');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Status</h3>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Cache Warmer Status</p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={isEnabled ? 'text-status-success' : 'text-destructive'}>
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Sitemaps</h3>
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border">
            <span className="text-xs font-medium text-foreground">Auto Generated</span>
            <span className="ml-auto text-xs text-muted-foreground">Enable manual mode</span>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Unable to find a suitable sitemap in robots.txt file. Please switch to manual mode and enter your sitemap URL to activate the cache warmer
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Cache Warming Schedule</h3>
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">Between</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <label className="text-sm font-medium text-foreground">and</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button size="sm" className="ml-auto">
              Run now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
