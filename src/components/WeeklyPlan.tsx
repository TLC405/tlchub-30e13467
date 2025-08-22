import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target } from "lucide-react";

interface DayPlan {
  day: string;
  focus: string;
  skill: string;
  color: string;
  completed: boolean;
}

const weeklyPlan: DayPlan[] = [
  { day: "Monday", focus: "Handstand", skill: "Human Flag Progression", color: "handstand", completed: true },
  { day: "Wednesday", focus: "Planche & Parallettes", skill: "L-Sit & Elbow Lever", color: "planche", completed: true },
  { day: "Friday", focus: "Pull-Ups", skill: "Crow Pose, Russian Push-ups", color: "pullup", completed: false },
  { day: "Sunday", focus: "Rings", skill: "Skin the Cat, Muscle-Up", color: "rings", completed: false },
];

const WeeklyPlan = () => {
  return (
    <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl text-card-foreground">Weekly Training Framework</CardTitle>
            <p className="text-sm text-muted-foreground">Your structured progression plan</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyPlan.map((plan, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl border-2 ${plan.color}-theme transition-all duration-300 hover:scale-105 ${
                plan.completed ? 'opacity-100' : 'opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-card-foreground">{plan.day}</span>
                </div>
                <Badge 
                  variant={plan.completed ? "default" : "secondary"}
                  className={plan.completed ? "bronze-gradient text-primary-foreground" : ""}
                >
                  {plan.completed ? "Complete" : "Upcoming"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">{plan.focus}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-5">{plan.skill}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyPlan;