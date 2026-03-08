import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "@/components/VideoPlayer";
import { skillProgressions, type SkillTree, type ProgressionStep } from "@/data/skillProgressions";
import { muscleDiagrams } from "@/data/muscleDiagrams";
import { Play, Tv, ChevronRight } from "lucide-react";

const TLCtvView = () => {
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);

  const getVideoId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  // Build sections from skill trees that have videos
  const sections = skillProgressions
    .map((tree) => ({
      tree,
      videos: tree.progressions
        .map((step) => ({ step, videoId: getVideoId(step.youtubeUrl) }))
        .filter((v) => v.videoId !== null) as { step: ProgressionStep; videoId: string }[],
    }))
    .filter((s) => s.videos.length > 0);

  if (activeVideo) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveVideo(null)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Library
        </button>
        <VideoPlayer videoId={activeVideo.videoId} title={activeVideo.title} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="py-4 space-y-1">
        <div className="flex items-center gap-2">
          <Tv className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">TLCtv</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Exercise demos organized by skill path
        </p>
      </div>

      {sections.length === 0 ? (
        <Card className="border border-dashed border-border rounded-lg">
          <CardContent className="py-12 text-center">
            <Tv className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <p className="font-semibold text-foreground">No videos yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Videos will appear here as they're added to skill progressions
            </p>
          </CardContent>
        </Card>
      ) : (
        sections.map(({ tree, videos }) => (
          <div key={tree.id} className="space-y-3">
            {/* Section header with muscle diagram */}
            <div className="flex items-center gap-3">
              {muscleDiagrams[tree.id] && (
                <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-secondary/30 overflow-hidden p-0.5">
                  <img
                    src={muscleDiagrams[tree.id]}
                    alt={`${tree.name} muscles`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">{tree.name}</h2>
                <Badge variant="outline" className="text-[10px] font-mono">
                  {videos.length} video{videos.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>

            {/* Horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {videos.map(({ step, videoId }) => (
                <button
                  key={step.id}
                  onClick={() => setActiveVideo({ videoId, title: step.name })}
                  className="flex-shrink-0 w-[200px] group text-left"
                >
                  <Card className="border border-border rounded-lg overflow-hidden transition-colors hover:border-primary/50">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-secondary">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={step.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <Play className="h-3.5 w-3.5 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-2.5">
                      <p className="text-xs font-semibold text-foreground truncate">{step.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">{step.level}</p>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TLCtvView;
