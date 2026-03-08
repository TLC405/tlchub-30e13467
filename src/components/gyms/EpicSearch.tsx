import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Globe } from "lucide-react";

interface EpicSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const EpicSearch = ({ onSearch, isSearching }: EpicSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search gyms, studios, parks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="pl-10 border-2 border-foreground/20 rounded-full h-12 focus:border-primary"
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={isSearching}
        className="h-12 w-12 rounded-full border-2 border-foreground font-bold p-0"
      >
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default EpicSearch;
