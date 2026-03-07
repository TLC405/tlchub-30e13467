import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MuscleRegion } from "./muscleMapData";
import type { MuscleRole } from "./muscleMapData";

interface MuscleMapTooltipProps {
  muscle: MuscleRegion;
  role: MuscleRole;
  x: number;
  y: number;
  onClose: () => void;
}

const roleBadgeVariant: Record<MuscleRole, string> = {
  primary: "bg-red-500 text-white",
  secondary: "bg-yellow-400 text-black",
  stabilizer: "bg-blue-500 text-white",
  none: "bg-muted text-muted-foreground",
};

const roleLabel: Record<MuscleRole, string> = {
  primary: "Primary",
  secondary: "Secondary",
  stabilizer: "Stabilizer",
  none: "Not Active",
};

export default function MuscleMapTooltip({ muscle, role, x, y, onClose }: MuscleMapTooltipProps) {
  const left = x + 12;
  const top = y - 12;

  return (
    <div
      className="absolute z-20 pointer-events-auto"
      style={{ left, top, maxWidth: 180 }}
    >
      <div className="bg-card border-[2px] border-foreground rounded-[16px] p-3 shadow-lg">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-sm text-foreground leading-tight">{muscle.name}</p>
            <span
              className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleBadgeVariant[role]}`}
            >
              {roleLabel[role]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
          {muscle.aliases.slice(0, 3).join(" · ")}
        </p>
      </div>
    </div>
  );
}
