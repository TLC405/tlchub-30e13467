import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const categories = [
  { id: "calisthenics", label: "Calisthenics Parks", icon: Dumbbell, count: 3 },
  { id: "yoga", label: "Yoga Studios", icon: Heart, count: 5 },
  { id: "crossfit", label: "CrossFit", icon: Flame, count: 4 },
  { id: "martial-arts", label: "Martial Arts", icon: Sword, count: 6 },
  { id: "open-gyms", label: "Open Gyms", icon: TreePine, count: 8 },
  { id: "group", label: "Group Classes", icon: Users, count: 7 },
];

const mockResults = [
  { name: "Iron Body Calisthenics Park", category: "Calisthenics Parks", distance: "1.2 mi", rating: "4.8" },
  { name: "OKC Yoga Collective", category: "Yoga Studios", distance: "0.8 mi", rating: "4.9" },
  { name: "Warrior CrossFit OKC", category: "CrossFit", distance: "2.1 mi", rating: "4.7" },
  { name: "Purpose MMA Academy", category: "Martial Arts", distance: "1.5 mi", rating: "4.6" },
  { name: "Elevate Fitness Center", category: "Open Gyms", distance: "0.5 mi", rating: "4.5" },
];

const GymsClassesView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResults = selectedCategory
    ? mockResults.filter((r) => r.category === categories.find((c) => c.id === selectedCategory)?.label)
    : mockResults;

  return (
    <div className="space-y-6">
      <div className="text-center py-4 space-y-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          Gyms & Classes
        </h1>
        <p className="text-sm text-muted-foreground">
          Find fitness in your area · <span className="text-primary font-semibold">{APP_POWERED_BY}</span>
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by location, zip code, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-[3px] border-foreground rounded-[16px] h-12"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-[16px] border-[2px] transition-colors ${
              selectedCategory === cat.id
                ? "border-primary bg-primary/10"
                : "border-foreground/20 hover:border-foreground"
            }`}
          >
            <cat.icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold text-center leading-tight">{cat.label}</span>
            <Badge variant="outline" className="text-[9px] rounded-full border-foreground/20">
              {cat.count} nearby
            </Badge>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3 stagger-children">
        {filteredResults.map((result, i) => (
          <Card key={i} className="border-[3px] border-foreground rounded-[24px] card-lift">
            <CardContent className="py-4 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-foreground">{result.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{result.category}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {result.distance}
                  </div>
                  <span className="text-xs font-bold text-primary">★ {result.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
