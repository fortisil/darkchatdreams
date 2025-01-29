import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Conversation } from '@/types/chat';
import { supabase } from '@/lib/supabase';

interface ConversationSidebarProps {
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
}

export const ConversationSidebar = ({ currentSessionId, onSelectSession }: ConversationSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('session_id, message')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching conversations:', error);
        return;
      }

      const conversationMap = new Map<string, Conversation>();
      
      data.forEach((msg) => {
        if (!conversationMap.has(msg.session_id) && msg.message.type === 'human') {
          conversationMap.set(msg.session_id, {
            session_id: msg.session_id,
            title: msg.message.content.slice(0, 100),
            last_message: msg.message.content
          });
        }
      });

      setConversations(Array.from(conversationMap.values()));
    };

    fetchConversations();
  }, []);

  return (
    <div className={cn(
      "border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-80"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className={cn(
          "font-semibold transition-opacity duration-300",
          isCollapsed && "opacity-0"
        )}>
          Conversations
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2 space-y-2">
          {conversations.map((conv) => (
            <Button
              key={conv.session_id}
              variant={currentSessionId === conv.session_id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start bg-secondary text-secondary-foreground hover:bg-secondary/80",
                isCollapsed && "justify-center"
              )}
              onClick={() => onSelectSession(conv.session_id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className={cn(
                "truncate transition-opacity duration-300",
                isCollapsed && "opacity-0 w-0"
              )}>
                {conv.title}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};