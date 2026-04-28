'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, CheckCircle } from 'lucide-react';

interface FirewallIP {
  id: string;
  ip: string;
  description: string;
  status: 'active' | 'blocked';
  addedAt: string;
  lastUsed: string;
}

export function FirewallIPsTab() {
  const [ips, setIps] = useState<FirewallIP[]>([
    {
      id: '1',
      ip: '203.0.113.45',
      description: 'Office Network',
      status: 'active',
      addedAt: '2024-01-20',
      lastUsed: '1 hour ago',
    },
    {
      id: '2',
      ip: '198.51.100.20',
      description: 'Home Network',
      status: 'active',
      addedAt: '2024-01-18',
      lastUsed: '3 days ago',
    },
  ]);

  const [newIP, setNewIP] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const validateIP = (ip: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ip);
  };

  const addIP = () => {
    if (!newIP.trim() || !validateIP(newIP)) {
      alert('Please enter a valid IP address');
      return;
    }

    if (!newDescription.trim()) {
      alert('Please enter a description');
      return;
    }

    const ip: FirewallIP = {
      id: String(ips.length + 1),
      ip: newIP,
      description: newDescription,
      status: 'active',
      addedAt: new Date().toLocaleDateString(),
      lastUsed: 'Never',
    };

    setIps(prev => [ip, ...prev]);
    setNewIP('');
    setNewDescription('');
    setShowForm(false);
  };

  const deleteIP = (id: string) => {
    setIps(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Whitelist IPs</h3>
          <p className="text-sm text-muted-foreground mt-1">Control which IP addresses can access your account</p>
        </div>
      </div>

      {/* Add IP Form */}
      {showForm ? (
        <Card className="bg-card shadow-card border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">IP Address</label>
              <Input
                placeholder="e.g., 203.0.113.45"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Input
                placeholder="e.g., Office Network"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={addIP} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Add IP
              </Button>
              <Button variant="outline" onClick={() => {
                setShowForm(false);
                setNewIP('');
                setNewDescription('');
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add IP Address
        </Button>
      )}

      {/* IPs List */}
      <div className="space-y-3">
        {ips.length === 0 ? (
          <Card className="bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No IP addresses whitelisted yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-12 gap-3 px-4 py-2 text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">IP Address</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-3">Last Used</div>
                  <div className="col-span-2">Action</div>
                </div>

                {/* Rows */}
                {ips.map(ip => (
                  <Card key={ip.id} className="bg-card shadow-card hover:shadow-card transition-shadow">
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-12 gap-3 py-4 px-4 items-center">
                        <div className="col-span-3">
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {ip.ip}
                          </code>
                        </div>
                        <div className="col-span-4">
                          <p className="text-sm text-foreground">{ip.description}</p>
                          <p className="text-xs text-muted-foreground">Added {ip.addedAt}</p>
                        </div>
                        <div className="col-span-3">
                          <p className="text-sm text-muted-foreground">{ip.lastUsed}</p>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteIP(ip.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
