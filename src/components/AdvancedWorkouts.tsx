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

const AdvancedWorkouts = () => {
  const [selectedLevel, setSelectedLevel] = useState<'intermediate' | 'advanced'>('intermediate');
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const workoutCategories = {
    intermediate: {
      calisthenics: [
        {
          name: "Archer Push-ups",
          sets: "3",
          reps: "6-8 each side",
          rest: "90s",
          primaryMuscles: ["Chest", "Triceps", "Core"],
          tips: "One arm performs primary push while other assists. Gradually shift more weight to working arm.",
          difficulty: "Intermediate"
        },
        {
          name: "Pistol Squat Progression", 
          sets: "3",
          reps: "5-8 each leg",
          rest: "90s",
          primaryMuscles: ["Quadriceps", "Glutes", "Core"],
          tips: "Single leg squat. Use assistance at first, progress to full range unassisted.",
          difficulty: "Intermediate"
        },
        {
          name: "L-Sit Hold",
          sets: "3", 
          reps: "15-30s",
          rest: "90s",
          primaryMuscles: ["Core", "Hip Flexors", "Shoulders"],
          tips: "Legs parallel to ground. Start with tuck position if needed.",
          difficulty: "Intermediate"
        },
        {
          name: "Muscle-up Progression",
          sets: "3",
          reps: "3-5 reps",
          rest: "120s", 
          primaryMuscles: ["Lats", "Triceps", "Core"],
          tips: "Explosive pull with smooth transition. Use resistance band for assistance.",
          difficulty: "Intermediate"
        },
        {
          name: "Handstand Push-up Progression",
          sets: "3",
          reps: "3-6 reps",
          rest: "120s",
          primaryMuscles: ["Shoulders", "Triceps", "Core"],
          tips: "Use wall for support. Focus on slow controlled movement.",
          difficulty: "Intermediate"
        },
        {
          name: "Weighted Pull-ups",
          sets: "4",
          reps: "6-8 reps", 
          rest: "120s",
          primaryMuscles: ["Lats", "Biceps", "Core"],
          tips: "Add weight gradually. Focus on full range of motion.",
          difficulty: "Intermediate"
        },
        {
          name: "Ring Dips",
          sets: "3",
          reps: "8-12 reps",
          rest: "90s",
          primaryMuscles: ["Triceps", "Chest", "Shoulders"],
          tips: "Control the rings throughout movement. Full range of motion.",
          difficulty: "Intermediate"
        },
        {
          name: "Front Lever Tuck",
          sets: "3", 
          reps: "10-20s",
          rest: "120s",
          primaryMuscles: ["Lats", "Core", "Shoulders"],
          tips: "Horizontal body position. Knees tucked to chest initially.",
          difficulty: "Intermediate"
        },
        {
          name: "Typewriter Pull-ups",
          sets: "3",
          reps: "4-6 total",
          rest: "120s",
          primaryMuscles: ["Lats", "Biceps", "Core"],
          tips: "Pull to center then slide laterally left and right.",
          difficulty: "Intermediate"
        },
        {
          name: "Wall Handstand Hold",
          sets: "3",
          reps: "30-60s", 
          rest: "90s",
          primaryMuscles: ["Shoulders", "Core", "Forearms"],
          tips: "Focus on straight line alignment. Push actively through shoulders.",
          difficulty: "Intermediate"
        },
        {
          name: "Tuck Planche",
          sets: "3",
          reps: "8-15s",
          rest: "120s",
          primaryMuscles: ["Shoulders", "Core", "Triceps"],
          tips: "Knees tucked to chest. Lean forward significantly.",
          difficulty: "Intermediate"
        },
        {
          name: "Dragon Squats",
          sets: "3",
          reps: "5-8 each leg",
          rest: "90s",
          primaryMuscles: ["Quadriceps", "Glutes", "Hip Flexors"],
          tips: "Deep lunge with rear leg elevated. Focus on control.",
          difficulty: "Intermediate"
        },
        {
          name: "Russian Push-ups", 
          sets: "3",
          reps: "6-10 reps",
          rest: "120s",
          primaryMuscles: ["Chest", "Shoulders", "Core"],
          tips: "Explosive forward and backward movement. Control the negative.",
          difficulty: "Intermediate"
        },
        {
          name: "Shrimp Squats",
          sets: "3",
          reps: "3-6 each leg",
          rest: "120s",
          primaryMuscles: ["Quadriceps", "Glutes", "Balance"],
          tips: "Single leg squat holding rear foot. Advanced balance challenge.",
          difficulty: "Intermediate"
        },
        {
          name: "Pseudo Planche Push-ups",
          sets: "3",
          reps: "8-12 reps", 
          rest: "90s",
          primaryMuscles: ["Shoulders", "Triceps", "Core"],
          tips: "Hands positioned by ribs. Lean forward significantly.",
          difficulty: "Intermediate"
        }
      ],
      advanced: [
        {
          name: "One Arm Push-up",
          sets: "3",
          reps: "3-6 each arm",
          rest: "180s",
          primaryMuscles: ["Chest", "Triceps", "Core"],
          tips: "Ultimate pushing strength. Wide leg stance for stability.",
          difficulty: "Advanced"
        },
        {
          name: "Human Flag",
          sets: "3", 
          reps: "5-15s each side",
          rest: "180s",
          primaryMuscles: ["Lats", "Obliques", "Shoulders"],
          tips: "Side strength display. Body horizontal from vertical support.",
          difficulty: "Advanced"
        },
        {
          name: "Freestanding Handstand", 
          sets: "3",
          reps: "30-60s",
          rest: "120s",
          primaryMuscles: ["Shoulders", "Core", "Forearms"],
          tips: "Perfect balance without wall support. Consistent line.",
          difficulty: "Advanced"
        },
        {
          name: "Full Planche",
          sets: "3",
          reps: "5-10s",
          rest: "240s",
          primaryMuscles: ["Shoulders", "Core", "Triceps"],
          tips: "Body horizontal, arms straight. Ultimate strength demonstration.",
          difficulty: "Advanced"
        },
        {
          name: "One Arm Pull-up",
          sets: "3",
          reps: "1-3 each arm", 
          rest: "240s",
          primaryMuscles: ["Lats", "Biceps", "Core"],
          tips: "Single arm pulling strength. Progress very gradually.",
          difficulty: "Advanced"
        },
        {
          name: "Iron Cross (Rings)",
          sets: "3",
          reps: "3-8s",
          rest: "240s",
          primaryMuscles: ["Chest", "Shoulders", "Biceps"],
          tips: "Arms extended horizontally. Extreme strength requirement.",
          difficulty: "Advanced"
        },
        {
          name: "Maltese Cross",
          sets: "3",
          reps: "2-5s",
          rest: "300s",
          primaryMuscles: ["Shoulders", "Core", "Triceps"],
          tips: "Forward lean planche. Most advanced pushing skill.",
          difficulty: "Advanced" 
        },
        {
          name: "90-Degree Push-up",
          sets: "3",
          reps: "3-6 reps",
          rest: "180s",
          primaryMuscles: ["Shoulders", "Triceps", "Core"],
          tips: "Extreme lean angle. Preparation for advanced skills.",
          difficulty: "Advanced"
        },
        {
          name: "Straddle Planche",
          sets: "3", 
          reps: "8-15s",
          rest: "180s",
          primaryMuscles: ["Shoulders", "Core", "Triceps"],
          tips: "Wide leg planche. Progression toward full planche.",
          difficulty: "Advanced"
        },
        {
          name: "Front Lever",
          sets: "3",
          reps: "8-20s",
          rest: "180s",
          primaryMuscles: ["Lats", "Core", "Shoulders"],
          tips: "Horizontal hang, face up. Advanced pulling strength.",
          difficulty: "Advanced"
        },
        {
          name: "Handstand Walking",
          sets: "3",
          reps: "10-20 steps",
          rest: "120s", 
          primaryMuscles: ["Shoulders", "Core", "Coordination"],
          tips: "Small controlled steps. Maintain hollow body position.",
          difficulty: "Advanced"
        },
        {
          name: "Muscle-up to Handstand",
          sets: "3",
          reps: "1-3 reps",
          rest: "240s",
          primaryMuscles: ["Full Body", "Coordination"],
          tips: "Flow movement combining multiple skills.",
          difficulty: "Advanced"
        },
        {
          name: "One Arm Handstand",
          sets: "3",
          reps: "5-15s each arm",
          rest: "300s",
          primaryMuscles: ["Shoulders", "Core", "Balance"],
          tips: "Ultimate handstand progression. Years of practice required.",
          difficulty: "Advanced"
        },
        {
          name: "Victorian Cross", 
          sets: "3",
          reps: "1-5s",
          rest: "300s",
          primaryMuscles: ["Shoulders", "Core", "Triceps"],
          tips: "Arms behind body line. Extreme flexibility and strength.",
          difficulty: "Advanced"
        },
        {
          name: "Hefesto (Ring)",
          sets: "3",
          reps: "1-3 reps",
          rest: "240s", 
          primaryMuscles: ["Triceps", "Chest", "Shoulders"],
          tips: "From support to inverted hang. Advanced ring skill.",
          difficulty: "Advanced"
        }
      ]
    }
  };

  const balanceSkills = [
    {
      name: "Crow Pose",
      level: "Beginner",
      hold: "15-30s",
      primaryMuscles: ["Triceps", "Core", "Wrists"],
      tips: "Knees on triceps. Shift weight forward gradually.",
      progressions: ["Toe support", "One foot lift", "Both feet up", "Crane pose"]
    },
    {
      name: "Side Crow",
      level: "Intermediate",
      hold: "10-20s",
      primaryMuscles: ["Obliques", "Triceps", "Core"],
      tips: "Knees to side of arm. Twist and balance.",
      progressions: ["Basic crow mastery", "Side lean", "Knee placement", "Full hold"]
    },
    {
      name: "Firefly Pose",
      level: "Intermediate", 
      hold: "8-15s",
      primaryMuscles: ["Triceps", "Hamstrings", "Core"],
      tips: "Legs over arms. Requires flexibility and strength.",
      progressions: ["Hip flexibility", "Arm threading", "Lift prep", "Full extension"]
    },
    {
      name: "Eight Angle Pose",
      level: "Advanced",
      hold: "5-10s",
      primaryMuscles: ["Triceps", "Core", "Hip Flexors"], 
      tips: "Complex arm balance with leg configuration.",
      progressions: ["Side crow", "Leg wrap", "Weight shift", "Full pose"]
    },
    {
      name: "Peacock Pose",
      level: "Advanced",
      hold: "5-15s",
      primaryMuscles: ["Forearms", "Core", "Shoulders"],
      tips: "Elbows into abdomen. Body parallel to ground.",
      progressions: ["Wrist prep", "Elbow placement", "Tuck version", "Full extension"]
    }
  ];

  const mobilityFlow = [
    {
      name: "Cat-Cow Flow",
      level: "Beginner",
      duration: "1-2 min",
      focus: "Spinal Mobility",
      tips: "Slow controlled movement. Feel each vertebra.",
      muscles: ["Spine", "Hip Flexors", "Shoulders"]
    },
    {
      name: "World's Greatest Stretch",
      level: "Beginner", 
      duration: "30s each side",
      focus: "Hip Mobility",
      tips: "Lunge with rotation. Open up tight hips.",
      muscles: ["Hip Flexors", "Thoracic Spine", "Ankles"]
    },
    {
      name: "Shoulder Pass-Through",
      level: "Intermediate",
      duration: "10-15 reps",
      focus: "Shoulder Flexibility",
      tips: "Wide grip, slow controlled movement.",
      muscles: ["Shoulders", "Chest", "Upper Back"]
    },
    {
      name: "Bridge Progressions",
      level: "Intermediate",
      duration: "30-60s hold",
      focus: "Back Flexibility", 
      tips: "Full wheel pose. Active shoulders and legs.",
      muscles: ["Back", "Shoulders", "Hip Flexors", "Glutes"]
    },
    {
      name: "Pancake Stretch",
      level: "Advanced",
      duration: "2-3 min",
      focus: "Hip/Hamstring Flexibility",
      tips: "Wide leg forward fold. Breathe into stretch.",
      muscles: ["Hamstrings", "Adductors", "Lower Back"]
    },
    {
      name: "Shoulder Bridge Walk",
      level: "Advanced",
      duration: "5-10 steps",
      focus: "Active Flexibility",
      tips: "Bridge with hand movement. Advanced mobility.",
      muscles: ["Shoulders", "Back", "Core", "Legs"]
    },
    {
      name: "Middle Split Slide",
      level: "Advanced", 
      duration: "1-3 min",
      focus: "Hip Flexibility",
      tips: "Active and passive stretching combined.",
      muscles: ["Adductors", "Hip Flexors", "Glutes"]
    }
  ];

  const wowSkills = [
    {
      name: "Elbow Lever",
      level: "Beginner-Intermediate",
      hold: "10-30s",
      difficulty: "★★☆☆☆",
      tips: "Deceptive balance skill. Elbows support body weight.",
      secret: "Elbows into stomach, not just triceps. Balance point is key.",
      muscles: ["Triceps", "Core", "Balance"]
    },
    {
      name: "Wall Flip",
      level: "Intermediate",
      duration: "Single rep",
      difficulty: "★★★☆☆", 
      tips: "Run up wall and backflip. Requires courage and timing.",
      secret: "Commit fully. Hesitation causes failure.",
      muscles: ["Legs", "Core", "Coordination"]
    },
    {
      name: "Kip-Up",
      level: "Intermediate",
      duration: "Single rep",
      difficulty: "★★★☆☆",
      tips: "From lying to standing without hands. Hip explosion.",
      secret: "It's all in the hip thrust timing, not strength.",
      muscles: ["Hip Flexors", "Core", "Coordination"]
    },
    {
      name: "One-Handed Cartwheel",
      level: "Intermediate",
      duration: "Single rep", 
      difficulty: "★★★☆☆",
      tips: "Cartwheel using only one hand for support.",
      secret: "Start with strong two-handed cartwheel. Speed helps.",
      muscles: ["Shoulders", "Core", "Coordination"]
    },
    {
      name: "Scorpion Handstand",
      level: "Advanced",
      hold: "5-15s",
      difficulty: "★★★★☆",
      tips: "Handstand with feet touching head. Extreme flexibility.",
      secret: "Back flexibility is more important than handstand strength.",
      muscles: ["Shoulders", "Back", "Flexibility"]
    },
    {
      name: "Hollowback Handstand",
      level: "Advanced", 
      hold: "5-20s",
      difficulty: "★★★★☆",
      tips: "Arched handstand. Looks impossible to beginners.",
      secret: "Active shoulder flexibility and core strength balance.",
      muscles: ["Shoulders", "Back", "Core"]
    },
    {
      name: "Walking on Hands Down Stairs",
      level: "Advanced",
      duration: "5-10 steps",
      difficulty: "★★★★★",
      tips: "Handstand walk down steps. Ultimate control.",
      secret: "Start with small steps. Finger control is everything.",
      muscles: ["Shoulders", "Wrists", "Balance", "Core"]
    },
    {
      name: "One Arm Elbow Lever",
      level: "Advanced", 
      hold: "3-8s",
      difficulty: "★★★★★",
      tips: "Elbow lever with one arm. Extreme balance challenge.",
      secret: "Master two-arm version first. Hip positioning crucial.",
      muscles: ["Triceps", "Core", "Balance"]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-2 pb-20">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Advanced Training
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Intermediate & Advanced Calisthenics</p>
      </div>

      {/* Level Selector */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={selectedLevel === 'intermediate' ? "default" : "outline"}
          onClick={() => setSelectedLevel('intermediate')}
          className={`rounded-xl flex-1 h-12 ${
            selectedLevel === 'intermediate' 
              ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground' 
              : ''
          }`}
        >
          <User className="h-4 w-4 mr-2" />
          Intermediate
        </Button>
        <Button
          variant={selectedLevel === 'advanced' ? "default" : "outline"}
          onClick={() => setSelectedLevel('advanced')}
          className={`rounded-xl flex-1 h-12 ${
            selectedLevel === 'advanced'
              ? 'bg-gradient-to-r from-warning to-warning/80 text-warning-foreground'
              : ''
          }`}
        >
          <Crown className="h-4 w-4 mr-2" />
          Advanced
        </Button>
      </div>

      {/* Calisthenics Workouts */}
      <Card className="glass-card border-2 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            {selectedLevel === 'intermediate' ? 'Intermediate' : 'Advanced'} Calisthenics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {workoutCategories.intermediate[selectedLevel].map((exercise, index) => (
            <Card 
              key={exercise.name}
              className={`glass-card border transition-all duration-300 cursor-pointer ${
                activeExercise === exercise.name ? 'border-primary shadow-lg shadow-primary/25' : ''
              }`}
              onClick={() => setActiveExercise(activeExercise === exercise.name ? null : exercise.name)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{exercise.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{exercise.sets}</span>
                        <span>•</span>
                        <span>{exercise.reps}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {exercise.difficulty}
                  </Badge>
                </div>

                {activeExercise === exercise.name && (
                  <div className="mt-3 space-y-2 animate-fade-in">
                    <div>
                      <p className="text-xs text-muted-foreground bg-background-secondary/50 p-2 rounded-lg">
                        {exercise.tips}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exercise.primaryMuscles.map((muscle) => (
                        <Badge key={muscle} variant="outline" className="text-xs bg-primary/10 text-primary border-primary">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Start Exercise
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Balance Skills */}
      <Card className="glass-card border-2 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Target className="h-5 w-5 mr-2 text-accent" />
            Balance Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {balanceSkills.map((skill, index) => (
            <Card key={skill.name} className="glass-card border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{skill.tips}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {skill.primaryMuscles.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs bg-accent/10 text-accent border-accent">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-accent">{skill.hold}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Mobility Flow */}
      <Card className="glass-card border-2 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-secondary" />
            Mobility & Flexibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mobilityFlow.map((flow, index) => (
            <Card key={flow.name} className="glass-card border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{flow.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {flow.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{flow.tips}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {flow.muscles.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-secondary">{flow.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Wow Skills */}
      <Card className="glass-card border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-warning" />
            Crowd-Pleasing Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {wowSkills.map((skill, index) => (
            <Card key={skill.name} className="glass-card border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-warning">{skill.difficulty}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{skill.tips}</p>
                <p className="text-xs text-warning/80 italic mb-2">Secret: {skill.secret}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {skill.muscles.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs bg-warning/10 text-warning border-warning">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-warning">{skill.hold || skill.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedWorkouts;