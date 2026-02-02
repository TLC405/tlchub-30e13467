import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import type { LearnModeIntensity } from '@/types/learning';

interface IntensityOption {
  value: LearnModeIntensity;
  label: string;
  description: string;
  icon: typeof BookOpen;
}

const intensityOptions: IntensityOption[] = [
  {
    value: 'low',
    label: 'Quick Tips',
    description: 'Just the essentials—micro summaries only',
    icon: Sparkles,
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'Tips with practical application cues',
    icon: BookOpen,
  },
  {
    value: 'nerdy',
    label: 'Deep Dive',
    description: 'Full science explanations + research sources',
    icon: GraduationCap,
  },
];

interface LearnModeSettingsProps {
  compact?: boolean;
}

const LearnModeSettings = ({ compact = false }: LearnModeSettingsProps) => {
  const { intensity, setIntensity } = useLearnMode();

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {intensityOptions.map((option) => {
          const Icon = option.icon;
          const isActive = intensity === option.value;
          
          return (
            <Button
              key={option.value}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIntensity(option.value)}
              className="gap-1.5"
            >
              <Icon className="h-3.5 w-3.5" />
              {option.label}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="clean-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learn Mode Intensity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {intensityOptions.map((option) => {
          const Icon = option.icon;
          const isActive = intensity === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => setIntensity(option.value)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                isActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{option.label}</span>
                    {isActive && (
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LearnModeSettings;
