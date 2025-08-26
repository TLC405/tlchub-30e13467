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
  Zap,
  User,
  Users,
  Crown
} from "lucide-react";

const FoundationProgram = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary p-3 pb-24">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Foundation Program
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Progressive calisthenics training</p>
        <div className="flex items-center space-x-2 mt-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success text-xs">
            <Target className="h-3 w-3 mr-1" />
            {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary text-xs">
            <Clock className="h-3 w-3 mr-1" />
            35-50 min
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent text-xs">
            <Zap className="h-3 w-3 mr-1" />
            3x/week
          </Badge>
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={selectedLevel === 'beginner' ? "default" : "outline"}
          onClick={() => setSelectedLevel('beginner')}
          className={`rounded-xl flex-1 h-10 text-sm ${
            selectedLevel === 'beginner' 
              ? 'bg-gradient-to-r from-success to-success/80 text-success-foreground' 
              : ''
          }`}
        >
          <User className="h-3 w-3 mr-1" />
          Beginner
        </Button>
        <Button
          variant={selectedLevel === 'intermediate' ? "default" : "outline"}
          onClick={() => setSelectedLevel('intermediate')}
          className={`rounded-xl flex-1 h-10 text-sm ${
            selectedLevel === 'intermediate'
              ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
              : ''
          }`}
        >
          <Users className="h-3 w-3 mr-1" />
          Intermediate
        </Button>
        <Button
          variant={selectedLevel === 'advanced' ? "default" : "outline"}
          onClick={() => setSelectedLevel('advanced')}
          className={`rounded-xl flex-1 h-10 text-sm ${
            selectedLevel === 'advanced'
              ? 'bg-gradient-to-r from-warning to-warning/80 text-warning-foreground'
              : ''
          }`}
        >
          <Crown className="h-3 w-3 mr-1" />
          Advanced
        </Button>
      </div>

      {/* Week Selector */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[1, 2, 3, 4].map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "default" : "outline"}
            onClick={() => setSelectedWeek(week)}
            className={`rounded-xl h-12 flex flex-col text-xs ${
              selectedWeek === week 
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                : 'border-2'
            }`}
          >
            <span className="font-medium">Week {week}</span>
            <Progress value={getWeekProgress(week)} className="w-full h-1 mt-1" />
          </Button>
        ))}
      </div>

      {/* Current Week Overview */}
      <Card className="glass-card border-2 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Week {selectedWeek}: {foundationProgram.weeks[selectedWeek as keyof typeof foundationProgram.weeks].focus}
            </span>
            <Trophy className="h-5 w-5 text-warning" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].pushups}
              </div>
              <div className="text-xs text-muted-foreground">Push-ups</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].plank}
              </div>
              <div className="text-xs text-muted-foreground">Plank</div>
            </div>
            <div>
              <div className="text-lg font-bold text-secondary">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].deadHang}
              </div>
              <div className="text-xs text-muted-foreground">Dead Hang</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <div className="space-y-3">
        {foundationProgram.weeks[selectedWeek as keyof typeof foundationProgram.weeks].sessions[0].exercises.map((exercise, index) => (
          <Card 
            key={exercise.name} 
            className={`glass-card border transition-all duration-300 ${
              activeExercise === exercise.name ? 'border-primary shadow-lg shadow-primary/25' : ''
            }`}
          >
            <CardContent className="p-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setActiveExercise(activeExercise === exercise.name ? null : exercise.name)}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{exercise.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{exercise.sets}</span>
                      <span>•</span>
                      <span>{exercise.reps}</span>
                      <span>•</span>
                      <span>{exercise.rest}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight 
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                    activeExercise === exercise.name ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {/* Expanded Exercise Details */}
              {activeExercise === exercise.name && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  <div className="grid grid-cols-1 gap-2">
                    {/* Primary Muscles */}
                    <div>
                      <h4 className="font-semibold text-primary text-xs mb-1">Primary Muscles</h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.primaryMuscles.map((muscle) => (
                          <Badge key={muscle} variant="outline" className="bg-primary/10 text-primary border-primary text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Muscles */}
                    {exercise.secondaryMuscles && (
                      <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">Secondary Muscles</h4>
                        <div className="flex flex-wrap gap-1">
                          {exercise.secondaryMuscles.map((muscle) => (
                            <Badge key={muscle} variant="outline" className="bg-accent/10 text-accent border-accent text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="font-semibold text-secondary text-xs mb-1 flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Coaching Tips
                    </h4>
                    <p className="text-xs text-muted-foreground bg-background-secondary/50 p-2 rounded-lg">
                      {exercise.tips}
                    </p>
                  </div>

                  {/* Progressions */}
                  {exercise.progressions && (
                    <div>
                      <h4 className="font-semibold text-warning text-xs mb-1">Progressions</h4>
                      <div className="space-y-1">
                        {exercise.progressions.slice(0, 3).map((progression, idx) => (
                          <div key={idx} className="flex items-center space-x-1">
                            <div className="w-4 h-4 rounded-full bg-warning/20 text-warning text-xs flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <span className="text-xs">{progression}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-1">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Timer className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recovery & Tips Section - Smaller */}
      <Card className="glass-card border mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-accent text-sm">Recovery Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
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