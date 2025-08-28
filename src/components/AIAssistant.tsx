import { useState } from "react";
import { Search, Image, Download, Brain, Youtube, Globe, Instagram, Facebook } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  type: "article" | "video" | "image";
}

interface GeneratedImage {
  url: string;
  prompt: string;
  exercise: string;
}

const AIAssistant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleWebSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulated search results
    const mockResults: SearchResult[] = [
      {
        title: "Advanced Calisthenics Techniques for Muscle Building",
        url: "https://example.com/calisthenics",
        snippet: "Learn advanced techniques for building muscle with bodyweight exercises including proper form, progression strategies, and recovery protocols.",
        type: "article"
      },
      {
        title: "Tendon Recovery and Strengthening Guide",
        url: "https://example.com/tendon-care", 
        snippet: "Comprehensive guide on tendon health, recovery times, and strengthening exercises to prevent injury and improve performance.",
        type: "article"
      },
      {
        title: "Human Flag Progression Tutorial",
        url: "https://example.com/human-flag",
        snippet: "Step-by-step tutorial for mastering the human flag, including prerequisite exercises and common mistakes to avoid.",
        type: "video"
      }
    ];
    
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} results for "${searchQuery}"`,
      });
    }, 2000);
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulated image generation
    const mockImage: GeneratedImage = {
      url: "/placeholder.svg", // In real implementation, use actual generated image
      prompt: imagePrompt,
      exercise: "Generated Exercise Demonstration"
    };
    
    setTimeout(() => {
      setGeneratedImages(prev => [mockImage, ...prev]);
      setIsGenerating(false);
      toast({
        title: "Image Generated",
        description: "Exercise demonstration image created successfully",
      });
    }, 3000);
  };

  const handleSocialDownload = (platform: string, url: string) => {
    toast({
      title: "Feature Limitation",
      description: `${platform} downloading requires API access and has legal restrictions. Consider using official APIs or tools.`,
      variant: "destructive"
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">Advanced AI tools for exercise research and content generation</p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search">Web Search</TabsTrigger>
          <TabsTrigger value="images">Generate Images</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="analysis">Exercise Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Web Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for exercise techniques, recovery methods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWebSearch()}
                />
                <Button onClick={handleWebSearch} disabled={isSearching}>
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Search Results:</h3>
                  {searchResults.map((result, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{result.title}</h4>
                          <Badge variant="secondary">{result.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{result.snippet}</p>
                        <Button size="sm" variant="outline" onClick={() => window.open(result.url, '_blank')}>
                          <Download className="h-3 w-3 mr-1" />
                          Open
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Exercise Image Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the exercise you want to visualize (e.g., 'person performing a perfect handstand against a wall, proper form, anatomical illustration style')"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
              />
              <Button onClick={handleImageGeneration} disabled={isGenerating}>
                <Brain className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Exercise Image"}
              </Button>

              {generatedImages.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Generated Images:</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {generatedImages.map((image, index) => (
                      <Card key={index}>
                        <CardContent className="p-3">
                          <img 
                            src={image.url} 
                            alt={image.exercise}
                            className="w-full h-40 object-cover rounded mb-2"
                          />
                          <h4 className="font-medium text-sm mb-1">{image.exercise}</h4>
                          <p className="text-xs text-muted-foreground">{image.prompt}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Youtube className="h-4 w-4 text-red-600" />
                      <span className="font-medium">YouTube</span>
                    </div>
                    <Input placeholder="YouTube URL" className="mb-2" />
                    <Button 
                      size="sm" 
                      onClick={() => handleSocialDownload("YouTube", "")}
                      variant="outline"
                    >
                      Download Video Info
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-500 bg-purple-50 dark:bg-purple-950/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Instagram className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Instagram</span>
                    </div>
                    <Input placeholder="Instagram URL" className="mb-2" />
                    <Button 
                      size="sm"
                      onClick={() => handleSocialDownload("Instagram", "")}
                      variant="outline"
                    >
                      Download Post Info
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Facebook</span>
                    </div>
                    <Input placeholder="Facebook URL" className="mb-2" />
                    <Button 
                      size="sm"
                      onClick={() => handleSocialDownload("Facebook", "")}
                      variant="outline"
                    >
                      Download Post Info
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-3">
                  <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Legal Notice</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Social media content downloading is subject to platform terms of service and copyright laws. 
                    Use official APIs and respect content creators' rights.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Exercise Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-3">
                    <h4 className="font-medium mb-2">Muscle & Tendon Analysis</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      AI-powered analysis of exercises to identify primary/secondary muscles and tendons involved.
                    </p>
                    <Input placeholder="Enter exercise name (e.g., 'handstand push-up')" className="mb-2" />
                    <Button size="sm">Analyze Exercise</Button>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-3">
                    <h4 className="font-medium mb-2">Recovery Time Calculator</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Calculate optimal recovery times based on exercise intensity and muscle groups.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Input placeholder="Exercise intensity (1-10)" />
                      <Input placeholder="Duration (minutes)" />
                    </div>
                    <Button size="sm">Calculate Recovery</Button>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-3">
                    <h4 className="font-medium mb-2">Form Analysis</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload exercise videos for AI-powered form analysis and improvement suggestions.
                    </p>
                    <Input type="file" accept="video/*" className="mb-2" />
                    <Button size="sm">Analyze Form</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;