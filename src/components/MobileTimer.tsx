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
  Clock,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MobileTimer = () => {
  const [workoutTime, setWorkoutTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [restActive, setRestActive] = useState(false);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'workout' | 'stopwatch' | 'interval'>('workout');
  const [intervalRounds, setIntervalRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
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
    setCurrentRound(1);
  };

  const nextRound = () => {
    if (currentRound < intervalRounds) {
      setCurrentRound(prev => prev + 1);
      setWorkoutTime(0);
      toast({
        title: `Round ${currentRound + 1} Started!`,
        description: `${intervalRounds - currentRound} rounds remaining`,
      });
    } else {
      toast({
        title: "Workout Complete! 🎉",
        description: "Amazing work! Time to rest and recover.",
      });
      resetAll();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Training Timer
        </h1>
        <p className="text-muted-foreground mt-1">Track your workout sessions</p>
      </div>
      {/* Tab Selector */}
      <div className="flex bg-card/50 backdrop-blur-xl rounded-3xl p-2 border border-border mb-6">
        <Button
          variant="ghost"
          className={`flex-1 rounded-2xl transition-all duration-300 h-12 ${
            activeTab === 'workout' 
              ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('workout')}
        >
          <Timer className="h-4 w-4 mr-2" />
          Workout
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-2xl transition-all duration-300 h-12 ${
            activeTab === 'stopwatch' 
              ? 'bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg shadow-accent/25' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('stopwatch')}
        >
          <Clock className="h-4 w-4 mr-2" />
          Stopwatch
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-2xl transition-all duration-300 h-12 ${
            activeTab === 'interval' 
              ? 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg shadow-secondary/25' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('interval')}
        >
          <Target className="h-4 w-4 mr-2" />
          Interval
        </Button>
      </div>

      {/* Workout Timer */}
      {activeTab === 'workout' && (
        <div className="space-y-6 animate-fade-in">
          <Card className="glass-card border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Workout Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-7xl font-mono font-bold text-primary mb-6 drop-shadow-lg">
                  {formatTime(workoutTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setWorkoutActive(!workoutActive)}
                    className={`px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-semibold ${
                      workoutActive 
                        ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground shadow-lg shadow-destructive/25' 
                        : 'bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25'
                    }`}
                  >
                    {workoutActive ? (
                      <>
                        <Pause className="h-6 w-6 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-6 w-6 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetAll}
                    className="px-6 py-4 rounded-2xl border-2 hover:bg-background-secondary/50 text-lg"
                  >
                    <RotateCcw className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rest Timer */}
          <Card className="glass-card border-2">
            <CardHeader>
              <CardTitle className="text-center text-lg text-accent">Rest Timer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {restActive && (
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent mb-4 drop-shadow-lg">
                    {formatTime(restTime)}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setRestActive(false)}
                    className="border-destructive text-destructive hover:bg-destructive/10 rounded-2xl px-6 py-3"
                  >
                    <StopCircle className="h-5 w-5 mr-2" />
                    Stop Rest
                  </Button>
                </div>
              )}
              
              {!restActive && (
                <div className="grid grid-cols-2 gap-3">
                  {[30, 60, 90, 120].map((seconds) => (
                    <Button
                      key={seconds}
                      variant="outline"
                      onClick={() => startRest(seconds)}
                      className="py-4 rounded-2xl border-2 hover:border-accent hover:text-accent transition-all duration-300 text-lg font-semibold"
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

      {/* Stopwatch */}
      {activeTab === 'stopwatch' && (
        <div className="space-y-6 animate-fade-in">
          <Card className="glass-card border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Precision Stopwatch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold text-accent mb-6 drop-shadow-lg">
                  {formatStopwatch(stopwatchTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setStopwatchActive(!stopwatchActive)}
                    className={`px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-semibold ${
                      stopwatchActive 
                        ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground shadow-lg shadow-destructive/25' 
                        : 'bg-gradient-to-r from-accent to-accent/80 hover:opacity-90 text-accent-foreground shadow-lg shadow-accent/25'
                    }`}
                  >
                    {stopwatchActive ? (
                      <>
                        <Pause className="h-6 w-6 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="h-6 w-6 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStopwatchTime(0)}
                    className="px-6 py-4 rounded-2xl border-2 hover:bg-background-secondary/50 text-lg"
                  >
                    <RotateCcw className="h-6 w-6" />
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card border hover:border-accent transition-all duration-300 cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-accent mb-1">Hold Time</div>
                <div className="text-sm text-muted-foreground">Perfect for isometric holds</div>
              </CardContent>
            </Card>
            <Card className="glass-card border hover:border-primary transition-all duration-300 cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-primary mb-1">Sprint Time</div>
                <div className="text-sm text-muted-foreground">Track explosive movements</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Interval Timer */}
      {activeTab === 'interval' && (
        <div className="space-y-6 animate-fade-in">
          <Card className="glass-card border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Interval Training
              </CardTitle>
              <div className="flex justify-center items-center space-x-4 mt-4">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  Round {currentRound} of {intervalRounds}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Round Selector */}
              <div className="flex justify-center space-x-2 mb-6">
                {[3, 5, 8, 10].map((rounds) => (
                  <Button
                    key={rounds}
                    variant={intervalRounds === rounds ? "default" : "outline"}
                    onClick={() => setIntervalRounds(rounds)}
                    className="rounded-xl px-4 py-2"
                  >
                    {rounds}R
                  </Button>
                ))}
              </div>

              <div className="text-center">
                <div className="text-7xl font-mono font-bold text-secondary mb-6 drop-shadow-lg">
                  {formatTime(workoutTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setWorkoutActive(!workoutActive)}
                    className={`px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-semibold ${
                      workoutActive 
                        ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground shadow-lg shadow-destructive/25' 
                        : 'bg-gradient-to-r from-secondary to-secondary/80 hover:opacity-90 text-secondary-foreground shadow-lg shadow-secondary/25'
                    }`}
                  >
                    {workoutActive ? (
                      <>
                        <Pause className="h-6 w-6 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-6 w-6 mr-2" />
                        Start Round
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={nextRound}
                    disabled={!workoutActive && workoutTime === 0}
                    className="px-6 py-4 rounded-2xl border-2 hover:bg-background-secondary/50 text-lg"
                  >
                    Next Round
                  </Button>
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