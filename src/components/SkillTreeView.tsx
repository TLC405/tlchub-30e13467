import * as React from "react";
import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { NonNegotiables } from "./NonNegotiables";
import { AttributeGraph } from "./AttributeGraph";
import { muscleDiagrams } from "@/data/muscleDiagrams";
import {
  ChevronLeft, ChevronRight, Lock, CheckCircle, Play, Target,
  Clock, Dumbbell, ArrowUp, Zap, CircleDot, Star, Flag, Minus,
  TrendingDown, AlertCircle, BookOpen, ChevronDown, ChevronUp,
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
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  ArrowUp: <ArrowUp className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  CircleDot: <CircleDot className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
  Flag: <Flag className="h-5 w-5" />,
  Minus: <Minus className="h-5 w-5" />,
  TrendingDown: <TrendingDown className="h-5 w-5" />,
};

const levelColors: Record<SkillLevel, string> = {
  foundation: "bg-green-600", development: "bg-blue-600",
  advanced: "bg-orange-600", elite: "bg-red-600", peak: "bg-purple-600",
};

const levelLabels: Record<SkillLevel, string> = {
  foundation: "L1 Foundation", development: "L2 Development",
  advanced: "L3 Advanced", elite: "L4 Elite", peak: "L5 Peak",
};

const allLevels: SkillLevel[] = ["foundation", "development", "advanced", "elite", "peak"];

const getVideoId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

interface SkillTreeViewProps {
  initialTreeId?: string;
  onNavigate?: (view: string) => void;
}

const SkillTreeView = ({ initialTreeId, onNavigate }: SkillTreeViewProps) => {
  const { toast } = useToast();
  const [selectedTree, setSelectedTree] = useState<SkillTree | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>(getSavedProgress());

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

  const getCurrentLevel = (tree: SkillTree): SkillLevel => {
    const treeProgress = completedSteps[tree.id] || [];
    if (treeProgress.length === 0) return "foundation";
    const lastCompleted = tree.progressions.filter((p) => treeProgress.includes(p.id)).pop();
    return lastCompleted?.level || "foundation";
  };

  // ─── Grid View ───────────────────────────────────────────
  if (!selectedTree) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-4 space-y-2">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Skill Trees</h1>
          <p className="text-sm text-muted-foreground">9 paths from foundation to peak</p>
        </div>

        <NonNegotiables compact />

        <div className="space-y-3">
          {skillProgressions.map((tree) => {
            const progress = getTreeProgress(tree);
            const currentLevel = getCurrentLevel(tree);

            return (
              <Card
                key={tree.id}
                className="border border-border rounded-lg cursor-pointer hover:border-foreground/30 transition-colors overflow-hidden"
                onClick={() => setSelectedTree(tree)}
              >
                <div className="flex">
                  {muscleDiagrams[tree.id] && (
                    <div className="w-24 h-24 flex-shrink-0 bg-secondary/30 flex items-center justify-center p-1">
                      <img src={muscleDiagrams[tree.id]} alt={`${tree.name}`} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center bg-card">
                            {iconMap[tree.icon] || <Dumbbell className="h-5 w-5" />}
                          </div>
                          <div>
                            <CardTitle className="text-base font-bold">{tree.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{tree.progressions.length} levels</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <div className="flex items-center gap-2">
                        <Badge className={`${levelColors[currentLevel]} text-white`}>{levelLabels[currentLevel]}</Badge>
                        <span className="text-xs text-muted-foreground">{completedSteps[tree.id]?.length || 0}/{tree.progressions.length}</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Progression List View (with inline expand) ──────────
  return (
    <div className="space-y-4 animate-fade-in">
      <Button variant="outline" onClick={() => { setSelectedTree(null); setExpandedStep(null); }} className="rounded-lg">
        <ChevronLeft className="h-4 w-4 mr-2" />
        All Skill Trees
      </Button>

      <Card className="border border-border rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            {muscleDiagrams[selectedTree.id] && (
              <img src={muscleDiagrams[selectedTree.id]} alt={selectedTree.name} className="w-14 h-14 rounded-lg object-contain bg-secondary/30 p-1" />
            )}
            <div className="flex-1">
              <CardTitle className="text-xl font-bold">{selectedTree.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedTree.description}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Peak</span>
              <span className="font-medium">{completedSteps[selectedTree.id]?.length || 0}/{selectedTree.progressions.length}</span>
            </div>
            <Progress value={getTreeProgress(selectedTree)} className="h-3" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Goal: {selectedTree.eliteGoal}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Exercises — expand-down, video + attributes inline */}
      <div className="space-y-3">
        {allLevels.map((level) => {
          const levelSteps = selectedTree.progressions.filter((p) => p.level === level);
          if (levelSteps.length === 0) return null;

          return (
            <div key={level} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={`${levelColors[level]} text-white`}>{levelLabels[level]}</Badge>
                <span className="text-xs text-muted-foreground">
                  {levelSteps.filter((s) => isStepCompleted(selectedTree.id, s.id)).length}/{levelSteps.length}
                </span>
              </div>

              {levelSteps.map((step) => {
                const isCompleted = isStepCompleted(selectedTree.id, step.id);
                const isUnlocked = isStepUnlocked(selectedTree, step);
                const globalIndex = selectedTree.progressions.findIndex((p) => p.id === step.id);
                const isOpen = expandedStep === step.id;
                const videoId = getVideoId(step.youtubeUrl);

                return (
                  <div
                    key={step.id}
                    className={`border rounded-lg overflow-hidden transition-colors ${
                      isCompleted ? "border-primary/50 bg-primary/5"
                        : isUnlocked ? "border-border" : "border-border opacity-60"
                    }`}
                  >
                    {/* Card header with video thumbnail */}
                    <button
                      className="w-full text-left"
                      onClick={() => setExpandedStep(isOpen ? null : step.id)}
                    >
                      <div className="flex">
                        {/* Video thumbnail */}
                        {videoId && (
                          <div className="w-28 h-20 flex-shrink-0 relative bg-secondary">
                            <img
                              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                              alt={step.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                <Play className="h-2.5 w-2.5 text-primary-foreground ml-0.5" />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex-1 min-w-0 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className={`h-6 w-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isCompleted ? "bg-green-600/10 text-green-600" : isUnlocked ? "bg-card text-foreground border border-border" : "bg-muted text-muted-foreground"
                            }`}>
                              {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : isUnlocked ? globalIndex + 1 : <Lock className="h-3 w-3" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${isCompleted ? "text-green-600" : isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                                {step.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground truncate">{step.description}</p>
                            </div>
                            {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                          </div>

                          {/* Compact attribute bars */}
                          <div className="mt-1.5">
                            <AttributeGraph attributes={step.attributes} compact />
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded detail — inline */}
                    {isOpen && (
                      <div className="border-t border-border px-4 py-4 space-y-4 animate-fade-in">
                        {/* Video player */}
                        {videoId && (
                          <VideoPlayer videoId={videoId} title={`${step.name} Demo`} />
                        )}

                        {/* Full attribute graph */}
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-foreground uppercase tracking-wider">Training Demands</p>
                          <AttributeGraph attributes={step.attributes} />
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="training" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="training" className="text-xs"><Target className="h-3 w-3 mr-1" />Training</TabsTrigger>
                            <TabsTrigger value="learn" className="text-xs"><BookOpen className="h-3 w-3 mr-1" />Learn</TabsTrigger>
                          </TabsList>

                          <TabsContent value="training" className="space-y-4">
                            {step.formCues.length > 0 && (
                              <div className="space-y-1">
                                <h4 className="font-bold text-xs flex items-center gap-2 text-foreground">
                                  <CheckCircle className="h-3.5 w-3.5 text-green-600" /> Form Cues
                                </h4>
                                <ul className="space-y-0.5">
                                  {step.formCues.map((cue, i) => (
                                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                      <span className="text-green-600 mt-0.5">✓</span>{cue}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="space-y-1">
                              <h4 className="font-bold text-xs flex items-center gap-2 text-foreground">
                                <Dumbbell className="h-3.5 w-3.5" /> Muscles
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {step.musclesWorked.primary.map((m, i) => (
                                  <Badge key={i} variant="secondary" className="text-[10px]">{m}</Badge>
                                ))}
                                {step.musclesWorked.secondary.map((m, i) => (
                                  <Badge key={i} variant="outline" className="text-[10px]">{m}</Badge>
                                ))}
                              </div>
                            </div>

                            {step.prerequisites.length > 0 && (
                              <div className="space-y-1">
                                <h4 className="font-bold text-xs flex items-center gap-2 text-foreground">
                                  <Lock className="h-3.5 w-3.5" /> Prerequisites
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {step.prerequisites.map((prereqId) => {
                                    const prereq = selectedTree.progressions.find((p) => p.id === prereqId);
                                    const done = isStepCompleted(selectedTree.id, prereqId);
                                    return prereq ? (
                                      <Badge key={prereqId} variant={done ? "default" : "outline"} className={done ? "bg-green-600" : ""}>
                                        {done && <CheckCircle className="h-3 w-3 mr-1" />}{prereq.name}
                                      </Badge>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="learn">
                            <LearnTab exerciseName={step.name} difficulty={step.level} />
                          </TabsContent>
                        </Tabs>

                        <Button
                          className={`w-full rounded-lg ${isCompleted ? "bg-green-600 hover:bg-green-700" : ""}`}
                          onClick={() => toggleStepComplete(selectedTree.id, step.id)}
                          disabled={!isUnlocked}
                        >
                          {!isUnlocked ? (
                            <><Lock className="h-4 w-4 mr-2" />Complete Prerequisites First</>
                          ) : isCompleted ? (
                            <><CheckCircle className="h-4 w-4 mr-2" />Mastered — Click to Reset</>
                          ) : (
                            <><Target className="h-4 w-4 mr-2" />Mark as Mastered</>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillTreeView;
