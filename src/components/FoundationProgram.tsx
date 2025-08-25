import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  Clock, 
  Target, 
  Trophy, 
  ChevronRight,
  BookOpen,
  Timer,
  Zap
} from "lucide-react";

const FoundationProgram = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const foundationProgram = {
    name: "Foundation Program",
    level: "Beginner",
    duration: "4 weeks",
    sessionsPerWeek: 3,
    description: "Build fundamental strength and movement patterns for calisthenics mastery",
    
    weeks: {
      1: {
        focus: "Movement Foundation",
        sessions: [
          {
            name: "Upper Body Foundation",
            duration: "35 minutes",
            exercises: [
              {
                name: "Push-up Progression",
                sets: "3",
                reps: "8-12",
                rest: "90s",
                primaryMuscles: ["Chest", "Triceps", "Shoulders"],
                secondaryMuscles: ["Core", "Serratus Anterior"],
                tips: "Focus on proper form and full range of motion. Keep body straight from head to heels.",
                progressions: [
                  "Incline push-ups (easier)",
                  "Knee push-ups",
                  "Standard push-ups", 
                  "Diamond push-ups (harder)"
                ],
                commonErrors: [
                  "Sagging hips",
                  "Partial range of motion",
                  "Head position forward"
                ]
              },
              {
                name: "Incline Push-ups",
                sets: "3", 
                reps: "10-15",
                rest: "60s",
                primaryMuscles: ["Chest", "Triceps"],
                secondaryMuscles: ["Shoulders", "Core"],
                tips: "Use bench or elevated surface. Higher incline = easier exercise.",
                progressions: [
                  "Wall push-ups",
                  "High incline (24+ inches)",
                  "Medium incline (12-24 inches)",
                  "Low incline (6-12 inches)"
                ]
              },
              {
                name: "Pike Push-ups", 
                sets: "3",
                reps: "5-8",
                rest: "90s",
                primaryMuscles: ["Shoulders", "Triceps"],
                secondaryMuscles: ["Upper chest", "Core"],
                tips: "Target shoulders and prepare for handstand. Keep legs straight, walk feet closer to hands.",
                progressions: [
                  "Feet on ground",
                  "Feet elevated on box",
                  "Handstand push-up progression"
                ]
              },
              {
                name: "Plank Hold",
                sets: "3",
                reps: "30-45s", 
                rest: "60s",
                primaryMuscles: ["Core", "Transverse Abdominis"],
                secondaryMuscles: ["Shoulders", "Glutes"],
                tips: "Maintain straight line from head to heels. Engage core and glutes.",
                progressions: [
                  "Knee plank",
                  "Standard plank",
                  "Single-arm plank",
                  "Plank to push-up"
                ]
              },
              {
                name: "Dead Hang",
                sets: "3",
                reps: "20-30s",
                rest: "90s", 
                primaryMuscles: ["Lats", "Forearms"],
                secondaryMuscles: ["Rhomboids", "Middle traps"],
                tips: "Build grip strength and shoulder stability. Active hang with shoulders engaged.",
                progressions: [
                  "Assisted hang",
                  "Dead hang",
                  "L-hang progression",
                  "Pull-up progression"
                ]
              }
            ]
          }
        ]
      },
      2: {
        focus: "Strength Building", 
        sessions: [
          {
            name: "Progressive Overload",
            duration: "40 minutes",
            exercises: [
              {
                name: "Push-up Progression",
                sets: "4",
                reps: "10-15", 
                rest: "90s",
                primaryMuscles: ["Chest", "Triceps", "Shoulders"],
                tips: "Increase reps or progress to harder variation"
              },
              {
                name: "Australian Rows",
                sets: "3",
                reps: "8-12",
                rest: "90s", 
                primaryMuscles: ["Lats", "Rhomboids", "Biceps"],
                tips: "Pull chest to bar, body straight throughout movement"
              },
              {
                name: "Pike Push-ups",
                sets: "4", 
                reps: "6-10",
                rest: "90s",
                primaryMuscles: ["Shoulders", "Triceps"],
                tips: "Focus on full range of motion, controlled tempo"
              }
            ]
          }
        ]
      },
      3: {
        focus: "Skill Integration",
        sessions: [
          {
            name: "Movement Flow",
            duration: "45 minutes", 
            exercises: [
              {
                name: "Wall Handstand Hold",
                sets: "3",
                reps: "15-30s",
                rest: "120s",
                primaryMuscles: ["Shoulders", "Core"],
                tips: "Focus on straight line, active shoulder engagement"
              },
              {
                name: "L-Sit Progression",
                sets: "3", 
                reps: "10-20s",
                rest: "90s",
                primaryMuscles: ["Core", "Hip flexors"],
                tips: "Start with tuck sit, progress to straight legs"
              }
            ]
          }
        ]
      },
      4: {
        focus: "Assessment & Progression",
        sessions: [
          {
            name: "Skills Test",
            duration: "50 minutes",
            exercises: [
              {
                name: "Max Push-ups",
                sets: "1",
                reps: "Max reps",
                rest: "N/A",
                primaryMuscles: ["Chest", "Triceps"],
                tips: "Test maximum repetitions with perfect form"
              },
              {
                name: "Max Plank Hold", 
                sets: "1",
                reps: "Max time",
                rest: "N/A",
                primaryMuscles: ["Core"],
                tips: "Hold as long as possible with perfect form"
              },
              {
                name: "Max Dead Hang",
                sets: "1", 
                reps: "Max time",
                rest: "N/A",
                primaryMuscles: ["Forearms", "Lats"],
                tips: "Hang as long as possible with active shoulders"
              }
            ]
          }
        ]
      }
    },

    benchmarks: {
      week1: { pushups: "8-12", plank: "30-45s", deadHang: "20-30s" },
      week2: { pushups: "12-18", plank: "45-60s", deadHang: "30-45s" },
      week3: { pushups: "15-25", plank: "60-90s", deadHang: "45-60s" },
      week4: { pushups: "20-30", plank: "90s+", deadHang: "60s+" }
    },

    recoveryProtocols: {
      interSet: "90-120 seconds for compound movements, 60-90s for isolation",
      postWorkout: "10-15 minutes light stretching and mobility work",
      frequency: "Every other day (M-W-F or T-T-S schedule)",
      sleep: "7-9 hours per night for optimal recovery",
      nutrition: "Adequate protein (0.8-1g per lb bodyweight) and hydration"
    },

    troubleshooting: {
      plateaus: [
        "Increase time under tension (slower tempo)",
        "Add pause reps (pause at bottom of movement)",
        "Increase training frequency gradually",
        "Focus on weak points with accessory work"
      ],
      injuryPrevention: [
        "Always warm up with 5-10 minutes light movement",
        "Progress gradually - increase difficulty by 10% weekly",
        "Listen to your body - rest when needed",
        "Maintain proper form over higher reps/intensity"
      ],
      modifications: [
        "Joint issues: Reduce range of motion, use softer surfaces",
        "Strength limitations: Use regressions and assisted variations", 
        "Time constraints: Focus on compound movements first",
        "Equipment limitations: Bodyweight modifications available"
      ]
    }
  };

  const getWeekProgress = (week: number) => {
    return Math.min((week / 4) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Foundation Program
        </h1>
        <p className="text-muted-foreground mt-1">4-week beginner calisthenics program</p>
        <div className="flex items-center space-x-4 mt-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            <Target className="h-3 w-3 mr-1" />
            Beginner
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
            <Clock className="h-3 w-3 mr-1" />
            35-50 min
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
            <Zap className="h-3 w-3 mr-1" />
            3x/week
          </Badge>
        </div>
      </div>

      {/* Week Selector */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[1, 2, 3, 4].map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "default" : "outline"}
            onClick={() => setSelectedWeek(week)}
            className={`rounded-2xl h-16 flex flex-col ${
              selectedWeek === week 
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                : 'border-2'
            }`}
          >
            <span className="text-sm font-medium">Week {week}</span>
            <Progress value={getWeekProgress(week)} className="w-full h-1 mt-1" />
          </Button>
        ))}
      </div>

      {/* Current Week Overview */}
      <Card className="glass-card border-2 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Week {selectedWeek}: {foundationProgram.weeks[selectedWeek as keyof typeof foundationProgram.weeks].focus}
            </span>
            <Trophy className="h-6 w-6 text-warning" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].pushups}
              </div>
              <div className="text-sm text-muted-foreground">Push-ups Target</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].plank}
              </div>
              <div className="text-sm text-muted-foreground">Plank Target</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].deadHang}
              </div>
              <div className="text-sm text-muted-foreground">Dead Hang Target</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <div className="space-y-4">
        {foundationProgram.weeks[selectedWeek as keyof typeof foundationProgram.weeks].sessions[0].exercises.map((exercise, index) => (
          <Card 
            key={exercise.name} 
            className={`glass-card border-2 transition-all duration-300 ${
              activeExercise === exercise.name ? 'border-primary shadow-lg shadow-primary/25' : ''
            }`}
          >
            <CardContent className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setActiveExercise(activeExercise === exercise.name ? null : exercise.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{exercise.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{exercise.sets} sets</span>
                      <span>•</span>
                      <span>{exercise.reps} reps</span>
                      <span>•</span>
                      <span>{exercise.rest} rest</span>
                    </div>
                  </div>
                </div>
                <ChevronRight 
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                    activeExercise === exercise.name ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {/* Expanded Exercise Details */}
              {activeExercise === exercise.name && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Primary Muscles */}
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Primary Muscles</h4>
                      <div className="flex flex-wrap gap-2">
                        {exercise.primaryMuscles.map((muscle) => (
                          <Badge key={muscle} variant="outline" className="bg-primary/10 text-primary border-primary">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Muscles */}
                    {exercise.secondaryMuscles && (
                      <div>
                        <h4 className="font-semibold text-accent mb-2">Secondary Muscles</h4>
                        <div className="flex flex-wrap gap-2">
                          {exercise.secondaryMuscles.map((muscle) => (
                            <Badge key={muscle} variant="outline" className="bg-accent/10 text-accent border-accent">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="font-semibold text-secondary mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Coaching Tips
                    </h4>
                    <p className="text-muted-foreground bg-background-secondary/50 p-3 rounded-xl">
                      {exercise.tips}
                    </p>
                  </div>

                  {/* Progressions */}
                  {exercise.progressions && (
                    <div>
                      <h4 className="font-semibold text-warning mb-2">Progressions</h4>
                      <div className="space-y-2">
                        {exercise.progressions.map((progression, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-warning/20 text-warning text-sm flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <span className="text-sm">{progression}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start Exercise
                    </Button>
                    <Button variant="outline" className="rounded-xl px-6">
                      <Timer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recovery & Tips Section */}
      <Card className="glass-card border-2 mt-6">
        <CardHeader>
          <CardTitle className="text-accent">Recovery Protocols</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="font-semibold text-primary">Frequency:</span>
            <span className="text-muted-foreground ml-2">{foundationProgram.recoveryProtocols.frequency}</span>
          </div>
          <div>
            <span className="font-semibold text-primary">Post-Workout:</span>
            <span className="text-muted-foreground ml-2">{foundationProgram.recoveryProtocols.postWorkout}</span>
          </div>
          <div>
            <span className="font-semibold text-primary">Sleep:</span>
            <span className="text-muted-foreground ml-2">{foundationProgram.recoveryProtocols.sleep}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoundationProgram;