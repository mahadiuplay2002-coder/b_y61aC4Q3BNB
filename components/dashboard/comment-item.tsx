'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommentItemProps {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
  isStaff?: boolean;
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export function CommentItem({
  id,
  author,
  avatar,
  content,
  timestamp,
  isInternal = false,
  isStaff = false,
  canDelete = false,
  onDelete,
}: CommentItemProps) {
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

    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`flex gap-4 pb-6 ${isInternal ? 'bg-amber-500/5 rounded-lg p-4 border border-amber-500/10' : ''}`}>
      {/* Avatar */}
      <img
        src={avatar}
        alt={author}
        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
      />

      {/* Comment content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{author}</span>
            <span className="text-xs text-muted-foreground">{formatTime(timestamp)}</span>
            {isStaff && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Support Team
              </span>
            )}
            {isInternal && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Internal Only
              </span>
            )}
            {!isInternal && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                Visible to everyone
              </span>
            )}
          </div>
        </div>

        {/* Comment text */}
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">{content}</p>

        {/* Actions */}
        {canDelete && (
          <div className="flex gap-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2 gap-1"
              onClick={() => onDelete?.(id)}
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
