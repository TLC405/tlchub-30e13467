import { useEffect } from 'react';
import { toast } from 'sonner';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { Lightbulb } from 'lucide-react';

interface LearnBiteToastProps {
  exerciseId: string;
  exerciseName: string;
  principlesSlugs: string[];
}

// Micro-copy for each principle type
const biteMessages: Record<string, (exerciseName: string) => string> = {
  distributed_practice: (name) => `Next time: Try ${name} as 4×10s instead of 1×40s. Same work, better learning.`,
  external_focus: (name) => `Cue for ${name}: Think "push the floor away" instead of "squeeze shoulders."`,
  variability: (name) => `Level up: Try ${name} with a tiny grip or tempo change next session.`,
  autonomy: (name) => `Your choice: Pick when to do ${name} in your workout. Ownership boosts learning.`,
  feedback_dosing: (name) => `Pro tip: Film just set #1 of ${name}. One fix per session, not ten.`,
  retention_test: (name) => `Real test: Try ${name} cold in 48 hours. That's when you know you're learning.`,
  sleep_consolidation: (name) => `Recovery hack: Short ${name} sessions + quality sleep = faster gains.`,
  interleaving: (name) => `Mix it up: Alternate ${name} with a related skill once you're stable.`,
};

export const showLearnBiteToast = (
  exerciseId: string,
  exerciseName: string,
  principlesSlugs: string[],
  getNextPrinciple: (id: string, slugs: string[]) => { slug: string } | undefined
) => {
  if (!principlesSlugs.length) return;

  const principle = getNextPrinciple(exerciseId, principlesSlugs);
  if (!principle) return;

  const getMessage = biteMessages[principle.slug];
  const message = getMessage ? getMessage(exerciseName) : null;

  if (message) {
    toast(message, {
      icon: <Lightbulb className="h-4 w-4 text-primary" />,
      duration: 5000,
      className: 'learn-bite-toast',
    });
  }
};

// Component version for declarative use
const LearnBiteToast = ({ 
  exerciseId, 
  exerciseName, 
  principlesSlugs 
}: LearnBiteToastProps) => {
  const { getNextRotationPrinciple } = useLearnMode();

  useEffect(() => {
    showLearnBiteToast(
      exerciseId,
      exerciseName,
      principlesSlugs,
      getNextRotationPrinciple
    );
  }, [exerciseId, exerciseName, principlesSlugs, getNextRotationPrinciple]);

  return null;
};

export default LearnBiteToast;
