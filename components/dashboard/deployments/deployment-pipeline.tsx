'use client';

import { Box, Zap, Upload, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeploymentPipelineProps {
  currentStage: 'preparing' | 'building' | 'transferring' | 'finishing';
}

export function DeploymentPipeline({ currentStage }: DeploymentPipelineProps) {
  const stages = [
    { id: 'preparing', label: 'Preparing', icon: Box },
    { id: 'building', label: 'Building', icon: Zap },
    { id: 'transferring', label: 'Transferring', icon: Upload },
    { id: 'finishing', label: 'Finishing', icon: Package }
  ];

  const getStageStatus = (stageId: string) => {
    const stageOrder = ['preparing', 'building', 'transferring', 'finishing'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between gap-2">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const status = getStageStatus(stage.id);
          
          return (
            <div key={stage.id} className="flex items-center flex-1">
              {/* Stage Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-card',
                    status === 'completed' && 'bg-status-success',
                    status === 'current' && 'bg-status-running ring-4 ring-status-running/30 ring-offset-2 ring-offset-background',
                    status === 'pending' && 'bg-muted'
                  )}
                >
                  <Icon
                    size={28}
                    className="transition-colors"
                    style={{
                      color:
                        status === 'completed'
                          ? 'white'
                          : status === 'current'
                          ? 'white'
                          : 'currentColor'
                    }}
                  />
                </div>
                <p
                  className={cn(
                    'text-sm font-medium mt-2 transition-colors',
                    status === 'completed' && 'text-status-success',
                    status === 'current' && 'text-status-running',
                    status === 'pending' && 'text-muted-foreground'
                  )}
                >
                  {stage.label}
                </p>
              </div>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div
                  className={cn(
                    'h-1 flex-1 mx-2 transition-colors duration-300',
                    getStageStatus(stages[index + 1].id) === 'pending'
                      ? 'bg-border'
                      : 'bg-gradient-to-r from-status-success to-status-running'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
