import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ShareButton";
import { MapPin, ExternalLink, Star, Navigation } from "lucide-react";
import type { GymCardData } from "./GymCard";

interface GymDetailsModalProps {
  gym: GymCardData | null;
  open: boolean;
  onClose: () => void;
}

const GymDetailsModal = ({ gym, open, onClose }: GymDetailsModalProps) => {
  if (!gym) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.name + " Oklahoma City")}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-black">{gym.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="rounded-full border-primary/40 text-primary font-bold">
              {gym.category}
            </Badge>
            {gym.rating && (
              <Badge variant="secondary" className="rounded-full gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" /> {gym.rating}
              </Badge>
            )}
          </div>

          {gym.description && (
            <p className="text-sm text-muted-foreground">{gym.description}</p>
          )}

          {gym.address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{gym.address}</span>
            </div>
          )}

          {gym.tags && gym.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {gym.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[9px] rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button className="flex-1 rounded-full font-bold gap-2" onClick={() => window.open(mapsUrl, "_blank")}>
              <Navigation className="h-4 w-4" /> Directions
            </Button>
            {gym.website && (
              <Button variant="outline" className="rounded-full font-bold gap-2" onClick={() => window.open(gym.website!, "_blank")}>
                <ExternalLink className="h-4 w-4" /> Website
              </Button>
            )}
            <ShareButton title={gym.name} text={`Check out ${gym.name}!`} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GymDetailsModal;
