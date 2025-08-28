import { useState } from "react";
import { ChevronDown, Play, Trophy, Target, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  description: string;
  level: "Expert" | "Intermediate" | "Advanced";
  type: "Isometric" | "Dynamic" | "Strength";
  prerequisites: string[];
  progressionSteps: {
    id: number;
    name: string;
    description: string;
    completed: boolean;
  }[];
  muscleGroups: string[];
  estimatedTime: string;
  unlocked: boolean;
}

const skillsData: Skill[] = [
  {
    id: "human-flag",
    name: "Human Flag",
    description: "Ultimate side strength display",
    level: "Expert",
    type: "Isometric",
    prerequisites: ["Strong pull-ups", "L-sit hold", "Side plank mastery"],
    progressionSteps: [
      { id: 1, name: "Vertical Flag", description: "Hold vertical position against pole", completed: true },
      { id: 2, name: "Negative Flag", description: "Controlled descent from top", completed: true },
      { id: 3, name: "Tuck Human Flag", description: "Tucked knees flag hold", completed: false },
      { id: 4, name: "Straddle Human Flag", description: "Wide leg flag position", completed: false },
      { id: 5, name: "Full Human Flag", description: "Straight body flag hold", completed: false }
    ],
    muscleGroups: ["Lats", "Core", "Shoulders"],
    estimatedTime: "6-12 months",
    unlocked: true
  },
  {
    id: "planche",
    name: "Planche",
    description: "Advanced pushing strength skill",
    level: "Expert",
    type: "Isometric",
    prerequisites: ["Handstand hold", "Pseudo planche push-ups", "L-sit"],
    progressionSteps: [
      { id: 1, name: "Frog Stand", description: "Basic balance on hands", completed: true },
      { id: 2, name: "Tuck Planche", description: "Tucked planche hold", completed: true },
      { id: 3, name: "Advanced Tuck", description: "Knees closer to chest", completed: false },
      { id: 4, name: "Straddle Planche", description: "Wide leg planche", completed: false },
      { id: 5, name: "Full Planche", description: "Straight body planche", completed: false }
    ],
    muscleGroups: ["Shoulders", "Core", "Triceps"],
    estimatedTime: "8-18 months",
    unlocked: true
  },
  {
    id: "muscle-up",
    name: "Muscle Up",
    description: "Ultimate pulling and pushing combo",
    level: "Advanced",
    type: "Dynamic",
    prerequisites: ["10+ Pull-ups", "10+ Dips", "False grip"],
    progressionSteps: [
      { id: 1, name: "Chest-to-bar pull-ups", description: "Pull chest to bar", completed: true },
      { id: 2, name: "High pull-ups", description: "Pull to stomach level", completed: true },
      { id: 3, name: "Transition practice", description: "Practice the turn over", completed: false },
      { id: 4, name: "Negative muscle-up", description: "Control descent", completed: false },
      { id: 5, name: "Full muscle-up", description: "Complete movement", completed: false }
    ],
    muscleGroups: ["Lats", "Shoulders", "Triceps"],
    estimatedTime: "3-6 months",
    unlocked: true
  },
  {
    id: "front-lever",
    name: "Front Lever",
    description: "Horizontal body strength hold",
    level: "Advanced",
    type: "Isometric",
    prerequisites: ["Strong pull-ups", "Hollow body hold", "Hanging leg raises"],
    progressionSteps: [
      { id: 1, name: "Tuck front lever", description: "Tucked position hold", completed: true },
      { id: 2, name: "Advanced tuck", description: "Knees extended slightly", completed: false },
      { id: 3, name: "One leg extended", description: "Single leg straight", completed: false },
      { id: 4, name: "Straddle lever", description: "Wide leg position", completed: false },
      { id: 5, name: "Full front lever", description: "Straight body hold", completed: false }
    ],
    muscleGroups: ["Lats", "Core", "Shoulders"],
    estimatedTime: "6-12 months",
    unlocked: false
  }
];

const SkillMastery = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartTutorial = (skillName: string) => {
    toast({
      title: "Tutorial Started",
      description: `Starting ${skillName} progression tutorial`,
    });
  };

  const handlePracticeStep = (skillId: string, stepId: number) => {
    toast({
      title: "Step Started",
      description: `Practicing progression step ${stepId}`,
    });
  };

  const getCompletedSteps = (skill: Skill) => {
    return skill.progressionSteps.filter(step => step.completed).length;
  };

  const getProgressPercentage = (skill: Skill) => {
    return (getCompletedSteps(skill) / skill.progressionSteps.length) * 100;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-red-600";
      case "Advanced": return "bg-orange-600";
      case "Intermediate": return "bg-blue-600";
      default: return "bg-green-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Isometric": return "bg-purple-600";
      case "Dynamic": return "bg-cyan-600";
      case "Strength": return "bg-amber-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Special Skills Mastery</h1>
        <p className="text-muted-foreground">Advanced calisthenics skills to wow everyone</p>
      </div>

      <div className="space-y-4">
        {skillsData.map((skill) => (
          <Card key={skill.id} className={`border-2 ${skill.unlocked ? 'border-border' : 'border-muted bg-muted/20'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className={`text-lg ${skill.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {skill.name}
                    </CardTitle>
                    <Badge className={`${getLevelColor(skill.level)} text-white`}>
                      {skill.level}
                    </Badge>
                    <Badge className={`${getTypeColor(skill.type)} text-white`}>
                      {skill.type}
                    </Badge>
                  </div>
                  <p className={`text-sm ${skill.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {skill.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {skill.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {skill.muscleGroups.join(", ")}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant={selectedSkill === skill.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                  disabled={!skill.unlocked}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${selectedSkill === skill.id ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {skill.unlocked && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-muted-foreground">
                      {getCompletedSteps(skill)}/{skill.progressionSteps.length}
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(skill)} className="h-2" />
                </div>
              )}
            </CardHeader>

            {selectedSkill === skill.id && skill.unlocked && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleStartTutorial(skill.name)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Main Tutorial
                  </Button>

                  <div>
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Prerequisites:</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.prerequisites.map((prereq, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-green-400 mb-3">Progression Steps:</h4>
                    <div className="space-y-2">
                      {skill.progressionSteps.map((step) => (
                        <div 
                          key={step.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            step.completed 
                              ? 'bg-green-950/20 border-green-800' 
                              : 'bg-card border-border'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              step.completed 
                                ? 'bg-green-600 text-white' 
                                : 'bg-blue-600 text-white'
                            }`}>
                              {step.id}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{step.name}</p>
                              <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={step.completed ? "secondary" : "default"}
                            onClick={() => handlePracticeStep(skill.id, step.id)}
                            className="ml-2"
                          >
                            {step.completed ? <Trophy className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}

            {!skill.unlocked && (
              <CardContent className="pt-0">
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">Complete prerequisites to unlock</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {skill.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillMastery;