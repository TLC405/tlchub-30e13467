import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Zap, Award } from "lucide-react";

interface Skill {
  name: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  unlocked: boolean;
}

const skills: Skill[] = [
  {
    name: "Human Flag",
    beginner: "Flag Lean",
    intermediate: "Tucked Flag Hold",
    advanced: "Full Flag Hold",
    unlocked: true
  },
  {
    name: "L-Sit",
    beginner: "Tuck Sit",
    intermediate: "L-Sit (floor/p-bars)",
    advanced: "V-Sit/Press Sit",
    unlocked: true
  },
  {
    name: "Crow Pose",
    beginner: "Basic Hold",
    intermediate: "Extended",
    advanced: "Flow into Handstand",
    unlocked: false
  },
  {
    name: "Elbow Lever",
    beginner: "Knees on triceps",
    intermediate: "Legs extended out",
    advanced: "Bent to Straight",
    unlocked: false
  }
];

const SkillShowcase = () => {
  return (
    <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
              <Star className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl text-card-foreground">Skill Showcase</CardTitle>
              <p className="text-sm text-muted-foreground">Master these impressive moves</p>
            </div>
          </div>
          <Badge className="bronze-gradient text-primary-foreground">
            <Award className="h-3 w-3 mr-1" />
            2/4 Unlocked
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                skill.unlocked 
                  ? 'glass-card border-gold/30 gold-shadow' 
                  : 'bg-background-secondary/30 border-border opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-card-foreground">{skill.name}</h3>
                {skill.unlocked ? (
                  <Zap className="h-4 w-4 text-gold" />
                ) : (
                  <div className="h-4 w-4 bg-muted rounded-full" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Beginner</span>
                  <span className="text-xs text-card-foreground">{skill.beginner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Intermediate</span>
                  <span className="text-xs text-card-foreground">{skill.intermediate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Advanced</span>
                  <span className="text-xs text-card-foreground">{skill.advanced}</span>
                </div>
              </div>
              
              {skill.unlocked && (
                <Button 
                  size="sm" 
                  className="w-full mt-3 primary-gradient hover:opacity-90 text-primary-foreground gold-shadow"
                >
                  Practice Now
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillShowcase;