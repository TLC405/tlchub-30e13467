import React, { useState } from 'react';
import { learningPrinciples } from '@/data/learningPrinciples';
import { exerciseDatabase } from '@/data/exerciseDatabase';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface LearnModeCanvasProps {
  selectedExerciseId?: string;
}

export const LearnModeCanvas: React.FC<LearnModeCanvasProps> = ({ selectedExerciseId }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedExercise = selectedExerciseId
    ? exerciseDatabase.find((e) => e.id === selectedExerciseId)
    : undefined;

  return (
    <div className="p-4 overflow-auto h-full space-y-4">
      <div>
        <h2 className="font-serif text-2xl font-black text-foreground">Learning Lab</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Science-backed motor learning principles for accelerating skill acquisition.
          {selectedExercise ? (
            <span className="text-primary font-semibold ml-1">Applied to: {selectedExercise.name}</span>
          ) : null}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {learningPrinciples.map((p, i) => {
          const isExpanded = expandedId === p.id;
          const applyNote = selectedExercise
            ? p.how_to_apply_template.replace('{exercise}', selectedExercise.name)
            : p.how_to_apply_template.replace('{exercise}', 'your target skill');

          return (
            <div
              key={p.id}
              className="rounded-[16px] border-[3px] border-foreground bg-card shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-muted-foreground w-5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-bold text-sm text-foreground">{p.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">{p.micro_summary}</p>
                </div>
                <div className="shrink-0 text-muted-foreground mt-0.5">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {/* Expanded */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                      Why It Works
                    </p>
                    <p className="text-xs text-foreground">{p.why_it_works}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                      How to Apply
                    </p>
                    <p className="text-xs text-foreground bg-primary/10 rounded-[10px] p-2.5 border border-primary/30">
                      {applyNote}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                      ⚠ Caution
                    </p>
                    <p className="text-xs text-foreground italic">{p.caution}</p>
                  </div>

                  {p.sources.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                        Research
                      </p>
                      <div className="flex flex-col gap-1">
                        {p.sources.map((src, si) => (
                          <a
                            key={si}
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-primary hover:underline flex items-center gap-1 truncate"
                          >
                            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                            <span className="truncate">{src}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
