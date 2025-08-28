
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Play, 
  ChevronDown, 
  Heart, 
  Clock, 
  Zap,
  Target,
  Activity,
  AlertCircle
} from "lucide-react";
import type { Exercise } from "@/types";

interface DetailedExerciseCardProps {
  exercise: Exercise;
  onPlayVideo?: (videoId: string) => void;
  onMarkComplete?: (exerciseId: string) => void;
  isCompleted?: boolean;
}

const DetailedExerciseCard = ({ 
  exercise, 
  onPlayVideo, 
  onMarkComplete, 
  isCompleted 
}: DetailedExerciseCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success-gradient';
      case 'intermediate': return 'info-gradient';
      case 'advanced': return 'warning-gradient';
      case 'elite': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="clean-border premium-shadow bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg text-foreground">{exercise.name}</CardTitle>
              <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                {exercise.difficulty.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {exercise.sets}
              </div>
              {exercise.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {exercise.duration}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {exercise.videoId && (
              <Button
                size="sm"
                onClick={() => onPlayVideo?.(exercise.videoId!)}
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
            <span className="text-sm font-medium">Exercise Details</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Muscles Worked */}
              {exercise.musclesWorked && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Muscles Worked
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Primary:</p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.musclesWorked.primary.map((muscle, idx) => (
                          <Badge key={idx} variant="default" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Secondary:</p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.musclesWorked.secondary.map((muscle, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Stabilizers:</p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.musclesWorked.stabilizers.map((muscle, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Tendons & Recovery */}
              {(exercise.tendonsInvolved || exercise.recoveryTime) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercise.tendonsInvolved && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Tendons Involved
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.tendonsInvolved.map((tendon, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs warning-gradient text-warning-foreground">
                            {tendon}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {exercise.recoveryTime && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Recovery Times
                      </h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Muscle:</span>
                          <span className="text-foreground">{exercise.recoveryTime.muscle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tendon:</span>
                          <span className="text-foreground">{exercise.recoveryTime.tendon}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nervous:</span>
                          <span className="text-foreground">{exercise.recoveryTime.nervous}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Separator />

              {/* Form Cues */}
              {exercise.formCues && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Form Cues
                  </h4>
                  <ul className="space-y-1">
                    {exercise.formCues.map((cue, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-accent-foreground">•</span>
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Progression */}
              {exercise.progression && (
                <div className="bg-background-secondary p-3 rounded-lg">
                  <p className="text-xs font-medium text-foreground">
                    Next Level: <span className="text-primary">{exercise.progression}</span>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default DetailedExerciseCard;
