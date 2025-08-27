
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

  const getProgramData = () => {
    switch (selectedLevel) {
      case 'intermediate':
        return {
          name: "Intermediate Program",
          level: "Intermediate",
          duration: "6 weeks",
          sessionsPerWeek: 4,
          description: "Advanced strength patterns and skill progressions",
          weeks: {
            1: {
              focus: "Strength Foundation",
              sessions: [
                {
                  name: "Intermediate Upper Body",
                  duration: "45 minutes",
                  exercises: [
                    {
                      name: "Archer Push-ups",
                      sets: "3",
                      reps: "5-8 each side",
                      rest: "120s",
                      primaryMuscles: ["Chest", "Triceps", "Shoulders"],
                      secondaryMuscles: ["Core", "Lats"],
                      tips: "Focus on single-arm strength. Shift weight to working arm.",
                      progressions: [
                        "Assisted archer push-ups",
                        "Full archer push-ups",
                        "One-arm push-up progression"
                      ]
                    },
                    {
                      name: "Pistol Squat Progression",
                      sets: "3",
                      reps: "5-8 each leg",
                      rest: "90s",
                      primaryMuscles: ["Quadriceps", "Glutes"],
                      secondaryMuscles: ["Calves", "Core"],
                      tips: "Use assistance if needed. Focus on control and balance.",
                      progressions: [
                        "Assisted pistol squats",
                        "Box pistol squats",
                        "Full pistol squats"
                      ]
                    },
                    {
                      name: "Muscle-up Progression",
                      sets: "3",
                      reps: "3-5",
                      rest: "180s",
                      primaryMuscles: ["Lats", "Biceps", "Triceps"],
                      secondaryMuscles: ["Chest", "Core"],
                      tips: "Focus on the transition phase. Use bands for assistance.",
                      progressions: [
                        "Assisted muscle-ups",
                        "Jumping muscle-ups",
                        "Strict muscle-ups"
                      ]
                    },
                    {
                      name: "L-Sit Hold",
                      sets: "3",
                      reps: "15-30s",
                      rest: "90s",
                      primaryMuscles: ["Core", "Hip flexors"],
                      secondaryMuscles: ["Shoulders", "Triceps"],
                      tips: "Keep shoulders depressed. Legs straight and together.",
                      progressions: [
                        "Tuck L-sit",
                        "Single leg L-sit",
                        "Full L-sit"
                      ]
                    },
                    {
                      name: "Handstand Push-up Progression",
                      sets: "3",
                      reps: "3-8",
                      rest: "120s",
                      primaryMuscles: ["Shoulders", "Triceps"],
                      secondaryMuscles: ["Core", "Upper chest"],
                      tips: "Use wall for support. Full range of motion.",
                      progressions: [
                        "Pike push-ups elevated",
                        "Wall handstand push-ups",
                        "Freestanding handstand push-ups"
                      ]
                    }
                  ]
                }
              ]
            },
            2: {
              focus: "Power Development", 
              sessions: [
                {
                  name: "Explosive Training",
                  duration: "50 minutes",
                  exercises: [
                    {
                      name: "Planche Push-ups",
                      sets: "3",
                      reps: "3-6",
                      rest: "180s",
                      primaryMuscles: ["Chest", "Triceps", "Shoulders"],
                      tips: "Advanced planche progression with dynamic movement"
                    },
                    {
                      name: "Front Lever Progression",
                      sets: "3",
                      reps: "8-15s",
                      rest: "120s",
                      primaryMuscles: ["Lats", "Core", "Shoulders"],
                      tips: "Build toward full front lever hold"
                    }
                  ]
                }
              ]
            },
            3: {
              focus: "Skill Mastery",
              sessions: [
                {
                  name: "Advanced Skills",
                  duration: "55 minutes",
                  exercises: [
                    {
                      name: "Human Flag Progression",
                      sets: "3",
                      reps: "5-10s",
                      rest: "180s",
                      primaryMuscles: ["Lats", "Obliques", "Shoulders"],
                      tips: "Ultimate lateral strength exercise"
                    }
                  ]
                }
              ]
            },
            4: {
              focus: "Integration",
              sessions: [
                {
                  name: "Flow Combinations",
                  duration: "60 minutes",
                  exercises: [
                    {
                      name: "Muscle-up to Handstand",
                      sets: "3",
                      reps: "2-4",
                      rest: "240s",
                      primaryMuscles: ["Full body"],
                      tips: "Complex movement flow combination"
                    }
                  ]
                }
              ]
            },
            5: {
              focus: "Strength Peaks",
              sessions: [
                {
                  name: "Max Strength",
                  duration: "45 minutes",
                  exercises: [
                    {
                      name: "One-Arm Push-up",
                      sets: "3",
                      reps: "1-3 each",
                      rest: "300s",
                      primaryMuscles: ["Chest", "Triceps", "Core"],
                      tips: "Ultimate pushing strength"
                    }
                  ]
                }
              ]
            },
            6: {
              focus: "Assessment",
              sessions: [
                {
                  name: "Skills Test",
                  duration: "60 minutes",
                  exercises: [
                    {
                      name: "Max Skill Hold",
                      sets: "1",
                      reps: "Max time",
                      rest: "N/A",
                      primaryMuscles: ["Full body"],
                      tips: "Test your best skill for maximum time"
                    }
                  ]
                }
              ]
            }
          },
          benchmarks: {
            week1: { pushups: "15-20", plank: "60-90s", deadHang: "45-60s" },
            week2: { pushups: "20-25", plank: "90-120s", deadHang: "60-75s" },
            week3: { pushups: "25-30", plank: "120s+", deadHang: "75-90s" },
            week4: { pushups: "30-35", plank: "150s+", deadHang: "90s+" },
            week5: { pushups: "35-40", plank: "180s+", deadHang: "120s+" },
            week6: { pushups: "40+", plank: "240s+", deadHang: "150s+" }
          }
        };
      case 'advanced':
        return {
          name: "Advanced Program", 
          level: "Advanced",
          duration: "8 weeks",
          sessionsPerWeek: 5,
          description: "Elite calisthenics mastery and advanced skills",
          weeks: {
            1: {
              focus: "Elite Foundations",
              sessions: [
                {
                  name: "Advanced Strength",
                  duration: "60 minutes",
                  exercises: [
                    {
                      name: "One-Arm Push-up",
                      sets: "4",
                      reps: "3-5 each arm",
                      rest: "180s",
                      primaryMuscles: ["Chest", "Triceps", "Core"],
                      secondaryMuscles: ["Shoulders", "Lats"],
                      tips: "Ultimate single-arm pushing strength. Keep body aligned.",
                      progressions: [
                        "Lever one-arm push-ups",
                        "Strict one-arm push-ups",
                        "Elevated one-arm push-ups"
                      ]
                    },
                    {
                      name: "Human Flag",
                      sets: "4",
                      reps: "8-15s",
                      rest: "180s",
                      primaryMuscles: ["Lats", "Obliques", "Shoulders"],
                      secondaryMuscles: ["Core", "Forearms"],
                      tips: "Ultimate lateral strength display. Focus on straight body line.",
                      progressions: [
                        "Bent knee human flag",
                        "Single leg human flag",
                        "Full human flag"
                      ]
                    },
                    {
                      name: "Planche Hold",
                      sets: "4",
                      reps: "10-20s",
                      rest: "180s",
                      primaryMuscles: ["Shoulders", "Triceps", "Core"],
                      secondaryMuscles: ["Chest", "Wrists"],
                      tips: "Master of straight arm strength. Lean forward aggressively.",
                      progressions: [
                        "Advanced tuck planche",
                        "Straddle planche",
                        "Full planche"
                      ]
                    },
                    {
                      name: "Front Lever",
                      sets: "4",
                      reps: "8-15s",
                      rest: "180s",
                      primaryMuscles: ["Lats", "Core", "Rear delts"],
                      secondaryMuscles: ["Biceps", "Rhomboids"],
                      tips: "Ultimate pulling strength hold. Maintain hollow body.",
                      progressions: [
                        "Advanced tuck front lever",
                        "Straddle front lever",
                        "Full front lever"
                      ]
                    },
                    {
                      name: "Maltese Cross",
                      sets: "3",
                      reps: "3-8s",
                      rest: "240s",
                      primaryMuscles: ["Shoulders", "Chest", "Core"],
                      secondaryMuscles: ["Triceps", "Lats"],
                      tips: "Ultimate strength element. Requires exceptional shoulder strength.",
                      progressions: [
                        "Maltese lean",
                        "Bent arm maltese",
                        "Full maltese cross"
                      ]
                    }
                  ]
                }
              ]
            },
            2: {
              focus: "Dynamic Power",
              sessions: [
                {
                  name: "Explosive Movements",
                  duration: "65 minutes",
                  exercises: [
                    {
                      name: "Muscle-up Variations",
                      sets: "4",
                      reps: "5-8",
                      rest: "180s",
                      primaryMuscles: ["Lats", "Triceps", "Chest"],
                      tips: "Explosive transition work with variations"
                    },
                    {
                      name: "Handstand Press",
                      sets: "4",
                      reps: "3-5",
                      rest: "180s",
                      primaryMuscles: ["Shoulders", "Core", "Hip flexors"],
                      tips: "Press to handstand from seated or standing"
                    }
                  ]
                }
              ]
            },
            3: {
              focus: "Flow Integration",
              sessions: [
                {
                  name: "Movement Chains",
                  duration: "70 minutes",
                  exercises: [
                    {
                      name: "Complex Flow Sequences",
                      sets: "3",
                      reps: "2-4 flows",
                      rest: "300s",
                      primaryMuscles: ["Full body"],
                      tips: "Chain multiple advanced movements together"
                    }
                  ]
                }
              ]
            },
            4: {
              focus: "Endurance Strength",
              sessions: [
                {
                  name: "High Volume Skills",
                  duration: "60 minutes",
                  exercises: [
                    {
                      name: "Max Planche Push-ups",
                      sets: "3",
                      reps: "Max reps",
                      rest: "300s",
                      primaryMuscles: ["Shoulders", "Triceps", "Core"],
                      tips: "Test dynamic planche strength endurance"
                    }
                  ]
                }
              ]
            },
            5: {
              focus: "Peak Strength",
              sessions: [
                {
                  name: "Maximum Loads",
                  duration: "75 minutes",
                  exercises: [
                    {
                      name: "Weighted Calisthenics",
                      sets: "4",
                      reps: "3-6",
                      rest: "240s",
                      primaryMuscles: ["Full body"],
                      tips: "Add weight to advanced movements"
                    }
                  ]
                }
              ]
            },
            6: {
              focus: "Skill Refinement",
              sessions: [
                {
                  name: "Perfect Form",
                  duration: "60 minutes",
                  exercises: [
                    {
                      name: "Form Assessment",
                      sets: "Multiple",
                      reps: "Quality reps",
                      rest: "As needed",
                      primaryMuscles: ["Full body"],
                      tips: "Perfect the details of each movement"
                    }
                  ]
                }
              ]
            },
            7: {
              focus: "Competition Prep",
              sessions: [
                {
                  name: "Performance Training",
                  duration: "80 minutes",
                  exercises: [
                    {
                      name: "Competition Routines",
                      sets: "3",
                      reps: "Full routine",
                      rest: "600s",
                      primaryMuscles: ["Full body"],
                      tips: "Practice complete competitive sequences"
                    }
                  ]
                }
              ]
            },
            8: {
              focus: "Mastery Test",
              sessions: [
                {
                  name: "Elite Assessment",
                  duration: "90 minutes",
                  exercises: [
                    {
                      name: "Master Skills Test",
                      sets: "1",
                      reps: "Best effort",
                      rest: "N/A",
                      primaryMuscles: ["Full body"],
                      tips: "Demonstrate mastery of all elite skills"
                    }
                  ]
                }
              ]
            }
          },
          benchmarks: {
            week1: { pushups: "30+", plank: "180s+", deadHang: "120s+" },
            week2: { pushups: "35+", plank: "240s+", deadHang: "150s+" },
            week3: { pushups: "40+", plank: "300s+", deadHang: "180s+" },
            week4: { pushups: "45+", plank: "360s+", deadHang: "210s+" },
            week5: { pushups: "50+", plank: "420s+", deadHang: "240s+" },
            week6: { pushups: "55+", plank: "480s+", deadHang: "270s+" },
            week7: { pushups: "60+", plank: "540s+", deadHang: "300s+" },
            week8: { pushups: "65+", plank: "600s+", deadHang: "330s+" }
          }
        };
      default:
        return {
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
          }
        };
    }
  };

  const foundationProgram = {
    ...getProgramData(),
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
    const maxWeeks = selectedLevel === 'beginner' ? 4 : selectedLevel === 'intermediate' ? 6 : 8;
    return Math.min((week / maxWeeks) * 100, 100);
  };

  const getMaxWeeks = () => {
    return selectedLevel === 'beginner' ? 4 : selectedLevel === 'intermediate' ? 6 : 8;
  };

  return (
    <div className="min-h-screen bg-background p-2 pb-20">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-lg font-bold text-primary">
          {foundationProgram.name}
        </h1>
        <p className="text-muted-foreground text-xs mt-1">{foundationProgram.description}</p>
        <div className="flex items-center space-x-1 mt-1">
          <Badge variant="outline" className="bg-card text-success border-success text-xs">
            <Target className="h-3 w-3 mr-1" />
            {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-card text-primary border-primary text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {foundationProgram.duration}
          </Badge>
          <Badge variant="outline" className="bg-card text-accent border-accent text-xs">
            <Zap className="h-3 w-3 mr-1" />
            {foundationProgram.sessionsPerWeek}x/week
          </Badge>
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex gap-1 mb-2">
        <Button
          variant={selectedLevel === 'beginner' ? "default" : "outline"}
          onClick={() => {
            setSelectedLevel('beginner');
            setSelectedWeek(1);
            setActiveExercise(null);
          }}
          className={`flex-1 h-8 text-xs ${
            selectedLevel === 'beginner' 
              ? 'bg-success text-success-foreground' 
              : 'bg-card'
          }`}
        >
          <User className="h-3 w-3 mr-1" />
          Beginner
        </Button>
        <Button
          variant={selectedLevel === 'intermediate' ? "default" : "outline"}
          onClick={() => {
            setSelectedLevel('intermediate');
            setSelectedWeek(1);
            setActiveExercise(null);
          }}
          className={`flex-1 h-8 text-xs ${
            selectedLevel === 'intermediate'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card'
          }`}
        >
          <Users className="h-3 w-3 mr-1" />
          Intermediate
        </Button>
        <Button
          variant={selectedLevel === 'advanced' ? "default" : "outline"}
          onClick={() => {
            setSelectedLevel('advanced');
            setSelectedWeek(1);
            setActiveExercise(null);
          }}
          className={`flex-1 h-8 text-xs ${
            selectedLevel === 'advanced'
              ? 'bg-warning text-warning-foreground'
              : 'bg-card'
          }`}
        >
          <Crown className="h-3 w-3 mr-1" />
          Advanced
        </Button>
      </div>

      {/* Week Selector */}
      <div className={`grid gap-1 mb-2 ${getMaxWeeks() === 4 ? 'grid-cols-4' : getMaxWeeks() === 6 ? 'grid-cols-6' : 'grid-cols-8'}`}>
        {Array.from({ length: getMaxWeeks() }, (_, i) => i + 1).map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "default" : "outline"}
            onClick={() => setSelectedWeek(week)}
            className={`h-8 flex flex-col text-xs ${
              selectedWeek === week 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card'
            }`}
          >
            <span className="font-medium">W{week}</span>
          </Button>
        ))}
      </div>

      {/* Current Week Overview */}
      <Card className="bg-card border mb-2">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-primary">
              Week {selectedWeek}: {foundationProgram.weeks[selectedWeek as keyof typeof foundationProgram.weeks].focus}
            </h3>
            <Trophy className="h-4 w-4 text-warning" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-bold text-primary">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].pushups}
              </div>
              <div className="text-xs text-muted-foreground">Push-ups</div>
            </div>
            <div>
              <div className="text-sm font-bold text-accent">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].plank}
              </div>
              <div className="text-xs text-muted-foreground">Plank</div>
            </div>
            <div>
              <div className="text-sm font-bold text-secondary">
                {foundationProgram.benchmarks[`week${selectedWeek}` as keyof typeof foundationProgram.benchmarks].deadHang}
              </div>
              <div className="text-xs text-muted-foreground">Dead Hang</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <div className="space-y-2">
        {foundationProgram.weeks[selectedWeek as keyof typeof foundationProgram.weeks].sessions[0].exercises.map((exercise, index) => (
          <Card 
            key={exercise.name} 
            className={`bg-card border transition-all duration-300 ${
              activeExercise === exercise.name ? 'border-primary' : ''
            }`}
          >
            <CardContent className="p-2">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setActiveExercise(activeExercise === exercise.name ? null : exercise.name)}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs">{exercise.name}</h3>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <span>{exercise.sets}</span>
                      <span>•</span>
                      <span>{exercise.reps}</span>
                      <span>•</span>
                      <span>{exercise.rest}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight 
                  className={`h-3 w-3 text-muted-foreground transition-transform duration-300 ${
                    activeExercise === exercise.name ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {/* Expanded Exercise Details */}
              {activeExercise === exercise.name && (
                <div className="mt-3 space-y-2">
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
                    <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
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
                    <Button size="sm" className="flex-1 bg-primary text-primary-foreground rounded-lg">
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

      {/* Recovery & Tips Section */}
      <Card className="border mt-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-accent text-sm">Recovery Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-semibold text-primary text-xs">Frequency:</span>
            <span className="text-muted-foreground ml-2 text-xs">{foundationProgram.recoveryProtocols.frequency}</span>
          </div>
          <div>
            <span className="font-semibold text-primary text-xs">Post-Workout:</span>
            <span className="text-muted-foreground ml-2 text-xs">{foundationProgram.recoveryProtocols.postWorkout}</span>
          </div>
          <div>
            <span className="font-semibold text-primary text-xs">Sleep:</span>
            <span className="text-muted-foreground ml-2 text-xs">{foundationProgram.recoveryProtocols.sleep}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoundationProgram;
