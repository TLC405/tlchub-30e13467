import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
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
  Info,
  BookOpen
} from "lucide-react";
import { skillProgressions, type SkillTree, type ProgressionStep } from "@/data/skillProgressions";
import LearnTab from "@/components/learn/LearnTab";

// Local storage key for progress
const PROGRESS_KEY = 'calisthenics_skill_progress';

// Get saved progress from localStorage
const getSavedProgress = (): Record<string, string[]> => {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

// Save progress to localStorage
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
  TrendingDown: <TrendingDown className="h-5 w-5" />
};

const colorMap: Record<string, string> = {
  orange: "from-orange-500 to-orange-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  cyan: "from-cyan-500 to-cyan-600",
  green: "from-green-500 to-green-600",
  red: "from-red-500 to-red-600",
  yellow: "from-yellow-500 to-yellow-600",
  teal: "from-teal-500 to-teal-600"
};

const levelColors: Record<string, string> = {
  beginner: "bg-green-600",
  intermediate: "bg-blue-600",
  advanced: "bg-orange-600",
  elite: "bg-red-600"
};

const levelLabels: Record<string, string> = {
  beginner: "L1 Beginner",
  intermediate: "L2 Intermediate",
  advanced: "L3 Advanced",
  elite: "L4 Elite"
};

const SkillTreeView = () => {
  const { toast } = useToast();
  const [selectedTree, setSelectedTree] = useState<SkillTree | null>(null);
  const [selectedStep, setSelectedStep] = useState<ProgressionStep | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>(getSavedProgress());

  const isStepCompleted = (treeId: string, stepId: string) => {
    return completedSteps[treeId]?.includes(stepId) || false;
  };

  const isStepUnlocked = (tree: SkillTree, step: ProgressionStep) => {
    // First step is always unlocked
    if (step.prerequisites.length === 0) return true;
    
    // Check if all prerequisites are completed
    return step.prerequisites.every(prereqId => 
      isStepCompleted(tree.id, prereqId)
    );
  };

  const toggleStepComplete = (treeId: string, stepId: string) => {
    setCompletedSteps(prev => {
      const treeProgress = prev[treeId] || [];
      let newProgress: string[];
      
      if (treeProgress.includes(stepId)) {
        newProgress = treeProgress.filter(id => id !== stepId);
      } else {
        newProgress = [...treeProgress, stepId];
      }
      
      const updated = { ...prev, [treeId]: newProgress };
      saveProgress(updated);
      return updated;
    });

    const step = selectedTree?.progressions.find(p => p.id === stepId);
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
    if (treeProgress.length === 0) return 'beginner';
    
    const lastCompleted = tree.progressions
      .filter(p => treeProgress.includes(p.id))
      .pop();
    
    return lastCompleted?.level || 'beginner';
  };

  // Skill Tree Selection View
  if (!selectedTree) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Skill Progressions</h1>
          <p className="text-muted-foreground">Master each progression from beginner to elite</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillProgressions.map((tree) => {
            const progress = getTreeProgress(tree);
            const currentLevel = getCurrentLevel(tree);
            
            return (
              <Card 
                key={tree.id}
                className="cursor-pointer transition-all hover:scale-[1.02] border-2 hover:border-primary/50"
                onClick={() => setSelectedTree(tree)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorMap[tree.color]} flex items-center justify-center text-white shadow-lg`}>
                        {iconMap[tree.icon]}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tree.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{tree.progressions.length} progressions</p>
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
                      <span>{completedSteps[tree.id]?.length || 0}/{tree.progressions.length}</span>
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

  // Exercise Detail View
  if (selectedStep) {
    const isCompleted = isStepCompleted(selectedTree.id, selectedStep.id);
    const isUnlocked = isStepUnlocked(selectedTree, selectedStep);
    const stepIndex = selectedTree.progressions.findIndex(p => p.id === selectedStep.id);
    
    return (
      <div className="p-4 space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedStep(null)}
          className="mb-2"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to {selectedTree.name}
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                  isCompleted ? 'bg-green-600' : `bg-gradient-to-br ${colorMap[selectedTree.color]}`
                }`}>
                  {isCompleted ? <CheckCircle className="h-5 w-5" /> : stepIndex + 1}
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedStep.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`${levelColors[selectedStep.level]} text-primary-foreground`}>
                      {levelLabels[selectedStep.level]}
                    </Badge>
                    {selectedStep.level === 'elite' && (
                      <Badge variant="outline" className="text-[10px] border-dashed border-destructive/40 rounded-full font-mono">
                        Coming Soon
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      ~{selectedStep.estimatedWeeksToMaster} weeks to master
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedStep.description}</p>

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
                  <div className="bg-card border rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Sets</p>
                    <p className="font-bold text-lg">{selectedStep.sets}</p>
                  </div>
                  <div className="bg-card border rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Reps</p>
                    <p className="font-bold text-lg">{selectedStep.reps}</p>
                  </div>
                  <div className="bg-card border rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Rest</p>
                    <p className="font-bold text-lg">{selectedStep.restTime}</p>
                  </div>
                  {selectedStep.holdTime && (
                    <div className="bg-card border rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Hold</p>
                      <p className="font-bold text-lg">{selectedStep.holdTime}</p>
                    </div>
                  )}
                </div>

                {/* Form Cues */}
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Form Cues
                  </h4>
                  <ul className="space-y-1">
                    {selectedStep.formCues.map((cue, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Common Mistakes to Avoid
                  </h4>
                  <ul className="space-y-1">
                    {selectedStep.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Muscles Worked */}
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
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
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Secondary</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedStep.musclesWorked.secondary.map((muscle, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{muscle}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                {selectedStep.prerequisites.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Prerequisites
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStep.prerequisites.map((prereqId) => {
                        const prereq = selectedTree.progressions.find(p => p.id === prereqId);
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
                    <h4 className="font-semibold flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      Next Progression
                    </h4>
                    <Badge variant="outline" className="text-sm">
                      {selectedTree.progressions.find(p => p.id === selectedStep.nextProgression)?.name}
                    </Badge>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="learn">
                <LearnTab 
                  exerciseName={selectedStep.name}
                  difficulty={selectedStep.level}
                />
              </TabsContent>
            </Tabs>

            {/* Action Button */}
            <Button 
              className={`w-full ${isCompleted ? 'bg-green-600 hover:bg-green-700' : ''}`}
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
                  Mastered - Click to Reset
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

  // Skill Tree Progression View
  return (
    <div className="p-4 space-y-4">
      <Button 
        variant="outline" 
        onClick={() => setSelectedTree(null)}
        className="mb-2"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        All Skill Trees
      </Button>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorMap[selectedTree.color]} flex items-center justify-center text-white shadow-lg`}>
              {iconMap[selectedTree.icon]}
            </div>
            <div className="flex-1">
              <CardTitle>{selectedTree.name}</CardTitle>
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
      <ScrollArea className="h-[calc(100vh-380px)]">
        <div className="space-y-4 pr-4">
          {['beginner', 'intermediate', 'advanced', 'elite'].map((level) => {
            const levelSteps = selectedTree.progressions.filter(p => p.level === level);
            if (levelSteps.length === 0) return null;
            
            return (
              <div key={level} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={`${levelColors[level]} text-white`}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {levelSteps.filter(s => isStepCompleted(selectedTree.id, s.id)).length}/{levelSteps.length} completed
                  </span>
                </div>
                
                <div className="space-y-2">
                  {levelSteps.map((step, index) => {
                    const isCompleted = isStepCompleted(selectedTree.id, step.id);
                    const isUnlocked = isStepUnlocked(selectedTree, step);
                    const globalIndex = selectedTree.progressions.findIndex(p => p.id === step.id);
                    
                    return (
                      <Card 
                        key={step.id}
                        className={`cursor-pointer transition-all hover:scale-[1.01] ${
                          isCompleted 
                            ? 'border-green-500/50 bg-green-500/5' 
                            : isUnlocked 
                              ? 'border-border hover:border-primary/50' 
                              : 'border-border opacity-60'
                        }`}
                        onClick={() => setSelectedStep(step)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                              isCompleted 
                                ? 'bg-green-600 text-white' 
                                : isUnlocked 
                                  ? `bg-gradient-to-br ${colorMap[selectedTree.color]} text-white`
                                  : 'bg-muted text-muted-foreground'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : isUnlocked ? (
                                globalIndex + 1
                              ) : (
                                <Lock className="h-4 w-4" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-medium truncate ${
                                  isCompleted ? 'text-green-600' : isUnlocked ? '' : 'text-muted-foreground'
                                }`}>
                                  {step.name}
                                </h3>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span>{step.sets} sets × {step.reps}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  ~{step.estimatedWeeksToMaster}w
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
      </ScrollArea>
    </div>
  );
};

export default SkillTreeView;
