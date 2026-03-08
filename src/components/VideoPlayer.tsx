import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Maximize, Minimize } from "lucide-react";
import { APP_POWERED_BY } from "@/data/controlContent";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
  onClose?: () => void;
  autoplay?: boolean;
}

const VideoPlayer = ({ videoId, title, description, onClose, autoplay = true }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&showinfo=0${autoplay ? "&autoplay=1" : ""}`;

  return (
    <Card className="bg-card border border-border rounded-lg overflow-hidden">
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <CardTitle className="text-sm font-semibold truncate">{title}</CardTitle>
            <Badge variant="outline" className="text-[8px] px-1.5 py-0 border-primary/40 text-primary font-bold tracking-wider shrink-0">
              TLC
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="h-6 w-6 p-0">
              {isFullscreen ? <Minimize className="h-3 w-3" /> : <Maximize className="h-3 w-3" />}
            </Button>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div ref={containerRef} className="relative bg-foreground/5 rounded-lg overflow-hidden">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="no-referrer"
              style={{ border: 0 }}
            />
          </div>
          <div className="absolute bottom-2 right-2 pointer-events-none">
            <span className="text-[9px] font-bold tracking-widest text-foreground/20 uppercase">
              {APP_POWERED_BY}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
