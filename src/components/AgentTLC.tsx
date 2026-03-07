import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { APP_POWERED_BY, APP_FOUNDATION } from "@/data/controlContent";
import { 
  MessageCircle, 
  Search, 
  Youtube, 
  Brain,
  Sparkles,
  Eye,
  Palette,
  Zap,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Users,
  Image as ImageIcon,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  type?: 'text' | 'analysis' | 'image' | 'summary' | 'research' | 'recommendation';
}

const AgentTLC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatInput, setChatInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "agent",
      content: "I'm Coach TLC — your master trainer, life coach, and psychology expert. I analyze social media fitness videos, find classes near you, create workout slides, and help you master your mindset. What do you need today?",
      timestamp: new Date().toLocaleTimeString(),
      type: "text"
    }
  ]);
  const { toast } = useToast();

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('handstand') || input.includes('balance')) {
      return `🤸 **Handstand Analysis — Coach TLC**

**Current Assessment:**
- Handstands require 3-6 months of consistent practice for basic hold
- Wrist mobility is crucial — spend 10-15 min daily on wrist prep
- Core strength through hollow body holds is non-negotiable

**My Recommendation:**
1. Start with 30-second wall holds → chest-to-wall
2. Practice kick-ups 10 min daily
3. Focus on shoulder flexibility with pike stretches

*${APP_POWERED_BY} · ${APP_FOUNDATION}*`;
    }
    
    if (input.includes('pull') || input.includes('chin')) {
      return `💪 **Pull-up Protocol — Coach TLC**

**Muscle Activation:** Lats (70%), Rhomboids (60%), Biceps (45%)

**Progressive Protocol:**
1. Negative pull-ups: 3×5 (5-sec descent)
2. Assisted pull-ups: 3×8-12
3. Full pull-ups: 3× max reps

**Recovery:** Train every 48-72 hours. Tendons need 72+ hours between intense sessions.

*${APP_POWERED_BY}*`;
    }

    if (input.includes('mindset') || input.includes('motivation') || input.includes('mental') || input.includes('psychology')) {
      return `🧠 **Mindset Protocol — Coach TLC**

**The truth:** Discipline > motivation. Every single time.

**Three pillars I coach:**
1. **Identity-based habits** — You're not "trying to train." You ARE someone who trains.
2. **Stress inoculation** — The hard set is the point. Embrace discomfort.
3. **Purpose alignment** — Connect every rep to your larger mission.

**Daily practice:** 5 min visualization before training. See the movement. Feel the control. Execute.

*${APP_POWERED_BY} · ${APP_FOUNDATION}*`;
    }

    return `🧠 **Coach TLC Analysis:**

I've analyzed "${userInput}" — here's what I see:

**Key Insights:**
- Movement pattern focus: ${input.includes('strength') ? 'strength development' : 'skill acquisition'}
- Progressive overload is essential for adaptation
- Recovery markers need monitoring

**My Prescription:**
1. Assess current baseline through movement screening
2. Implement systematic progression
3. Monitor and adjust intensity weekly

**Remember:** If you cannot control the position, you do not earn the movement.

*${APP_POWERED_BY} · ${APP_FOUNDATION}*`;
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput("");
    setIsProcessing(true);

    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: generateAIResponse(currentInput),
        timestamp: new Date().toLocaleTimeString(),
        type: 'analysis'
      };
      setChatMessages(prev => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleVideoSummary = () => {
    if (!videoUrl.trim()) return;
    setIsProcessing(true);
    toast({ title: "Coach TLC Video Analysis", description: "Breaking down movement patterns..." });

    setTimeout(() => {
      const summary: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `🎥 **Video Breakdown — Coach TLC**

**Source:** ${videoUrl}

**Movement Analysis:**
- Primary exercise identified: Advanced progression sequence
- Form quality: 8/10
- Key correction: Maintain hollow body throughout transitions

**What I'd change:**
1. Slow the eccentric phase by 2 seconds
2. Add a pause at peak contraction
3. Focus on breathing rhythm

**Takeaway:** Good foundation. Now earn the next level.

*${APP_POWERED_BY}*`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'summary'
      };
      setChatMessages(prev => [...prev, summary]);
      setIsProcessing(false);
    }, 3000);
  };

  const handleWebSearch = () => {
    if (!searchQuery.trim()) return;
    setIsProcessing(true);
    toast({ title: "Coach TLC Research", description: `Researching "${searchQuery}"...` });

    setTimeout(() => {
      const result: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `📊 **Research Report — Coach TLC**

**Query:** "${searchQuery}"

**Latest findings (2024-2025):**

🔬 **Tendon Adaptation:** 12-16 weeks for significant stiffness improvements
🧠 **Motor Learning:** Daily 15-20 min focused sessions beat long sporadic ones
📈 **Progressive Loading:** 2.5% weekly increases optimal for calisthenics

**My take:** The science confirms what I've always coached — consistency and patience beat intensity every time.

*${APP_POWERED_BY} · ${APP_FOUNDATION}*`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'research'
      };
      setChatMessages(prev => [...prev, result]);
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-4 space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-[16px] border-[3px] border-foreground flex items-center justify-center bg-card">
            <Brain className="h-6 w-6" />
          </div>
          <div className="text-left">
            <h1 className="font-serif text-2xl font-black text-foreground tracking-tight">
              Coach TLC
            </h1>
            <p className="text-[10px] text-primary font-bold tracking-wider uppercase">
              {APP_POWERED_BY}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Master trainer · Life coach · Psychology expert · Video analyst · Slide creator
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          <Badge variant="outline" className="text-[10px] border-foreground/30 rounded-full">AI Chat</Badge>
          <Badge variant="outline" className="text-[10px] border-foreground/30 rounded-full">Video Analysis</Badge>
          <Badge variant="outline" className="text-[10px] border-foreground/30 rounded-full">Research</Badge>
          <Badge variant="outline" className="text-[10px] border-foreground/30 rounded-full">Slides</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 border-[2px] border-foreground rounded-[16px]">
          <TabsTrigger value="chat" className="rounded-[12px] text-xs">
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="research" className="rounded-[12px] text-xs">
            <Search className="h-4 w-4 mr-1" />
            Research
          </TabsTrigger>
          <TabsTrigger value="media" className="rounded-[12px] text-xs">
            <Youtube className="h-4 w-4 mr-1" />
            Video
          </TabsTrigger>
          <TabsTrigger value="create" className="rounded-[12px] text-xs">
            <Palette className="h-4 w-4 mr-1" />
            Slides
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="border-[3px] border-foreground rounded-[24px]">
            <CardContent className="p-4 space-y-4">
              <ScrollArea className="h-80 w-full pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-[16px] ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted border-[2px] border-foreground/10'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                          {message.content}
                        </pre>
                        <div className="text-[10px] opacity-60 mt-2">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted border-[2px] border-foreground/10 p-3 rounded-[16px]">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                          <span className="text-sm text-muted-foreground">Coach TLC thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ask Coach TLC anything..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 border-[2px] border-foreground rounded-[12px]"
                />
                <Button onClick={handleChatSubmit} disabled={isProcessing} className="rounded-[12px]">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="rounded-full border-foreground/30 text-xs" onClick={() => setChatInput("Analyze my handstand progression")}>
                  Handstand
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-foreground/30 text-xs" onClick={() => setChatInput("Help me with my mindset and discipline")}>
                  Mindset
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-foreground/30 text-xs" onClick={() => setChatInput("Create pull-up progression plan")}>
                  Pull-ups
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="space-y-4">
          <Card className="border-[3px] border-foreground rounded-[24px]">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg font-bold flex items-center gap-2">
                <Search className="h-5 w-5" />
                Deep Research
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Research: biomechanics, recovery, training methods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWebSearch()}
                  className="flex-1 border-[2px] border-foreground rounded-[12px]"
                />
                <Button onClick={handleWebSearch} disabled={isProcessing} className="rounded-[12px]">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-[2px] border-foreground/20 rounded-[12px] h-12 text-xs" onClick={() => { setSearchQuery("calisthenics tendon health"); handleWebSearch(); }}>
                  <Activity className="h-4 w-4 mr-1" />
                  Tendon Health
                </Button>
                <Button variant="outline" className="border-[2px] border-foreground/20 rounded-[12px] h-12 text-xs" onClick={() => { setSearchQuery("progressive overload bodyweight"); handleWebSearch(); }}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Overload Science
                </Button>
              </div>
              <p className="text-[10px] text-center text-primary font-semibold">{APP_POWERED_BY}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card className="border-[3px] border-foreground rounded-[24px]">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg font-bold flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Video Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="YouTube, TikTok, or Instagram URL..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1 border-[2px] border-foreground rounded-[12px]"
                />
                <Button onClick={handleVideoSummary} disabled={isProcessing} className="rounded-[12px]">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-muted/50 rounded-[16px] p-4 border border-border space-y-2">
                <p className="text-xs font-bold text-foreground">Coach TLC can analyze:</p>
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Target className="h-3 w-3" /> Form & technique</div>
                  <div className="flex items-center gap-1"><Activity className="h-3 w-3" /> Muscle activation</div>
                  <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Progressions</div>
                  <div className="flex items-center gap-1"><Lightbulb className="h-3 w-3" /> Recommendations</div>
                </div>
              </div>
              <p className="text-[10px] text-center text-primary font-semibold">{APP_POWERED_BY}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Slides Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card className="border-[3px] border-foreground rounded-[24px]">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg font-bold flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Workout Slides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your workout slide: 'Planche progression poster with form cues and muscle highlights'..."
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
                className="resize-none border-[2px] border-foreground rounded-[12px]"
              />
              <Button
                onClick={() => {
                  if (!imagePrompt.trim()) return;
                  toast({ title: "Coach TLC", description: "Generating your workout slide..." });
                  setImagePrompt("");
                }}
                className="w-full rounded-[12px]"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Slide
              </Button>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="rounded-full border-foreground/30 text-xs" onClick={() => setImagePrompt("Handstand progression poster with form cues")}>
                  Handstand Slide
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-foreground/30 text-xs" onClick={() => setImagePrompt("Pull-up workout card with muscle activation")}>
                  Pull-up Card
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-foreground/30 text-xs" onClick={() => setImagePrompt("Weekly training schedule poster")}>
                  Schedule
                </Button>
              </div>
              <p className="text-[10px] text-center text-primary font-semibold">{APP_POWERED_BY}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Foundation footer */}
      <div className="text-center py-4 space-y-1">
        <p className="text-[10px] text-muted-foreground font-semibold">{APP_FOUNDATION}</p>
        <p className="text-[9px] text-primary font-bold tracking-wider uppercase">{APP_POWERED_BY}</p>
      </div>
    </div>
  );
};

export default AgentTLC;
