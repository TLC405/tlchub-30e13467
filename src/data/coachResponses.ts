import { exerciseDatabase } from './exerciseDatabase';
import { skillProgressions } from './skillProgressions';
import { nonNegotiables } from './controlContent';
import type { CanvasMode, CoachContext, CoachResponse } from '@/types/coach';

const motivationalQuotes = [
  "The planche doesn't care about your excuses — only your consistency.",
  "Strength built slowly is strength built to last.",
  "Every hold adds one more brick to your foundation.",
  "The body follows the mind. Master one, master both.",
  "Small wins stack into elite performance.",
  "Rest is part of the plan. Sleep is where gains live.",
  "Form before load. Position before progression.",
  "Your coach isn't watching — your joints are.",
  "One more quality rep beats ten sloppy ones.",
  "Control the position. Earn the movement.",
  "Champions train when no one's watching.",
  "Patience is not weakness — it's elite strategy.",
];

let motivationalIndex = 0;

function getMotivation(): string {
  const quote = motivationalQuotes[motivationalIndex % motivationalQuotes.length];
  motivationalIndex++;
  return quote;
}

function detectIntent(message: string): CanvasMode | null {
  const lower = message.toLowerCase();

  // Exercise-specific keywords
  const exerciseKeywords = [
    'planche', 'handstand', 'muscle-up', 'muscle up', 'pull-up', 'pull up',
    'push-up', 'push up', 'lever', 'l-sit', 'handstand', 'ring', 'dip',
    'squat', 'pistol', 'press', 'row', 'curl', 'extension',
  ];
  if (exerciseKeywords.some((kw) => lower.includes(kw))) return 'exercise-detail';

  const progressKeywords = ['progress', 'stats', 'how am i doing', 'streak', 'analytics', 'history', 'volume', 'week'];
  if (progressKeywords.some((kw) => lower.includes(kw))) return 'progress-tracker';

  const muscleKeywords = ['muscle', 'anatomy', 'what muscles', 'works what', 'body map', 'target'];
  if (muscleKeywords.some((kw) => lower.includes(kw))) return 'muscle-map';

  const skillKeywords = ['skill tree', 'skill path', 'progression', 'path', 'next step', 'what next'];
  if (skillKeywords.some((kw) => lower.includes(kw))) return 'skill-tree';

  const workoutKeywords = ['workout', 'plan', 'build', 'program', 'session', 'today\'s workout', 'create a'];
  if (workoutKeywords.some((kw) => lower.includes(kw))) return 'workout-builder';

  const learnKeywords = ['learn', 'science', 'why', 'how to practice', 'principle', 'motor', 'research'];
  if (learnKeywords.some((kw) => lower.includes(kw))) return 'learn-mode';

  return null;
}

function findExerciseByKeyword(message: string): string | undefined {
  const lower = message.toLowerCase();
  return exerciseDatabase.find((ex) => lower.includes(ex.name.toLowerCase()) || lower.includes(ex.id))?.id;
}

function findSkillTreeByKeyword(message: string): string | undefined {
  const lower = message.toLowerCase();
  return skillProgressions.find(
    (tree) => lower.includes(tree.name.toLowerCase()) || lower.includes(tree.id)
  )?.id;
}

function buildExerciseResponse(exerciseId: string): string {
  const ex = exerciseDatabase.find((e) => e.id === exerciseId);
  if (!ex) return "I couldn't find that exercise in the database.";

  const cues = ex.formCues?.slice(0, 3).join('; ') ?? 'Focus on control and breathing.';
  const recovery = ex.recoveryTime
    ? `Muscle: ${ex.recoveryTime.muscle}, Tendon: ${ex.recoveryTime.tendon}`
    : '24–48 hours';

  return (
    `**${ex.name}** (${ex.difficulty} · ${ex.category})\n\n` +
    `Sets/Reps: ${ex.sets}${ex.reps ? ` × ${ex.reps}` : ''}\n\n` +
    `Key form cues: ${cues}\n\n` +
    `Recovery: ${recovery}\n\n` +
    `I've opened the exercise detail canvas so you can explore the full breakdown.`
  );
}

function buildProgressionResponse(skillTreeId: string): string {
  const tree = skillProgressions.find((t) => t.id === skillTreeId);
  if (!tree) return "Tell me which skill you're working on and I'll map out your next step.";

  const first = tree.progressions[0];
  return (
    `**${tree.name}** — ${tree.description}\n\n` +
    `Elite goal: ${tree.eliteGoal}\n\n` +
    `Start here: **${first.name}** — ${first.sets} sets × ${first.reps} reps\n\n` +
    `I've opened the skill tree canvas for the full progression path.`
  );
}

function buildNonNegotiableReminder(): string {
  const nn = nonNegotiables[Math.floor(Math.random() * nonNegotiables.length)];
  return (
    `Non-Negotiable reminder: **${nn.title}**\n\n` +
    `${nn.description}\n\n` +
    `Quick cue: *${nn.shortCue}*\n\n` +
    `Fix: ${nn.fix}`
  );
}

const fallbackResponses = [
  "Let's focus on what you can control today. What's your biggest training challenge right now?",
  "Consistency over intensity — every session counts. Want me to build you a workout?",
  "Recovery is part of training. Are you sleeping well and managing stress?",
  "What skill are you chasing right now? Let me pull up your progression path.",
  "Strong body, strong mind. What aspect of your training do you want to sharpen?",
];
let fallbackIndex = 0;

export function getCoachResponse(message: string, context: CoachContext): CoachResponse {
  const lower = message.toLowerCase();

  // Motivation request
  if (
    lower.includes('motivat') ||
    lower.includes('inspire') ||
    lower.includes('quote') ||
    lower.includes('pump')
  ) {
    return { text: getMotivation() };
  }

  // Non-negotiable reminder
  if (lower.includes('non-negotiable') || lower.includes('form rule') || lower.includes('remind me')) {
    return { text: buildNonNegotiableReminder() };
  }

  // Detect canvas intent
  const intent = detectIntent(message);

  if (intent === 'exercise-detail') {
    const exerciseId = findExerciseByKeyword(message);
    if (exerciseId) {
      return {
        text: buildExerciseResponse(exerciseId),
        canvasAction: { mode: 'exercise-detail', exerciseId },
      };
    }
    // Generic exercise response
    return {
      text: "I found several exercises that might match. Check out the exercise detail canvas — I've opened it for you.",
      canvasAction: { mode: 'exercise-detail' },
    };
  }

  if (intent === 'progress-tracker') {
    return {
      text: 'Here\'s your training analytics dashboard. Let\'s see how your volume and consistency look this week.',
      canvasAction: { mode: 'progress-tracker' },
    };
  }

  if (intent === 'muscle-map') {
    return {
      text: 'Opening the muscle map — click any muscle group to see which exercises target it.',
      canvasAction: { mode: 'muscle-map' },
    };
  }

  if (intent === 'skill-tree') {
    const treeId = findSkillTreeByKeyword(message);
    if (treeId) {
      return {
        text: buildProgressionResponse(treeId),
        canvasAction: { mode: 'skill-tree', skillTreeId: treeId },
      };
    }
    return {
      text: 'Opening the skill tree canvas. Choose a progression path to see your roadmap.',
      canvasAction: { mode: 'skill-tree' },
    };
  }

  if (intent === 'workout-builder') {
    return {
      text: 'Let\'s build your workout. I\'ve opened the workout builder — add exercises and set your reps.',
      canvasAction: { mode: 'workout-builder' },
    };
  }

  if (intent === 'learn-mode') {
    return {
      text: 'Opening the learning lab. These science-backed principles will accelerate your skill acquisition.',
      canvasAction: { mode: 'learn-mode' },
    };
  }

  // Context-aware responses
  if (context.selectedExerciseId) {
    const ex = exerciseDatabase.find((e) => e.id === context.selectedExerciseId);
    if (ex) {
      const cue = ex.formCues?.[Math.floor(Math.random() * ex.formCues.length)];
      return {
        text: `For **${ex.name}**: ${cue ?? 'Focus on position before progression.'}\n\nWant to see the full breakdown?`,
        canvasAction: { mode: 'exercise-detail', exerciseId: ex.id },
      };
    }
  }

  // Fallback
  const response = fallbackResponses[fallbackIndex % fallbackResponses.length];
  fallbackIndex++;
  return { text: response };
}
