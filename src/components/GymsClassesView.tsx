import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { gymSearchApi, GymSearchResult } from "@/lib/api/firecrawl";
import { APP_POWERED_BY, APP_FOUNDATION } from "@/data/controlContent";
import {
  MapPin,
  Search,
  Dumbbell,
  Heart,
  Sword,
  Users,
  Flame,
  TreePine,
  Waves,
  Mountain,
  Music,
  Target,
  Loader2,
  ExternalLink,
  Globe,
  RefreshCw,
} from "lucide-react";

const categories = [
  { id: "calisthenics", label: "Calisthenics", icon: Dumbbell, color: "hsl(var(--primary))" },
  { id: "crossfit", label: "CrossFit", icon: Flame, color: "hsl(38, 92%, 50%)" },
  { id: "yoga", label: "Yoga", icon: Heart, color: "hsl(142, 76%, 36%)" },
  { id: "martial-arts", label: "Martial Arts", icon: Sword, color: "hsl(0, 85%, 60%)" },
  { id: "boxing", label: "Boxing", icon: Target, color: "hsl(280, 70%, 50%)" },
  { id: "climbing", label: "Climbing", icon: Mountain, color: "hsl(30, 80%, 50%)" },
  { id: "swimming", label: "Swimming", icon: Waves, color: "hsl(200, 80%, 50%)" },
  { id: "dance", label: "Dance", icon: Music, color: "hsl(320, 70%, 50%)" },
  { id: "open-gym", label: "Open Gyms", icon: TreePine, color: "hsl(160, 60%, 40%)" },
  { id: "group-fitness", label: "Group Classes", icon: Users, color: "hsl(220, 70%, 55%)" },
];

interface SavedGym {
  id: string;
  name: string;
  category: string;
  address: string | null;
  description: string | null;
  website: string | null;
  rating: number | null;
  tags: string[];
}

const GymsClassesView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [savedGyms, setSavedGyms] = useState<SavedGym[]>([]);
  const [searchResults, setSearchResults] = useState<GymSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDb, setIsLoadingDb] = useState(true);
  const { toast } = useToast();

  // Load saved gyms from database
  useEffect(() => {
    loadSavedGyms();
  }, [selectedCategory]);

  const loadSavedGyms = async () => {
    setIsLoadingDb(true);
    let query = supabase.from("gyms").select("*").eq("city", "Oklahoma City");
    if (selectedCategory) {
      query = query.ilike("category", `%${selectedCategory}%`);
    }
    const { data, error } = await query.order("name");
    if (!error && data) {
      setSavedGyms(data as SavedGym[]);
    }
    setIsLoadingDb(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() && !selectedCategory) return;
    setIsSearching(true);
    setSearchResults([]);

    const result = await gymSearchApi.search(
      searchQuery || "",
      selectedCategory || undefined
    );

    if (result.success && result.data) {
      setSearchResults(result.data);
      toast({
        title: "Search Complete",
        description: `Found ${result.data.length} results`,
      });
    } else {
      toast({
        title: "Search Error",
        description: result.error || "Failed to search",
        variant: "destructive",
      });
    }
    setIsSearching(false);
  };

  const saveGymToDb = async (gym: GymSearchResult) => {
    const { error } = await supabase.from("gyms").insert({
      name: gym.name,
      category: gym.category,
      description: gym.description,
      website: gym.website,
      source_url: gym.source_url,
      city: "Oklahoma City",
      state: "OK",
    });

    if (!error) {
      toast({ title: "Saved", description: `${gym.name} added to your directory` });
      loadSavedGyms();
    } else {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  const displayGyms = searchResults.length > 0 ? null : savedGyms;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center py-3 space-y-1">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          OKC Fitness Directory
        </h1>
        <p className="text-sm text-muted-foreground">
          Every gym, studio & park in Oklahoma City · <span className="text-primary font-semibold">{APP_POWERED_BY}</span>
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gyms, studios, parks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 border-[3px] border-foreground rounded-[16px] h-12"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="h-12 px-4 rounded-[16px] border-[3px] border-foreground font-bold"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
        </Button>
      </div>

      {/* Categories - Horizontal scroll */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-[2px] transition-all whitespace-nowrap text-xs font-bold ${
                selectedCategory === cat.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-foreground/20 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Map Embed */}
      <Card className="border-[3px] border-foreground rounded-[24px] overflow-hidden">
        <div className="relative w-full h-[280px]">
          <iframe
            title="OKC Fitness Map"
            src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
              selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.label || ''} gym Oklahoma City`
                : "gyms fitness Oklahoma City"
            )}&zoom=11`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-black text-foreground">
              Web Results ({searchResults.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchResults([])}
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Clear
            </Button>
          </div>
          {searchResults.map((result) => (
            <Card key={result.id} className="border-[3px] border-primary/30 rounded-[20px] card-lift">
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-foreground truncate">{result.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.description}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {result.website && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-full border-[2px]"
                        onClick={() => window.open(result.website, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="h-8 px-3 rounded-full text-[10px] font-bold border-[2px]"
                      onClick={() => saveGymToDb(result)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Saved Directory */}
      <div className="space-y-3">
        <h2 className="font-serif text-lg font-black text-foreground">
          {selectedCategory
            ? `${categories.find(c => c.id === selectedCategory)?.label || ''} in OKC`
            : "Saved Directory"}
          {!isLoadingDb && ` (${savedGyms.length})`}
        </h2>

        {isLoadingDb ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : savedGyms.length === 0 ? (
          <Card className="border-[3px] border-dashed border-foreground/20 rounded-[24px]">
            <CardContent className="py-10 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="font-serif font-bold text-foreground">No saved locations yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Search for gyms above and save them to build your OKC fitness directory
              </p>
            </CardContent>
          </Card>
        ) : (
          savedGyms.map((gym) => (
            <Card key={gym.id} className="border-[3px] border-foreground rounded-[20px] card-lift">
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-foreground">{gym.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[9px] rounded-full border-foreground/20">
                        {gym.category}
                      </Badge>
                      {gym.rating && (
                        <span className="text-xs font-bold text-primary">★ {gym.rating}</span>
                      )}
                    </div>
                    {gym.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{gym.description}</p>
                    )}
                    {gym.address && (
                      <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5" /> {gym.address}
                      </p>
                    )}
                  </div>
                  {gym.website && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 rounded-full border-[2px] flex-shrink-0"
                      onClick={() => window.open(gym.website!, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Foundation Banner */}
      <Card className="border-[3px] border-primary rounded-[24px] bg-primary/5">
        <CardContent className="py-6 text-center space-y-2">
          <p className="font-serif text-lg font-black text-foreground">{APP_FOUNDATION}</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Building stronger men through fitness, discipline, and community in Oklahoma City.
          </p>
          <Badge className="bg-primary text-primary-foreground rounded-full text-xs">
            {APP_POWERED_BY}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default GymsClassesView;
