import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { gymSearchApi, GymSearchResult } from "@/lib/api/firecrawl";
import { APP_POWERED_BY, APP_FOUNDATION } from "@/data/controlContent";
import EpicSearch from "@/components/gyms/EpicSearch";
import FitnessRecommendations from "@/components/gyms/FitnessRecommendations";
import GymCard, { GymCardData } from "@/components/gyms/GymCard";
import GymDetailsModal from "@/components/gyms/GymDetailsModal";
import { MapPin, Loader2, RefreshCw } from "lucide-react";

const GymsClassesView = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [savedGyms, setSavedGyms] = useState<GymCardData[]>([]);
  const [searchResults, setSearchResults] = useState<GymSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDb, setIsLoadingDb] = useState(true);
  const [selectedGym, setSelectedGym] = useState<GymCardData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSavedGyms();
  }, [activeCategory]);

  const loadSavedGyms = async () => {
    setIsLoadingDb(true);
    let query = supabase.from("gyms").select("*").eq("city", "Oklahoma City");
    if (activeCategory) {
      query = query.ilike("category", `%${activeCategory}%`);
    }
    const { data, error } = await query.order("name");
    if (!error && data) {
      setSavedGyms(data as GymCardData[]);
    }
    setIsLoadingDb(false);
  };

  const handleSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setSearchResults([]);
    const result = await gymSearchApi.search(searchQuery, activeCategory || undefined);
    if (result.success && result.data) {
      setSearchResults(result.data);
      toast({ title: "Search Complete", description: `Found ${result.data.length} results` });
    } else {
      toast({ title: "Search Error", description: result.error || "Failed to search", variant: "destructive" });
    }
    setIsSearching(false);
  };

  const handleCategorySelect = (query: string) => {
    setActiveCategory(query);
    if (query) handleSearch(query);
    else setSearchResults([]);
  };

  const saveGymToDb = async (gym: GymCardData) => {
    const { error } = await supabase.from("gyms").insert({
      name: gym.name,
      category: gym.category,
      description: gym.description,
      website: gym.website,
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

  const mapQuery = activeCategory
    ? `${activeCategory} gym Oklahoma City`
    : "gyms fitness Oklahoma City";

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

      {/* Quick-tap Recommendations */}
      <FitnessRecommendations onSelect={handleCategorySelect} activeQuery={activeCategory} />

      {/* Search */}
      <EpicSearch onSearch={handleSearch} isSearching={isSearching} />

      {/* Map */}
      <Card className="border-2 border-foreground/15 rounded-2xl overflow-hidden">
        <div className="relative w-full h-[280px]">
          <iframe
            title="OKC Fitness Map"
            src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(mapQuery)}&zoom=11`}
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
            <Button variant="ghost" size="sm" onClick={() => setSearchResults([])} className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" /> Clear
            </Button>
          </div>
          {searchResults.map((result) => (
            <GymCard
              key={result.id}
              gym={{ id: result.id, name: result.name, category: result.category, description: result.description, website: result.website }}
              onSelect={setSelectedGym}
              onSave={saveGymToDb}
              showSave
            />
          ))}
        </div>
      )}

      {/* Saved Directory */}
      <div className="space-y-3">
        <h2 className="font-serif text-lg font-black text-foreground">
          {activeCategory ? `${activeCategory} in OKC` : "Saved Directory"}
          {!isLoadingDb && ` (${savedGyms.length})`}
        </h2>

        {isLoadingDb ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : savedGyms.length === 0 ? (
          <Card className="border-2 border-dashed border-foreground/20 rounded-2xl">
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
            <GymCard key={gym.id} gym={gym} onSelect={setSelectedGym} />
          ))
        )}
      </div>

      {/* Foundation Banner */}
      <Card className="border-2 border-primary rounded-2xl bg-primary/5">
        <CardContent className="py-6 text-center space-y-2">
          <p className="font-serif text-lg font-black text-foreground">{APP_FOUNDATION}</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Empowering fitness, discipline, and community across Oklahoma City.
          </p>
          <Badge className="bg-primary text-primary-foreground rounded-full text-xs">
            {APP_POWERED_BY}
          </Badge>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <GymDetailsModal gym={selectedGym} open={!!selectedGym} onClose={() => setSelectedGym(null)} />
    </div>
  );
};

export default GymsClassesView;
