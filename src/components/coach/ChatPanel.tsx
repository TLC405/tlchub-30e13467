import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { getCoachResponse } from '@/data/coachResponses';
import type { CanvasAction, CanvasMode, ChatMessage, CoachContext } from '@/types/coach';

interface ChatPanelProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onCanvasAction: (action: CanvasAction) => void;
  activeCanvasMode: CanvasMode;
  selectedExerciseId?: string;
  selectedSkillTreeId?: string;
}

const QUICK_ACTIONS = [
  { label: '📊 My progress', message: 'Show my progress stats' },
  { label: '🏗️ Build workout', message: 'Build me a workout' },
  { label: '🤸 Planche tips', message: 'Give me planche tips' },
  { label: '💪 What muscles?', message: 'Show me the muscle map' },
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'coach',
  content:
    "Welcome to Coach Care Studio 💪\n\nI'm your AI coach — here to guide your calisthenics journey with precision. Ask me about exercises, progressions, recovery, or let me build you a workout.\n\nWhat do you need today?",
  timestamp: Date.now(),
};

function formatContent(text: string): React.ReactNode {
  // Very basic markdown-like formatting for bold (**text**) and newlines
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part === '\n') return <br key={i} />;
    return part;
  });
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  chatHistory,
  setChatHistory,
  onCanvasAction,
  activeCanvasMode,
  selectedExerciseId,
  selectedSkillTreeId,
}) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = useMemo(
    () => (chatHistory.length === 0 ? [WELCOME_MESSAGE] : chatHistory),
    [chatHistory]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    const history = chatHistory.length === 0 ? [userMessage] : [...chatHistory, userMessage];
    setChatHistory(history);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const context: CoachContext = {
      activeCanvasMode,
      selectedExerciseId,
      selectedSkillTreeId,
      recentExercises: history
        .filter((m) => m.canvasAction?.exerciseId)
        .map((m) => m.canvasAction!.exerciseId!)
        .slice(-5),
    };

    const response = getCoachResponse(text.trim(), context);

    const coachMessage: ChatMessage = {
      id: `coach-${Date.now()}`,
      role: 'coach',
      content: response.text,
      timestamp: Date.now(),
      canvasAction: response.canvasAction,
    };

    if (response.canvasAction) {
      onCanvasAction(response.canvasAction);
    }

    setChatHistory((prev) => (prev.length === 0 ? [userMessage, coachMessage] : [...prev, coachMessage]));
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="px-4 py-3 border-b-[3px] border-foreground bg-card shrink-0">
        <h2 className="font-serif text-lg font-black text-foreground">Coach Chat</h2>
        <p className="text-[10px] text-muted-foreground tracking-widest uppercase">AI-Powered Coaching</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-2" ref={scrollRef as React.Ref<HTMLDivElement>}>
        <div className="flex flex-col gap-3 pb-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-[16px] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground border-[2px] border-foreground'
                    : 'bg-background text-foreground border-[2px] border-foreground'
                }`}
              >
                {formatContent(msg.content)}
                {msg.canvasAction && (
                  <div className="mt-1 text-[10px] text-muted-foreground italic">
                    ↗ Canvas updated
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-background border-[2px] border-foreground px-4 py-3 rounded-[16px]">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick actions */}
      <div className="px-3 py-2 border-t border-border shrink-0">
        <div className="flex flex-wrap gap-1 mb-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => sendMessage(action.message)}
              className="text-[11px] font-medium px-3 py-1.5 rounded-[12px] border-[2px] border-foreground bg-card hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your coach..."
            className="resize-none min-h-[44px] max-h-[120px] rounded-[16px] border-[2px] border-foreground text-sm"
            rows={1}
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="rounded-[16px] border-[2px] border-foreground h-[44px] w-[44px] p-0 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
