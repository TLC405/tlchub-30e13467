import { useMemo } from 'react';
import LearnCard from './LearnCard';
import type { LearnConfig, LearningPrinciple } from '@/types/learning';
import { principlesMap } from '@/data/learningPrinciples';

interface LearnTabProps {
  exerciseName: string;
  learnConfig?: LearnConfig;
  difficulty?: string;
}

const LearnTab = ({ exerciseName, learnConfig, difficulty }: LearnTabProps) => {
  // Get the 3 cards to display based on learn config
  const cards = useMemo(() => {
    const slugs = learnConfig?.learn_principle_slugs || getDefaultSlugs(difficulty);
    const applyNotes = learnConfig?.learn_apply_notes || {};
    const recipe = learnConfig?.learn_default_recipe;

    const result: Array<{
      principle: LearningPrinciple;
      cardType: 'recipe' | 'focus' | 'progress';
      applyNote?: string;
    }> = [];

    // Card 1: Practice Recipe (distributed_practice)
    const distributedPrinciple = principlesMap['distributed_practice'];
    if (distributedPrinciple) {
      result.push({
        principle: distributedPrinciple,
        cardType: 'recipe',
        applyNote: applyNotes['distributed_practice'],
      });
    }

    // Card 2: Focus Cue (external_focus)
    const externalFocus = principlesMap['external_focus'];
    if (externalFocus) {
      result.push({
        principle: externalFocus,
        cardType: 'focus',
        applyNote: applyNotes['external_focus'],
      });
    }

    // Card 3: Progress Smarter (variability or retention_test based on slugs)
    const progressSlug = slugs.includes('variability') ? 'variability' : 
                         slugs.includes('retention_test') ? 'retention_test' : 
                         'variability';
    const progressPrinciple = principlesMap[progressSlug];
    if (progressPrinciple) {
      result.push({
        principle: progressPrinciple,
        cardType: 'progress',
        applyNote: applyNotes[progressSlug],
      });
    }

    return result;
  }, [learnConfig, difficulty]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>No learning tips available for this exercise.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cards.map((card, idx) => (
        <LearnCard
          key={`${card.principle.slug}-${idx}`}
          principle={card.principle}
          exerciseName={exerciseName}
          applyNote={card.applyNote}
          recipe={card.cardType === 'recipe' ? learnConfig?.learn_default_recipe : undefined}
          cardType={card.cardType}
        />
      ))}
      
      {/* Coach tip if available */}
      {learnConfig?.learn_coach_tip && (
        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <p className="text-sm text-muted-foreground italic">
            💡 {learnConfig.learn_coach_tip}
          </p>
        </div>
      )}
    </div>
  );
};

// Default slugs based on exercise difficulty
const getDefaultSlugs = (difficulty?: string): string[] => {
  switch (difficulty) {
    case 'beginner':
      return ['distributed_practice', 'external_focus', 'autonomy'];
    case 'intermediate':
      return ['distributed_practice', 'external_focus', 'variability'];
    case 'advanced':
    case 'elite':
      return ['distributed_practice', 'external_focus', 'retention_test'];
    default:
      return ['distributed_practice', 'external_focus', 'variability'];
  }
};

export default LearnTab;
