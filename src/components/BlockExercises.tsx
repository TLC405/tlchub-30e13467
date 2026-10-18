import { useState } from "react";
import { Play } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import type { Exercise } from "@/types";

const ytId = (url?: string) => url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];

/** Inline list of the real exercises inside a training block, each with its own video. */
const BlockExercises = ({ exercises }: { exercises: Exercise[] }) => {
  const [open, setOpen] = useState<string | null>(null);
  if (!exercises.length) return null;
  const active = exercises.find((e) => e.id === open);
  const vid = ytId(active?.youtubeUrl);
  return (
    <div className="space-y-2 mb-2">
      <div className="flex flex-wrap gap-1.5">
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setOpen(open === ex.id ? null : ex.id)}
            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ${
              open === ex.id ? "border-primary text-primary bg-primary/10" : "border-border text-foreground hover:border-foreground/40"
            }`}
          >
            <Play className="h-3 w-3" />
            {ex.name}
            <span className="text-muted-foreground">L{ex.difficultyLevel}</span>
          </button>
        ))}
      </div>
      {active && (
        <div className="rounded-md border border-border p-2 animate-fade-in space-y-2">
          {vid && <VideoPlayer key={vid} videoId={vid} title={active.name} onClose={() => setOpen(null)} />}
          <ul className="text-[11px] text-muted-foreground list-disc pl-4">
            {active.cues.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlockExercises;
