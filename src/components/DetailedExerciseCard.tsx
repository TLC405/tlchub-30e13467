import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ChevronDown, Heart, Zap, Target, Activity, AlertCircle, BookOpen } from "lucide-react";
import type { Exercise } from "@/types";
import LearnTab from "@/components/learn/LearnTab";
import VideoPlayer from "@/components/VideoPlayer";

interface DetailedExerciseCardProps {
  exercise: Exercise;
  onMarkComplete?: (exerciseId: string) => void;
  isCompleted?: boolean;
}

const difficultyLabels: Record<number, string> = { 1: "L1", 2: "L2", 3: "L3", 4: "L4", 5: "L5" };
const difficultyColors: Record<number, string> = { 1: "bg-green-600", 2: "bg-blue-600", 3: "bg-orange-600", 4: "bg-red-600", 5: "bg-purple-600" };

const DetailedExerciseCard = ({ exercise, onMarkComplete, isCompleted }: DetailedExerciseCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Card className="clean-border premium-shadow bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg text-foreground">{exercise.name}</CardTitle>
              <Badge className={`${difficultyColors[exercise.difficultyLevel] || "bg-muted"} text-white`}>
                {difficultyLabels[exercise.difficultyLevel] || "?"} {exercise.category}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {exercise.primaryMuscles.map((m, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{m}</Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {exercise.youtubeUrl && (
              <Button
                size="sm"
                onClick={() => window.open(exercise.youtubeUrl, "_blank", "noopener")}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                <Play className="h-3 w-3 mr-1" />
                Watch
              </Button>
            )}
            {onMarkComplete && (
              <Button
                size="sm"
                variant={isCompleted ? "default" : "outline"}
                onClick={() => onMarkComplete(exercise.id)}
                className={isCompleted ? "success-gradient text-success-foreground" : ""}
              >
                <Heart className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <Collapsible open={showDetails} onOpenChange={setShowDetails}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-6">
            <span className="text-sm font-medium">More Details</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="details" className="text-xs">
                  <Activity className="h-3 w-3 mr-1" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="learn" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Learn
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                {/* Muscles */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Muscles
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Primary:</p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.primaryMuscles.map((m, i) => (
                          <Badge key={i} variant="default" className="text-xs">{m}</Badge>
                        ))}
                      </div>
                    </div>
                    {exercise.secondaryMuscles.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Secondary:</p>
                        <div className="flex flex-wrap gap-1">
                          {exercise.secondaryMuscles.map((m, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{m}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Equipment */}
                {exercise.equipment.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Equipment
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {exercise.equipment.map((eq, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{eq}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form Cues */}
                {exercise.cues.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Form Cues
                      </h4>
                      <ul className="space-y-1">
                        {exercise.cues.map((cue, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-accent-foreground">•</span>
                            {cue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Chain Info */}
                {exercise.chainGroup && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-foreground">
                      Chain: <span className="text-primary">{exercise.chainGroup}</span>
                      {exercise.chainOrder && <span className="text-muted-foreground"> · Step {exercise.chainOrder}</span>}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="learn">
                <LearnTab
                  exerciseName={exercise.name}
                  difficulty={exercise.difficultyLevel <= 2 ? "foundation" : exercise.difficultyLevel === 3 ? "advanced" : "elite"}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default DetailedExerciseCard;
