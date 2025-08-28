import { useState } from "react";
import { Search, Clock, Target, AlertCircle, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  primaryMuscles: string[];
  secondaryMuscles: string[];
  tendonsInvolved: string[];
  recoveryTime: {
    muscle: string;
    tendon: string;
    overall: string;
  };
  sets?: string;
  reps?: string;
  hold?: string;
  intensity: number; // 1-10 scale
  imageUrl?: string;
  instructions: string[];
  tips: string[];
  progressions: string[];
  regressions: string[];
}

const enhancedExercises: Exercise[] = [
  {
    id: "handstand-pushup",
    name: "Handstand Push-up",
    description: "Advanced vertical pushing exercise performed in handstand position",
    difficulty: "Expert",
    primaryMuscles: ["Anterior Deltoids", "Triceps", "Upper Trapezius"],
    secondaryMuscles: ["Core", "Serratus Anterior", "Rhomboids"],
    tendonsInvolved: ["Rotator Cuff Tendons", "Biceps Tendon", "Wrist Flexor Tendons"],
    recoveryTime: {
      muscle: "48-72 hours",
      tendon: "72-96 hours", 
      overall: "72-96 hours"
    },
    sets: "3-5",
    reps: "3-8",
    intensity: 9,
    instructions: [
      "Begin in handstand position against wall",
      "Lower head toward ground in controlled manner",
      "Push back to starting position",
      "Maintain straight body line throughout"
    ],
    tips: [
      "Master wall handstand before attempting",
      "Use parallettes to increase range of motion",
      "Focus on slow, controlled movement"
    ],
    progressions: ["Freestanding handstand push-up", "One-arm handstand push-up"],
    regressions: ["Pike push-up", "Wall handstand hold"]
  },
  {
    id: "human-flag",
    name: "Human Flag",
    description: "Horizontal isometric hold demonstrating exceptional core and lat strength",
    difficulty: "Expert", 
    primaryMuscles: ["Latissimus Dorsi", "Obliques", "Quadratus Lumborum"],
    secondaryMuscles: ["Anterior Deltoid", "Serratus Anterior", "Glutes"],
    tendonsInvolved: ["Lat Tendons", "Shoulder Tendons", "Wrist Tendons"],
    recoveryTime: {
      muscle: "48-72 hours",
      tendon: "72-96 hours",
      overall: "72-96 hours"
    },
    hold: "5-30 seconds",
    sets: "3-5",
    intensity: 10,
    instructions: [
      "Grip vertical pole with hands 3-4 feet apart",
      "Lift body horizontal to ground",
      "Maintain straight line from head to toes",
      "Hold position with control"
    ],
    tips: [
      "Build up through progressions slowly",
      "Focus on lat and core strength",
      "Use chalk for better grip"
    ],
    progressions: ["Human flag push-ups", "Human flag hold variations"],
    regressions: ["Tucked human flag", "Vertical flag"]
  },
  {
    id: "muscle-up",
    name: "Muscle-up",
    description: "Dynamic compound movement combining pull-up and dip",
    difficulty: "Advanced",
    primaryMuscles: ["Latissimus Dorsi", "Triceps", "Posterior Deltoids"],
    secondaryMuscles: ["Biceps", "Core", "Rhomboids"],
    tendonsInvolved: ["Biceps Tendon", "Triceps Tendon", "Rotator Cuff"],
    recoveryTime: {
      muscle: "24-48 hours",
      tendon: "48-72 hours",
      overall: "48-72 hours"
    },
    sets: "3-5",
    reps: "1-8",
    intensity: 8,
    instructions: [
      "Start hanging from bar with false grip",
      "Pull explosively past bar height",
      "Transition over bar to support position",
      "Control descent back to hang"
    ],
    tips: [
      "Master strict pull-ups first (10+ reps)",
      "Practice false grip separately", 
      "Use kipping only after strict form"
    ],
    progressions: ["Weighted muscle-ups", "Slow muscle-ups"],
    regressions: ["Assisted muscle-ups", "High pull-ups"]
  },
  {
    id: "pistol-squat",
    name: "Pistol Squat",
    description: "Single-leg squat requiring balance, flexibility, and strength",
    difficulty: "Advanced",
    primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
    secondaryMuscles: ["Core", "Hamstrings", "Hip Flexors"],
    tendonsInvolved: ["Patellar Tendon", "Achilles Tendon", "IT Band"],
    recoveryTime: {
      muscle: "24-48 hours",
      tendon: "48-72 hours",
      overall: "48-72 hours"
    },
    sets: "3-4",
    reps: "3-10 each leg",
    intensity: 7,
    instructions: [
      "Stand on one leg, other leg extended forward",
      "Lower down keeping extended leg straight",
      "Descend until glute touches heel",
      "Drive through heel to return to standing"
    ],
    tips: [
      "Work on ankle and hip mobility",
      "Use assistance until full range achieved",
      "Keep torso upright throughout movement"
    ],
    progressions: ["Jump pistol squats", "Weighted pistol squats"],
    regressions: ["Assisted pistol squats", "Box pistol squats"]
  }
];

const EnhancedExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { toast } = useToast();

  const filteredExercises = enhancedExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const generateExerciseImage = (exercise: Exercise) => {
    toast({
      title: "Generating Image",
      description: `Creating demonstration image for ${exercise.name}`,
    });
    
    // In real implementation, this would call the image generation API
    setTimeout(() => {
      toast({
        title: "Image Generated",
        description: "Exercise demonstration image created successfully",
      });
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-600";
      case "Intermediate": return "bg-blue-600";
      case "Advanced": return "bg-orange-600";
      case "Expert": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return "text-green-500";
    if (intensity <= 6) return "text-yellow-500";
    if (intensity <= 8) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Enhanced Exercise Library</h1>
        <p className="text-muted-foreground">Detailed exercise analysis with muscle, tendon, and recovery data</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search exercises or muscles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Beginner">Beginner</TabsTrigger>
          <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="Advanced">Advanced</TabsTrigger>
          <TabsTrigger value="Expert">Expert</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{exercise.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                    {exercise.difficulty}
                  </Badge>
                  <Badge variant="outline" className={getIntensityColor(exercise.intensity)}>
                    {exercise.intensity}/10
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Primary Muscles
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exercise.primaryMuscles.map((muscle, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Tendons Involved
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exercise.tendonsInvolved.map((tendon, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tendon}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Recovery Time
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div>Muscle: {exercise.recoveryTime.muscle}</div>
                    <div>Tendon: {exercise.recoveryTime.tendon}</div>
                    <div className="font-medium">Overall: {exercise.recoveryTime.overall}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 text-sm">
                {exercise.sets && (
                  <Badge variant="outline">{exercise.sets} sets</Badge>
                )}
                {exercise.reps && (
                  <Badge variant="outline">{exercise.reps} reps</Badge>
                )}
                {exercise.hold && (
                  <Badge variant="outline">{exercise.hold} hold</Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => generateExerciseImage(exercise)}
                >
                  Generate Image
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedExercise && (
        <Card className="mt-6 border-2 border-primary">
          <CardHeader>
            <CardTitle>{selectedExercise.name} - Detailed Analysis</CardTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setSelectedExercise(null)}
              className="w-fit"
            >
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="instructions">
              <TabsList>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="anatomy">Anatomy</TabsTrigger>
                <TabsTrigger value="progressions">Progressions</TabsTrigger>
                <TabsTrigger value="recovery">Recovery</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions" className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Step-by-Step Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {selectedExercise.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Pro Tips:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedExercise.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="anatomy" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Primary Muscles:</h4>
                    {selectedExercise.primaryMuscles.map((muscle, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{muscle}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Secondary Muscles:</h4>
                    {selectedExercise.secondaryMuscles.map((muscle, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{muscle}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Tendons & Connective Tissue:</h4>
                  {selectedExercise.tendonsInvolved.map((tendon, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      <span className="text-sm">{tendon}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progressions" className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">Progressions (Harder):</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedExercise.progressions.map((progression, idx) => (
                      <li key={idx}>{progression}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-blue-600">Regressions (Easier):</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedExercise.regressions.map((regression, idx) => (
                      <li key={idx}>{regression}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="recovery" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        Muscle Recovery
                      </h4>
                      <p className="text-sm">{selectedExercise.recoveryTime.muscle}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Tendon Recovery
                      </h4>
                      <p className="text-sm">{selectedExercise.recoveryTime.tendon}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Overall Recovery
                      </h4>
                      <p className="text-sm">{selectedExercise.recoveryTime.overall}</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                  <CardContent className="p-3">
                    <h4 className="font-medium mb-2">Recovery Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Allow adequate rest between training sessions</li>
                      <li>Focus on sleep quality (7-9 hours per night)</li>
                      <li>Stay hydrated and maintain proper nutrition</li>
                      <li>Consider active recovery (light movement, stretching)</li>
                      <li>Listen to your body - extend recovery if needed</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedExerciseLibrary;