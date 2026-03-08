import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ShareButton";
import { MapPin, ExternalLink } from "lucide-react";

export interface GymCardData {
  id: string;
  name: string;
  category: string;
  address?: string | null;
  description?: string | null;
  website?: string | null;
  rating?: number | null;
  tags?: string[] | null;
}

interface GymCardProps {
  gym: GymCardData;
  onSelect?: (gym: GymCardData) => void;
  onSave?: (gym: GymCardData) => void;
  showSave?: boolean;
}

const GymCard = ({ gym, onSelect, onSave, showSave }: GymCardProps) => {
  return (
    <Card
      className="border-2 border-foreground/15 rounded-2xl hover:border-primary/40 transition-all cursor-pointer active:scale-[0.98]"
      onClick={() => onSelect?.(gym)}
    >
      <CardContent className="py-4 px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-serif font-bold text-foreground truncate">{gym.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[9px] rounded-full border-foreground/20">
                {gym.category}
              </Badge>
              {gym.rating && (
                <span className="text-xs font-bold text-primary">★ {gym.rating}</span>
              )}
            </div>
            {gym.description && (
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{gym.description}</p>
            )}
            {gym.address && (
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-2.5 w-2.5" /> {gym.address}
              </p>
            )}
          </div>
          <div className="flex gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <ShareButton title={gym.name} text={`Check out ${gym.name} in OKC!`} />
            {gym.website && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 rounded-full border-2"
                onClick={() => window.open(gym.website!, "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            {showSave && onSave && (
              <Button
                size="sm"
                className="h-8 px-3 rounded-full text-[10px] font-bold"
                onClick={() => onSave(gym)}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GymCard;
