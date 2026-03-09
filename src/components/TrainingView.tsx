import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { nonNegotiables, stackedWeek, integrityBlocks, APP_POWERED_BY } from "@/data/controlContent";
import { skillProgressions } from "@/data/skillProgressions";
import { muscleDiagrams } from "@/data/muscleDiagrams";
import type { TrainingBlock } from "@/data/controlContent";
import {
  Dumbbell, ArrowUp, Zap, Target, Star, ChevronDown, ChevronUp,
  Shield, Heart, Clock, CircleDot, CheckCircle, Play, ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  ArrowUp: <ArrowUp className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
};

const getTodayDay = (): number => {
  const key = "control_stacked_day";
  const saved = localStorage.getItem(key);
  if (saved) {
    const { day, date } = JSON.parse(saved);
    const today = new Date().toDateString();
    if (date === today) return day;
    const next = (day + 1) % 5;
    localStorage.setItem(key, JSON.stringify({ day: next, date: today }));
    return next;
  }
  localStorage.setItem(key, JSON.stringify({ day: 0, date: new Date().toDateString() }));
  return 0;
};

// Resolve skill tree details for a block action
function getSkillTreeForAction(action?: TrainingBlock["action"]) {
  if (!action || action.type !== "skill" || !action.treeId) return null;
  return skillProgressions.find((t) => t.id === action.treeId) || null;
}

function getIntegrityForAction(action?: TrainingBlock["action"]) {
  if (!action || action.type !== "integrity" || !action.blockId) return null;
  return integrityBlocks.find((b) => b.id === action.blockId) || null;
}

interface TrainingViewProps {
  onNavigate: (view: string) => void;
}

const TrainingView = ({ onNavigate }: TrainingViewProps) => {
  const { toast } = useToast();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean[]>>({});
  const [painFlags, setPainFlags] = useState<Record<string, boolean[]>>({});
  const todayIndex = getTodayDay();

  const toggleBlock = (dayId: string, blockIndex: number) => {
    setCompletedBlocks((prev) => {
      const blocks = [...(prev[dayId] || [])];
      blocks[blockIndex] = !blocks[blockIndex];
      return { ...prev, [dayId]: blocks };
    });
  };

  const flagPain = (dayId: string, blockIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPainFlags((prev) => {
      const flags = [...(prev[dayId] || [])];
      flags[blockIndex] = !flags[blockIndex];
      return { ...prev, [dayId]: flags };
    });
    toast({ title: "Pain flagged", description: "Consider a regression.", variant: "destructive" });
  };

  const blockKey = (dayId: string, i: number) => `${dayId}-${i}`;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="py-3 space-y-1">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Train</h1>
        <p className="text-sm text-muted-foreground">Expand a day. See the work.</p>
      </div>

      {/* Non-Negotiables — integrated bar */}
      <div className="flex items-center gap-2 py-2 px-3 border border-border rounded-lg bg-card">
        <Shield className="h-4 w-4 text-primary flex-shrink-0" />
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          {nonNegotiables.map((nn) => (
            <span key={nn.id} className="text-[11px] font-semibold text-foreground">
              {nn.title}
            </span>
          ))}
        </div>
      </div>

      {/* Days — accordion */}
      <div className="space-y-2">
        {stackedWeek.map((day, index) => {
          const isToday = index === todayIndex;
          const isOpen = expandedDay === day.id;
          const blocks = completedBlocks[day.id] || [];
          const completed = blocks.filter(Boolean).length;

          return (
            <div
              key={day.id}
              className={`border rounded-lg overflow-hidden transition-colors ${
                isOpen ? "border-primary bg-card" : isToday ? "border-primary/50" : "border-border"
              } ${day.optional ? "opacity-70 border-dashed" : ""}`}
            >
              {/* Day header */}
              <button
                onClick={() => setExpandedDay(isOpen ? null : day.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-all duration-200 smooth-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg border border-border flex items-center justify-center bg-background transition-transform duration-200 hover:scale-105">
                    {iconMap[day.icon]}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{day.label} — {day.title}</span>
                      {isToday && (
                        <Badge className="bg-primary text-primary-foreground text-[9px] px-1.5 py-0 rounded animate-pulse-glow">TODAY</Badge>
                      )}
                      {day.optional && (
                        <Badge variant="outline" className="text-[9px] rounded border-border">Optional</Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{day.emphasis}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completed > 0 && (
                    <span className="text-[10px] text-primary font-semibold animate-fade-in">{completed}/{day.blocks.length}</span>
                  )}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Expanded blocks */}
              {isOpen && (
                <div className="border-t border-border animate-accordion-down">
                  {day.blocks.map((block, i) => {
                    const isDone = blocks[i] || false;
                    const isPain = (painFlags[day.id] || [])[i] || false;
                    const bKey = blockKey(day.id, i);
                    const isBlockOpen = expandedBlock === bKey;
                    const skillTree = getSkillTreeForAction(block.action);
                    const integrity = getIntegrityForAction(block.action);

                    return (
                      <div 
                        key={i} 
                        className={`border-b border-border last:border-b-0 transition-all duration-200 ${isPain ? "bg-destructive/5 animate-shake" : ""} stagger-item`}
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {/* Block row */}
                        <div className="flex items-center gap-2 px-4 py-2.5">
                          {/* Complete toggle */}
                          <button
                            onClick={() => toggleBlock(day.id, i)}
                            className={`h-5 w-5 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-200 ${
                              isDone ? "border-primary bg-primary/10" : "border-border hover:border-foreground/40"
                            }`}
                          >
                            {isDone && <CheckCircle className="h-3 w-3 text-primary animate-scale-bounce" />}
                          </button>

                          {/* Label — tappable to expand */}
                          <button
                            onClick={() => setExpandedBlock(isBlockOpen ? null : bKey)}
                            className={`flex-1 text-left text-sm font-medium transition-colors ${
                              isDone ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {block.label}
                          </button>

                          {/* Indicators */}
                          <div className="flex items-center gap-1.5">
                            {(skillTree || integrity) && (
                              <ChevronDown className={`h-3.5 w-3.5 text-primary transition-transform ${isBlockOpen ? "rotate-180" : ""}`} />
                            )}
                            <button
                              onClick={(e) => flagPain(day.id, i, e)}
                              className={`h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                                isPain ? "bg-destructive text-destructive-foreground" : "hover:bg-destructive/10 text-muted-foreground"
                              }`}
                              title="Flag pain"
                            >
                              <CircleDot className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded detail — inline, no popup */}
                        {isBlockOpen && (skillTree || integrity) && (
                          <div className="px-4 pb-3 animate-fade-in">
                            {skillTree && <SkillTreeInline tree={skillTree} onNavigate={onNavigate} />}
                            {integrity && <IntegrityInline block={integrity} />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Integrity Blocks — quick access */}
      <IntegrityQuickAccess />

      <p className="text-[10px] text-center text-primary font-semibold">{APP_POWERED_BY}</p>
    </div>
  );
};

/* ── Skill Tree Inline ────────────────────────────── */
function SkillTreeInline({ tree, onNavigate }: { tree: ReturnType<typeof getSkillTreeForAction> & {}; onNavigate: (v: string) => void }) {
  const diagram = muscleDiagrams[tree.id];
  return (
    <div className="border border-border rounded-lg bg-background p-3 space-y-2">
      <div className="flex items-center gap-3">
        {diagram && (
          <img src={diagram} alt={tree.name} className="w-10 h-10 rounded object-contain bg-secondary/30 p-0.5" loading="lazy" />
        )}
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground">{tree.name}</p>
          <p className="text-[10px] text-muted-foreground">{tree.description}</p>
        </div>
      </div>
      <div className="space-y-1">
        {tree.progressions.map((step) => (
          <div key={step.id} className="flex items-center gap-2 text-[11px]">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              step.levelNumber <= 2 ? "bg-primary" : "bg-border"
            }`} />
            <span className="text-foreground font-medium">{step.name}</span>
            <span className="text-muted-foreground capitalize">— {step.level}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => onNavigate(`skills:${tree.id}`)}
        className="text-[11px] text-primary font-semibold hover:underline flex items-center gap-1"
      >
        Full Skill Path <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  );
}

/* ── Integrity Inline ─────────────────────────────── */
function IntegrityInline({ block }: { block: NonNullable<ReturnType<typeof getIntegrityForAction>> }) {
  return (
    <div className="border border-border rounded-lg bg-background p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Heart className="h-4 w-4 text-primary" />
        <p className="text-xs font-bold text-foreground">{block.title}</p>
        <span className="text-[10px] text-muted-foreground">{block.duration}</span>
      </div>
      <p className="text-[11px] text-muted-foreground">{block.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {block.drills.map((d, i) => (
          <span key={i} className="text-[10px] bg-muted rounded px-2 py-0.5 text-foreground">{d}</span>
        ))}
      </div>
      {block.cues.length > 0 && (
        <div className="space-y-0.5">
          {block.cues.map((c, i) => (
            <p key={i} className="text-[10px] text-muted-foreground">
              <span className="text-primary mr-1">→</span>{c}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Integrity Quick Access ───────────────────────── */
function IntegrityQuickAccess() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 px-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm text-foreground">Integrity Blocks</span>
          <Badge variant="outline" className="text-[9px] rounded border-border">Mobility · Yoga</Badge>
        </div>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="mt-1.5 space-y-1.5">
          {integrityBlocks.map((block) => (
            <IntegrityQuickCard key={block.id} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

function IntegrityQuickCard({ block }: { block: typeof integrityBlocks[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Heart className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-sm text-foreground">{block.title}</span>
          <span className="text-[10px] text-muted-foreground">{block.duration}</span>
        </div>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <div className="px-4 pb-3 space-y-2 animate-fade-in">
          <p className="text-[11px] text-muted-foreground">{block.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {block.drills.map((d, i) => (
              <span key={i} className="text-[10px] bg-muted rounded px-2 py-0.5 text-foreground">{d}</span>
            ))}
          </div>
          {block.cues.map((c, i) => (
            <p key={i} className="text-[10px] text-muted-foreground">
              <span className="text-primary mr-1">→</span>{c}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainingView;
