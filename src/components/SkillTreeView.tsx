import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AttributeGraph } from "./AttributeGraph";
import { muscleDiagrams } from "@/data/muscleDiagrams";
import {
  ChevronLeft, Lock, CheckCircle, Play, Target,
  Dumbbell, ArrowUp, Zap, CircleDot, Star, Flag, Minus,
  TrendingDown, BookOpen, ChevronDown, ChevronUp, Flame,
  Grip, RotateCcw, Hand, Cross, Sparkles, ArrowUpFromLine,
  Trophy, Swords, Shield,
} from "lucide-react";
import { skillProgressions, type SkillTree, type ProgressionStep, type SkillLevel } from "@/data/skillProgressions";
import LearnTab from "@/components/learn/LearnTab";

const PROGRESS_KEY = "calisthenics_skill_progress";

const getSavedProgress = (): Record<string, string[]> => {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
};

const saveProgress = (progress: Record<string, string[]>) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="h-4 w-4" />,
  ArrowUp: <ArrowUp className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  CircleDot: <CircleDot className="h-4 w-4" />,
  Star: <Star className="h-4 w-4" />,
  Flag: <Flag className="h-4 w-4" />,
  Minus: <Minus className="h-4 w-4" />,
  TrendingDown: <TrendingDown className="h-4 w-4" />,
  Flame: <Flame className="h-4 w-4" />,
  Grip: <Grip className="h-4 w-4" />,
  RotateCcw: <RotateCcw className="h-4 w-4" />,
  Hand: <Hand className="h-4 w-4" />,
  Cross: <Cross className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
  ArrowUpFromLine: <ArrowUpFromLine className="h-4 w-4" />,
};

const levelColors: Record<SkillLevel, string> = {
  foundation: "bg-green-600", development: "bg-blue-600",
  advanced: "bg-orange-600", elite: "bg-red-600", peak: "bg-purple-600",
};

const levelLabels: Record<SkillLevel, string> = {
  foundation: "L1", development: "L2",
  advanced: "L3", elite: "L4", peak: "L5",
};

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Trophy className="h-3.5 w-3.5" />,
  push: <Swords className="h-3.5 w-3.5" />,
  pull: <Grip className="h-3.5 w-3.5" />,
  core: <Shield className="h-3.5 w-3.5" />,
  skill: <Sparkles className="h-3.5 w-3.5" />,
};

const getVideoId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

// ─── Compact Step Card ───────────────────────────────────
const StepCard = React.memo(({
  step, globalIndex, isCompleted, isUnlocked, isOpen,
  onToggle, onComplete, treeName,
}: {
  step: ProgressionStep; globalIndex: number;
  isCompleted: boolean; isUnlocked: boolean; isOpen: boolean;
  onToggle: () => void; onComplete: () => void; treeName: string;
}) => {
  const videoId = getVideoId(step.youtubeUrl);

  return (
    <div className={`border rounded-lg overflow-hidden transition-all duration-200 smooth-colors ${
      isCompleted ? "border-green-600/40 bg-green-600/5"
        : isUnlocked ? "border-border hover:border-foreground/20 hover:shadow-medium" : "border-border/50 opacity-50"
    }`}>
      <button className="w-full text-left" onClick={onToggle}>
        <div className="flex items-center gap-3 px-3 py-2.5">
          {/* Video thumbnail */}
          {videoId ? (
            <div className="w-14 h-10 flex-shrink-0 relative rounded overflow-hidden bg-secondary">
              <img
                src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                <Play className="h-3 w-3 text-primary-foreground fill-current" />
              </div>
            </div>
          ) : (
            <div className="w-14 h-10 flex-shrink-0 rounded bg-secondary flex items-center justify-center">
              <Play className="h-3 w-3 text-muted-foreground" />
            </div>
          )}

          {/* Status indicator */}
          <div className={`h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
            isCompleted ? "bg-green-600 text-white" : isUnlocked ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : isUnlocked ? globalIndex + 1 : <Lock className="h-3 w-3" />}
          </div>

          {/* Name + compact attributes */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-semibold truncate ${isCompleted ? "text-green-600" : "text-foreground"}`}>
                {step.name}
              </p>
              <Badge variant="outline" className={`text-[9px] px-1 py-0 ${levelColors[step.level]} text-white border-0`}>
                {levelLabels[step.level]}
              </Badge>
            </div>
            <div className="mt-0.5">
              <AttributeGraph attributes={step.attributes} compact />
            </div>
          </div>

          {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="border-t border-border px-4 py-4 space-y-4 animate-fade-in">
          {videoId && <VideoPlayer videoId={videoId} title={`${step.name} Demo`} />}

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Training Demands</p>
            <AttributeGraph attributes={step.attributes} />
          </div>

          <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-3">
              <TabsTrigger value="training" className="text-xs"><Target className="h-3 w-3 mr-1" />Training</TabsTrigger>
              <TabsTrigger value="learn" className="text-xs"><BookOpen className="h-3 w-3 mr-1" />Learn</TabsTrigger>
            </TabsList>

            <TabsContent value="training" className="space-y-3">
              {step.formCues.length > 0 && (
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Form Cues</h4>
                  <ul className="space-y-0.5">
                    {step.formCues.map((cue, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-green-600 mt-0.5">✓</span>{cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Muscles</h4>
                <div className="flex flex-wrap gap-1">
                  {step.musclesWorked.primary.map((m, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{m}</Badge>
                  ))}
                  {step.musclesWorked.secondary.map((m, i) => (
                    <Badge key={i} variant="outline" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="learn">
              <LearnTab exerciseName={step.name} difficulty={step.level} />
            </TabsContent>
          </Tabs>

          <Button
            className={`w-full rounded-lg ${isCompleted ? "bg-green-600 hover:bg-green-700" : ""}`}
            onClick={onComplete}
            disabled={!isUnlocked}
          >
            {!isUnlocked ? (
              <><Lock className="h-4 w-4 mr-2" />Complete Prerequisites</>
            ) : isCompleted ? (
              <><CheckCircle className="h-4 w-4 mr-2" />Mastered — Reset</>
            ) : (
              <><Target className="h-4 w-4 mr-2" />Mark Mastered</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
});

StepCard.displayName = "StepCard";

// ─── Main Component ──────────────────────────────────────
interface SkillTreeViewProps {
  initialTreeId?: string;
  onNavigate?: (view: string) => void;
}

const SkillTreeView = ({ initialTreeId, onNavigate }: SkillTreeViewProps) => {
  const { toast } = useToast();
  const [selectedTree, setSelectedTree] = useState<SkillTree | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>(getSavedProgress());
  const [filter, setFilter] = useState<"all" | "push" | "pull" | "core" | "skill">("all");

  useEffect(() => {
    if (initialTreeId) {
      const tree = skillProgressions.find((t) => t.id === initialTreeId);
      if (tree) setSelectedTree(tree);
    }
  }, [initialTreeId]);

  const isStepCompleted = (treeId: string, stepId: string) =>
    completedSteps[treeId]?.includes(stepId) || false;

  const isStepUnlocked = (tree: SkillTree, step: ProgressionStep) => {
    if (step.prerequisites.length === 0) return true;
    return step.prerequisites.every((prereqId) => isStepCompleted(tree.id, prereqId));
  };

  const toggleStepComplete = (treeId: string, stepId: string) => {
    setCompletedSteps((prev) => {
      const treeProgress = prev[treeId] || [];
      const newProgress = treeProgress.includes(stepId)
        ? treeProgress.filter((id) => id !== stepId)
        : [...treeProgress, stepId];
      const updated = { ...prev, [treeId]: newProgress };
      saveProgress(updated);
      return updated;
    });
    const step = selectedTree?.progressions.find((p) => p.id === stepId);
    toast({
      title: isStepCompleted(treeId, stepId) ? "Progress Reset" : "Exercise Mastered! 🎉",
      description: step?.name || stepId,
    });
  };

  const getTreeProgress = (tree: SkillTree) => {
    const completed = completedSteps[tree.id]?.length || 0;
    return Math.round((completed / tree.progressions.length) * 100);
  };

  const filteredTrees = useMemo(() =>
    filter === "all" ? skillProgressions : skillProgressions.filter((t) => t.category === filter),
    [filter]
  );

  // ─── Grid View ───────────────────────────────────────────
  if (!selectedTree) {
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Skill Paths</h1>
              <p className="text-[10px] text-muted-foreground">{skillProgressions.length} paths · Foundation → Peak</p>
            </div>
          </div>
        </div>

        {/* Category filter chips with icons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {(["all", "push", "pull", "core", "skill"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoryIcons[cat]}
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2">
          {filteredTrees.map((tree) => {
            const progress = getTreeProgress(tree);
            const completed = completedSteps[tree.id]?.length || 0;

            return (
              <button
                key={tree.id}
                className="text-left border border-border rounded-lg p-3 hover:border-foreground/30 transition-all duration-200 hover:shadow-md bg-card active:scale-[0.98]"
                onClick={() => setSelectedTree(tree)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {muscleDiagrams[tree.id] ? (
                    <img src={muscleDiagrams[tree.id]} alt="" className="w-10 h-10 object-contain rounded bg-secondary/30 p-0.5" loading="lazy" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center">
                      {iconMap[tree.icon] || <Dumbbell className="h-4 w-4" />}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold truncate">{tree.name}</p>
                    <p className="text-[10px] text-muted-foreground">{completed}/{tree.progressions.length}</p>
                  </div>
                </div>
                <Progress value={progress} className="h-1" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Progression Detail View ─────────────────────────────
  const currentTree = selectedTree;

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Sticky header */}
      <div className="flex items-center gap-3 sticky top-0 z-10 bg-background py-2 -mx-1 px-1">
        <Button variant="ghost" size="sm" onClick={() => { setSelectedTree(null); setExpandedStep(null); }} className="h-8 w-8 p-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {muscleDiagrams[currentTree.id] ? (
          <img src={muscleDiagrams[currentTree.id]} alt="" className="w-10 h-10 rounded object-contain bg-secondary/30 p-0.5" />
        ) : (
          <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center">
            {iconMap[currentTree.icon] || <Dumbbell className="h-4 w-4" />}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold truncate">{currentTree.name}</h2>
          <div className="flex items-center gap-2">
            <Progress value={getTreeProgress(currentTree)} className="h-1.5 flex-1" />
            <span className="text-[10px] text-muted-foreground font-mono">
              {completedSteps[currentTree.id]?.length || 0}/{currentTree.progressions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div className="flex items-center gap-2 px-1">
        <Target className="h-3 w-3 text-primary" />
        <span className="text-xs text-muted-foreground">Goal: {currentTree.eliteGoal}</span>
      </div>

      {/* Steps */}
      <div className="space-y-1.5">
        {currentTree.progressions.map((step, globalIndex) => (
          <StepCard
            key={step.id}
            step={step}
            globalIndex={globalIndex}
            isCompleted={isStepCompleted(currentTree.id, step.id)}
            isUnlocked={isStepUnlocked(currentTree, step)}
            isOpen={expandedStep === step.id}
            onToggle={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
            onComplete={() => toggleStepComplete(currentTree.id, step.id)}
            treeName={currentTree.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillTreeView;
