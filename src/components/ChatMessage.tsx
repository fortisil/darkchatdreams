import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAI = message.message.type === 'ai';

  return (
    <div className={cn(
      "py-4 px-6",
      isAI ? "bg-secondary" : "bg-background"
    )}>
      <div className="max-w-3xl mx-auto flex gap-4">
        <Avatar>
          <AvatarFallback>{isAI ? 'AI' : 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {isAI ? (
            <div className="markdown-content">
              <ReactMarkdown>{message.message.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm leading-7">{message.message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};