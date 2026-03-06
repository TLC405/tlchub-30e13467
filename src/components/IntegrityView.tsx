import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { integrityBlocks } from "@/data/controlContent";
import { NonNegotiables } from "./NonNegotiables";
import { Clock, Play, ChevronDown, ChevronUp, Heart } from "lucide-react";

interface IntegrityViewProps {
  initialBlockId?: string;
}

const IntegrityView = ({ initialBlockId }: IntegrityViewProps) => {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(initialBlockId || null);

  useEffect(() => {
    if (initialBlockId) {
      setExpandedBlock(initialBlockId);
      // Scroll to the block after render
      setTimeout(() => {
        document.getElementById(`integrity-${initialBlockId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [initialBlockId]);

  return (
    <div className="space-y-6">
      <div className="text-center py-4 space-y-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          Integrity
        </h1>
        <p className="text-sm text-muted-foreground">
          Standalone mobility & yoga blocks. Do these daily or as part of your session.
        </p>
      </div>

      <NonNegotiables compact />

      <div className="space-y-4">
        {integrityBlocks.map((block) => {
          const isExpanded = expandedBlock === block.id;
          return (
            <Card
              key={block.id}
              id={`integrity-${block.id}`}
              className={`border-[3px] rounded-[24px] overflow-hidden ${
                isExpanded && initialBlockId === block.id ? "border-primary" : "border-foreground"
              }`}
            >
              <CardHeader
                className="cursor-pointer hover:bg-muted/30 transition-colors pb-3"
                onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-foreground" />
                    <div>
                      <CardTitle className="font-serif text-lg font-bold">
                        {block.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{block.duration}</span>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-4">
                  <p className="text-sm text-muted-foreground">{block.description}</p>

                  {/* Cues */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wider">Cues</p>
                    {block.cues.map((cue, i) => (
                      <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">→</span>
                        {cue}
                      </p>
                    ))}
                  </div>

                  {/* Drills */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wider">Drills</p>
                    <div className="grid grid-cols-2 gap-2">
                      {block.drills.map((drill, i) => (
                        <div
                          key={i}
                          className="text-xs text-foreground bg-muted/50 rounded-[12px] px-3 py-2 border border-border"
                        >
                          {drill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-[2px] border-foreground rounded-[16px] font-semibold"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start {block.title}
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrityView;
