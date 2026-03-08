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
import { muscleDiagrams } from "@/data/muscleDiagrams";
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
import { skillProgressions, type SkillTree, type ProgressionStep, type SkillLevel } from "@/data/skillProgressions";
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

const levelColors: Record<SkillLevel, string> = {
  foundation: "bg-green-600",
  development: "bg-blue-600",
  advanced: "bg-orange-600",
  elite: "bg-red-600",
  peak: "bg-purple-600",
};

const levelLabels: Record<SkillLevel, string> = {
  foundation: "L1 Foundation",
  development: "L2 Development",
  advanced: "L3 Advanced",
  elite: "L4 Elite",
  peak: "L5 Peak",
};

const allLevels: SkillLevel[] = ["foundation", "development", "advanced", "elite", "peak"];

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
    const lastCompleted = tree.progressions
      .filter((p) => treeProgress.includes(p.id))
      .pop();
    return lastCompleted?.level || "foundation";
  };

  // ─── Grid View ───────────────────────────────────────────
  if (!selectedTree) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-4 space-y-2">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Skill Trees
          </h1>
          <p className="text-sm text-muted-foreground">
            9 paths from foundation to peak — real progressions, real data
          </p>
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
                  {/* Muscle Diagram */}
                  {muscleDiagrams[tree.id] && (
                    <div className="w-24 h-24 flex-shrink-0 bg-secondary/30 flex items-center justify-center p-1">
                      <img
                        src={muscleDiagrams[tree.id]}
                        alt={`${tree.name} muscle diagram`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
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
                            <CardTitle className="text-base font-bold">
                              {tree.name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {tree.progressions.length} levels
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-2 pt-0">
                      <div className="flex items-center gap-2">
                        <Badge className={`${levelColors[currentLevel]} text-white`}>
                          {levelLabels[currentLevel]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {completedSteps[tree.id]?.length || 0}/{tree.progressions.length}
                        </span>
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

  // ─── Exercise Detail View ────────────────────────────────
  if (selectedStep) {
    const isCompleted = isStepCompleted(selectedTree.id, selectedStep.id);
    const isUnlocked = isStepUnlocked(selectedTree, selectedStep);
    const stepIndex = selectedTree.progressions.findIndex((p) => p.id === selectedStep.id);

    return (
      <div className="space-y-4 animate-fade-in">
        <Button
          variant="outline"
          onClick={() => setSelectedStep(null)}
          className="rounded-lg"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to {selectedTree.name}
        </Button>

        <Card className="border border-border rounded-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-lg border flex items-center justify-center font-bold ${
                  isCompleted
                    ? "border-green-600 bg-green-600/10 text-green-600"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {isCompleted ? <CheckCircle className="h-5 w-5" /> : stepIndex + 1}
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{selectedStep.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${levelColors[selectedStep.level]} text-white`}>
                    {levelLabels[selectedStep.level]}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedStep.description}</p>

            {selectedStep.youtubeUrl && (() => {
              const match = selectedStep.youtubeUrl!.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
              const videoId = match ? match[1] : null;
              return videoId ? (
                <VideoPlayer videoId={videoId} title={`${selectedStep.name} Demo`} />
              ) : null;
            })()}

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
                {selectedStep.formCues.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold flex items-center gap-2 text-foreground">
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
                )}

                {selectedStep.commonMistakes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold flex items-center gap-2 text-foreground">
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
                )}

                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2 text-foreground">
                    <Dumbbell className="h-4 w-4" />
                    Muscles Worked
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Primary</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedStep.musclesWorked.primary.map((muscle, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{muscle}</Badge>
                        ))}
                      </div>
                    </div>
                    {selectedStep.musclesWorked.secondary.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Secondary</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedStep.musclesWorked.secondary.map((muscle, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{muscle}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedStep.prerequisites.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold flex items-center gap-2 text-foreground">
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
              </TabsContent>

              <TabsContent value="learn">
                <LearnTab exerciseName={selectedStep.name} difficulty={selectedStep.level} />
              </TabsContent>
            </Tabs>

            <Button
              className={`w-full rounded-lg ${
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

  // ─── Progression List View ───────────────────────────────
  return (
    <div className="space-y-4 animate-fade-in">
      <Button
        variant="outline"
        onClick={() => setSelectedTree(null)}
        className="rounded-lg"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        All Skill Trees
      </Button>

      <Card className="border border-border rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-border flex items-center justify-center bg-card">
              {iconMap[selectedTree.icon] || <Dumbbell className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold">{selectedTree.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedTree.description}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Peak</span>
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
      <div className="space-y-4">
        {allLevels.map((level) => {
          const levelSteps = selectedTree.progressions.filter((p) => p.level === level);
          if (levelSteps.length === 0) return null;

          return (
            <div key={level} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={`${levelColors[level]} text-white`}>
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
                      className={`border rounded-lg cursor-pointer transition-colors ${
                        isCompleted
                          ? "border-primary/50 bg-primary/5"
                          : isUnlocked
                          ? "border-border hover:border-foreground/30"
                          : "border-border opacity-60"
                      }`}
                      onClick={() => setSelectedStep(step)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-lg border flex items-center justify-center font-bold text-sm ${
                              isCompleted
                                ? "border-green-600 bg-green-600/10 text-green-600"
                                : isUnlocked
                                ? "border-border bg-card text-foreground"
                                : "border-border bg-muted text-muted-foreground"
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
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {step.description}
                            </p>
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
