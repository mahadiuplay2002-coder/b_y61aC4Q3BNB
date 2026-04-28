'use client';

import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CommentInputProps {
  onSubmit: (content: string, isInternal: boolean) => void;
  isLoading?: boolean;
}

export function CommentInput({ onSubmit, isLoading = false }: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const maxLength = 2000;

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, isInternal);
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <Card className="border-border bg-card">
      <div className="p-6">
        {/* Info section */}
        <div className="mb-4 flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-300">
            {isInternal 
              ? 'Internal notes are only visible to your team and will not be shared with the customer.' 
              : 'Public replies will be visible to the customer and all team members.'}
          </div>
        </div>

        {/* Label */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          {isInternal ? 'Internal Note' : 'Public Reply'}
        </p>

        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
          onKeyDown={handleKeyDown}
          placeholder={isInternal ? 'Add an internal note for your team...' : 'Type your reply to the customer...'}
          className="w-full h-32 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              disabled={isLoading}
              className="rounded border-border"
            />
            <span className="text-sm text-muted-foreground">Internal only (not visible to customer)</span>
          </label>

          <div className="flex items-center gap-3">
            <span className={`text-xs ${content.length > maxLength * 0.9 ? 'text-amber-400' : 'text-muted-foreground'}`}>
              {content.length}/{maxLength}
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isLoading}
              className="gap-2 bg-orange-500 hover:bg-orange-600"
            >
              <Send className="w-4 h-4" />
              {isInternal ? 'Post Note' : 'Send Reply'}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3">💡 Tip: Press Ctrl+Enter to submit</p>
      </div>
    </Card>
  );
}
