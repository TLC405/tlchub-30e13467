
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Maximize, BookOpen, ExternalLink } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
  onClose?: () => void;
  autoplay?: boolean;
}

const VideoPlayer = ({ videoId, title, description, onClose, autoplay = false }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Generate YouTube embed URL
  const getYouTubeEmbedUrl = (id: string) => {
    const baseUrl = 'https://www.youtube.com/embed/';
    const params = new URLSearchParams({
      controls: '1',
      modestbranding: '1',
      rel: '0',
      showinfo: '0'
    });
    
    if (autoplay) {
      params.append('autoplay', '1');
    }
    
    return `${baseUrl}${id}?${params.toString()}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    setShowFullscreen(true);
  };

  const openInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <Card className="bg-card border border-primary">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold tactical-font">{title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={openInYouTube}
              className="h-6 w-6 p-0"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            )}
          </div>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="p-3 pt-0">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(videoId)}
              title={title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleFullscreen}
              className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70"
            >
              <Maximize className="h-3 w-3 text-white" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className="text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            Tutorial
          </Badge>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              className="h-6 px-2 text-xs"
            >
              {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
