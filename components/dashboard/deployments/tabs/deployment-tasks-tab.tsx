'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, Loader2, ChevronDown, ChevronUp, Rocket, List, Settings, Cloud, Package, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../../status-badge';

interface DeploymentTasksTabProps {
  deploymentId: string;
}

interface TaskLog {
  text: string;
  timestamp: string;
  type: 'success' | 'error' | 'info' | 'command';
}

interface Task {
  id: string;
  name: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  duration: string;
  timestamp: string;
  logs: TaskLog[];
}

// Mock task data
const mockTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Preparing release directory',
    status: 'completed',
    duration: '32s',
    timestamp: '2024-03-17 16:08:44',
    logs: [
      { text: 'Copying previous release into app/releases/20220802063511', timestamp: '', type: 'info' },
    ],
  },
  {
    id: 'task-2',
    name: 'Transferring changed files',
    status: 'running',
    duration: '1m 15s',
    timestamp: '2024-03-17 16:09:16',
    logs: [
      { text: 'Uploading app/design/frontend/Adam/Luma_Child/web/scss/styles.scss', timestamp: '', type: 'info' },
      { text: 'Uploading app/design/frontend/Adam/Luma_Child/yarn.lock', timestamp: '', type: 'info' },
      { text: 'Uploading app/etc/config.php', timestamp: '', type: 'info' },
      { text: 'Uploading composer.json', timestamp: '', type: 'info' },
      { text: 'Uploading composer.lock', timestamp: '', type: 'info' },
    ],
  },
  {
    id: 'task-3',
    name: 'Linking files from shared path to release',
    status: 'completed',
    duration: '28s',
    timestamp: '2024-03-17 16:10:31',
    logs: [
      { text: 'Symlinking var/report to app/releases/20220802063511/var/report', timestamp: '', type: 'info' },
      { text: 'Symlinking app/etc/env.php to app/releases/20220802063511/app/etc/env.php', timestamp: '', type: 'info' },
      { text: 'Symlinking .bashrc to app/releases/20220802063511/.bashrc', timestamp: '', type: 'info' },
      { text: 'Symlinking .cache to app/releases/20220802063511/.cache', timestamp: '', type: 'info' },
      { text: 'Symlinking .config to app/releases/20220802063511/.config', timestamp: '', type: 'info' },
    ],
  },
  {
    id: 'task-4',
    name: 'Running SSH command Setup Upgrade --Keep',
    status: 'completed',
    duration: '42s',
    timestamp: '2024-03-17 16:10:59',
    logs: [
      { text: 'Executing Setup Upgrade --Keep [cd app/current php bin/magento setup:upgrade --keep-generated]', timestamp: '', type: 'info' },
      { text: 'Cache types config flushed successfully', timestamp: '', type: 'success' },
      { text: 'Cache cleared successfully', timestamp: '', type: 'success' },
      { text: 'Updating modules:', timestamp: '', type: 'info' },
      { text: 'Could not validate a connection to Elasticsearch. No alive nodes found in your cluster', timestamp: '', type: 'error' },
    ],
  },
];

export function DeploymentTasksTab({ deploymentId }: DeploymentTasksTabProps) {
  const [expandedTasks, setExpandedTasks] = useState<string[]>(['task-1']);
  const [autoScroll, setAutoScroll] = useState(true);

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const getTaskIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="text-[#10b981]" size={18} />;
      case 'running':
        return <div className="w-[18px] h-[18px] rounded-full border-2 border-[#3b82f6]" />;
      case 'failed':
        return <AlertCircle className="text-destructive" size={18} />;
      case 'pending':
        return <div className="w-[18px] h-[18px] rounded-full border-2 border-muted-foreground border-dashed" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Deployment Info Header */}
      <div className="bg-card rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusBadge status="success" label="SUCCEEDED" />
            <h3 className="font-medium text-sm text-card-foreground">
              Merge branch 'release/v2.22.0' (892dfb73cf960eb488840ee44ad935f8f51e292d)
            </h3>
            <span className="text-xs text-muted-foreground">· 13m 36s</span>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t text-sm">
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Website</div>
            <div className="font-medium">Sensory Direct</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Environment</div>
            <div className="font-medium">Production</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Pipeline</div>
            <div className="font-medium">Magento 2</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Artifact</div>
            <div className="font-medium text-muted-foreground truncate" title="33b1752d-2052-4e83-a77f-e4eb0e76c94b.gz">
              33b1752d-2052-4e83-a77f-e4eb0e76c...
            </div>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stepper */}
      <div className="relative pt-8 pb-12 flex items-start justify-between border-b border-[#ffffff10] mb-8 overflow-hidden px-8">
        <div className="absolute top-[64px] left-16 right-16 h-1 bg-[#ffffff10] -translate-y-1/2 z-0" />
        <div className="absolute top-[64px] left-16 h-1 bg-gradient-to-r from-[#10b981] to-[#3b82f6] -translate-y-1/2 z-0 w-[60%]" />

        <div className="flex flex-col items-center gap-3 relative z-10 bg-background/0 px-2 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-lg">
            <List size={28} />
          </div>
          <span className="text-sm font-medium text-[#e2e8f0]">Preparing</span>
        </div>

        <div className="flex flex-col items-center gap-3 relative z-10 bg-background/0 px-2 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-lg">
            <Settings size={28} />
          </div>
          <span className="text-sm font-medium text-[#e2e8f0]">Building</span>
        </div>

        <div className="flex flex-col items-center gap-3 relative z-10 bg-background/0 px-2 rounded-lg">
          <div className="w-[72px] h-[72px] rounded-full bg-[#3b82f6] border-4 border-[#1e293b] flex items-center justify-center text-white ring-[4px] ring-[#3b82f6]/30">
            <Cloud size={32} />
          </div>
          <span className="text-[15px] font-semibold text-white">Transferring</span>
        </div>

        <div className="flex flex-col items-center gap-3 relative z-10 bg-background/0 px-2 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#334155] flex items-center justify-center text-muted-foreground shadow-lg">
            <Package size={28} />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Finishing</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Task Summary */}
        <div className="col-span-1 hidden lg:block border-r border-[#ffffff10] pr-6">
          <div className="uppercase text-xs font-semibold text-muted-foreground tracking-wider mb-4 px-2">
            Tasks
          </div>
          <div className="space-y-0.5">
            {mockTasks.map((task) => (
              <button
                key={`summary-${task.id}`}
                onClick={() => {
                  if (!expandedTasks.includes(task.id)) {
                    setExpandedTasks([...expandedTasks, task.id]);
                  }
                }}
                className="w-full flex items-center justify-between px-2 py-2 text-sm hover:bg-white/5 rounded-md cursor-pointer transition-colors group text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 scale-90">
                    {getTaskIcon(task.status)}
                  </div>
                  <span className={cn("truncate font-medium transition-colors text-[13px]", {
                    "text-foreground": task.status === 'running' || task.status === 'completed',
                    "text-muted-foreground": task.status === 'pending',
                    "group-hover:text-foreground": true
                  })}>
                    {task.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground ml-3 flex-shrink-0">{task.duration}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Detailed Tasks */}
        <div className="col-span-1 lg:col-span-3">
          <div className="flex items-center justify-end uppercase text-xs font-semibold text-muted-foreground tracking-wider mb-4 px-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="auto-scroll" 
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="rounded border-muted-foreground bg-transparent"
              />
              <label htmlFor="auto-scroll" className="cursor-pointer normal-case text-sm">
                Auto-scroll
              </label>
            </div>
          </div>
          <div className="space-y-3">
          {mockTasks.map((task) => {
            const isExpanded = expandedTasks.includes(task.id);

          return (
            <div
              key={task.id}
              className={cn(
                "border rounded-md overflow-hidden transition-all bg-[#242b35]",
                {
                  "border-[#10b981]/50": task.status === 'completed',
                  "border-[#242b35]": task.status === 'pending',
                  "border-[#3b82f6]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]": task.status === 'running'
                }
              )}
            >
              {/* Task Header */}
              <button
                onClick={() => toggleTask(task.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getTaskIcon(task.status)}
                  <p className={cn("text-[15px] font-medium tracking-wide", {
                    "text-foreground": task.status === 'running' || task.status === 'completed',
                    "text-muted-foreground": task.status === 'pending'
                  })}>
                    {task.name}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground ml-4">
                  <span>{task.duration}</span>
                  <span className={cn("font-medium", {
                    "text-status-success": task.status === 'completed',
                    "text-status-running": task.status === 'running',
                    "text-destructive": task.status === 'failed'
                  })}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
              </button>

              {/* Task Logs - Expanded View */}
              {isExpanded && (
                <div className="border-t border-[#ffffff10] bg-[#1a1f26]">
                  
                  {/* Additional UI for running tasks (like file transfer) */}
                  {task.status === 'running' && (
                    <div className="px-4 py-3 flex items-center justify-between gap-6 border-b border-[#ffffff10]">
                      <div className="h-1.5 flex-grow bg-[#2d3340] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10b981] w-[80%]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-4 bg-muted/30 rounded-full relative cursor-pointer">
                          <div className="w-3 h-3 bg-muted-foreground rounded-full absolute top-[2px] left-[2px] transition-transform" />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Show file destinations?</span>
                      </div>
                    </div>
                  )}

                  <div className="px-4 py-4 space-y-2 font-mono text-[13px]">
                    {task.logs.map((log, idx) => (
                      <div key={idx} className="flex">
                        <span
                          className={cn('flex-1 break-all tracking-tight', {
                            'text-[#3b82f6]': log.type === 'success',
                            'bg-[#193b5a] text-[#bfdbfe] px-2 py-0.5 rounded': log.type === 'error',
                            'text-[#cbd5e1]': log.type === 'info',
                            'text-[#94a3b8]': log.type === 'command',
                          })}
                        >
                          {log.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
          </div>
        </div>
      </div>
    </div>
  );
}
