'use client';

import { useState } from 'react';
import { CommentItem } from './comment-item';
import { CommentInput } from './comment-input';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
  isStaff: boolean;
}

interface CommentsTabProps {
  initialComments?: Comment[];
  onAddComment?: (content: string, isInternal: boolean) => void;
  currentUserAvatar?: string;
}

const defaultComments: Comment[] = [
  {
    id: '1',
    author: 'Jimmy Fallon',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jimmy_Fallon%2C_Montclair_Film_Festival%2C_2013-sFSRlNwid9ri1trYFhnZyPHypePxIP.jpg',
    content: 'Hi, I\'m experiencing issues with my database connection. The error message says "Connection refused on port 5432". I\'ve checked that PostgreSQL is running on the server.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isInternal: false,
    isStaff: false,
  },
  {
    id: '2',
    author: 'Alex Johnson',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab67616100005174c5310795fab6ea21e1c1f27e-GPO0kOzHwg9eH8gFX2w6a7MmoeQcbY.jpg',
    content: 'Thanks for reaching out! I\'ve checked your server logs and found that the PostgreSQL service crashed due to insufficient memory. We need to either increase the allocated RAM or optimize your database queries.\n\nLet\'s increase your allocated memory to 8GB and see if that resolves the issue. I\'ll make this change now.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    isInternal: false,
    isStaff: true,
  },
  {
    id: '3',
    author: 'Alex Johnson',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab67616100005174c5310795fab6ea21e1c1f27e-GPO0kOzHwg9eH8gFX2w6a7MmoeQcbY.jpg',
    content: 'Customer is running 150+ concurrent database connections, need to review connection pool settings and potentially recommend connection pooling with pgBouncer.',
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    isInternal: true,
    isStaff: true,
  },
  {
    id: '4',
    author: 'Jimmy Fallon',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jimmy_Fallon%2C_Montclair_Film_Festival%2C_2013-sFSRlNwid9ri1trYFhnZyPHypePxIP.jpg',
    content: 'That worked! The memory upgrade fixed the immediate issue. Thanks for the quick resolution. Should I be concerned about the connection pooling you mentioned?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isInternal: false,
    isStaff: false,
  },
];

export function CommentsTab({
  initialComments = defaultComments,
  onAddComment,
  currentUserAvatar,
}: CommentsTabProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async (content: string, isInternal: boolean) => {
    setIsSubmitting(true);

    // Call the external handler if provided
    if (onAddComment) {
      await onAddComment(content, isInternal);
    }

    // Add comment to local state
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Jimmy Fallon',
      avatar: currentUserAvatar || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jimmy_Fallon%2C_Montclair_Film_Festival%2C_2013-sFSRlNwid9ri1trYFhnZyPHypePxIP.jpg',
      content,
      timestamp: new Date().toISOString(),
      isInternal,
      isStaff: false,
    };

    setComments([...comments, newComment]);
    setIsSubmitting(false);
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Comments list */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No comments yet. Start the conversation below.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              author={comment.author}
              avatar={comment.avatar}
              content={comment.content}
              timestamp={comment.timestamp}
              isInternal={comment.isInternal}
              isStaff={comment.isStaff}
              canDelete={comment.author === 'Jimmy Fallon'}
              onDelete={handleDeleteComment}
            />
          ))
        )}
      </div>

      {/* Comment input */}
      <CommentInput onSubmit={handleAddComment} isLoading={isSubmitting} />
    </div>
  );
}
