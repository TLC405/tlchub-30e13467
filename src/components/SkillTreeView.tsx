import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { NonNegotiables } from "./NonNegotiables";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle,
  Play,
  Target,
  Clock,
  Dumbbell,
  ArrowUp,
  Zap,
  CircleDot,
  Star,
  Flag,
  Minus,
  TrendingDown,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { skillProgressions, type SkillTree, type ProgressionStep } from "@/data/skillProgressions";
import LearnTab from "@/components/learn/LearnTab";

const PROGRESS_KEY = "calisthenics_skill_progress";

const getSavedProgress = (): Record<string, string[]> => {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
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

const levelColors: Record<string, string> = {
  beginner: "bg-green-600",
  intermediate: "bg-blue-600",
  advanced: "bg-orange-600",
  elite: "bg-red-600",
};

const levelLabels: Record<string, string> = {
  beginner: "L1 Beginner",
  intermediate: "L2 Intermediate",
  advanced: "L3 Advanced",
  elite: "L4 Elite",
};

interface SkillTreeViewProps {
  initialTreeId?: string;
  onNavigate?: (view: string) => void;
}

const SkillTreeView = ({ initialTreeId, onNavigate }: SkillTreeViewProps) => {
  const { toast } = useToast();
  const [selectedTree, setSelectedTree] = useState<SkillTree | null>(null);
  const [selectedStep, setSelectedStep] = useState<ProgressionStep | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>(getSavedProgress());

  useEffect(() => {
    if (initialTreeId) {
      const tree = skillProgressions.find((t) => t.id === initialTreeId);
      if (tree) setSelectedTree(tree);
    }
  }, [initialTreeId]);

  const isStepCompleted = (treeId: string, stepId: string) => {
    return completedSteps[treeId]?.includes(stepId) || false;
  };

  const isStepUnlocked = (tree: SkillTree, step: ProgressionStep) => {
    if (step.prerequisites.length === 0) return true;
    return step.prerequisites.every((prereqId) => isStepCompleted(tree.id, prereqId));
  };

  const toggleStepComplete = (treeId: string, stepId: string) => {
    setCompletedSteps((prev) => {
      const treeProgress = prev[treeId] || [];
      let newProgress: string[];
      if (treeProgress.includes(stepId)) {
        newProgress = treeProgress.filter((id) => id !== stepId);
      } else {
        newProgress = [...treeProgress, stepId];
      }
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

  const getCurrentLevel = (tree: SkillTree): string => {
    const treeProgress = completedSteps[tree.id] || [];
    if (treeProgress.length === 0) return "beginner";
    const lastCompleted = tree.progressions
      .filter((p) => treeProgress.includes(p.id))
      .pop();
    return lastCompleted?.level || "beginner";
  };

  // ─── Grid View ───────────────────────────────────────────────
  if (!selectedTree) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4 space-y-2">
          <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
            Skill Trees
          </h1>
          <p className="text-sm text-muted-foreground">
            Master each progression from beginner to elite
          </p>
        </div>

        <NonNegotiables compact />

        <div className="space-y-4 stagger-children">
          {skillProgressions.map((tree) => {
            const progress = getTreeProgress(tree);
            const currentLevel = getCurrentLevel(tree);

            return (
              <Card
                key={tree.id}
                className="border-[3px] border-foreground rounded-[24px] cursor-pointer hover:bg-muted/30 transition-colors card-lift"
                onClick={() => setSelectedTree(tree)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-[12px] border-[2px] border-foreground flex items-center justify-center bg-card">
                        {iconMap[tree.icon]}
                      </div>
                      <div>
                        <CardTitle className="font-serif text-lg font-bold">
                          {tree.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {tree.progressions.length} progressions
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tree.description}</p>

                  <div className="flex items-center gap-2">
                    <Badge className={`${levelColors[currentLevel]} text-primary-foreground`}>
                      {levelLabels[currentLevel]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Current Level</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>
                        {completedSteps[tree.id]?.length || 0}/{tree.progressions.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Target className="h-3 w-3" />
                    <span>Goal: {tree.eliteGoal}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Exercise Detail View ────────────────────────────────────
  if (selectedStep) {
    const isCompleted = isStepCompleted(selectedTree.id, selectedStep.id);
    const isUnlocked = isStepUnlocked(selectedTree, selectedStep);
    const stepIndex = selectedTree.progressions.findIndex((p) => p.id === selectedStep.id);

    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setSelectedStep(null)}
          className="border-[2px] border-foreground rounded-[16px]"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to {selectedTree.name}
        </Button>

        <Card className="border-[3px] border-foreground rounded-[24px]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-[12px] border-[2px] flex items-center justify-center font-bold ${
                  isCompleted
                    ? "border-green-600 bg-green-600/10 text-green-600"
                    : "border-foreground bg-card text-foreground"
                }`}
              >
                {isCompleted ? <CheckCircle className="h-5 w-5" /> : stepIndex + 1}
              </div>
              <div>
                <CardTitle className="font-serif text-xl font-bold">{selectedStep.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${levelColors[selectedStep.level]} text-primary-foreground`}>
                    {levelLabels[selectedStep.level]}
                  </Badge>
                  {selectedStep.level === "elite" && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-dashed border-destructive/40 rounded-full font-mono"
                    >
                      Coming Soon
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    ~{selectedStep.estimatedWeeksToMaster} weeks
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedStep.description}</p>

            {/* Watch Demo */}
            {selectedStep.videoUrl && (
              <Button
                variant="outline"
                className="border-[2px] border-foreground rounded-[16px] w-full"
                onClick={() => window.open(selectedStep.videoUrl, "_blank", "noopener")}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Demo — {selectedStep.videoSource || "Video"}
              </Button>
            )}

            <Tabs defaultValue="training" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="training" className="text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  Training
                </TabsTrigger>
                <TabsTrigger value="learn" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Learn
                </TabsTrigger>
              </TabsList>

              <TabsContent value="training" className="space-y-6">
                {/* Training Parameters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Sets", value: selectedStep.sets },
                    { label: "Reps", value: selectedStep.reps },
                    { label: "Rest", value: selectedStep.restTime },
                    ...(selectedStep.holdTime ? [{ label: "Hold", value: selectedStep.holdTime }] : []),
                  ].map((param) => (
                    <div
                      key={param.label}
                      className="border-[2px] border-foreground rounded-[16px] p-3 text-center bg-card"
                    >
                      <p className="text-xs text-muted-foreground mb-1">{param.label}</p>
                      <p className="font-bold text-lg text-foreground">{param.value}</p>
                    </div>
                  ))}
                </div>

                {/* Form Cues */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Form Cues
                  </h4>
                  <ul className="space-y-1">
                    {selectedStep.formCues.map((cue, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold flex items-center gap-2 text-foreground">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    Common Mistakes
                  </h4>
                  <ul className="space-y-1">
                    {selectedStep.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive mt-1">✗</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Muscles Worked */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold flex items-center gap-2 text-foreground">
                    <Dumbbell className="h-4 w-4" />
                    Muscles Worked
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Primary</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedStep.musclesWorked.primary.map((muscle, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Secondary</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedStep.musclesWorked.secondary.map((muscle, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                {selectedStep.prerequisites.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold flex items-center gap-2 text-foreground">
                      <Lock className="h-4 w-4" />
                      Prerequisites
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStep.prerequisites.map((prereqId) => {
                        const prereq = selectedTree.progressions.find((p) => p.id === prereqId);
                        const prereqCompleted = isStepCompleted(selectedTree.id, prereqId);
                        return prereq ? (
                          <Badge
                            key={prereqId}
                            variant={prereqCompleted ? "default" : "outline"}
                            className={prereqCompleted ? "bg-green-600" : ""}
                          >
                            {prereqCompleted && <CheckCircle className="h-3 w-3 mr-1" />}
                            {prereq.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Next Progression */}
                {selectedStep.nextProgression && (
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold flex items-center gap-2 text-foreground">
                      <ChevronRight className="h-4 w-4" />
                      Next Progression
                    </h4>
                    <Badge variant="outline" className="text-sm border-[2px] border-foreground/30 rounded-full">
                      {selectedTree.progressions.find((p) => p.id === selectedStep.nextProgression)?.name}
                    </Badge>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="learn">
                <LearnTab exerciseName={selectedStep.name} difficulty={selectedStep.level} />
              </TabsContent>
            </Tabs>

            {/* Action Button */}
            <Button
              className={`w-full border-[2px] rounded-[16px] ${
                isCompleted ? "bg-green-600 hover:bg-green-700" : ""
              }`}
              onClick={() => toggleStepComplete(selectedTree.id, selectedStep.id)}
              disabled={!isUnlocked}
            >
              {!isUnlocked ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Complete Prerequisites First
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mastered — Click to Reset
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Mark as Mastered
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Progression List View ───────────────────────────────────
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => setSelectedTree(null)}
        className="border-[2px] border-foreground rounded-[16px]"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        All Skill Trees
      </Button>

      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-[16px] border-[3px] border-foreground flex items-center justify-center bg-card">
              {iconMap[selectedTree.icon]}
            </div>
            <div className="flex-1">
              <CardTitle className="font-serif text-xl font-bold">{selectedTree.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedTree.description}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Elite</span>
              <span className="font-medium">
                {completedSteps[selectedTree.id]?.length || 0}/{selectedTree.progressions.length}
              </span>
            </div>
            <Progress value={getTreeProgress(selectedTree)} className="h-3" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Ultimate Goal: {selectedTree.eliteGoal}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Level Sections */}
      <div className="space-y-4 stagger-children">
        {(["beginner", "intermediate", "advanced", "elite"] as const).map((level) => {
          const levelSteps = selectedTree.progressions.filter((p) => p.level === level);
          if (levelSteps.length === 0) return null;

          return (
            <div key={level} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={`${levelColors[level]} text-primary-foreground`}>
                  {levelLabels[level]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {levelSteps.filter((s) => isStepCompleted(selectedTree.id, s.id)).length}/
                  {levelSteps.length} completed
                </span>
              </div>

              <div className="space-y-2">
                {levelSteps.map((step) => {
                  const isCompleted = isStepCompleted(selectedTree.id, step.id);
                  const isUnlocked = isStepUnlocked(selectedTree, step);
                  const globalIndex = selectedTree.progressions.findIndex((p) => p.id === step.id);

                  return (
                    <Card
                      key={step.id}
                      className={`border-[3px] rounded-[24px] cursor-pointer transition-colors card-lift ${
                        isCompleted
                          ? "border-primary/50 bg-primary/5"
                          : isUnlocked
                          ? "border-foreground hover:bg-muted/30"
                          : "border-foreground/30 opacity-60"
                      }`}
                      onClick={() => setSelectedStep(step)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-[12px] border-[2px] flex items-center justify-center font-bold text-sm ${
                              isCompleted
                                ? "border-green-600 bg-green-600/10 text-green-600"
                                : isUnlocked
                                ? "border-foreground bg-card text-foreground"
                                : "border-foreground/30 bg-muted text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : isUnlocked ? (
                              globalIndex + 1
                            ) : (
                              <Lock className="h-4 w-4" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium truncate ${
                                isCompleted
                                  ? "text-green-600"
                                  : isUnlocked
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {step.name}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span>
                                {step.sets} sets × {step.reps}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />~{step.estimatedWeeksToMaster}w
                              </span>
                            </div>
                          </div>

                          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillTreeView;
