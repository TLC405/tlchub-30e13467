import { useState, useRef } from "react";
import { muscleRegions, matchMusclesToRegions, type MuscleRole } from "./muscleMapData";
import MuscleMapTooltip from "./MuscleMapTooltip";

interface ActiveMuscles {
  primary: string[];
  secondary: string[];
  stabilizers: string[];
}

interface MuscleMapProps {
  activeMuscles?: ActiveMuscles;
  onMuscleClick?: (muscleId: string) => void;
  compact?: boolean;
}

const roleColors: Record<MuscleRole, string> = {
  primary: "rgba(239,68,68,0.75)",
  secondary: "rgba(251,191,36,0.55)",
  stabilizer: "rgba(59,130,246,0.25)",
  none: "rgba(120,120,140,0.2)",
};

const roleStroke: Record<MuscleRole, string> = {
  primary: "rgba(239,68,68,0.9)",
  secondary: "rgba(251,191,36,0.8)",
  stabilizer: "rgba(59,130,246,0.7)",
  none: "rgba(150,150,170,0.4)",
};

const roleStrokeWidth: Record<MuscleRole, number> = {
  primary: 1.5,
  secondary: 1,
  stabilizer: 2,
  none: 0.5,
};

function BodyOutline({ view }: { view: 'front' | 'back' }) {
  return (
    <g opacity="0.15" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Head */}
      <ellipse cx="100" cy="56" rx="18" ry="22" />
      {/* Neck */}
      <rect x="93" y="77" width="14" height="12" rx="4" />
      {/* Torso */}
      <path d="M 64,90 Q 56,92 52,114 Q 48,148 52,172 Q 58,184 100,186 Q 142,184 148,172 Q 152,148 148,114 Q 144,92 136,90 Z" />
      {/* Left arm */}
      <path d="M 64,92 Q 46,96 40,116 Q 34,140 36,172 Q 38,184 44,186 Q 50,186 52,174 Q 54,152 52,128 Q 52,108 64,100 Z" />
      {/* Right arm */}
      <path d="M 136,92 Q 154,96 160,116 Q 166,140 164,172 Q 162,184 156,186 Q 150,186 148,174 Q 146,152 148,128 Q 148,108 136,100 Z" />
      {/* Left leg */}
      <path d="M 72,186 Q 62,190 60,224 Q 58,260 60,286 Q 62,318 68,336 Q 74,346 80,344 Q 86,342 86,328 Q 86,308 84,284 Q 84,260 88,236 Q 92,210 92,196 Z" />
      {/* Right leg */}
      <path d="M 128,186 Q 138,190 140,224 Q 142,260 140,286 Q 138,318 132,336 Q 126,346 120,344 Q 114,342 114,328 Q 114,308 116,284 Q 116,260 112,236 Q 108,210 108,196 Z" />
    </g>
  );
}

export default function MuscleMapViewer({ activeMuscles, onMuscleClick, compact = false }: MuscleMapProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const highlights = activeMuscles
    ? matchMusclesToRegions(activeMuscles.primary, activeMuscles.secondary, activeMuscles.stabilizers)
    : [];

  const getMuscleRole = (muscleId: string): MuscleRole => {
    const h = highlights.find((x) => x.muscleId === muscleId);
    return h ? h.role : 'none';
  };

  const visibleRegions = muscleRegions.filter((r) => r.view === view);

  const handleMuscleClick = (muscleId: string, evt: React.MouseEvent) => {
    setSelectedMuscle(selectedMuscle === muscleId ? null : muscleId);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({ x: evt.clientX - rect.left, y: evt.clientY - rect.top });
    }
    onMuscleClick?.(muscleId);
  };

  const selectedRegion = selectedMuscle ? muscleRegions.find((r) => r.id === selectedMuscle) : null;
  const selectedRole = selectedMuscle ? getMuscleRole(selectedMuscle) : 'none';

  const svgSize = compact ? 140 : 240;

  return (
    <div className={`flex flex-col items-center gap-2 ${compact ? '' : 'gap-3'}`}>
      {/* View toggle */}
      {!compact && (
        <div className="flex rounded-[12px] border-[2px] border-foreground overflow-hidden">
          <button
            onClick={() => { setView('front'); setSelectedMuscle(null); }}
            className={`px-3 py-1 text-xs font-semibold transition-colors ${view === 'front' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Front
          </button>
          <button
            onClick={() => { setView('back'); setSelectedMuscle(null); }}
            className={`px-3 py-1 text-xs font-semibold transition-colors ${view === 'back' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Back
          </button>
        </div>
      )}

      {/* SVG Body */}
      <div className="relative">
        <svg
          ref={svgRef}
          width={svgSize}
          height={compact ? svgSize * 1.9 : svgSize * 1.75}
          viewBox="20 40 160 320"
          className="text-foreground"
        >
          <BodyOutline view={view} />
          {visibleRegions.map((region) => {
            const role = getMuscleRole(region.id);
            const isHovered = hoveredMuscle === region.id;
            const isSelected = selectedMuscle === region.id;
            const isActive = role !== 'none';

            return (
              <path
                key={region.id}
                d={region.svgPath}
                data-muscle={region.id}
                fill={isHovered || isSelected ? roleColors[isActive ? role : 'primary'] : roleColors[role]}
                stroke={roleStroke[role]}
                strokeWidth={roleStrokeWidth[role]}
                style={{
                  transition: 'fill 0.25s ease, stroke 0.25s ease',
                  cursor: 'pointer',
                  opacity: isHovered || isSelected ? 1 : isActive ? 0.85 : 0.6,
                  filter: (isHovered || isSelected) && isActive
                    ? `drop-shadow(0 0 ${role === 'primary' ? '6' : '4'}px ${role === 'primary' ? 'rgba(239,68,68,0.6)' : role === 'secondary' ? 'rgba(251,191,36,0.5)' : 'rgba(59,130,246,0.4)'})`
                    : 'none',
                }}
                onMouseEnter={() => setHoveredMuscle(region.id)}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={(e) => handleMuscleClick(region.id, e)}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {selectedRegion && !compact && (
          <MuscleMapTooltip
            muscle={selectedRegion}
            role={selectedRole}
            x={tooltipPos.x}
            y={tooltipPos.y}
            onClose={() => setSelectedMuscle(null)}
          />
        )}
      </div>

      {/* Compact toggle (small) */}
      {compact && (
        <div className="flex gap-1">
          <button
            onClick={() => { setView('front'); setSelectedMuscle(null); }}
            className={`px-2 py-0.5 text-[9px] font-semibold rounded border transition-colors ${view === 'front' ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground'}`}
          >
            F
          </button>
          <button
            onClick={() => { setView('back'); setSelectedMuscle(null); }}
            className={`px-2 py-0.5 text-[9px] font-semibold rounded border transition-colors ${view === 'back' ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground'}`}
          >
            B
          </button>
        </div>
      )}

      {/* Legend (non-compact only) */}
      {!compact && activeMuscles && (
        <div className="flex flex-wrap gap-2 justify-center text-[10px]">
          {activeMuscles.primary.length > 0 && (
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Primary</span>
          )}
          {activeMuscles.secondary.length > 0 && (
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />Secondary</span>
          )}
          {activeMuscles.stabilizers.length > 0 && (
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />Stabilizer</span>
          )}
        </div>
      )}
    </div>
  );
}
