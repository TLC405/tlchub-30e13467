import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Star } from "lucide-react";

interface Exercise {
  name: string;
  target: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface TrainingPillarProps {
  title: string;
  icon: ReactNode;
  description: string;
  color: "handstand" | "planche" | "pullup" | "rings";
  exercises: Exercise[];
  progress: number;
}

const TrainingPillar = ({ title, icon, description, color, exercises, progress }: TrainingPillarProps) => {
  const themeClass = `${color}-theme`;
  const { toast } = useToast();

  const handleViewExercises = () => {
    toast({
      title: `${title} Exercises`,
      description: `Opening ${title.toLowerCase()} exercise library...`,
    });
  };
  
  return (
    <Card className={`glass-card leather-texture ${themeClass} border-2 premium-shadow transition-all duration-300 hover:scale-105`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 primary-gradient rounded-xl flex items-center justify-center gold-shadow">
              {icon}
            </div>
            <div>
              <CardTitle className="text-xl text-card-foreground">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bronze-gradient text-primary-foreground">
            {progress}% Complete
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-background-secondary rounded-full inner-shadow">
            <div 
              className="h-full primary-gradient rounded-full gold-shadow transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {exercises.slice(0, 3).map((exercise, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background-secondary/50 rounded-lg border border-card-border">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bronze-gradient rounded-full gold-shadow" />
                <div>
                  <p className="font-medium text-card-foreground">{exercise.name}</p>
                  <p className="text-xs text-muted-foreground">{exercise.target}</p>
                </div>
              </div>
              <Badge 
                variant={exercise.level === "Beginner" ? "secondary" : 
                       exercise.level === "Intermediate" ? "default" : "outline"}
                className="text-xs"
              >
                {exercise.level}
              </Badge>
            </div>
          ))}
          
          <Button 
            onClick={handleViewExercises}
            className="w-full mt-4 primary-gradient hover:opacity-90 text-primary-foreground font-semibold gold-shadow"
          >
            View All Exercises
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingPillar;