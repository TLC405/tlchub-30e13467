
import type { Exercise } from "@/types";

export const exerciseDatabase: Exercise[] = [
  // 1️⃣ Handstand & Inverted Mastery
  {
    id: "wall-stomach-straddle-handstand",
    name: "Wall Stomach Straddle to Handstand",
    category: "handstand-inverted",
    difficulty: "intermediate",
    sets: "3×5",
    description: "Advanced wall-supported handstand entry with straddle press movement",
    progression: "Freestanding Straddle Press",
    videoId: "handstand-straddle-press-tutorial",
    muscleGroups: ["shoulders", "core", "wrists"],
    equipment: ["wall"],
    musclesWorked: {
      primary: ["Anterior Deltoid", "Posterior Deltoid", "Serratus Anterior", "Rectus Abdominis"],
      secondary: ["Triceps Brachii", "Trapezius", "Rhomboids", "Latissimus Dorsi"],
      stabilizers: ["Deep Neck Flexors", "Erector Spinae", "Multifidus"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Infraspinatus Tendon", "Biceps Tendon"],
    recoveryTime: {
      muscle: "24-48 hours",
      tendon: "48-72 hours",
      nervous: "24-36 hours"
    },
    formCues: [
      "Keep shoulders directly over wrists",
      "Engage core throughout movement",
      "Control the straddle transition"
    ]
  },
  {
    id: "wall-handstand-kick-ups",
    name: "Wall Handstand Kick-Ups", 
    category: "handstand-inverted",
    difficulty: "beginner",
    sets: "4×15",
    description: "Basic wall-assisted handstand entry practice for strength building",
    progression: "Wall Handstand Shoulder Taps",
    videoId: "wall-handstand-basics",
    muscleGroups: ["shoulders", "core"],
    equipment: ["wall"],
    musclesWorked: {
      primary: ["Anterior Deltoid", "Medial Deltoid", "Rectus Abdominis"],
      secondary: ["Triceps Brachii", "Serratus Anterior", "External Obliques"],
      stabilizers: ["Rotator Cuff Complex", "Deep Spinal Stabilizers"]
    },
    tendonsInvolved: ["Rotator Cuff Tendons", "Biceps Tendon"],
    recoveryTime: {
      muscle: "18-24 hours",
      tendon: "24-48 hours",
      nervous: "12-24 hours"
    },
    formCues: [
      "Start close to wall",
      "Kick up with control, not force",
      "Keep arms straight and strong"
    ]
  },
  {
    id: "press-walks",
    name: "Press Walks (Wall or Free)",
    category: "handstand-inverted", 
    difficulty: "intermediate",
    sets: "3×10–15 steps",
    description: "Dynamic handstand walking with press entry for advanced coordination",
    progression: "Freestanding Press Walks",
    videoId: "handstand-press-walks",
    muscleGroups: ["shoulders", "core", "wrists"],
    equipment: ["wall", "open-space"],
    musclesWorked: {
      primary: ["Deltoid Complex", "Serratus Anterior", "Core Stabilizers"],
      secondary: ["Triceps Brachii", "Latissimus Dorsi", "Trapezius"],
      stabilizers: ["Intrinsic Hand Muscles", "Forearm Flexors/Extensors"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Wrist Extensor Tendons"],
    recoveryTime: {
      muscle: "36-48 hours",
      tendon: "48-72 hours",
      nervous: "24-48 hours"
    },
    formCues: [
      "Maintain hollow body position",
      "Small controlled steps",
      "Keep shoulders over hands"
    ]
  },
  {
    id: "handstand-shoulder-taps",
    name: "Handstand Shoulder Taps",
    category: "handstand-inverted",
    difficulty: "intermediate", 
    sets: "3×15 taps",
    description: "Unilateral stability challenge in handstand position",
    progression: "Handstand Walking",
    videoId: "handstand-shoulder-taps",
    muscleGroups: ["shoulders", "core"],
    prerequisites: ["wall-handstand-kick-ups"],
    musclesWorked: {
      primary: ["Unilateral Deltoid Stabilizers", "Obliques", "Quadratus Lumborum"],
      secondary: ["Serratus Anterior", "Rhomboids", "Latissimus Dorsi"],
      stabilizers: ["Deep Core Stabilizers", "Rotator Cuff"]
    },
    tendonsInvolved: ["Rotator Cuff Tendons", "Supraspinatus Tendon"],
    recoveryTime: {
      muscle: "24-36 hours",
      tendon: "36-48 hours",
      nervous: "18-36 hours"
    },
    formCues: [
      "Shift weight slowly to supporting arm",
      "Keep hips square",
      "Light tap, don't rest on shoulder"
    ]
  },
  {
    id: "handstand-walking",
    name: "Handstand Walking",
    category: "handstand-inverted",
    difficulty: "intermediate",
    sets: "3×10 steps", 
    description: "Dynamic handstand locomotion for advanced practitioners",
    progression: "Flow Combinations",
    videoId: "handstand-walking-tutorial",
    muscleGroups: ["shoulders", "core", "wrists"],
    musclesWorked: {
      primary: ["Deltoid Complex", "Serratus Anterior", "Core Stabilizers"],
      secondary: ["Triceps Brachii", "Trapezius", "Latissimus Dorsi"],
      stabilizers: ["Intrinsic Hand Muscles", "Wrist Stabilizers"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Wrist Extensor Tendons"],
    recoveryTime: {
      muscle: "36-48 hours",
      tendon: "48-72 hours",
      nervous: "24-48 hours"
    },
    formCues: [
      "Fall forward with control",
      "Catch with fingertips",
      "Keep shoulders over support hand"
    ]
  },

  // 2️⃣ Pulling & Rows (Advanced Variations)
  {
    id: "pull-typewriter",
    name: "Pull Typewriter Up",
    category: "pulling-rows",
    difficulty: "intermediate", 
    sets: "3×6–8",
    description: "Dynamic lateral movement during pull-up for unilateral strength",
    progression: "Pull Typewriter Combination Flow",
    videoId: "typewriter-pullups-tutorial",
    muscleGroups: ["lats", "biceps", "core"],
    equipment: ["pull-up-bar"],
    musclesWorked: {
      primary: ["Latissimus Dorsi", "Biceps Brachii", "Posterior Deltoid"],
      secondary: ["Rhomboids", "Middle Trapezius", "Brachialis"],
      stabilizers: ["Core Stabilizers", "Forearm Flexors"]
    },
    tendonsInvolved: ["Biceps Tendon", "Latissimus Dorsi Tendon"],
    recoveryTime: {
      muscle: "24-48 hours",
      tendon: "36-48 hours",
      nervous: "24-36 hours"
    },
    formCues: [
      "Pull to one side completely",
      "Slide across maintaining height",
      "Control the lateral movement"
    ]
  },
  {
    id: "archer-pullups",
    name: "Archer Pull-Ups", 
    category: "pulling-rows",
    difficulty: "intermediate",
    sets: "3×6 each side",
    description: "Unilateral pull-up variation with one arm extended",
    progression: "Weighted Pull-Ups",
    videoId: "archer-pullups-progression",
    muscleGroups: ["lats", "biceps", "core"],
    equipment: ["pull-up-bar"],
    musclesWorked: {
      primary: ["Unilateral Latissimus Dorsi", "Biceps Brachii", "Posterior Deltoid"],
      secondary: ["Rhomboids", "Middle Trapezius", "Serratus Anterior"],
      stabilizers: ["Obliques", "Rotator Cuff"]
    },
    tendonsInvolved: ["Biceps Tendon", "Supraspinatus Tendon"],
    recoveryTime: {
      muscle: "36-48 hours",
      tendon: "48-72 hours",
      nervous: "24-48 hours"
    },
    formCues: [
      "One arm pulls, one arm supports",
      "Keep supporting arm straight",
      "Control both up and down phases"
    ]
  },

  // 3️⃣ Planche & Parallettes (Advanced Pushing)
  {
    id: "planche-leans",
    name: "Planche Leans",
    category: "planche-parallettes",
    difficulty: "beginner",
    sets: "3×20s",
    description: "Foundation planche strength and wrist conditioning exercise",
    progression: "Pseudo Planche Push-Ups",
    videoId: "planche-leans-tutorial", 
    muscleGroups: ["shoulders", "core", "wrists"],
    musclesWorked: {
      primary: ["Anterior Deltoid", "Serratus Anterior", "Rectus Abdominis"],
      secondary: ["Triceps Brachii", "Posterior Deltoid", "External Obliques"],
      stabilizers: ["Wrist Flexors", "Forearm Extensors"]
    },
    tendonsInvolved: ["Biceps Tendon", "Wrist Extensor Tendons"],
    recoveryTime: {
      muscle: "18-24 hours",
      tendon: "24-36 hours",
      nervous: "12-18 hours"
    },
    formCues: [
      "Lean forward gradually",
      "Keep arms straight",
      "Hollow body position"
    ]
  },
  {
    id: "pseudo-planche-pushups",
    name: "Pseudo Planche Push-Ups",
    category: "planche-parallettes",
    difficulty: "intermediate",
    sets: "3×8–12",
    description: "Dynamic planche-position push-ups for strength development",
    progression: "Tuck Planche Hold",
    videoId: "pseudo-planche-pushups",
    muscleGroups: ["shoulders", "chest", "core"],
    musclesWorked: {
      primary: ["Anterior Deltoid", "Pectoralis Major", "Triceps Brachii"],
      secondary: ["Serratus Anterior", "Rectus Abdominis", "External Obliques"],
      stabilizers: ["Posterior Deltoid", "Rhomboids"]
    },
    tendonsInvolved: ["Pectoralis Major Tendon", "Biceps Tendon"],
    recoveryTime: {
      muscle: "24-36 hours",
      tendon: "36-48 hours",
      nervous: "18-24 hours"
    },
    formCues: [
      "Hands positioned low on torso",
      "Lean forward significantly",
      "Full range push-up motion"
    ]
  },

  // 4️⃣ Rings & Dynamic Strength
  {
    id: "ring-muscle-ups",
    name: "Ring Muscle-Ups",
    category: "rings-dynamic",
    difficulty: "advanced",
    sets: "3×5",
    description: "Ultimate upper body power movement on gymnastics rings",
    progression: "Ring Iron Cross Preparation",
    videoId: "ring-muscle-up-tutorial", 
    muscleGroups: ["lats", "chest", "triceps", "core"],
    equipment: ["rings"],
    musclesWorked: {
      primary: ["Latissimus Dorsi", "Pectoralis Major", "Triceps Brachii"],
      secondary: ["Posterior Deltoid", "Rhomboids", "Serratus Anterior"],
      stabilizers: ["Deep Core Stabilizers", "Rotator Cuff Complex"]
    },
    tendonsInvolved: ["Biceps Tendon", "Pectoralis Major Tendon", "Triceps Tendon"],
    recoveryTime: {
      muscle: "48-72 hours",
      tendon: "72-96 hours",
      nervous: "36-48 hours"
    },
    formCues: [
      "False grip essential",
      "Pull high then transition",
      "Control the negative phase"
    ]
  },

  // 5️⃣ Dynamic & Elite Skills
  {
    id: "human-flag",
    name: "Human Flag",
    category: "dynamic-showstoppers", 
    difficulty: "advanced",
    sets: "3×8–12s",
    description: "Iconic lateral core and grip strength demonstration",
    progression: "Flag-to-Muscle-Up Flow",
    videoId: "human-flag-progression",
    muscleGroups: ["core", "lats", "grip"],
    equipment: ["pole", "wall-bars"],
    musclesWorked: {
      primary: ["Obliques", "Quadratus Lumborum", "Latissimus Dorsi"],
      secondary: ["Serratus Anterior", "Posterior Deltoid", "Hip Abductors"],
      stabilizers: ["Deep Core Stabilizers", "Forearm Complex"]
    },
    tendonsInvolved: ["Latissimus Dorsi Tendon", "Oblique Aponeuroses"],
    recoveryTime: {
      muscle: "48-72 hours",
      tendon: "72-96 hours",
      nervous: "36-72 hours"
    },
    formCues: [
      "Top arm pushes, bottom arm pulls",
      "Body straight and rigid",
      "Breathe throughout hold"
    ]
  },

  // 6️⃣ Mobility & Flexibility Enhancement
  {
    id: "downward-dog-flow",
    name: "Downward Dog → Dolphin → Tripod → Headstand",
    category: "mobility-yoga",
    difficulty: "beginner", 
    sets: "3×5 transitions",
    description: "Foundation flexibility flow for shoulder mobility and strength",
    progression: "Advanced Flow Sequences",
    videoId: "yoga-handstand-prep-flow",
    muscleGroups: ["shoulders", "hamstrings", "core"],
    musclesWorked: {
      primary: ["Posterior Deltoid", "Hamstrings", "Gastrocnemius"],
      secondary: ["Latissimus Dorsi", "Serratus Anterior", "Rectus Abdominis"],
      stabilizers: ["Deep Neck Flexors", "Rotator Cuff"]
    },
    tendonsInvolved: ["Achilles Tendon", "Hamstring Tendons"],
    recoveryTime: {
      muscle: "12-24 hours",
      tendon: "18-36 hours",
      nervous: "6-12 hours"
    },
    formCues: [
      "Keep spine long in downward dog",
      "Smooth transitions between poses",
      "Breathe deeply throughout flow"
    ]
  },

  // Swimming & Cardio
  {
    id: "swimming-laps-freestyle",
    name: "Swimming Laps - Freestyle",
    category: "swimming-cardio",
    difficulty: "beginner",
    sets: "20×25m",
    description: "Cardiovascular endurance and full-body conditioning exercise",
    progression: "Distance and Speed Progression",
    videoId: "freestyle-swimming-technique",
    muscleGroups: ["full-body", "cardiovascular"],
    musclesWorked: {
      primary: ["Latissimus Dorsi", "Deltoids", "Quadriceps", "Core"],
      secondary: ["Triceps", "Pectorals", "Hamstrings", "Calves"],
      stabilizers: ["Deep Core", "Rotator Cuff", "Hip Stabilizers"]
    },
    tendonsInvolved: ["Shoulder Complex Tendons", "Hip Flexor Tendons"],
    recoveryTime: {
      muscle: "12-24 hours",
      tendon: "18-24 hours",
      nervous: "6-18 hours"
    },
    formCues: [
      "High elbow catch",
      "Rotate from core",
      "Consistent breathing pattern"
    ]
  },
  {
    id: "vasa-trainer-okc",
    name: "Vasa Trainer (OKC Location)",
    category: "swimming-cardio",
    difficulty: "intermediate", 
    sets: "3×500m",
    description: "Land-based swimming training at Vasa Oklahoma City facility",
    progression: "Power and Endurance Protocols",
    videoId: "vasa-trainer-techniques",
    muscleGroups: ["lats", "core", "cardiovascular"],
    equipment: ["vasa-trainer"],
    musclesWorked: {
      primary: ["Latissimus Dorsi", "Posterior Deltoid", "Core Stabilizers"],
      secondary: ["Rhomboids", "Middle Trapezius", "Hip Flexors"],
      stabilizers: ["Rotator Cuff", "Deep Core"]
    },
    tendonsInvolved: ["Latissimus Dorsi Tendon", "Rotator Cuff Tendons"],
    recoveryTime: {
      muscle: "18-36 hours",
      tendon: "24-48 hours",
      nervous: "12-24 hours"
    },
    formCues: [
      "Simulate swimming stroke pattern",
      "Maintain core engagement",
      "Control both pull and return phases"
    ]
  }
];

export const getExercisesByCategory = (category: string) => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: string) => {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
};
