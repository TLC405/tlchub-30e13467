import { getExerciseById } from "./exerciseDatabase";

export type SkillLevel = 'foundation' | 'development' | 'advanced' | 'elite' | 'peak';

export interface ProgressionStep {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  levelNumber: number;
  formCues: string[];
  commonMistakes: string[];
  prerequisites: string[];
  nextProgression?: string;
  musclesWorked: { primary: string[]; secondary: string[] };
  youtubeUrl?: string;
}

export interface SkillTree {
  id: string;
  name: string;
  exerciseId: string;
  category: 'push' | 'pull' | 'core' | 'legs' | 'skill';
  description: string;
  eliteGoal: string;
  icon: string;
  color: string;
  progressions: ProgressionStep[];
}

const levelMap: Record<number, SkillLevel> = {
  1: 'foundation',
  2: 'development',
  3: 'advanced',
  4: 'elite',
  5: 'peak',
};

function buildTree(
  id: string,
  name: string,
  exerciseId: string,
  category: SkillTree['category'],
  description: string,
  eliteGoal: string,
  icon: string,
  color: string,
  steps: Array<{ csvId: string; level: number; name: string; description: string }>
): SkillTree {
  const parentExercise = getExerciseById(exerciseId);
  const youtubeUrl = parentExercise?.youtubeUrl;

  const progressions: ProgressionStep[] = steps.map((s, i) => ({
    id: s.csvId,
    name: s.name,
    description: s.description,
    level: levelMap[s.level] || 'foundation',
    levelNumber: s.level,
    formCues: parentExercise?.cues || [],
    commonMistakes: [],
    prerequisites: i > 0 ? [steps[i - 1].csvId] : [],
    nextProgression: i < steps.length - 1 ? steps[i + 1].csvId : undefined,
    musclesWorked: {
      primary: parentExercise?.primaryMuscles || [],
      secondary: parentExercise?.secondaryMuscles || [],
    },
    youtubeUrl,
  }));

  return { id, name, exerciseId, category, description, eliteGoal, icon, color, progressions };
}

export const skillProgressions: SkillTree[] = [
  // ── PLANCHE ────────────────────────────────────────────────
  buildTree(
    "planche-progression", "Planche Mastery",
    "e7070fde-1565-4563-96fb-510a6eba9c85", "push",
    "From lean to full planche. Straight-arm pushing mastery.",
    "Full Planche Hold", "Dumbbell", "orange",
    [
      { csvId: "602997fc-68d0-4438-8097-2b99353871be", level: 1, name: "Planche Lean", description: "Lean forward in push-up position with straight arms, shifting weight over hands" },
      { csvId: "6859ad7c-07a2-4560-8582-641c6537da85", level: 2, name: "Tuck Planche", description: "Hold body parallel with knees tucked to chest" },
      { csvId: "ad3ccb6f-7507-44c4-8f4e-19d65cb8d74d", level: 3, name: "Advanced Tuck Planche", description: "Tuck planche with hips level with shoulders, back flat" },
      { csvId: "b65c3f71-cec8-45a6-a922-7852814ef9ad", level: 4, name: "Straddle Planche", description: "Full planche with legs spread wide for leverage" },
      { csvId: "31cd19c9-5d4e-4421-a5ee-6bd6405179fc", level: 5, name: "Full Planche", description: "Complete planche with legs together — elite level" },
    ]
  ),

  // ── FRONT LEVER ────────────────────────────────────────────
  buildTree(
    "front-lever-progression", "Front Lever Mastery",
    "a0dab72f-2e37-4ac3-9fec-d6d90e93517a", "pull",
    "Tuck to full front lever. Pulling strength and core control.",
    "Full Front Lever Hold", "ArrowUp", "blue",
    [
      { csvId: "222e1868-bdbe-4170-a4c9-77ba262fda82", level: 1, name: "Tuck Front Lever", description: "Hang from bar with knees tucked, body horizontal" },
      { csvId: "3fc9d7b2-0889-4538-bcf5-54276f313b81", level: 2, name: "Advanced Tuck Front Lever", description: "Tuck lever with hips extended, back flat" },
      { csvId: "199dbc2b-5365-458d-8a85-47dcd8a067b8", level: 3, name: "One Leg Front Lever", description: "Extend one leg fully while keeping other tucked" },
      { csvId: "426ebc74-a585-4846-8c5b-1006503ea2cf", level: 4, name: "Straddle Front Lever", description: "Full lever with legs split wide" },
      { csvId: "f9a4fa9a-44ad-47aa-845c-3bd6bac075f6", level: 5, name: "Full Front Lever", description: "Complete front lever with legs together" },
    ]
  ),

  // ── BACK LEVER ─────────────────────────────────────────────
  buildTree(
    "back-lever-progression", "Back Lever Mastery",
    "f6d08baf-2b99-48cc-8577-16c4578c681e", "pull",
    "German hang to full back lever. Shoulder flexibility and control.",
    "Full Back Lever Hold", "TrendingDown", "purple",
    [
      { csvId: "aefab025-d6c9-4306-9f9f-a43767135bfc", level: 1, name: "German Hang", description: "Hang behind the bar with shoulders extended" },
      { csvId: "3bd8b2c3-10df-4c11-bf5a-43810ab1d6b9", level: 2, name: "Tuck Back Lever", description: "Back lever with knees tucked to chest" },
      { csvId: "2a329f48-5ba9-4b73-9412-1f5a09e5bc85", level: 3, name: "Advanced Tuck Back Lever", description: "Tuck back lever with flat back" },
      { csvId: "a4452293-21ad-4872-8d27-33ae9f2a3098", level: 4, name: "Straddle Back Lever", description: "Back lever with legs spread" },
      { csvId: "43409ca0-6f95-4f62-950a-07be19e061da", level: 5, name: "Full Back Lever", description: "Complete back lever — full extension" },
    ]
  ),

  // ── HUMAN FLAG ─────────────────────────────────────────────
  buildTree(
    "human-flag-progression", "Human Flag Mastery",
    "5bfcdccf-4a61-4268-aaee-e61e11f1e756", "skill",
    "Vertical to full human flag. Ultimate side strength.",
    "Full Human Flag Hold", "Flag", "red",
    [
      { csvId: "12460027-2c63-46ee-bb56-4edc0aa825ab", level: 1, name: "Vertical Flag Hold", description: "Hold body vertical on a pole with side grip" },
      { csvId: "f8938392-0d86-4990-a798-05610f59c8f4", level: 2, name: "Tuck Human Flag", description: "Side hold with knees tucked" },
      { csvId: "663d87c5-5765-4d79-8848-ad5965092585", level: 3, name: "Straddle Human Flag", description: "Side hold with legs spread" },
      { csvId: "e599f484-ab9e-441e-98ed-8b51a03baa90", level: 4, name: "Full Human Flag", description: "Complete horizontal hold — elite" },
    ]
  ),

  // ── HANDSTAND ──────────────────────────────────────────────
  buildTree(
    "handstand-progression", "Handstand Mastery",
    "d7a9d4bb-ad99-4e3f-b8b2-7cf605a460c6", "skill",
    "Wall to one-arm handstand. Shoulder control and balance.",
    "One Arm Handstand", "Zap", "green",
    [
      { csvId: "f459e6c3-5fdc-4c66-890d-dc024f34fd59", level: 1, name: "Wall Handstand", description: "Kick up to handstand against wall" },
      { csvId: "b00f4eb8-bf46-4b2f-b75f-0a70b55e514a", level: 2, name: "Chest-to-Wall Handstand", description: "Face wall, walk feet up — builds alignment" },
      { csvId: "6f926f14-c247-4c50-8daf-761304032cfe", level: 3, name: "Heel Pull Handstand", description: "Wall handstand with heel pulls for balance drills" },
      { csvId: "e81d6b04-dea1-41f5-938a-9611a228569d", level: 4, name: "Freestanding Handstand", description: "Hold a balanced handstand without wall support" },
      { csvId: "56fd832a-0e6f-4c40-922d-129e5eee1502", level: 5, name: "One Arm Handstand", description: "Single arm handstand — elite balance skill" },
    ]
  ),

  // ── IRON CROSS ─────────────────────────────────────────────
  buildTree(
    "iron-cross-progression", "Iron Cross Mastery",
    "ec6570fb-0933-4f0c-b023-d4579c016e82", "skill",
    "Ring support to full iron cross. Straight-arm ring strength.",
    "Full Iron Cross", "CircleDot", "yellow",
    [
      { csvId: "10d5790e-afeb-420f-84e7-7c99f53a42d7", level: 1, name: "Ring Support Hold", description: "Hold top of dip position on rings with straight arms" },
      { csvId: "c175cb63-7951-45ad-a405-6878164a0413", level: 2, name: "Ring Flyes (band)", description: "Assisted ring flyes with resistance band support" },
      { csvId: "f29fe366-4a08-4551-bec2-359763381cc9", level: 3, name: "Iron Cross Negatives", description: "Slowly lower from support to cross position" },
      { csvId: "fcf6611e-61cd-4da6-a926-0676a3c8af8a", level: 4, name: "Band-Assisted Iron Cross", description: "Full cross hold with band assistance" },
      { csvId: "cd04da33-0310-4a14-9e72-07d32f671bc4", level: 5, name: "Full Iron Cross", description: "Unassisted straight-arm cross hold" },
    ]
  ),

  // ── MALTESE ────────────────────────────────────────────────
  buildTree(
    "maltese-progression", "Maltese Mastery",
    "ee236504-2019-4dfd-b13b-be548d38898e", "skill",
    "Planche lean to full maltese. Beyond the planche.",
    "Full Maltese", "Star", "pink",
    [
      { csvId: "fe6e3d92-56b6-4a40-9267-b22edbb521ae", level: 1, name: "Planche Lean", description: "Forward lean with hands on floor" },
      { csvId: "f831685f-4539-4083-a023-20ccfe832dbd", level: 2, name: "Tuck Planche", description: "Planche with knees tucked" },
      { csvId: "d4ef3fd7-e953-499f-9e1d-ce253933791c", level: 3, name: "Full Planche", description: "Straight body planche hold" },
      { csvId: "0eb48173-2a1a-44d3-a377-3ddab317c598", level: 4, name: "Maltese Lean", description: "Planche with arms shifting behind" },
      { csvId: "0e1f2f2e-38c4-4aca-b192-92e8729d70e8", level: 5, name: "Full Maltese", description: "Arms fully behind with straight body" },
    ]
  ),

  // ── MANNA ──────────────────────────────────────────────────
  buildTree(
    "manna-progression", "Manna Mastery",
    "d5fe0efb-2984-4f17-9c75-381161bfe482", "core",
    "L-Sit to full manna. Maximum compression and strength.",
    "Full Manna", "Minus", "teal",
    [
      { csvId: "3c53fd06-3c1a-4358-b676-39d91e3812d1", level: 1, name: "L-Sit", description: "Legs parallel to floor in seated position" },
      { csvId: "2e2ab305-c545-4180-882c-99bfa35a595b", level: 2, name: "V-Sit", description: "Legs raised above parallel" },
      { csvId: "cd1575ba-0e0a-4ef5-92de-560d55b70271", level: 3, name: "High V-Sit", description: "Legs near vertical with strong compression" },
      { csvId: "6bcf3588-b499-4b5a-aeb1-127e934984be", level: 4, name: "Manna Tuck", description: "Tucked manna position" },
      { csvId: "1a9ebfb9-d500-478a-952c-23d486ad792d", level: 5, name: "Full Manna", description: "Hips above shoulders, legs forward and up" },
    ]
  ),

  // ── MUSCLE-UP ──────────────────────────────────────────────
  buildTree(
    "muscle-up-progression", "Muscle-Up Mastery",
    "f5d3423b-952b-4ea9-82d2-81d07041be97", "pull",
    "Pull-up and dip to strict muscle-up. The transition skill.",
    "Strict Muscle-Up", "ArrowUp", "cyan",
    [
      { csvId: "2002960b-ae61-4115-b3e1-d4d12aa76f0c", level: 1, name: "Pull-up + Dip", description: "Master strict pull-ups and dips separately" },
      { csvId: "3257cb35-6d6d-4d15-9561-3f5ea73950b0", level: 2, name: "High Pull-up", description: "Pull to chest or sternum level" },
      { csvId: "57b6aeaf-dceb-482f-bae4-8d11ada2b882", level: 3, name: "Negative Muscle-up", description: "Slow descent from top of muscle-up" },
      { csvId: "7bf44516-17e4-40b9-85c4-c027882d53a1", level: 4, name: "Band Muscle-up", description: "Full muscle-up with band assistance" },
      { csvId: "337f1345-50b3-4081-88ac-aa810d02a3a7", level: 5, name: "Strict Muscle-up", description: "Clean, kip-free muscle-up" },
    ]
  ),
];
