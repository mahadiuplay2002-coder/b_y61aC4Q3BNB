'use client';

import { useState } from 'react';
import { DataTable } from './data-table';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, ChevronDown, MoreHorizontal, AlertCircle, Repeat2, Trash2, Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Deployment {
  id: string;
  name: string;
  pipeline: string;
  tasks: number;
  status: 'success' | 'failed' | 'running' | 'pending' | 'offline';
  creator: string;
  createdAt: string;
  duration: string;
}

interface DeploymentsTabProps {
  environmentId: string;
}

const mockDeployments: Deployment[] = [
  {
    id: '1',
    name: 'add page titles and favicon (b2d10fde8f..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 26,
    status: 'success',
    creator: 'Jimmy Fallon',
    createdAt: '2025-05-30 12:10:35',
    duration: '1 minute, 20 seconds'
  },
  {
    id: '2',
    name: 'add recaptcha to form submissions (2360703ea1..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 26,
    status: 'success',
    creator: 'Admin User',
    createdAt: '2025-05-30 12:08:54',
    duration: '1 minute, 15 seconds'
  },
  {
    id: '3',
    name: 'update authentication logic (5854c30dae4a..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 26,
    status: 'failed',
    creator: 'Developer',
    createdAt: '2025-05-29 18:31:05',
    duration: '8 minutes'
  },
  {
    id: '4',
    name: 'fix database migration issue (3d86165276c..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 27,
    status: 'success',
    creator: 'Jimmy Fallon',
    createdAt: '2025-05-28 15:47:32',
    duration: '2m 30s, 15 seconds'
  }
];

const repositories = ['api-server', 'web-frontend', 'worker-service'];
const branches: Record<string, string[]> = {
  'api-server': ['main', 'develop', 'feature/auth'],
  'web-frontend': ['main', 'develop', 'feature/dashboard'],
  'worker-service': ['main', 'develop', 'feature/queue']
};
const pipelines: Record<string, string[]> = {
  main: ['build', 'test', 'deploy-staging', 'deploy-production'],
  develop: ['build', 'test', 'deploy-dev'],
  'feature/auth': ['build', 'test']
};
const commits: Record<string, string[]> = {
  build: ['abc1234', 'def5678', 'ghi9012'],
  test: ['abc1234', 'def5678'],
  'deploy-staging': ['abc1234'],
  'deploy-production': ['abc1234']
};

export function DeploymentsTab({ environmentId }: DeploymentsTabProps) {
  const [pipelineEnabled, setPipelineEnabled] = useState(true);
  const [sharedStorageEnabled, setSharedStorageEnabled] = useState(false);
  const [sharedVarFolderEnabled, setSharedVarFolderEnabled] = useState(false);
  const [usingSharedEnvEnabled, setUsingSharedEnvEnabled] = useState(false);
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [showForm, setShowForm] = useState(false);
  const [hasAccountConnected, setHasAccountConnected] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedPipeline, setSelectedPipeline] = useState<string>('');
  const [selectedCommit, setSelectedCommit] = useState<string>('');

  const getAvailableBranches = () => selectedRepo ? branches[selectedRepo] || [] : [];
  const getAvailablePipelines = () => selectedBranch ? pipelines[selectedBranch] || [] : [];
  const getAvailableCommits = () => selectedPipeline ? commits[selectedPipeline] || [] : [];

  const handleDeploy = () => {
    if (selectedRepo && selectedBranch && selectedPipeline && selectedCommit) {
      const newDeployment: Deployment = {
        id: String(deployments.length + 1),
        name: `${selectedRepo}-${selectedCommit.substring(0, 7)}`,
        pipeline: 'Laravel Deployment Pipeline',
        tasks: 26,
        status: 'pending',
        creator: 'Current User',
        createdAt: 'just now',
        duration: 'running'
      };
      setDeployments([newDeployment, ...deployments]);
      setSelectedRepo('');
      setSelectedBranch('');
      setSelectedPipeline('');
      setSelectedCommit('');
      setShowForm(false);
    }
  };

  const handleRetryDeployment = (id: string) => {
    setDeployments(deployments.map(d => 
      d.id === id ? { ...d, status: 'pending' as const } : d
    ));
  };

  const handleDeleteDeployment = (id: string) => {
    setDeployments(deployments.filter(d => d.id !== id));
  };

  const columns = [
    {
      header: 'Deployment Name',
      accessor: 'name' as const,
      sortable: true
    },
    {
      header: 'Deployment Pipeline',
      accessor: 'pipeline' as const,
      sortable: true
    },
    {
      header: 'Tasks',
      accessor: 'tasks' as const,
      sortable: true
    },
    {
      header: 'Status',
      accessor: 'status' as const,
      cell: (value: string) => <StatusBadge status={value as any} />
    },
    {
      header: 'Created',
      accessor: 'createdAt' as const,
      sortable: true
    },
    {
      header: 'Duration',
      accessor: 'duration' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Environment Info Section */}
      <div className="bg-card border-none space-y-6 pt-2 pb-6">
        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-bold text-[#2e5e7e]">Deployment Pipeline Status</span>
          <div className="flex items-center gap-3">
            <Switch 
              checked={pipelineEnabled} 
              onCheckedChange={setPipelineEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-[13px] font-bold",
              pipelineEnabled ? "text-emerald-500" : "text-muted-foreground"
            )}>
              {pipelineEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Deployment Source</span>
          <div className="relative max-w-7xl">
            <select className="w-full px-3 py-1.5 text-sm bg-white border border-[#2fa4c7] text-[#2e5e7e] rounded focus:outline-none focus:border-[#2fa4c7] appearance-none cursor-pointer">
              <option>GIT</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-start">
          <span className="text-[13px] font-medium text-[#2e5e7e] mt-2">Repositories</span>
          <div className="flex items-center gap-3 max-w-7xl flex-wrap group">
            <span className="text-[11px] font-bold text-[#ff7b00] uppercase mt-1">ROOT</span>
            
            {/* The inline form matching the image exactly */}
            <div className="flex items-center flex-wrap md:flex-nowrap gap-2 flex-1">
               {/* Pipeline Selector */}
              <div className="relative flex-1">
                <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-[#f0f8fa] border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer placeholder:text-[#5da2c3]" defaultValue="Laravel">
                  <option value="Laravel">Laravel</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
              </div>

              {/* Provider Selector */}
              <div className="relative flex-1">
                <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-[#f0f8fa] border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer placeholder:text-[#5da2c3]">
                  <option>Github (Samy) - (mohd.samy...)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
              </div>

              {/* Repository Selector */}
              <div className="relative flex-[1.5]">
                <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-white border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer">
                  <option>samy-test-repo/frontend</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2fa4c7] -mb-[2px]"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2fa4c7]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              {/* Branch Selector */}
              <div className="relative flex-1">
                <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-white border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer">
                  <option>main</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
              </div>

              {/* Path Input */}
              <div className="relative w-20">
                <input type="text" defaultValue="/" className="w-full px-3 py-1.5 text-[13px] font-medium bg-white border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none" />
              </div>

              {/* Delete Icon */}
              <button className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors flex-shrink-0 mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Git Deployment Type</span>
          <div className="relative max-w-7xl">
            <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-[#f0f8fa] border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer">
              <option>Automatic</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Deployment Pipeline Version</span>
          <div className="relative max-w-7xl">
            <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-[#f0f8fa] border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer">
              <option>Version 1</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Pipeline Shared Storage</span>
          <div className="flex items-center gap-3">
            <Switch 
              checked={sharedStorageEnabled} 
              onCheckedChange={setSharedStorageEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-[13px] font-bold",
              sharedStorageEnabled ? "text-emerald-500" : "text-muted-foreground"
            )}>
              {sharedStorageEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Shared Var Folder</span>
          <div className="flex items-center gap-3">
            <Switch 
              checked={sharedVarFolderEnabled} 
              onCheckedChange={setSharedVarFolderEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-[13px] font-bold",
              sharedVarFolderEnabled ? "text-emerald-500" : "text-muted-foreground"
            )}>
              {sharedVarFolderEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Using Shared Env</span>
          <div className="flex items-center gap-3">
            <Switch 
              checked={usingSharedEnvEnabled} 
              onCheckedChange={setUsingSharedEnvEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-[13px] font-bold",
              usingSharedEnvEnabled ? "text-emerald-500" : "text-muted-foreground"
            )}>
              {usingSharedEnvEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Slack Channel</span>
          <div className="flex items-center gap-3">
            <div className="relative w-96">
              <select className="w-full px-3 py-1.5 text-[13px] font-medium bg-[#f0f8fa] border border-[#2fa4c7] text-[#1f4a76] rounded focus:outline-none appearance-none cursor-pointer">
                <option>No_deployment</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#2e5e7e]" size={14} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-[13px] font-medium text-[#2e5e7e] hover:text-[#1f4a76] transition-colors">
              <div className="w-4 h-4 flex items-center justify-center rounded bg-[#ff7b00]">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              Use Default
            </label>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center pt-2">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Build Server IP</span>
          <span className="text-[13px] text-[#1f4a76]">Auto detected from cluster</span>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Deployments Method Configuration</span>
          <span className="text-[13px] text-[#1f4a76]">From Global Config (Global configuration is using Docker)</span>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Set keep tags from Global</span>
          <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-emerald-500 text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Step Component Configuration</span>
          <span className="text-[13px] text-[#1f4a76]">From Global Config (Global configuration is using Legacy)</span>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4 items-center">
          <span className="text-[13px] font-medium text-[#2e5e7e]">Base Image Repository Path Configuration</span>
          <span className="text-[13px] text-[#1f4a76]">From Global Config (europe-west2-docker.pkg.dev/on-billy/base)</span>
        </div>
      </div>

      <hr className="border-[#dcecf1] w-full mb-6" />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[28px] font-bold text-[#1f4a76]">Deployments</h2>
        </div>
      </div>

      {!hasAccountConnected && (
        <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <AlertCircle size={20} className="text-destructive flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Repository Account Not Connected</p>
            <p className="text-xs text-muted-foreground mt-1">Please connect your repository account before creating deployments</p>
          </div>
        </div>
      )}

      {showForm && hasAccountConnected && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-card space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Create Deployment Pipeline</h3>
          <p className="text-sm text-muted-foreground">Select repository details below. Each dropdown enables once the previous one is populated.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Pipeline Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Pipeline
              </label>
              <div className="relative">
                <select
                  value={selectedPipeline}
                  onChange={(e) => {
                    setSelectedPipeline(e.target.value);
                  }}
                  className={cn(
                    'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                    'appearance-none cursor-pointer'
                  )}
                >
                  <option value="">Select pipeline</option>
                  <option value="Laravel Deployment Pipeline">Laravel Deployment</option>
                  <option value="React Deployment Pipeline">React Deployment</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 pointer-events-none text-muted-foreground" size={16} />
              </div>
            </div>

            {/* Provider Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Provider
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className={cn(
                    'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                    'appearance-none cursor-pointer'
                  )}
                >
                  <option value="">Select provider</option>
                  <option value="github">GitHub</option>
                  <option value="gitlab">GitLab</option>
                  <option value="bitbucket">Bitbucket</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 pointer-events-none text-muted-foreground" size={16} />
              </div>
            </div>

            {/* Repository Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Repository
              </label>
              <div className="relative">
                <select
                  value={selectedRepo}
                  onChange={(e) => {
                    setSelectedRepo(e.target.value);
                    setSelectedBranch('');
                  }}
                  className={cn(
                    'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                    'appearance-none cursor-pointer'
                  )}
                >
                  <option value="">Select repository</option>
                  {repositories.map((repo) => (
                    <option key={repo} value={repo}>{repo}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground -mb-1"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Branch Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Branch
              </label>
              <div className="relative">
                <select
                  value={selectedBranch}
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                  }}
                  disabled={!selectedRepo}
                  className={cn(
                    'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                    'appearance-none cursor-pointer',
                    !selectedRepo && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <option value="">Select a branch</option>
                  {getAvailableBranches().map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 pointer-events-none text-muted-foreground" size={16} />
              </div>
            </div>

            {/* Path/Commit Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Path
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="/"
                  value={selectedCommit}
                  onChange={(e) => setSelectedCommit(e.target.value)}
                  className={cn(
                    'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary'
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setSelectedRepo('');
                setSelectedBranch('');
                setSelectedPipeline('');
                setSelectedCommit('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeploy}
              disabled={!selectedCommit}
              className={cn(
                'flex items-center gap-2',
                !selectedCommit && 'opacity-50 cursor-not-allowed'
              )}
            >
              Deploy Now
            </Button>
          </div>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="relative mb-2">
        <div className="flex justify-between items-start mb-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2fa4c7]" size={16} />
            <Input 
              placeholder="Search" 
              className="pl-9 py-5 bg-white border-[#dcecf1] rounded-full text-sm shadow-sm"
            />
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <Button
              onClick={() => setShowForm(!showForm)}
              disabled={!hasAccountConnected}
              className="bg-[#ff6b2a] hover:bg-[#e95a1c] text-white shadow-sm border-none px-6 rounded"
            >
              Create Deployment
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-[#e9ecef] border-[#dcecf1] text-[#9ca3af] hover:bg-[#e2e6ea] hover:text-[#6b7280] flex items-center gap-2 font-medium px-4 rounded"
                >
                  <Check size={16} />
                  Select Action
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] border-[#dcecf1] shadow-md p-1">
                <DropdownMenuLabel className="text-foreground font-bold px-3 py-2 text-sm">Deployment</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer text-sm px-3 py-2 text-muted-foreground hover:text-foreground">Deploy Commit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2 ml-4">
          <input type="checkbox" className="w-[18px] h-[18px] rounded border-[#2fa4c7] text-[#2fa4c7] focus:ring-[#2fa4c7]" />
          <ChevronDown size={18} className="text-[#1f4a76] cursor-pointer" />
        </div>
      </div>

      <div className="bg-card border border-[#dcecf1] rounded-lg overflow-hidden shadow-card mt-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.header}
                    className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider"
                  >
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deployments.map((deployment) => (
                <tr key={deployment.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="text-primary hover:underline font-medium text-sm">
                      {deployment.name}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{deployment.pipeline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{deployment.tasks}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={deployment.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{deployment.createdAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{deployment.duration}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {deployment.status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleRetryDeployment(deployment.id)}
                        >
                          <Repeat2 size={14} className="mr-1" />
                          Retry
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Logs</DropdownMenuItem>
                          <DropdownMenuItem>Rollback</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteDeployment(deployment.id)}
                            className="text-destructive"
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-border bg-background/50">
          <p className="text-xs text-muted-foreground">
            Showing {deployments.length} of {deployments.length} deployments
          </p>
        </div>
      </div>
    </div>
  );
}
