import type { LearningPrinciple } from '@/types/learning';

export const learningPrinciples: LearningPrinciple[] = [
  {
    id: 'distributed_practice',
    slug: 'distributed_practice',
    title: 'Distributed Practice',
    micro_summary: 'More short exposures beats one long grind.',
    why_it_works: 'Spacing practice across days improves retention and skill stability versus cramming.',
    how_to_apply_template: 'Do {exercise} 3–5x/week as 8–12 minute micro-sessions (not 1 marathon).',
    when_to_use: 'always',
    caution: 'If joints feel irritated, keep frequency but lower intensity.',
    sources: [
      'https://www.sciencedirect.com/science/article/abs/pii/S016794570000021X',
      'https://pmc.ncbi.nlm.nih.gov/articles/PMC4395711/'
    ]
  },
  {
    id: 'external_focus',
    slug: 'external_focus',
    title: 'External Focus Cues',
    micro_summary: 'Aim the movement at a result, not a body part.',
    why_it_works: 'External focus tends to improve performance and learning compared to internal focus.',
    how_to_apply_template: "For {exercise}, think: 'push the floor away' / 'stack hips over hands' / 'drag ribs down'.",
    when_to_use: 'always',
    caution: 'Keep cues simple—one cue per set.',
    sources: [
      'https://pubmed.ncbi.nlm.nih.gov/34843301/'
    ]
  },
  {
    id: 'variability',
    slug: 'variability',
    title: 'Small Variation Practice',
    micro_summary: 'Same skill, tiny variations = better transfer.',
    why_it_works: 'Small, intentional variation can improve generalization and robustness of a skill.',
    how_to_apply_template: 'Rotate {exercise} with 1 small change: grip width, tempo, entry, or hold position.',
    when_to_use: 'intermediate',
    caution: "Don't vary form basics—vary only after you can do the clean version.",
    sources: [
      'https://pmc.ncbi.nlm.nih.gov/articles/PMC11212619/'
    ]
  },
  {
    id: 'autonomy',
    slug: 'autonomy',
    title: 'Autonomy Support',
    micro_summary: 'A little choice makes practice stick.',
    why_it_works: 'Self-controlled practice (small choices) can improve learning and motivation.',
    how_to_apply_template: 'Let the athlete choose: {exercise} first or second, or choose 1 of 2 variations.',
    when_to_use: 'always',
    caution: 'Choices must stay within safe options (no ego picks).',
    sources: [
      'https://pubmed.ncbi.nlm.nih.gov/25732095/'
    ]
  },
  {
    id: 'feedback_dosing',
    slug: 'feedback_dosing',
    title: 'Feedback Dosing',
    micro_summary: "Film one set. Don't micromanage all of them.",
    why_it_works: 'Too much feedback can create dependency; structured, reduced feedback can help learning.',
    how_to_apply_template: 'For {exercise}, film set #1 OR set #last. Use 1 fix next session, not 10 fixes now.',
    when_to_use: 'always',
    caution: 'If pain or scary form appears, increase feedback immediately.',
    sources: [
      'https://pmc.ncbi.nlm.nih.gov/articles/PMC10933749/',
      'https://www.sciencedirect.com/science/article/abs/pii/S1469029222000334'
    ]
  },
  {
    id: 'retention_test',
    slug: 'retention_test',
    title: 'Retention Test',
    micro_summary: 'The real test is 48 hours later, cold.',
    why_it_works: "Retention checks separate real learning from 'good today' performance.",
    how_to_apply_template: "Two days after {exercise}, do 1 cold attempt. If it improves, you're learning.",
    when_to_use: 'intermediate',
    caution: 'Cold attempt = safe version only. No max-risk attempts.',
    sources: [
      'https://pmc.ncbi.nlm.nih.gov/articles/PMC4395711/'
    ]
  },
  {
    id: 'sleep_consolidation',
    slug: 'sleep_consolidation',
    title: 'Sleep & Consolidation',
    micro_summary: 'Practice + sleep = upgrades.',
    why_it_works: 'Sleep supports consolidation of motor skills—short quality exposures often win.',
    how_to_apply_template: "Do {exercise} in short sessions, then sleep. Avoid exhausting 'death sets' late-night.",
    when_to_use: 'always',
    caution: "If you're sleep-deprived, reduce intensity and focus on clean technique.",
    sources: [
      'https://www.cell.com/iscience/fulltext/S2589-0042(23)01391-3',
      'https://www.nature.com/articles/s41539-023-00176-9'
    ]
  },
  {
    id: 'interleaving',
    slug: 'interleaving',
    title: 'Interleaving',
    micro_summary: "Mixing skills can boost retention—once you're stable.",
    why_it_works: 'Interleaving can improve long-term learning, but timing and athlete level matter.',
    how_to_apply_template: 'After {exercise} is stable, alternate sets with a sister skill (e.g., lean and hollow).',
    when_to_use: 'intermediate',
    caution: 'Do not interleave early if it wrecks form. Master clean basics first.',
    sources: [
      'https://pmc.ncbi.nlm.nih.gov/articles/PMC11237090/',
      'https://www.sciencedirect.com/science/article/abs/pii/S1747938X23000301'
    ]
  }
];

// Index by slug for O(1) lookup
export const principlesMap: Record<string, LearningPrinciple> = learningPrinciples.reduce(
  (acc, principle) => {
    acc[principle.slug] = principle;
    return acc;
  },
  {} as Record<string, LearningPrinciple>
);

// Helper to get principles for an exercise
export const getPrinciplesForExercise = (slugs: string[]): LearningPrinciple[] => {
  return slugs.map(slug => principlesMap[slug]).filter(Boolean);
};

// Apply template placeholders
export const applyTemplate = (template: string, exerciseName: string): string => {
  return template.replace(/{exercise}/g, exerciseName);
};
