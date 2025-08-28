
import type { Exercise } from "@/types";

export const exerciseDatabase: Exercise[] = [
  // 1️⃣ Handstand & Inverted Mastery
  {
    id: "wall-stomach-straddle-handstand",
    name: "Wall Stomach Straddle to Handstand",
    category: "handstand-inverted",
    difficulty: "intermediate",
    sets: "3×5",
    description: "Advanced wall-supported handstand entry with straddle press",
    progression: "Freestanding Straddle Press",
    videoId: "handstand-straddle-press-tutorial",
    muscleGroups: ["shoulders", "core", "wrists"],
    equipment: ["wall"]
  },
  {
    id: "wall-handstand-kick-ups",
    name: "Wall Handstand Kick-Ups", 
    category: "handstand-inverted",
    difficulty: "beginner",
    sets: "4×15",
    description: "Basic wall-assisted handstand entry practice",
    progression: "Wall Handstand Shoulder Taps",
    videoId: "wall-handstand-basics",
    muscleGroups: ["shoulders", "core"],
    equipment: ["wall"]
  },
  {
    id: "press-walks",
    name: "Press Walks (Wall or Free)",
    category: "handstand-inverted", 
    difficulty: "intermediate",
    sets: "3×10–15 steps",
    description: "Dynamic handstand walking with press entry",
    progression: "Freestanding Press Walks",
    videoId: "handstand-press-walks",
    muscleGroups: ["shoulders", "core", "wrists"],
    equipment: ["wall", "open-space"]
  },
  {
    id: "handstand-shoulder-taps",
    name: "Handstand Shoulder Taps",
    category: "handstand-inverted",
    difficulty: "intermediate", 
    sets: "3×15 taps",
    description: "Balance and stability challenge in handstand position",
    progression: "Handstand Walking",
    videoId: "handstand-shoulder-taps",
    muscleGroups: ["shoulders", "core"],
    prerequisites: ["wall-handstand-kick-ups"]
  },
  {
    id: "handstand-walking",
    name: "Handstand Walking",
    category: "handstand-inverted",
    difficulty: "intermediate",
    sets: "3×10 steps", 
    description: "Dynamic handstand locomotion",
    progression: "Flow Combos",
    videoId: "handstand-walking-tutorial",
    muscleGroups: ["shoulders", "core", "wrists"]
  },
  {
    id: "crow-to-stomach-straddle-press",
    name: "Crow to Stomach Straddle Wall Press",
    category: "handstand-inverted",
    difficulty: "beginner",
    sets: "3×5",
    description: "Transition from crow pose to wall-assisted handstand", 
    progression: "Crow to Handstand Flow",
    videoId: "crow-to-handstand-progression",
    muscleGroups: ["shoulders", "core", "arms"]
  },
  {
    id: "side-wall-handstand",
    name: "Side Wall Handstand Hold",
    category: "handstand-inverted", 
    difficulty: "intermediate",
    sets: "3×20–30s",
    description: "Lateral wall support for handstand stability",
    progression: "Dual Prone Parallette Handstand Toe Tap",
    videoId: "side-wall-handstand",
    muscleGroups: ["shoulders", "core"]
  },

  // 2️⃣ Pulling & Rows (With Flavor)
  {
    id: "pull-typewriter",
    name: "Pull Typewriter Up",
    category: "pulling-rows",
    difficulty: "intermediate", 
    sets: "3×6–8",
    description: "Dynamic lateral movement during pull-up",
    progression: "Pull Typewriter Combo (Left→Right→Center)",
    videoId: "typewriter-pullups-tutorial",
    muscleGroups: ["lats", "biceps", "core"],
    equipment: ["pull-up-bar"]
  },
  {
    id: "archer-pullups",
    name: "Archer Pull-Ups", 
    category: "pulling-rows",
    difficulty: "intermediate",
    sets: "3×6 each side",
    description: "Unilateral pull-up variation with extended arm",
    progression: "Weighted Pull-Ups",
    videoId: "archer-pullups-progression",
    muscleGroups: ["lats", "biceps", "core"],
    equipment: ["pull-up-bar"]
  },
  {
    id: "ring-pull-typewriter",
    name: "Ring Pull Typewriter",
    category: "pulling-rows",
    difficulty: "advanced",
    sets: "3×6 each side", 
    description: "Typewriter movement on unstable rings",
    progression: "Muscle-Up Prep Flow",
    videoId: "ring-typewriter-advanced",
    muscleGroups: ["lats", "biceps", "core", "stabilizers"],
    equipment: ["rings"]
  },
  {
    id: "one-arm-assisted-pullup",
    name: "One-Arm Assisted Pull-Up",
    category: "pulling-rows",
    difficulty: "advanced",
    sets: "3×5 each",
    description: "Progression toward single-arm pull-up mastery", 
    progression: "One-Arm Pull-Up Negatives",
    videoId: "one-arm-pullup-progression",
    muscleGroups: ["lats", "biceps", "grip"],
    equipment: ["pull-up-bar"]
  },
  {
    id: "standard-pullups", 
    name: "Standard Pull-Ups",
    category: "pulling-rows",
    difficulty: "beginner",
    sets: "4×8–10",
    description: "Foundation pulling movement",
    progression: "Typewriter Progressions", 
    videoId: "pullup-fundamentals",
    muscleGroups: ["lats", "biceps"],
    equipment: ["pull-up-bar"]
  },

  // 3️⃣ Planche & Parallettes (Show Moves)
  {
    id: "planche-leans",
    name: "Planche Leans",
    category: "planche-parallettes",
    difficulty: "beginner",
    sets: "3×20s",
    description: "Foundation planche strength and wrist conditioning",
    progression: "Pseudo Planche Push-Ups",
    videoId: "planche-leans-tutorial", 
    muscleGroups: ["shoulders", "core", "wrists"]
  },
  {
    id: "pseudo-planche-pushups",
    name: "Pseudo Planche Push-Ups",
    category: "planche-parallettes",
    difficulty: "intermediate",
    sets: "3×8–12",
    description: "Dynamic planche-position push-ups",
    progression: "Tuck Planche Hold",
    videoId: "pseudo-planche-pushups",
    muscleGroups: ["shoulders", "chest", "core"]
  },
  {
    id: "straddle-planche", 
    name: "Straddle Planche",
    category: "planche-parallettes",
    difficulty: "advanced",
    sets: "3×8–10s",
    description: "Advanced planche variation with leg separation",
    progression: "Planche Push-Up Flow",
    videoId: "straddle-planche-mastery",
    muscleGroups: ["shoulders", "core", "chest"]
  },
  {
    id: "planche-press-walks",
    name: "Planche Press Walks (Parallette)",
    category: "planche-parallettes", 
    difficulty: "advanced",
    sets: "3×5–10 steps",
    description: "Dynamic planche movement on parallettes",
    progression: "Planche Flow Combos",
    videoId: "planche-press-walks",
    muscleGroups: ["shoulders", "core", "wrists"],
    equipment: ["parallettes"]
  },
  {
    id: "l-sit-to-v-sit-straddle",
    name: "L-Sit to V-Sit to Straddle Press",
    category: "planche-parallettes",
    difficulty: "advanced", 
    sets: "3×5–8",
    description: "Complex flow combining multiple static holds",
    progression: "Integrated Flow",
    videoId: "l-sit-flow-combinations",
    muscleGroups: ["core", "shoulders", "hip-flexors"]
  },

  // 4️⃣ Rings & Dynamic Strength
  {
    id: "ring-skin-the-cat",
    name: "Ring Skin the Cat",
    category: "rings-dynamic",
    difficulty: "intermediate",
    sets: "3×5",
    description: "Dynamic shoulder mobility and strength movement",
    progression: "Ring Muscle-Up Flow", 
    videoId: "ring-skin-the-cat",
    muscleGroups: ["shoulders", "lats", "core"],
    equipment: ["rings"]
  },
  {
    id: "ring-muscle-ups",
    name: "Ring Muscle-Ups",
    category: "rings-dynamic",
    difficulty: "advanced",
    sets: "3×5",
    description: "Ultimate upper body power movement on rings",
    progression: "Ring Iron Cross Prep",
    videoId: "ring-muscle-up-tutorial", 
    muscleGroups: ["lats", "chest", "triceps", "core"],
    equipment: ["rings"]
  },
  {
    id: "ring-typewriter-pull",
    name: "Ring Typewriter Pull",
    category: "rings-dynamic",
    difficulty: "advanced",
    sets: "3×6 each side",
    description: "Lateral movement on unstable rings",
    progression: "Skin the Cat Combo Flow",
    videoId: "ring-typewriter-mastery",
    muscleGroups: ["lats", "biceps", "stabilizers"],
    equipment: ["rings"]
  },
  {
    id: "ring-support-press-walk",
    name: "Ring Support to Press Walk", 
    category: "rings-dynamic",
    difficulty: "intermediate",
    sets: "3×5–8 steps",
    description: "Dynamic ring support with movement",
    progression: "Press-to-Handstand Combo",
    videoId: "ring-support-walks",
    muscleGroups: ["shoulders", "triceps", "core"],
    equipment: ["rings"]
  },
  {
    id: "ring-dips",
    name: "Ring Dips",
    category: "rings-dynamic",
    difficulty: "beginner",
    sets: "3×8–12",
    description: "Foundation ring strength movement",
    progression: "Advanced Flow",
    videoId: "ring-dips-progression",
    muscleGroups: ["triceps", "chest", "shoulders"],
    equipment: ["rings"]
  },

  // 5️⃣ Dynamic & Showstopper Skills
  {
    id: "human-flag",
    name: "Human Flag",
    category: "dynamic-showstoppers", 
    difficulty: "advanced",
    sets: "3×8–12s",
    description: "Iconic lateral core and grip strength hold",
    progression: "Flag-to-Muscle-Up Flow",
    videoId: "human-flag-progression",
    muscleGroups: ["core", "lats", "grip"],
    equipment: ["pole", "wall-bars"]
  },
  {
    id: "dragon-flag-negatives",
    name: "Dragon Flag Negatives",
    category: "dynamic-showstoppers",
    difficulty: "advanced",
    sets: "3×5",
    description: "Controlled eccentric core strength movement",
    progression: "Dragon Flag Flow",
    videoId: "dragon-flag-tutorial",
    muscleGroups: ["core", "lats"],
    equipment: ["bench"]
  },
  {
    id: "one-arm-handstand", 
    name: "One-Arm Handstand",
    category: "dynamic-showstoppers",
    difficulty: "elite",
    sets: "Progressive holds",
    description: "Ultimate handstand mastery skill",
    progression: "One-Arm to Press Walk Combo",
    videoId: "one-arm-handstand-journey",
    muscleGroups: ["shoulders", "core", "wrists"]
  },
  {
    id: "crow-to-handstand-flow",
    name: "Crow to Handstand Flow",
    category: "dynamic-showstoppers",
    difficulty: "intermediate",
    sets: "3×3–5",
    description: "Smooth transition between arm balances",
    progression: "Straddle Press Integration",
    videoId: "crow-handstand-transitions", 
    muscleGroups: ["shoulders", "core", "wrists"]
  },
  {
    id: "muscle-up-360",
    name: "Muscle-Up 360",
    category: "dynamic-showstoppers", 
    difficulty: "elite",
    sets: "3×3–5",
    description: "Advanced muscle-up with rotation",
    progression: "Freestyle Flow",
    videoId: "muscle-up-360-mastery",
    muscleGroups: ["lats", "chest", "core"],
    equipment: ["pull-up-bar"]
  },
  {
    id: "press-to-handstand-walks",
    name: "Press-to-Handstand Walks",
    category: "dynamic-showstoppers",
    difficulty: "advanced",
    sets: "3×10 steps",
    description: "Complex movement combining press and locomotion",
    progression: "Full Flow Combos",
    videoId: "press-handstand-walks",
    muscleGroups: ["shoulders", "core"]
  },

  // 6️⃣ Mobility & Yoga for Performance
  {
    id: "downward-dog-flow",
    name: "Downward Dog → Dolphin → Tripod → Headstand",
    category: "mobility-yoga",
    difficulty: "beginner", 
    sets: "3×5 transitions",
    description: "Foundation yoga flow for shoulder mobility",
    progression: "Advanced Flow Sequences",
    videoId: "yoga-handstand-prep-flow",
    muscleGroups: ["shoulders", "hamstrings", "core"]
  },
  {
    id: "forward-fold-flow",
    name: "Forward Fold → Cat-Cow → Wrist Flow",
    category: "mobility-yoga",
    difficulty: "beginner",
    sets: "3×8 transitions",
    description: "Mobility preparation for calisthenics training",
    progression: "Shoulder Compression Prep",
    videoId: "mobility-prep-flow",
    muscleGroups: ["hamstrings", "spine", "wrists"]
  },
  {
    id: "crow-pose-yoga",
    name: "Crow Pose (Yoga) → Flow Integration", 
    category: "mobility-yoga",
    difficulty: "intermediate",
    sets: "3×30s holds",
    description: "Yoga foundation for arm balance mastery",
    progression: "Handstand Mobility Flow",
    videoId: "crow-pose-mastery",
    muscleGroups: ["shoulders", "core", "wrists"]
  },
  {
    id: "l-sit-mobility-flow",
    name: "L-Sit → V-Sit → Press Mobility",
    category: "mobility-yoga", 
    difficulty: "intermediate",
    sets: "3×5 transitions",
    description: "Hip flexor and core mobility integration",
    progression: "Full Mobility Flow",
    videoId: "l-sit-mobility-progression",
    muscleGroups: ["hip-flexors", "core", "shoulders"]
  },

  // Swimming & Cardio
  {
    id: "swimming-laps-freestyle",
    name: "Swimming Laps - Freestyle",
    category: "swimming-cardio",
    difficulty: "beginner",
    sets: "20×25m",
    description: "Cardiovascular endurance and full-body conditioning",
    progression: "Distance and Speed Progression",
    videoId: "freestyle-swimming-technique",
    muscleGroups: ["full-body", "cardiovascular"]
  },
  {
    id: "vasa-trainer-okc",
    name: "Vasa Trainer (OKC Location)",
    category: "swimming-cardio",
    difficulty: "intermediate", 
    sets: "3×500m",
    description: "Land-based swimming training at Vasa OKC",
    progression: "Power and Endurance Protocols",
    videoId: "vasa-trainer-techniques",
    muscleGroups: ["lats", "core", "cardiovascular"],
    equipment: ["vasa-trainer"]
  }
];

export const getExercisesByCategory = (category: string) => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: string) => {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
};
