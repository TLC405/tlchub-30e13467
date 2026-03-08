import { useState } from "react";
import { nonNegotiables } from "@/data/controlContent";
import { ChevronDown, ChevronUp, Shield } from "lucide-react";

interface NonNegotiablesProps {
  compact?: boolean;
}

export function NonNegotiables({ compact = false }: NonNegotiablesProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 py-2 px-3 border border-border rounded-lg bg-card">
        <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
        {nonNegotiables.map((nn) => (
          <span key={nn.id} className="text-xs font-semibold text-foreground tracking-wide">
            {nn.title}
            {nn.id !== "active-legs" && <span className="text-muted-foreground mx-1">·</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-bold text-sm tracking-wide text-foreground uppercase">
          Non-Negotiables
        </span>
      </div>
      <div className="divide-y divide-border">
        {nonNegotiables.map((nn) => (
          <button
            key={nn.id}
            onClick={() => setExpanded(expanded === nn.id ? null : nn.id)}
            className="w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-foreground">{nn.title}</span>
                <span className="text-xs text-muted-foreground ml-2">{nn.shortCue}</span>
              </div>
              {expanded === nn.id ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {expanded === nn.id && (
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p>{nn.description}</p>
                <p className="text-destructive">
                  <span className="font-semibold">Watch for:</span> {nn.violations}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Fix:</span> {nn.fix}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
