
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Activity,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Users,
  Calendar
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  type?: 'text' | 'analysis' | 'image' | 'summary' | 'research' | 'recommendation';
}

interface GeneratedContent {
  id: string;
  type: 'icon' | 'workout-card' | 'exercise-demo' | 'progress-chart';
  prompt: string;
  url: string;
  exercise?: string;
  muscleGroups?: string[];
  metadata?: any;
}

interface ResearchResult {
  title: string;
  summary: string;
  source: string;
  relevance: number;
  date: string;
}

const AgentTLC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatInput, setChatInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [researchResults, setResearchResults] = useState<ResearchResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "agent",
      content: "Hello! I'm Agent TLC, your advanced calisthenics AI assistant. I can analyze your workouts, research latest techniques, summarize videos, and create custom content. What would you like to explore today?",
      timestamp: new Date().toLocaleTimeString(),
      type: "text"
    }
  ]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // AI Response Templates based on input analysis
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('handstand') || input.includes('balance')) {
      return `🤸 **Handstand Analysis:**

Based on your query about "${userInput}", here's my analysis:

**Current Assessment:**
- Handstands require 3-6 months of consistent practice for basic hold
- Wrist mobility is crucial - spend 10-15 minutes daily on wrist prep
- Core strength should be developed through hollow body holds

**Personalized Recommendations:**
- Start with 30-second wall holds, progress to chest-to-wall
- Practice kick-ups for 10 minutes daily
- Focus on shoulder flexibility with pike stretches

**Next Steps:**
Would you like me to create a custom handstand progression card or analyze your current form through video?`;
    }
    
    if (input.includes('pull') || input.includes('chin')) {
      return `💪 **Pull-up Strength Analysis:**

Analyzing "${userInput}" for optimal pull-up development:

**Muscle Activation Breakdown:**
- Primary: Latissimus dorsi (70%), Rhomboids (60%)
- Secondary: Biceps (45%), Middle traps (40%)
- Stabilizers: Core, forearms, rear delts

**Progressive Protocol:**
1. Negative pull-ups: 3x5 (5-second descent)
2. Assisted pull-ups: 3x8-12
3. Full pull-ups: 3x max reps

**Recovery & Frequency:**
- Train every 48-72 hours for optimal adaptation
- Tendons need 72+ hours between intense sessions

Ready to generate a personalized pull-up workout card?`;
    }

    if (input.includes('diet') || input.includes('nutrition') || input.includes('protein')) {
      return `🥗 **Nutritional Analysis for Calisthenics:**

Your nutrition query "${userInput}" requires a holistic approach:

**Calisthenics-Specific Nutrition:**
- Protein: 1.6-2.2g per kg bodyweight for muscle synthesis
- Carbs: 3-5g per kg for training energy (timing matters)
- Fats: 0.8-1.2g per kg for hormone production

**Pre/Post Workout Protocol:**
- Pre: Light carbs 30-60 mins before (banana + honey)
- Post: Protein within 30 mins (20-25g whey/plant protein)
- Hydration: 35-40ml per kg bodyweight daily

**Micronutrient Focus:**
- Magnesium: 400-500mg for muscle recovery
- Vitamin D3: 2000-4000 IU for bone health
- Omega-3: 2-3g EPA/DHA for inflammation control

Shall I create a personalized meal timing chart for your training schedule?`;
    }

    // Default comprehensive response
    return `🧠 **Comprehensive Analysis:**

I've analyzed your input "${userInput}" using advanced calisthenics knowledge:

**Key Insights:**
- Movement patterns suggest focus on ${input.includes('strength') ? 'strength development' : 'skill acquisition'}
- Consider progressive overload principles for optimal adaptation
- Integration with your current training level is essential

**Actionable Recommendations:**
1. Assess current baseline through movement screening
2. Implement systematic progression protocol
3. Monitor recovery markers and adjust intensity

**Technical Breakdown:**
- Biomechanical efficiency can be improved through form refinement
- Neurological adaptations occur within 2-4 weeks of consistent practice
- Tissue adaptations require 6-8 weeks minimum

**Next Phase:**
Would you like me to research the latest studies on this topic or create visual content to support your training?

*This analysis is personalized to your calisthenics journey and current progression level.*`;
  };

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
    const currentInput = chatInput;
    setChatInput("");
    setIsProcessing(true);

    // Generate contextual AI response
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

  const handleWebSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsProcessing(true);
    toast({
      title: "Deep Research Mode",
      description: `Analyzing scientific literature on "${searchQuery}"`,
    });

    // Simulate comprehensive research
    setTimeout(() => {
      const mockResults: ResearchResult[] = [
        {
          title: "Progressive Calisthenics Training Adaptations (2024)",
          summary: "Recent meta-analysis shows optimal rep ranges for skill-based movements vary significantly from traditional strength training protocols.",
          source: "Journal of Sports Science",
          relevance: 95,
          date: "2024-01-15"
        },
        {
          title: "Tendon Adaptation in Bodyweight Training",
          summary: "Longitudinal study demonstrates tendon stiffness improvements require 12-16 weeks of consistent progressive loading.",
          source: "Sports Medicine Research",
          relevance: 88,
          date: "2024-02-03"
        },
        {
          title: "Neural Efficiency in Complex Movement Patterns",
          summary: "Motor learning research reveals optimal practice frequency for calisthenics skill acquisition.",
          source: "Motor Control Journal",
          relevance: 82,
          date: "2024-01-28"
        }
      ];

      setResearchResults(mockResults);

      const searchResult: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `📊 **Advanced Research Analysis: "${searchQuery}"**

**Latest Scientific Findings (2024):**

🔬 **Study #1: Progressive Training Adaptations**
- Optimal rep ranges: 3-6 for strength, 6-12 for hypertrophy
- Skill-based movements require different periodization
- Recovery protocols vary by movement complexity

📈 **Study #2: Tendon Adaptation Timeline**
- Weeks 1-4: Neural adaptations primary
- Weeks 5-12: Structural tendon changes
- Week 12+: Significant stiffness improvements

🧠 **Study #3: Motor Learning Optimization**
- Daily practice superior to every-other-day for skills
- 15-20 minute focused sessions optimal
- Mental rehearsal improves acquisition by 23%

**Clinical Applications:**
- Implement periodized approach to skill development
- Monitor tendon loading through RPE scales
- Combine physical and mental practice protocols

**Evidence Grade: A** (High-quality systematic reviews)

Would you like me to generate training protocols based on this research?`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'research'
      };
      setChatMessages(prev => [...prev, searchResult]);
      setIsProcessing(false);
    }, 3000);
  };

  const handleVideoSummary = async () => {
    if (!videoUrl.trim()) return;

    setIsProcessing(true);
    toast({
      title: "Video Analysis Engine",
      description: "Processing movement patterns and technique breakdown",
    });

    setTimeout(() => {
      const summary: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `🎥 **Advanced Video Analysis Report**

**Video Source:** ${videoUrl}

**Movement Breakdown Analysis:**
- **Primary Exercise:** Advanced Handstand Flow Sequence
- **Skill Level:** Intermediate to Advanced (7.5/10)
- **Duration:** 8 minutes 32 seconds

**Technical Assessment:**

🎯 **Form Analysis:**
1. **Wrist Position:** Excellent alignment (9/10)
2. **Shoulder Engagement:** Proper protraction maintained
3. **Core Tension:** Consistent hollow body position
4. **Leg Control:** Minor corrections needed in transitions

**Biomechanical Insights:**
- Optimal weight distribution: 60/40 through fingers/palm
- Shoulder angle maintained at 180° throughout holds
- Hip flexor engagement prevents unwanted arch

**Progression Elements Identified:**
- Wall-supported to freestanding transitions
- Single-arm preparation exercises
- Dynamic flow components for advanced practitioners

**Muscle Activation Analysis:**
- **Primary:** Anterior deltoids (85%), Core stabilizers (90%)
- **Secondary:** Wrist flexors (70%), Upper trapezius (65%)
- **Stabilizers:** Deep neck flexors, Serratus anterior

**Training Recommendations:**
1. Focus on wrist conditioning (daily 10-minute routine)
2. Hollow body progressions for core strength
3. Shoulder blade mobility work

**Generated Assets:**
✅ Custom workout card created
✅ Progressive exercise sequence mapped
✅ Form cue reference sheet ready

Integration complete - assets available in your exercise library.`,
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
      title: "Creative Engine Active",
      description: "Generating high-quality exercise visuals",
    });

    setTimeout(() => {
      const contentType = imagePrompt.toLowerCase().includes('icon') ? 'icon' : 
                         imagePrompt.toLowerCase().includes('chart') ? 'progress-chart' : 'workout-card';
      
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: contentType,
        prompt: imagePrompt,
        url: "/placeholder.svg",
        exercise: contentType === 'icon' ? "App Icon" : "Custom Exercise Visual",
        muscleGroups: ["Shoulders", "Core", "Arms"],
        metadata: {
          resolution: "2048x2048",
          format: "PNG",
          style: "Professional/Anatomical"
        }
      };

      setGeneratedContent(prev => [newContent, ...prev]);
      
      const imageMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `🎨 **Professional Content Generation Complete**

**Created:** High-resolution ${contentType.replace('-', ' ')}
**Based on prompt:** "${imagePrompt}"

**Technical Specifications:**
- **Resolution:** 2048x2048px (Ultra HD)
- **Format:** PNG with transparency support
- **Style:** Professional anatomical precision
- **Color Profile:** sRGB for universal compatibility

**Content Features:**
${contentType === 'icon' ? 
`- App-ready icon with multiple size variants
- Muscle group highlighting with anatomical accuracy
- Clean, modern design aesthetic
- iOS/Android guideline compliant` :
`- Exercise demonstration with form cues
- Muscle activation overlay visualization
- Progressive difficulty indicators
- Integration-ready for workout cards`}

**Quality Metrics:**
- Anatomical Accuracy: 98.5%
- Visual Clarity: 97.2%
- Professional Standard: Exceptional

**Deployment Status:**
✅ Added to content library
✅ Available for immediate use
✅ Optimized for mobile displays
✅ Batch processing ready

Ready to integrate into your exercise library or create additional variations?`,
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
      title: `${platform} Trend Analysis`,
      description: "Analyzing current fitness methodologies and innovations",
    });

    setTimeout(() => {
      const analysis: ChatMessage = {
        id: Date.now().toString(),
        role: 'agent',
        content: `📱 **${platform} Fitness Intelligence Report**

**Current Trend Analysis (Last 30 Days):**

🔥 **Trending Techniques:**
1. **Ring Muscle-Up Progressions** (+340% engagement)
   - Hollow body pull-ups as foundation
   - False grip strength development protocols
   - Transition timing optimization

2. **Handstand Flow Sequences** (+275% growth)
   - Dynamic transitions between static holds
   - Creative entry/exit variations
   - Partner-assisted progression methods

3. **Weighted Calisthenics Integration** (+190% interest)
   - Progressive loading for basic movements
   - Periodization strategies for skill + strength
   - Equipment minimization approaches

**Methodology Insights:**
- **Micro-progression focus:** 2.5% weekly increases
- **Movement quality emphasis:** Quality over quantity trending
- **Recovery integration:** Active recovery gaining popularity

**Community Innovations:**
- Virtual form checking through AI analysis
- Gamification of progression tracking
- Community challenges driving consistency

**Applicable Training Methods:**
${platform === 'Facebook' ? 
`- Group accountability systems
- Progress sharing protocols
- Peer coaching methodologies` :
`- Short-form technique demonstrations
- Visual progress documentation
- Hashtag-driven challenge participation`}

**Integration Recommendations:**
- Implement trending exercises in your routine
- Adapt progression protocols to current best practices
- Consider community engagement for motivation

Ready to create workout cards featuring these trending techniques?`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'analysis'
      };
      setChatMessages(prev => [...prev, analysis]);
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Enhanced Header */}
      <div className="text-center space-y-3 p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-xl border border-border/50">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-14 w-14 bg-gradient-to-br from-primary via-accent to-primary/80 rounded-xl flex items-center justify-center shadow-2xl border border-white/20">
            <Brain className="h-7 w-7 text-white drop-shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight font-serif">
              Agent TLC
            </h1>
            <p className="text-sm text-muted-foreground font-semibold tracking-wide">
              Advanced Calisthenics Intelligence System
            </p>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          <Badge className="bg-primary text-primary-foreground shadow-md">Advanced AI Chat</Badge>
          <Badge className="bg-accent text-accent-foreground shadow-md">Scientific Research</Badge>
          <Badge className="bg-secondary text-secondary-foreground shadow-md">Video Analysis</Badge>
          <Badge className="bg-muted text-muted-foreground shadow-md">Content Creation</Badge>
        </div>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-primary" />
            <span>Real-time Processing</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 text-accent" />
            <span>Personalized Analysis</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">AI Chat</span>
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Research</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Youtube className="h-4 w-4" />
            <span className="hidden sm:inline">Media</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Advanced AI Conversation
                </div>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="gemini">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-96 w-full pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl shadow-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                            : message.type === 'analysis'
                            ? 'bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20'
                            : message.type === 'research'
                            ? 'bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20'
                            : message.type === 'image'
                            ? 'bg-gradient-to-br from-muted/50 to-muted/20 border border-muted'
                            : 'bg-gradient-to-br from-card to-card/80 border border-border/50'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                          {message.content}
                        </pre>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/10">
                          <div className="text-xs opacity-70">
                            {message.timestamp}
                          </div>
                          {message.type && (
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-r from-muted to-muted/70 p-4 rounded-2xl shadow-md border border-border/50">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Agent TLC Processing...</div>
                            <div className="text-xs text-muted-foreground">Analyzing • Researching • Optimizing</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about techniques, recovery, nutrition, programming..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleChatSubmit()}
                    className="flex-1"
                  />
                  <Button onClick={handleChatSubmit} disabled={isProcessing} className="px-6">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => setChatInput("Analyze my handstand progression")}>
                    <Target className="h-3 w-3 mr-1" />
                    Handstand Analysis
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setChatInput("Create pull-up progression plan")}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Pull-up Plan
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setChatInput("Nutrition for calisthenics")}>
                    <Activity className="h-3 w-3 mr-1" />
                    Nutrition Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Research Tab */}
        <TabsContent value="research" className="space-y-4">
          <Card className="border-2 border-accent/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-accent" />
                Scientific Research Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Research: biomechanics, recovery protocols, training methods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWebSearch()}
                  className="flex-1"
                />
                <Button onClick={handleWebSearch} disabled={isProcessing} className="bg-accent hover:bg-accent/90">
                  <Search className="h-4 w-4 mr-2" />
                  Research
                </Button>
              </div>
              
              {researchResults.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Latest Research Results:</h3>
                  {researchResults.map((result, idx) => (
                    <Card key={idx} className="border-l-4 border-l-accent/60">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm text-foreground">{result.title}</h4>
                          <Badge variant="secondary" className="ml-2">
                            {result.relevance}% match
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{result.summary}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">{result.source}</span>
                          <span className="text-muted-foreground">{result.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAnalysis('Facebook')}
                  className="flex items-center gap-2 h-12"
                >
                  <Facebook className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Facebook</div>
                    <div className="text-xs text-muted-foreground">Community Insights</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialAnalysis('Instagram')}
                  className="flex items-center gap-2 h-12"
                >
                  <Activity className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Instagram</div>
                    <div className="text-xs text-muted-foreground">Trend Analysis</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card className="border-2 border-red-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Advanced Video Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="YouTube/TikTok/Instagram video URL..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleVideoSummary} disabled={isProcessing} className="bg-red-500 hover:bg-red-600">
                  <Eye className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-red-200/50">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analysis Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-red-500" />
                      <span>Form & technique assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-3 w-3 text-red-500" />
                      <span>Muscle activation mapping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-red-500" />
                      <span>Progression identification</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-orange-500" />
                      <span>Movement efficiency analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-orange-500" />
                      <span>Comparative technique study</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-3 w-3 text-orange-500" />
                      <span>Personalized recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Create Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card className="border-2 border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-secondary" />
                Professional Content Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Describe your vision: 'Handstand progression icon with anatomical muscle highlighting' or 'Pull-up workout card showing proper form and common mistakes'..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleImageGeneration} disabled={isProcessing} className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </Button>
                  <Select defaultValue="professional">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="anatomical">Anatomical</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setImagePrompt("App icon for calisthenics with handstand silhouette")}
                >
                  App Icon
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setImagePrompt("Workout card for pull-up progression with form cues")}
                >
                  Workout Card
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setImagePrompt("Progress chart template for strength gains")}
                >
                  Progress Chart
                </Button>
              </div>

              {generatedContent.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Generated Content Library
                  </h3>
                  <ScrollArea className="h-64">
                    <div className="space-y-3 pr-4">
                      {generatedContent.map((content) => (
                        <Card key={content.id} className="border-l-4 border-l-secondary">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-foreground">{content.exercise}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {content.type}
                                  </Badge>
                                  {content.metadata && (
                                    <Badge variant="secondary" className="text-xs">
                                      {content.metadata.resolution}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </Button>
                                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                                  <Download className="h-3 w-3 mr-1" />
                                  Use
                                </Button>
                              </div>
                            </div>
                            <img 
                              src={content.url} 
                              alt={content.exercise}
                              className="w-full h-32 object-cover rounded-lg mb-3 bg-gradient-to-br from-muted to-muted/50 border border-border/50"
                            />
                            <p className="text-xs text-muted-foreground mb-2 italic">"{content.prompt}"</p>
                            {content.muscleGroups && (
                              <div className="flex flex-wrap gap-1">
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
