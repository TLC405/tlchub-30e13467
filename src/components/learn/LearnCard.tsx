import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Calendar, 
  Target, 
  Zap, 
  AlertTriangle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import type { LearningPrinciple, LearnDefaultRecipe } from '@/types/learning';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { applyTemplate } from '@/data/learningPrinciples';

interface LearnCardProps {
  principle: LearningPrinciple;
  exerciseName: string;
  applyNote?: string;
  recipe?: LearnDefaultRecipe;
  cardType: 'recipe' | 'focus' | 'progress';
}

const cardIcons = {
  recipe: Calendar,
  focus: Target,
  progress: Zap,
};

const cardTitles = {
  recipe: 'Practice Recipe',
  focus: 'Focus Cue',
  progress: 'Progress Smarter',
};

const LearnCard = ({ 
  principle, 
  exerciseName, 
  applyNote, 
  recipe,
  cardType 
}: LearnCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { intensity } = useLearnMode();
  
  const Icon = cardIcons[cardType];
  const title = cardTitles[cardType];
  const appliedContent = applyNote || applyTemplate(principle.how_to_apply_template, exerciseName);

  // Format recipe info if available
  const recipeInfo = recipe ? (
    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full">
        {recipe.frequency_per_week}x/week
      </span>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full">
        {recipe.set_count_range[0]}–{recipe.set_count_range[1]} sets
      </span>
      {recipe.dose_type === 'microdose' && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full">
          Microdose
        </span>
      )}
    </div>
  ) : null;

  return (
    <Card className="clean-border premium-shadow bg-card overflow-hidden">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground">{principle.title}</p>
          </div>
        </div>

        {/* Micro Summary */}
        <p className="text-sm text-foreground leading-relaxed">
          {principle.micro_summary}
        </p>

        {/* Apply line - shown for standard and nerdy */}
        {intensity !== 'low' && (
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Apply to {exerciseName}:</p>
            <p className="text-sm text-foreground">{appliedContent}</p>
            {cardType === 'recipe' && recipeInfo}
          </div>
        )}

        {/* Caution - always visible but subtle */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-3 w-3 flex-shrink-0 mt-0.5 text-warning" />
          <p>{principle.caution}</p>
        </div>

        {/* Expandable section for nerdy mode or manual expansion */}
        {(intensity === 'nerdy' || isExpanded) && (
          <div className="pt-2 border-t border-border space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Why it works
              </p>
              <p className="text-sm text-muted-foreground">{principle.why_it_works}</p>
            </div>
            
            {principle.sources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {principle.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Source {idx + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Show more toggle - only if not nerdy mode */}
        {intensity !== 'nerdy' && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-center text-xs text-muted-foreground hover:text-foreground"
              >
                {isExpanded ? 'Show less' : 'Show more'}
                <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default LearnCard;
