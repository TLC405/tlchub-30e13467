import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Zap,
  SkipForward
} from "lucide-react";

interface WorkoutTimerProps {
  workoutDuration?: number; // in minutes
  restDuration?: number; // in seconds
}

const WorkoutTimer = ({ workoutDuration = 30, restDuration = 60 }: WorkoutTimerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workoutDuration * 60); // Convert to seconds
  const [isResting, setIsResting] = useState(false);
  const [round, setRound] = useState(1);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
        setTotalWorkoutTime(prev => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isResting) {
        // Workout finished, start rest
        setIsResting(true);
        setTimeLeft(restDuration);
        toast({
          title: "Set Complete! 💪",
          description: `Take a ${restDuration}s rest. Great work!`,
        });
      } else {
        // Rest finished, start new round
        setIsResting(false);
        setTimeLeft(workoutDuration * 60);
        setRound(prev => prev + 1);
        toast({
          title: "Rest Over! 🔥",
          description: `Round ${round + 1} starting. Let's go!`,
        });
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isResting, restDuration, workoutDuration, round, toast]);

  const handleStartPause = () => {
    setIsActive(!isActive);
    if (!isActive && totalWorkoutTime === 0) {
      toast({
        title: "Workout Started! 🚀",
        description: "Focus on form and breathing. You've got this!",
      });
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(workoutDuration * 60);
    setIsResting(false);
    setRound(1);
    setTotalWorkoutTime(0);
    toast({
      title: "Timer Reset",
      description: "Ready for a fresh start!",
    });
  };

  const handleSkip = () => {
    if (!isResting) {
      // Skip to rest
      setIsResting(true);
      setTimeLeft(restDuration);
      toast({
        title: "Skipped to Rest",
        description: "Take your well-deserved break!",
      });
    } else {
      // Skip to next round
      setIsResting(false);
      setTimeLeft(workoutDuration * 60);
      setRound(prev => prev + 1);
      toast({
        title: "Starting Next Round",
        description: `Round ${round + 1} begins now!`,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTotalTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${remainingMins}m`;
    }
    return `${mins}m ${seconds % 60}s`;
  };

  const progress = isResting 
    ? ((restDuration - timeLeft) / restDuration) * 100
    : ((workoutDuration * 60 - timeLeft) / (workoutDuration * 60)) * 100;

  return (
    <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
            <Timer className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl text-card-foreground">Workout Timer</CardTitle>
            <p className="text-sm text-muted-foreground">
              {isResting ? "Rest Period" : "Training Time"} • Round {round}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Timer Display */}
        <div className="text-center space-y-4">
          <div className={`text-6xl font-mono font-bold ${
            isResting ? 'text-accent' : 'text-card-foreground'
          }`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{isResting ? "Rest Progress" : "Set Progress"}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className={`h-3 ${isResting ? 'accent-gradient' : 'primary-gradient'}`}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-background-secondary/50 rounded-lg border border-card-border">
            <div className="text-sm text-muted-foreground">Total Time</div>
            <div className="font-semibold text-card-foreground">
              {formatTotalTime(totalWorkoutTime)}
            </div>
          </div>
          <div className="p-3 bg-background-secondary/50 rounded-lg border border-card-border">
            <div className="text-sm text-muted-foreground">Current Round</div>
            <div className="font-semibold text-card-foreground">
              {round}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="hover:bg-destructive/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleStartPause}
            className={`px-8 ${
              isActive 
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                : 'primary-gradient hover:opacity-90 text-primary-foreground'
            } gold-shadow`}
          >
            {isActive ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkip}
            disabled={!isActive}
            className="hover:bg-accent/10"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setTimeLeft(15 * 60);
              setIsResting(false);
            }}
            className="text-xs"
          >
            15min
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setTimeLeft(30 * 60);
              setIsResting(false);
            }}
            className="text-xs"
          >
            30min
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setTimeLeft(45 * 60);
              setIsResting(false);
            }}
            className="text-xs"
          >
            45min
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimer;