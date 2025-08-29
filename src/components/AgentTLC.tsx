
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Search, 
  Youtube, 
  Facebook, 
  Image as ImageIcon,
  Brain,
  Sparkles,
  Download,
  Eye,
  Palette,
  Zap,
  Target,
  Activity
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  type?: 'text' | 'analysis' | 'image' | 'summary';
}

interface GeneratedContent {
  id: string;
  type: 'icon' | 'workout-card' | 'exercise-demo';
  prompt: string;
  url: string;
  exercise?: string;
  muscleGroups?: string[];
}

const AgentTLC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatInput, setChatInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "agent",
      content: "Hello! I'm Agent TLC, your advanced calisthenics AI assistant. I can help you with workout analysis, exercise research, video summaries, and create custom images for your training library. How can I assist your fitness journey today?",
      timestamp: new Date().toLocaleTimeString(),
      type: "text"
    }
  ]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I understand you're asking about "${chatInput}". Based on advanced calisthenics analysis, I can provide detailed insights about muscle engagement, recovery protocols, and progression strategies. Would you like me to create a visual demonstration or search for the latest research on this topic?`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'analysis'
      };
      setChatMessages(prev => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const handleWebSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsProcessing(true);
    toast({
      title: "Searching Web",
      description: `Analyzing latest research on "${searchQuery}"`,
    });

    // Simulate search and analysis
    setTimeout(() => {
      const searchResult: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `Web Analysis Results for "${searchQuery}":

🔍 **Latest Research Findings:**
- 3 peer-reviewed studies from 2024 on muscle activation patterns
- Updated protocols for tendon strengthening and recovery
- Advanced progression techniques used by elite athletes

📊 **Key Insights:**
- Optimal rep ranges: 5-8 for strength, 8-15 for hypertrophy
- Recovery window: 48-72 hours for targeted muscle groups
- Progressive overload: Increase difficulty by 5-10% weekly

Would you like me to create workout cards based on this research?`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'analysis'
      };
      setChatMessages(prev => [...prev, searchResult]);
      setIsProcessing(false);
    }, 3000);
  };

  const handleVideoSummary = async () => {
    if (!videoUrl.trim()) return;

    setIsProcessing(true);
    toast({
      title: "Analyzing Video",
      description: "Extracting exercise insights and techniques",
    });

    setTimeout(() => {
      const summary: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `📹 **Video Analysis Summary:**

**Exercise Breakdown:**
- Primary Movement: Handstand Progression
- Difficulty Level: Intermediate
- Duration: 12 minutes of instruction

**Key Techniques Identified:**
1. Hollow body positioning for core engagement
2. Shoulder blade protraction for stability
3. Progressive wall walk-ups for strength building

**Muscle Groups Engaged:**
- Primary: Shoulders (anterior/posterior deltoids)
- Secondary: Core (transverse abdominis, obliques)
- Stabilizers: Wrists, forearms, upper traps

**Recommended Integration:**
Added to your exercise library with custom workout cards. Ready to generate visual demonstrations?`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'summary'
      };
      setChatMessages(prev => [...prev, summary]);
      setIsProcessing(false);
    }, 4000);
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) return;

    setIsProcessing(true);
    toast({
      title: "Creating Custom Content",
      description: "Generating detailed exercise visuals",
    });

    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: imagePrompt.includes('icon') ? 'icon' : 'workout-card',
        prompt: imagePrompt,
        url: "/placeholder.svg",
        exercise: "Custom Exercise Demonstration",
        muscleGroups: ["Shoulders", "Core", "Arms"]
      };

      setGeneratedContent(prev => [newContent, ...prev]);
      
      const imageMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `🎨 **Custom Content Generated:**

Created high-quality visual content based on your prompt: "${imagePrompt}"

**Content Details:**
- Type: ${newContent.type === 'icon' ? 'App Icon' : 'Workout Card'}
- Resolution: 1024x1024px optimized for mobile
- Style: Clean, anatomical precision with muscle highlighting
- Integration: Ready for immediate use in your exercise library

This content has been added to your generated content library and can be applied to workout cards automatically.`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'image'
      };

      setChatMessages(prev => [...prev, imageMessage]);
      setIsProcessing(false);
      setImagePrompt("");
    }, 3000);
  };

  const handleSocialAnalysis = (platform: string) => {
    setIsProcessing(true);
    toast({
      title: `Analyzing ${platform} Content`,
      description: "Extracting workout insights and techniques",
    });

    setTimeout(() => {
      const analysis: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `📱 **${platform} Content Analysis:**

**Fitness Trends Identified:**
- Calisthenics progression challenges gaining popularity
- Focus on functional movement patterns
- Emphasis on mobility and recovery protocols

**Applicable Techniques:**
- Ring muscle-up progressions
- Handstand flow sequences  
- Core stability challenges

**Integration Recommendations:**
I can create workout cards based on these trending techniques and add them to your exercise library with proper muscle group tagging and recovery protocols.`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'analysis'
      };
      setChatMessages(prev => [...prev, analysis]);
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Agent TLC
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Advanced Calisthenics AI Assistant
            </p>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <Badge className="bg-primary text-primary-foreground">Web Search</Badge>
          <Badge className="bg-accent text-accent-foreground">Video Analysis</Badge>
          <Badge className="bg-secondary text-secondary-foreground">Image Generation</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="research">
            <Search className="h-4 w-4 mr-2" />
            Research
          </TabsTrigger>
          <TabsTrigger value="media">
            <Youtube className="h-4 w-4 mr-2" />
            Media
          </TabsTrigger>
          <TabsTrigger value="create">
            <ImageIcon className="h-4 w-4 mr-2" />
            Create
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-96 w-full">
                <div className="space-y-3 p-2">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : message.type === 'analysis'
                            ? 'bg-accent/20 border border-accent'
                            : message.type === 'image'
                            ? 'bg-secondary/20 border border-secondary'
                            : 'bg-muted'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap text-sm font-sans">
                          {message.content}
                        </pre>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span className="text-sm">Agent TLC is analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about exercises, techniques, recovery..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                />
                <Button onClick={handleChatSubmit} disabled={isProcessing}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-accent" />
                Advanced Web Research
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Research calisthenics techniques, studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWebSearch()}
                />
                <Button onClick={handleWebSearch} disabled={isProcessing}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAnalysis('Facebook')}
                  className="flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Analyze FB Fitness
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialAnalysis('Instagram')}
                  className="flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  IG Trends
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Video Analysis & Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Paste YouTube/fitness video URL..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button onClick={handleVideoSummary} disabled={isProcessing}>
                  <Eye className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>• Extract exercise techniques and form cues</p>
                <p>• Identify muscle groups and movement patterns</p>
                <p>• Generate workout cards for your library</p>
                <p>• Analyze progression and difficulty levels</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-secondary" />
                Custom Content Creation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Create detailed app icons or workout card images... (e.g., 'handstand icon with muscle groups highlighted' or 'pull-up progression card showing proper form')"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
              />
              <Button onClick={handleImageGeneration} disabled={isProcessing} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Custom Content
              </Button>

              {generatedContent.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Generated Content Library:</h3>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {generatedContent.map((content) => (
                        <Card key={content.id} className="border-l-4 border-l-secondary">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-sm">{content.exercise}</h4>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {content.type}
                                </Badge>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3 mr-1" />
                                Use
                              </Button>
                            </div>
                            <img 
                              src={content.url} 
                              alt={content.exercise}
                              className="w-full h-24 object-cover rounded mb-2 bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">{content.prompt}</p>
                            {content.muscleGroups && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {content.muscleGroups.map((muscle) => (
                                  <Badge key={muscle} variant="secondary" className="text-xs">
                                    {muscle}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentTLC;
