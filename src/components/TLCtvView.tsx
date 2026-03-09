import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "@/components/VideoPlayer";
import { skillProgressions, type ProgressionStep } from "@/data/skillProgressions";
import { muscleDiagrams } from "@/data/muscleDiagrams";
import { Play, Tv, Send, Bot, User, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (resp.status === 429) { onError("Rate limit hit. Wait a moment."); return; }
    if (resp.status === 402) { onError("AI credits exhausted."); return; }
    if (!resp.ok || !resp.body) { onError("Failed to connect to Coach TLC."); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });

      let nl: number;
      while ((nl = buf.indexOf("\n")) !== -1) {
        let line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buf = line + "\n" + buf;
          break;
        }
      }
    }
    onDone();
  } catch {
    onError("Network error.");
  }
}

const TLCtvView = () => {
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getVideoId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const sections = skillProgressions
    .map((tree) => ({
      tree,
      videos: tree.progressions
        .map((step) => ({ step, videoId: getVideoId(step.youtubeUrl) }))
        .filter((v) => v.videoId !== null) as { step: ProgressionStep; videoId: string }[],
    }))
    .filter((s) => s.videos.length > 0);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setIsLoading(false);
        toast({ title: "Coach TLC", description: err, variant: "destructive" });
      },
    });
  };

  if (activeVideo) {
    return (
      <div className="space-y-4">
        <button onClick={() => setActiveVideo(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Library
        </button>
        <VideoPlayer videoId={activeVideo.videoId} title={activeVideo.title} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="py-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Tv className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">TLCtv</h1>
          </div>
          <p className="text-sm text-muted-foreground">Exercise demos + AI coach</p>
        </div>
        <button
          onClick={() => setShowChat(!showChat)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
            showChat ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary"
          }`}
        >
          <Bot className="h-4 w-4" />
          Coach TLC
        </button>
      </div>

      {/* AI Chat Panel */}
      {showChat && (
        <div className="border border-primary rounded-lg bg-card overflow-hidden animate-fade-in">
          <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Coach TLC</span>
            <Badge variant="outline" className="text-[9px] rounded border-border">AI</Badge>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">Ask me anything</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Planche form, programming, injury prevention, progressions…
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"} ${
                  m.role === "user" ? "animate-slide-in-right" : "animate-slide-in-left"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {m.role === "assistant" && <Bot className="h-4 w-4 text-primary flex-shrink-0 mt-1" />}
                <div
                  className={`max-w-[80%] text-sm rounded-lg px-3 py-2 transition-all duration-200 ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground shadow-medium"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
                {m.role === "user" && <User className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Coach TLC…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Video Library */}
      {sections.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg py-12 text-center">
          <Tv className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="font-semibold text-foreground">No videos yet</p>
          <p className="text-xs text-muted-foreground mt-1">Videos appear as they're added to skill progressions</p>
        </div>
      ) : (
        sections.map(({ tree, videos }) => (
          <div key={tree.id} className="space-y-2.5">
            <div className="flex items-center gap-3">
              {muscleDiagrams[tree.id] && (
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-secondary/30 overflow-hidden p-0.5">
                  <img src={muscleDiagrams[tree.id]} alt={`${tree.name} muscles`} className="w-full h-full object-contain" loading="lazy" />
                </div>
              )}
              <div className="flex-1 flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground">{tree.name}</h2>
                <Badge variant="outline" className="text-[10px] font-mono rounded">{videos.length} video{videos.length !== 1 ? "s" : ""}</Badge>
              </div>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {videos.map(({ step, videoId }) => (
                <button key={step.id} onClick={() => setActiveVideo({ videoId, title: step.name })} className="flex-shrink-0 w-[180px] group text-left">
                  <Card className="border border-border rounded-lg overflow-hidden transition-colors hover:border-primary/50">
                    <div className="relative aspect-video bg-secondary">
                      <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt={step.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                        <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                          <Play className="h-3 w-3 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <p className="text-[11px] font-semibold text-foreground truncate">{step.name}</p>
                      <p className="text-[10px] text-muted-foreground capitalize">{step.level}</p>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TLCtvView;
