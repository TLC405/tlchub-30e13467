import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StopCircle,
  Timer,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MobileTimer = () => {
  const [workoutTime, setWorkoutTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [restActive, setRestActive] = useState(false);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'workout' | 'stopwatch'>('workout');
  const { toast } = useToast();

  // Workout Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (workoutActive) {
      interval = setInterval(() => {
        setWorkoutTime(time => time + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workoutActive]);

  // Rest Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (restActive && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(time => {
          if (time <= 1) {
            setRestActive(false);
            toast({
              title: "Rest Complete! 🔥",
              description: "Time to get back to work!",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [restActive, restTime, toast]);

  // Stopwatch Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchTime(time => time + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stopwatchActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const cs = centiseconds % 100;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const startRest = (seconds: number) => {
    setRestTime(seconds);
    setRestActive(true);
    toast({
      title: `${seconds}s Rest Started`,
      description: "Recovery time - breathe and prepare!",
    });
  };

  const resetAll = () => {
    setWorkoutTime(0);
    setRestTime(0);
    setStopwatchTime(0);
    setWorkoutActive(false);
    setRestActive(false);
    setStopwatchActive(false);
  };

  return (
    <div className="p-4 space-y-6 mobile-safe-area">
      {/* Tab Selector */}
      <div className="flex bg-card rounded-2xl p-1 border border-border">
        <Button
          variant={activeTab === 'workout' ? 'default' : 'ghost'}
          className={`flex-1 rounded-xl transition-all duration-300 ${
            activeTab === 'workout' 
              ? 'vibrant-gradient text-primary-foreground vibrant-shadow' 
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('workout')}
        >
          <Timer className="h-4 w-4 mr-2" />
          Workout Timer
        </Button>
        <Button
          variant={activeTab === 'stopwatch' ? 'default' : 'ghost'}
          className={`flex-1 rounded-xl transition-all duration-300 ${
            activeTab === 'stopwatch' 
              ? 'secondary-gradient text-secondary-foreground vibrant-shadow' 
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('stopwatch')}
        >
          <Clock className="h-4 w-4 mr-2" />
          Stopwatch
        </Button>
      </div>

      {activeTab === 'workout' && (
        <div className="space-y-6 bounce-in">
          {/* Main Workout Timer */}
          <Card className="glass-card border-2 border-border glow-effect">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Workout Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold text-primary mb-4">
                  {formatTime(workoutTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setWorkoutActive(!workoutActive)}
                    className={`px-8 py-3 rounded-2xl transition-all duration-300 ${
                      workoutActive 
                        ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground' 
                        : 'vibrant-gradient hover:opacity-90 text-primary-foreground'
                    } vibrant-shadow`}
                  >
                    {workoutActive ? (
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
                    onClick={resetAll}
                    className="px-6 py-3 rounded-2xl border-2 hover:bg-background-secondary/50"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rest Timer */}
          <Card className="glass-card border-2 border-border">
            <CardHeader>
              <CardTitle className="text-center text-lg text-accent">Rest Timer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {restActive && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-4">
                    {formatTime(restTime)}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setRestActive(false)}
                    className="border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <StopCircle className="h-4 w-4 mr-2" />
                    Stop Rest
                  </Button>
                </div>
              )}
              
              {!restActive && (
                <div className="grid grid-cols-4 gap-2">
                  {[30, 60, 90, 120].map((seconds) => (
                    <Button
                      key={seconds}
                      variant="outline"
                      onClick={() => startRest(seconds)}
                      className="py-3 rounded-xl border-2 hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      {seconds}s
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'stopwatch' && (
        <div className="space-y-6 bounce-in">
          <Card className="glass-card border-2 border-border glow-effect">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Precision Stopwatch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-mono font-bold text-secondary mb-6">
                  {formatStopwatch(stopwatchTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setStopwatchActive(!stopwatchActive)}
                    className={`px-8 py-3 rounded-2xl transition-all duration-300 ${
                      stopwatchActive 
                        ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground' 
                        : 'secondary-gradient hover:opacity-90 text-secondary-foreground'
                    } vibrant-shadow`}
                  >
                    {stopwatchActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Stop
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
                    onClick={() => setStopwatchTime(0)}
                    className="px-6 py-3 rounded-2xl border-2 hover:bg-background-secondary/50"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Lap Time Tracking */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground text-center">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 border border-border hover:border-secondary transition-colors duration-300">
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">Hold Time</div>
                      <div className="text-xs text-muted-foreground">Perfect for isometric holds</div>
                    </div>
                  </Card>
                  <Card className="p-3 border border-border hover:border-primary transition-colors duration-300">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">Sprint Time</div>
                      <div className="text-xs text-muted-foreground">Track explosive movements</div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MobileTimer;