'use client';

import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { ServerCard } from '@/components/dashboard/server-card';
import { cn } from '@/lib/utils';

export default function ServersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'running' | 'failed' | 'offline'>('all');

  // Sample server data
  const servers = [
    {
      id: '1',
      name: 'web-server-01',
      ip: '192.168.1.10',
      region: 'US East (N. Virginia)',
      status: 'running' as const,
      cpu: 35,
      memory: 72,
      uptime: 127
    },
    {
      id: '2',
      name: 'web-server-02',
      ip: '192.168.1.11',
      region: 'US East (N. Virginia)',
      status: 'running' as const,
      cpu: 48,
      memory: 58,
      uptime: 45
    },
    {
      id: '3',
      name: 'api-server-01',
      ip: '192.168.1.20',
      region: 'EU West (Ireland)',
      status: 'running' as const,
      cpu: 62,
      memory: 89,
      uptime: 87
    },
    {
      id: '4',
      name: 'cache-server-01',
      ip: '192.168.1.30',
      region: 'US West (Oregon)',
      status: 'offline' as const,
      cpu: 0,
      memory: 0,
      uptime: 0
    },
    {
      id: '5',
      name: 'db-server-01',
      ip: '192.168.1.40',
      region: 'EU West (Ireland)',
      status: 'running' as const,
      cpu: 71,
      memory: 93,
      uptime: 256
    },
    {
      id: '6',
      name: 'backup-server-01',
      ip: '192.168.1.50',
      region: 'US East (N. Virginia)',
      status: 'failed' as const,
      cpu: 15,
      memory: 42,
      uptime: 3
    },
    {
      id: '7',
      name: 'monitor-01',
      ip: '192.168.1.60',
      region: 'US Central (Iowa)',
      status: 'running' as const,
      cpu: 22,
      memory: 31,
      uptime: 342
    },
    {
      id: '8',
      name: 'cdn-edge-01',
      ip: '192.168.1.70',
      region: 'APAC (Singapore)',
      status: 'running' as const,
      cpu: 45,
      memory: 65,
      uptime: 156
    },
  ];

  // Filter and search servers
  const filteredServers = servers.filter(server => {
    const matchesSearch = 
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.ip.includes(searchQuery) ||
      server.region.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || server.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Servers</h1>
          <p className="text-muted-foreground">Manage and monitor your cloud servers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:shadow-card">
          <Plus size={20} />
          Create Server
        </button>
      </div>

      {/* Search and filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search box */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search by name, IP, or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all'
              )}
            />
          </div>
        </div>

        {/* Status filter */}
        <div className="flex gap-2">
          {['all', 'running', 'failed', 'offline'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Servers count */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filteredServers.length}</span> server{filteredServers.length !== 1 ? 's' : ''}
      </div>

      {/* Servers grid */}
      {filteredServers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredServers.map((server) => (
            <ServerCard
              key={server.id}
              name={server.name}
              ip={server.ip}
              region={server.region}
              status={server.status}
              cpu={server.cpu}
              memory={server.memory}
              uptime={server.uptime}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-card border border-border p-12 text-center">
          <p className="text-muted-foreground">No servers found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="mt-4 px-4 py-2 text-primary hover:underline text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
