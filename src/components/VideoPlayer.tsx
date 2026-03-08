import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Maximize, Minimize } from "lucide-react";

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

  return (
    <Card className="bg-card border border-border overflow-hidden">
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold truncate">{title}</CardTitle>
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
        <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video">
            <ReactPlayer
              url={`https://www.youtube-nocookie.com/watch?v=${videoId}`}
              playing={autoplay}
              controls
              width="100%"
              height="100%"
              config={{
                youtube: {
                  rel: 0,
                  iv_load_policy: 3,
                },
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
