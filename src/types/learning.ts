export type WhenToUse = 'beginner' | 'intermediate' | 'always';
export type LearnModeIntensity = 'low' | 'standard' | 'nerdy';
export type DoseType = 'microdose' | 'standard';

export interface LearningPrinciple {
  id: string;
  slug: string;
  title: string;
  micro_summary: string;
  why_it_works: string;
  how_to_apply_template: string;
  when_to_use: WhenToUse;
  caution: string;
  sources: string[];
}

export interface LearnDefaultRecipe {
  frequency_per_week: number;
  dose_type: DoseType;
  set_count_range: [number, number];
  hold_or_rep_range: [number, number];
  rest_range_sec: [number, number];
}

export interface LearnConfig {
  learn_principle_slugs: string[];
  learn_apply_notes?: Record<string, string>;
  learn_default_recipe?: LearnDefaultRecipe;
  learn_coach_tip?: string;
}

export interface LearnCardData {
  principle: LearningPrinciple;
  applyNote?: string;
  exerciseName: string;
  recipe?: LearnDefaultRecipe;
}
