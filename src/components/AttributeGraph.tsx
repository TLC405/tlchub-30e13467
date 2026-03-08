import type { TrainingAttributes } from "@/data/skillProgressions";
import { Zap, Target, Clock, Stretch, AlertTriangle } from "lucide-react";

const attributeConfig = [
  { key: "strength" as const, label: "STR", color: "bg-red-500", icon: Zap },
  { key: "technique" as const, label: "TECH", color: "bg-blue-500", icon: Target },
  { key: "endurance" as const, label: "END", color: "bg-green-500", icon: Clock },
  { key: "flexibility" as const, label: "FLEX", color: "bg-purple-500", icon: Stretch },
  { key: "tendonLoad" as const, label: "TENDON", color: "bg-amber-500", icon: AlertTriangle },
];

interface AttributeGraphProps {
  attributes: TrainingAttributes;
  compact?: boolean;
}

export function AttributeGraph({ attributes, compact = false }: AttributeGraphProps) {
  if (compact) {
    return (
      <div className="flex gap-1">
        {attributeConfig.map(({ key, color }) => (
          <div key={key} className="flex gap-[1px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-[3px] h-2.5 rounded-[1px] ${
                  i < attributes[key] ? color : "bg-border"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {attributeConfig.map(({ key, label, color }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-muted-foreground w-10 tracking-wider">{label}</span>
          <div className="flex-1 flex gap-[2px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-[2px] transition-colors ${
                  i < attributes[key] ? color : "bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-muted-foreground w-4 text-right">{attributes[key]}</span>
        </div>
      ))}
    </div>
  );
}
