import { exerciseDatabase } from "./exerciseDatabase";
import type { Exercise } from "@/types";

/** Skill / discipline paths → exercise slugs (ordered easiest → hardest). */
export const pathPlacements: Record<string, { label: string; slugs: string[] }> = {
  "planche-path": { label: "Planche Path / Straight-Arm Strength", slugs: ["planche-lean", "pseudo-planche-push-up", "tuck-planche", "advanced-tuck-planche", "straddle-planche", "planche", "maltese"] },
  "front-lever": { label: "Front Lever", slugs: ["dead-hang", "active-hang", "hollow-body-hold", "tuck-front-lever", "front-lever-raise", "front-lever"] },
  "back-lever": { label: "Back Lever", slugs: ["german-hang", "shoulder-dislocate", "back-lever"] },
  "human-flag": { label: "Human Flag", slugs: ["side-plank", "windshield-wiper", "human-flag"] },
  "handstand-mastery": { label: "Handstand Mastery", slugs: ["wall-handstand", "pike-push-up", "handstand", "handstand-push-up", "l-sit-to-handstand", "crow-pose", "elbow-lever"] },
  "rings-mastery": { label: "Rings Mastery", slugs: ["ring-row", "ring-push-up", "ring-dip", "iron-cross", "victorian-cross", "maltese", "ringmaster"] },
  "muscle-up": { label: "Muscle-up", slugs: ["australian-row", "chin-up", "pull-up", "archer-pull-up", "typewriter-pull-up", "one-arm-chin-up", "dip", "muscle-up"] },
  "compression-manna": { label: "Compression / Manna", slugs: ["l-sit", "v-up", "pike-stretch", "pancake-stretch", "standing-pike", "pancake-good-morning", "manna"] },
  "push-strength": { label: "Push Strength", slugs: ["wall-push-up", "incline-push-up", "push-up", "wide-push-up", "diamond-push-up", "decline-push-up", "archer-push-up", "one-arm-push-up"] },
  "core-strength": { label: "Core Strength", slugs: ["plank", "dead-bug", "mountain-climber", "hanging-leg-raise", "toes-to-bar", "dragon-flag"] },
  "legs-strength": { label: "Legs Strength", slugs: ["bodyweight-squat", "jump-squat", "lunge", "step-up", "glute-bridge", "calf-raise", "bulgarian-split-squat", "single-leg-rdl", "shrimp-squat", "pistol-squat", "sissy-squat", "nordic-curl"] },
  "yoga-library": { label: "Yoga Library", slugs: ["cat-cow", "childs-pose", "downward-dog", "cobra-pose", "bridge", "tree-pose", "chair-pose", "warrior-i", "warrior-ii", "triangle-pose", "half-moon-pose", "pigeon-pose", "camel-pose", "wheel-pose", "crow-pose"] },
  "flexibility": { label: "Flexibility", slugs: ["pike-stretch", "pancake-stretch", "straddle-stretch", "front-split", "middle-split", "couch-stretch", "frog-stretch", "shoulder-bridge", "manna"] },
  "mobility-warmup": { label: "Mobility / Warm-up", slugs: ["wrist-circles", "shoulder-dislocate", "thoracic-extension", "worlds-greatest-stretch", "deep-squat-hold", "jefferson-curl", "german-hang"] },
};

/** Training day blocks (`dayId:blockIndex`) → exercise slugs. */
export const blockPlacements: Record<string, string[]> = {
  "day-a:0": ["wrist-circles", "shoulder-dislocate", "cat-cow"],
  "day-a:1": ["planche-lean", "pseudo-planche-push-up", "tuck-planche", "advanced-tuck-planche", "straddle-planche"],
  "day-a:2": ["push-up", "pike-push-up", "dip", "hollow-body-hold"],
  "day-a:3": ["wrist-circles", "thoracic-extension"],
  "day-a:4": ["childs-pose", "cobra-pose"],
  "day-b:0": ["shoulder-dislocate", "thoracic-extension", "active-hang"],
  "day-b:1": ["ring-row", "ring-push-up", "ring-dip"],
  "day-b:2": ["tuck-front-lever", "front-lever-raise", "front-lever"],
  "day-b:3": ["dead-hang", "active-hang", "chin-up", "pull-up"],
  "day-b:4": ["thoracic-extension", "german-hang"],
  "day-b:5": ["childs-pose", "downward-dog"],
  "day-c:0": ["wrist-circles", "shoulder-dislocate", "cat-cow"],
  "day-c:1": ["wall-handstand", "handstand", "handstand-push-up", "l-sit-to-handstand", "crow-pose", "elbow-lever"],
  "day-c:2": ["shoulder-dislocate", "pike-push-up"],
  "day-c:3": ["wrist-circles", "thoracic-extension"],
  "day-c:4": ["childs-pose", "bridge"],
  "day-d:0": ["deep-squat-hold", "worlds-greatest-stretch", "frog-stretch"],
  "day-d:1": ["pistol-squat", "shrimp-squat", "bulgarian-split-squat", "nordic-curl", "lunge", "single-leg-rdl"],
  "day-d:2": ["l-sit", "v-up", "manna"],
  "day-d:3": ["pancake-stretch", "pike-stretch", "middle-split", "couch-stretch", "jefferson-curl"],
  "day-d:4": ["pigeon-pose", "childs-pose"],
  "day-e:0": ["human-flag", "elbow-lever", "crow-pose"],
  "day-e:1": ["back-lever", "muscle-up"],
  "day-e:2": ["front-split", "middle-split", "wheel-pose"],
};

const bySlug = new Map(exerciseDatabase.map((e) => [e.slug, e]));
export const getExerciseBySlug = (slug: string) => bySlug.get(slug);
const resolve = (slugs: string[]) => slugs.map((s) => bySlug.get(s)).filter(Boolean) as Exercise[];

export const getExercisesForPath = (pathId: string) => resolve(pathPlacements[pathId]?.slugs ?? []);
export const getExercisesForBlock = (dayId: string, index: number) => resolve(blockPlacements[`${dayId}:${index}`] ?? []);

const dayLabel: Record<string, string> = { "day-a": "Day A", "day-b": "Day B", "day-c": "Day C", "day-d": "Day D", "day-e": "Day E" };

/** Every place (paths + training days) an exercise appears. */
export function getPlacesForExercise(slug: string): string[] {
  const places = Object.values(pathPlacements).filter((p) => p.slugs.includes(slug)).map((p) => p.label);
  const days = new Set(Object.entries(blockPlacements).filter(([, s]) => s.includes(slug)).map(([k]) => dayLabel[k.split(":")[0]]));
  return [...places, ...days];
}
