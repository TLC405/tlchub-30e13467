
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Calendar, Dumbbell } from "lucide-react";
import type { ViewType } from "@/types";

interface CompactQuickActionsProps {
  onNavigate: (view: ViewType) => void;
}

const CompactQuickActions = ({ onNavigate }: CompactQuickActionsProps) => {
  const actions = [
    {
      id: 'training' as ViewType,
      title: 'Start Training',
      icon: Dumbbell,
      color: 'bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70',
      textColor: 'text-primary-foreground'
    },
    {
      id: 'enhanced-library' as ViewType,
      title: 'Browse Library',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70',
      textColor: 'text-secondary-foreground'
    },
    {
      id: 'agent' as ViewType,
      title: 'Coach Care',
      icon: Brain,
      color: 'bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70',
      textColor: 'text-accent-foreground'
    },
    {
      id: 'plan' as ViewType,
      title: 'Weekly Plan',
      icon: Calendar,
      color: 'bg-gradient-to-br from-muted to-muted/80 hover:from-muted/90 hover:to-muted/70',
      textColor: 'text-muted-foreground'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/5 border border-border/60">
      <CardContent className="p-4">
        <h3 className="font-bold text-foreground mb-3 text-sm">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className={`h-12 ${action.color} ${action.textColor} transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] font-semibold text-xs`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon className="h-4 w-4" />
                  <span>{action.title}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactQuickActions;
