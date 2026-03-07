
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
  },

  // 🧘 Yoga Flow
  {
    id: "sun-salutation-a",
    name: "Sun Salutation A",
    category: "yoga-flow",
    difficulty: "beginner",
    sets: "5 rounds",
    description: "Classic Ashtanga sun salutation sequence linking breath with movement through 9 positions",
    progression: "Sun Salutation B",
    muscleGroups: ["shoulders", "core", "legs", "back"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Rectus Abdominis", "Anterior Deltoid", "Quadriceps"],
      secondary: ["Pectoralis Major", "Erector Spinae", "Hamstrings"],
      stabilizers: ["Serratus Anterior", "Hip Flexors", "Tibialis Anterior"]
    },
    tendonsInvolved: ["Achilles Tendon", "Patellar Tendon", "Supraspinatus Tendon"],
    recoveryTime: { muscle: "12-24 hours", tendon: "24-36 hours", nervous: "12 hours" },
    formCues: ["Inhale on extensions, exhale on folds", "Keep core engaged throughout", "Ground all four corners of feet"]
  },
  {
    id: "sun-salutation-b",
    name: "Sun Salutation B",
    category: "yoga-flow",
    difficulty: "beginner",
    sets: "3 rounds",
    description: "Extended sun salutation adding Warrior I and Chair pose for deeper hip and quad work",
    progression: "Warrior Flow I-II-III",
    muscleGroups: ["legs", "hips", "shoulders", "core"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Quadriceps", "Gluteus Maximus", "Anterior Deltoid"],
      secondary: ["Hip Flexors", "Adductors", "Trapezius"],
      stabilizers: ["Erector Spinae", "External Obliques", "Tibialis Anterior"]
    },
    tendonsInvolved: ["Patellar Tendon", "Achilles Tendon", "IT Band"],
    recoveryTime: { muscle: "18-24 hours", tendon: "24-48 hours", nervous: "12-18 hours" },
    formCues: ["Stack front knee over ankle in Warrior I", "Square hips fully", "Maintain tall spine in Chair"]
  },
  {
    id: "warrior-flow",
    name: "Warrior Flow (I→II→III)",
    category: "yoga-flow",
    difficulty: "intermediate",
    sets: "3×3 per side",
    description: "Dynamic transition through Warrior I, II, and III building balance, strength, and coordination",
    progression: "Crow to Tripod Headstand",
    muscleGroups: ["legs", "hips", "core", "shoulders"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Gluteus Maximus", "Quadriceps", "Posterior Deltoid"],
      secondary: ["Hamstrings", "Adductors", "Erector Spinae"],
      stabilizers: ["Tibialis Anterior", "Gastrocnemius", "Serratus Anterior"]
    },
    tendonsInvolved: ["IT Band", "Patellar Tendon", "Achilles Tendon"],
    recoveryTime: { muscle: "24-36 hours", tendon: "36-48 hours", nervous: "18-24 hours" },
    formCues: ["Warrior III: extend through heel", "Keep standing leg micro-bent", "Arms and torso parallel to floor in W3"]
  },
  {
    id: "crow-tripod-headstand",
    name: "Crow to Tripod Headstand",
    category: "yoga-flow",
    difficulty: "advanced",
    sets: "3×5 transitions",
    description: "Advanced arm balance transition from Crow pose into a controlled Tripod Headstand",
    progression: "Ashtanga Primary Series",
    muscleGroups: ["wrists", "shoulders", "core", "triceps"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Serratus Anterior", "Anterior Deltoid", "Rectus Abdominis"],
      secondary: ["Triceps Brachii", "Wrist Flexors", "Hip Flexors"],
      stabilizers: ["Rotator Cuff", "Deep Neck Flexors", "External Obliques"]
    },
    tendonsInvolved: ["Wrist Extensor Tendons", "Supraspinatus Tendon", "Biceps Tendon"],
    recoveryTime: { muscle: "36-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Shelf knees on triceps for Crow", "Send hips over shoulders slowly", "Use neck strength, not just balance, in tripod"]
  },
  {
    id: "vinyasa-power-flow",
    name: "Vinyasa Power Flow",
    category: "yoga-flow",
    difficulty: "intermediate",
    sets: "20 min flow",
    duration: "20 min",
    description: "Dynamic linked yoga sequence combining strength, flexibility, and breath synchronization",
    progression: "Arm Balance Flow",
    muscleGroups: ["full-body", "core", "shoulders"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Pectoralis Major", "Anterior Deltoid", "Quadriceps"],
      secondary: ["Triceps Brachii", "Hamstrings", "Gluteus Maximus"],
      stabilizers: ["Serratus Anterior", "External Obliques", "Tibialis Anterior"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Patellar Tendon", "Achilles Tendon"],
    recoveryTime: { muscle: "24-36 hours", tendon: "36-48 hours", nervous: "18-24 hours" },
    formCues: ["Match breath with every transition", "Keep chaturanga elbows tucked", "Press back through downdog heels"]
  },
  {
    id: "yin-yoga-deep-holds",
    name: "Yin Yoga Deep Holds",
    category: "yoga-flow",
    difficulty: "beginner",
    sets: "6 poses",
    duration: "30 min",
    description: "Passive, long-hold yoga targeting deep connective tissue, fascia, and ligaments",
    progression: "Mobility Corrective Protocol",
    muscleGroups: ["hips", "spine", "hamstrings"],
    equipment: ["yoga-mat", "blocks", "bolster"],
    musclesWorked: {
      primary: ["Hip Flexors", "Hamstrings", "Erector Spinae"],
      secondary: ["Adductors", "Gluteus Maximus", "Thoracic Fascia"],
      stabilizers: ["Deep Spinal Stabilizers", "Multifidus"]
    },
    tendonsInvolved: ["IT Band", "Achilles Tendon", "Thoracolumbar Fascia"],
    recoveryTime: { muscle: "12-18 hours", tendon: "24-36 hours", nervous: "8-12 hours" },
    formCues: ["Hold 3-5 minutes per pose", "Find your edge, not your limit", "Breathe into resistance, don't force"]
  },
  {
    id: "arm-balance-flow",
    name: "Arm Balance Flow",
    category: "yoga-flow",
    difficulty: "advanced",
    sets: "3×8 min",
    description: "Linked arm balance sequence: Bakasana, Eka Pada Koundinyasana, Astavakrasana",
    progression: "Advanced Inversion Practice",
    muscleGroups: ["wrists", "core", "shoulders", "triceps"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Serratus Anterior", "Rectus Abdominis", "Anterior Deltoid"],
      secondary: ["Triceps Brachii", "Hip Flexors", "External Obliques"],
      stabilizers: ["Wrist Flexors", "Rotator Cuff", "Deep Core"]
    },
    tendonsInvolved: ["Wrist Extensor Tendons", "Supraspinatus Tendon", "Biceps Tendon"],
    recoveryTime: { muscle: "48-72 hours", tendon: "72 hours", nervous: "36-48 hours" },
    formCues: ["Spread fingers wide for weight distribution", "Engage bandhas throughout", "Gaze forward, not down"]
  },
  {
    id: "ashtanga-primary-short",
    name: "Ashtanga Primary Series (Shortened)",
    category: "yoga-flow",
    difficulty: "advanced",
    sets: "1 round",
    duration: "45 min",
    description: "Abbreviated Ashtanga Primary Series focusing on standing and core sequences",
    progression: "Full Ashtanga Primary Series",
    muscleGroups: ["full-body", "core", "hips"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Quadriceps", "Hamstrings", "Anterior Deltoid"],
      secondary: ["Gluteus Maximus", "Adductors", "Erector Spinae"],
      stabilizers: ["Serratus Anterior", "External Obliques", "Deep Core"]
    },
    tendonsInvolved: ["Patellar Tendon", "Achilles Tendon", "IT Band"],
    recoveryTime: { muscle: "36-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Ujjayi breath throughout", "Drishti (gaze point) on each pose", "Bandha engagement lifts the practice"]
  },

  // 🔧 Mobility Corrective
  {
    id: "frc-cars",
    name: "FRC CARs (Controlled Articular Rotations)",
    category: "mobility-corrective",
    difficulty: "beginner",
    sets: "2×5 per joint",
    duration: "10 min",
    description: "Full active range-of-motion circles for each major joint — the foundation of Functional Range Conditioning",
    progression: "PNF Stretching Protocol",
    muscleGroups: ["shoulders", "hips", "spine", "ankles"],
    equipment: [],
    musclesWorked: {
      primary: ["Rotator Cuff", "Hip Flexors", "Erector Spinae"],
      secondary: ["Anterior Deltoid", "Gluteus Maximus", "Tibialis Anterior"],
      stabilizers: ["Deep Spinal Stabilizers", "Multifidus", "Deep Core"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Hip Capsule Ligaments", "Achilles Tendon"],
    recoveryTime: { muscle: "12 hours", tendon: "18-24 hours", nervous: "8 hours" },
    formCues: ["Move at 10% speed — control is everything", "Keep the rest of the body still", "Breathe steadily throughout"]
  },
  {
    id: "pnf-stretching",
    name: "PNF Stretching Protocol",
    category: "mobility-corrective",
    difficulty: "intermediate",
    sets: "3×30s per muscle",
    description: "Proprioceptive Neuromuscular Facilitation: contract-relax cycles to gain lasting range of motion",
    progression: "FRC Passive Range Expansion",
    muscleGroups: ["hamstrings", "hips", "shoulders"],
    equipment: ["resistance-band"],
    musclesWorked: {
      primary: ["Hamstrings", "Hip Flexors", "Posterior Deltoid"],
      secondary: ["Adductors", "Gluteus Maximus", "Rhomboids"],
      stabilizers: ["Erector Spinae", "External Obliques", "Deep Core"]
    },
    tendonsInvolved: ["Hamstring Tendons", "IT Band", "Supraspinatus Tendon"],
    recoveryTime: { muscle: "24-36 hours", tendon: "36-48 hours", nervous: "18-24 hours" },
    formCues: ["Contract hard for 8 seconds, then relax and stretch", "Never bounce into end range", "Partner or band assistance for best results"]
  },
  {
    id: "shoulder-dislocates",
    name: "Shoulder Dislocates",
    category: "mobility-corrective",
    difficulty: "beginner",
    sets: "3×10",
    description: "Overhead shoulder circle drill with dowel or band for thoracic and shoulder mobility",
    progression: "Behind-Neck Press",
    muscleGroups: ["shoulders", "thoracic-spine"],
    equipment: ["dowel", "resistance-band"],
    musclesWorked: {
      primary: ["Posterior Deltoid", "Infraspinatus", "Rhomboids"],
      secondary: ["Trapezius", "Serratus Anterior", "Biceps Brachii"],
      stabilizers: ["Rotator Cuff", "Deep Neck Flexors"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Infraspinatus Tendon", "Biceps Tendon"],
    recoveryTime: { muscle: "18-24 hours", tendon: "24-36 hours", nervous: "12 hours" },
    formCues: ["Use as wide a grip as needed", "Keep elbows straight", "Move slowly — pain means grip too narrow"]
  },
  {
    id: "jefferson-curls",
    name: "Jefferson Curls",
    category: "mobility-corrective",
    difficulty: "intermediate",
    sets: "3×5 slow",
    description: "Weighted spinal flexion drill for posterior chain mobility and spinal resilience",
    progression: "Weighted Jefferson Curls",
    muscleGroups: ["spine", "hamstrings", "erectors"],
    equipment: ["barbell", "kettlebell", "dumbbells"],
    musclesWorked: {
      primary: ["Erector Spinae", "Hamstrings", "Thoracic Fascia"],
      secondary: ["Gluteus Maximus", "Latissimus Dorsi", "Rhomboids"],
      stabilizers: ["Deep Spinal Stabilizers", "Multifidus"]
    },
    tendonsInvolved: ["Thoracolumbar Fascia", "Hamstring Tendons", "Spinal Ligaments"],
    recoveryTime: { muscle: "36-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Curl one vertebra at a time", "Start with bodyweight only", "Feel each spinal segment articulate"]
  },
  {
    id: "cossack-squat-flow",
    name: "Cossack Squat Flow",
    category: "mobility-corrective",
    difficulty: "intermediate",
    sets: "3×5 per side",
    description: "Lateral squat flow for hip adductor, glute, and ankle mobility",
    progression: "Pistol Squat",
    muscleGroups: ["hips", "adductors", "ankles"],
    equipment: [],
    musclesWorked: {
      primary: ["Adductors", "Gluteus Maximus", "Quadriceps"],
      secondary: ["Hamstrings", "Hip Flexors", "Tibialis Anterior"],
      stabilizers: ["Erector Spinae", "External Obliques", "Gastrocnemius"]
    },
    tendonsInvolved: ["IT Band", "Patellar Tendon", "Achilles Tendon"],
    recoveryTime: { muscle: "24-36 hours", tendon: "36-48 hours", nervous: "18-24 hours" },
    formCues: ["Keep heel flat on bent-leg side", "Toes of straight leg pointing up", "Maintain upright torso"]
  },
  {
    id: "hip-90-90-flow",
    name: "Hip 90/90 Flow",
    category: "mobility-corrective",
    difficulty: "beginner",
    sets: "3×8 transitions",
    description: "Seated hip rotation flow targeting internal and external rotation, hip capsule mobility",
    progression: "Cossack Squat Flow",
    muscleGroups: ["hips", "glutes", "adductors"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Hip Flexors", "Gluteus Maximus", "Adductors"],
      secondary: ["Piriformis", "IT Band", "Erector Spinae"],
      stabilizers: ["Deep Core", "Multifidus"]
    },
    tendonsInvolved: ["Hip Capsule Ligaments", "IT Band", "Thoracolumbar Fascia"],
    recoveryTime: { muscle: "18-24 hours", tendon: "24-36 hours", nervous: "12 hours" },
    formCues: ["Keep both sit bones on floor", "Rotate from the hip, not the spine", "Breathe into restriction"]
  },
  {
    id: "thoracic-spine-cars",
    name: "Thoracic Spine CARs",
    category: "mobility-corrective",
    difficulty: "beginner",
    sets: "2×5 per direction",
    description: "Controlled articular rotations specific to the thoracic spine for overhead mobility",
    progression: "Shoulder Dislocates",
    muscleGroups: ["thoracic-spine", "shoulders"],
    equipment: ["foam-roller"],
    musclesWorked: {
      primary: ["Erector Spinae", "Rhomboids", "Trapezius"],
      secondary: ["Serratus Anterior", "Posterior Deltoid", "External Obliques"],
      stabilizers: ["Deep Spinal Stabilizers", "Multifidus"]
    },
    tendonsInvolved: ["Thoracolumbar Fascia", "Costovertebral Ligaments"],
    recoveryTime: { muscle: "12-18 hours", tendon: "18-24 hours", nervous: "8-12 hours" },
    formCues: ["Isolate thoracic — lock lumbar and cervical", "Slow and deliberate movement", "Breathe through each rotation"]
  },
  {
    id: "ankle-mobility-complex",
    name: "Ankle Mobility Complex",
    category: "mobility-corrective",
    difficulty: "beginner",
    sets: "2×10 per exercise",
    description: "Comprehensive ankle dorsiflexion and plantarflexion protocol for squats and calisthenics",
    progression: "Cossack Squat Flow",
    muscleGroups: ["ankles", "calves"],
    equipment: ["resistance-band", "wall"],
    musclesWorked: {
      primary: ["Tibialis Anterior", "Gastrocnemius", "Soleus"],
      secondary: ["Peroneus Longus", "Tibialis Posterior"],
      stabilizers: ["Deep Foot Muscles", "Plantar Fascia"]
    },
    tendonsInvolved: ["Achilles Tendon", "Tibialis Anterior Tendon", "Peroneal Tendons"],
    recoveryTime: { muscle: "12-18 hours", tendon: "24-36 hours", nervous: "8-12 hours" },
    formCues: ["Drive knee over little toe", "Keep heel on floor", "Use band distraction for better results"]
  },

  // 🔥 Endurance Conditioning
  {
    id: "tabata-bodyweight",
    name: "Tabata Bodyweight Circuit",
    category: "endurance-conditioning",
    difficulty: "intermediate",
    sets: "8 rounds (4 min)",
    duration: "4 min",
    description: "Classic Tabata protocol: 20s max effort, 10s rest, 8 rounds with a single bodyweight movement",
    progression: "EMOM Calisthenics",
    muscleGroups: ["full-body", "cardiovascular"],
    equipment: [],
    musclesWorked: {
      primary: ["Quadriceps", "Gluteus Maximus", "Pectoralis Major"],
      secondary: ["Hamstrings", "Anterior Deltoid", "Rectus Abdominis"],
      stabilizers: ["Erector Spinae", "External Obliques", "Tibialis Anterior"]
    },
    tendonsInvolved: ["Patellar Tendon", "Achilles Tendon", "Supraspinatus Tendon"],
    recoveryTime: { muscle: "24-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Max effort on every 20s interval", "Maintain form even when fatigued", "Rest is part of the protocol — honor it"]
  },
  {
    id: "emom-calisthenics",
    name: "EMOM Calisthenics",
    category: "endurance-conditioning",
    difficulty: "intermediate",
    sets: "10-20 rounds",
    duration: "10-20 min",
    description: "Every Minute On the Minute: prescribed reps at the start of each minute, rest with remaining time",
    progression: "Deck of Cards Workout",
    muscleGroups: ["full-body", "cardiovascular"],
    equipment: ["pull-up-bar"],
    musclesWorked: {
      primary: ["Latissimus Dorsi", "Pectoralis Major", "Quadriceps"],
      secondary: ["Biceps Brachii", "Triceps Brachii", "Rectus Abdominis"],
      stabilizers: ["Serratus Anterior", "External Obliques", "Erector Spinae"]
    },
    tendonsInvolved: ["Biceps Tendon", "Patellar Tendon", "Supraspinatus Tendon"],
    recoveryTime: { muscle: "24-36 hours", tendon: "36-48 hours", nervous: "18-24 hours" },
    formCues: ["Pick a rep count you can sustain for all rounds", "Quality reps over rushing", "Scale down if you can't complete within 45s"]
  },
  {
    id: "burpee-ladder",
    name: "Burpee Ladder",
    category: "endurance-conditioning",
    difficulty: "intermediate",
    sets: "1-10 ascending",
    description: "Ascending burpee ladder: 1 rep, rest, 2 reps, rest... up to 10, totaling 55 burpees",
    progression: "Burpee Double Ladder (1-10-1)",
    muscleGroups: ["full-body", "cardiovascular"],
    equipment: [],
    musclesWorked: {
      primary: ["Quadriceps", "Pectoralis Major", "Gluteus Maximus"],
      secondary: ["Triceps Brachii", "Anterior Deltoid", "Hamstrings"],
      stabilizers: ["Rectus Abdominis", "Erector Spinae", "Serratus Anterior"]
    },
    tendonsInvolved: ["Patellar Tendon", "Achilles Tendon", "Supraspinatus Tendon"],
    recoveryTime: { muscle: "36-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Full push-up in each burpee", "Explosive jump at the top", "Controlled descent — don't collapse"]
  },
  {
    id: "jump-rope-intervals",
    name: "Jump Rope Intervals",
    category: "endurance-conditioning",
    difficulty: "beginner",
    sets: "10×1 min on / 1 min off",
    duration: "20 min",
    description: "High-intensity jump rope intervals building cardiovascular endurance and foot coordination",
    progression: "Double Unders",
    muscleGroups: ["cardiovascular", "calves", "shoulders"],
    equipment: ["jump-rope"],
    musclesWorked: {
      primary: ["Gastrocnemius", "Soleus", "Anterior Deltoid"],
      secondary: ["Tibialis Anterior", "Quadriceps", "Forearm Flexors"],
      stabilizers: ["Deep Core", "Erector Spinae"]
    },
    tendonsInvolved: ["Achilles Tendon", "Patellar Tendon", "Peroneal Tendons"],
    recoveryTime: { muscle: "18-24 hours", tendon: "24-48 hours", nervous: "12-18 hours" },
    formCues: ["Land on balls of feet", "Small jumps — just enough clearance", "Keep elbows at sides, wrists turning the rope"]
  },
  {
    id: "bear-crawl-intervals",
    name: "Bear Crawl Intervals",
    category: "endurance-conditioning",
    difficulty: "beginner",
    sets: "5×20m",
    description: "Quadrupedal bear crawl intervals for core stability, shoulder strength, and full-body conditioning",
    progression: "Lateral Bear Crawls",
    muscleGroups: ["shoulders", "core", "hips"],
    equipment: ["open-space"],
    musclesWorked: {
      primary: ["Serratus Anterior", "Rectus Abdominis", "Anterior Deltoid"],
      secondary: ["Hip Flexors", "Quadriceps", "Triceps Brachii"],
      stabilizers: ["Erector Spinae", "External Obliques", "Deep Core"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Wrist Extensor Tendons", "Hip Flexor Tendons"],
    recoveryTime: { muscle: "18-24 hours", tendon: "24-36 hours", nervous: "12-18 hours" },
    formCues: ["Keep knees 1 inch off floor", "Opposite arm and leg move together", "Maintain flat back — no hip sway"]
  },
  {
    id: "hollow-body-amrap",
    name: "Hollow Body AMRAP",
    category: "endurance-conditioning",
    difficulty: "intermediate",
    sets: "3×5 min AMRAP",
    duration: "15 min",
    description: "AMRAP circuit anchored by hollow body holds: hollow hold 20s → V-ups → tuck-ups → rest",
    progression: "L-Sit AMRAP",
    muscleGroups: ["core", "hip-flexors"],
    equipment: ["yoga-mat"],
    musclesWorked: {
      primary: ["Rectus Abdominis", "Hip Flexors", "External Obliques"],
      secondary: ["Transverse Abdominis", "Internal Obliques", "Quadriceps"],
      stabilizers: ["Serratus Anterior", "Deep Core", "Erector Spinae"]
    },
    tendonsInvolved: ["Hip Flexor Tendons", "Rectus Abdominis Tendon"],
    recoveryTime: { muscle: "24-36 hours", tendon: "36-48 hours", nervous: "18-24 hours" },
    formCues: ["Press lower back into floor in hollow", "Point toes, squeeze thighs", "Breathe — don't hold breath"]
  },
  {
    id: "deck-of-cards",
    name: "Deck of Cards Workout",
    category: "endurance-conditioning",
    difficulty: "intermediate",
    sets: "Full deck",
    duration: "30-50 min",
    description: "Flip a card, do that many reps: suits = push-ups, pull-ups, squats, abs. Unpredictable and brutal.",
    progression: "Double Deck Challenge",
    muscleGroups: ["full-body", "cardiovascular"],
    equipment: ["playing-cards", "pull-up-bar"],
    musclesWorked: {
      primary: ["Pectoralis Major", "Latissimus Dorsi", "Quadriceps"],
      secondary: ["Triceps Brachii", "Biceps Brachii", "Rectus Abdominis"],
      stabilizers: ["Serratus Anterior", "Erector Spinae", "External Obliques"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Biceps Tendon", "Patellar Tendon"],
    recoveryTime: { muscle: "36-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Assign movements before starting", "Face cards (J/Q/K) = 10 reps, Ace = 11", "Rest between cards as needed"]
  },
  {
    id: "turkish-getup-complex",
    name: "Turkish Get-Up Complex",
    category: "endurance-conditioning",
    difficulty: "advanced",
    sets: "3×3 per side",
    description: "Full Turkish Get-Up sequence with transitions into windmill and bottoms-up press for total integration",
    progression: "Weighted TGU Complex",
    muscleGroups: ["shoulders", "core", "hips", "legs"],
    equipment: ["kettlebell"],
    musclesWorked: {
      primary: ["Anterior Deltoid", "Gluteus Maximus", "Rectus Abdominis"],
      secondary: ["Triceps Brachii", "Hip Flexors", "External Obliques"],
      stabilizers: ["Rotator Cuff", "Deep Core", "Erector Spinae"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Hip Flexor Tendons", "IT Band"],
    recoveryTime: { muscle: "36-48 hours", tendon: "48-72 hours", nervous: "24-36 hours" },
    formCues: ["Eyes on the bell throughout", "Deliberate, controlled every step", "Never rush the transitions"]
  },

  // 🌿 Longevity & Recovery
  {
    id: "zone-2-walking",
    name: "Zone 2 Walking",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "1 session",
    duration: "30-60 min",
    description: "Low-intensity aerobic walking maintaining heart rate at 60-70% max for mitochondrial and cardiovascular health",
    progression: "Zone 2 Rucking",
    muscleGroups: ["cardiovascular", "legs"],
    equipment: [],
    musclesWorked: {
      primary: ["Gastrocnemius", "Quadriceps", "Gluteus Maximus"],
      secondary: ["Hamstrings", "Tibialis Anterior", "Hip Flexors"],
      stabilizers: ["Erector Spinae", "Deep Core"]
    },
    tendonsInvolved: ["Achilles Tendon", "Patellar Tendon"],
    recoveryTime: { muscle: "4-8 hours", tendon: "8-12 hours", nervous: "4-8 hours" },
    formCues: ["Maintain conversational pace", "Target 120-140 bpm", "Nasal breathing only if possible"]
  },
  {
    id: "cold-exposure-protocol",
    name: "Cold Exposure Protocol",
    category: "longevity-recovery",
    difficulty: "intermediate",
    sets: "1-3 rounds",
    duration: "2-5 min cold",
    description: "Deliberate cold water immersion or cold shower protocol for recovery, resilience, and mental fortitude",
    progression: "Ice Bath",
    muscleGroups: ["nervous-system", "cardiovascular"],
    equipment: ["cold-shower", "ice-bath"],
    musclesWorked: {
      primary: ["Nervous System", "Cardiovascular System"],
      secondary: ["Immune System"],
      stabilizers: ["Deep Core"]
    },
    tendonsInvolved: [],
    recoveryTime: { muscle: "2-4 hours", tendon: "4-8 hours", nervous: "1-2 hours" },
    formCues: ["Start at 60°F, work toward 50°F", "Controlled breathing before entry", "Never go alone for cold immersion"]
  },
  {
    id: "breathwork-box-478",
    name: "Breathwork (Box / 4-7-8)",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "5-10 min",
    duration: "10 min",
    description: "Structured breathing protocols: Box Breathing (4-4-4-4) and 4-7-8 for nervous system regulation and recovery",
    progression: "Wim Hof Method",
    muscleGroups: ["nervous-system", "diaphragm"],
    equipment: [],
    musclesWorked: {
      primary: ["Diaphragm", "Intercostal Muscles"],
      secondary: ["Scalenes", "Sternocleidomastoid"],
      stabilizers: ["Deep Core"]
    },
    tendonsInvolved: [],
    recoveryTime: { muscle: "0 hours", tendon: "0 hours", nervous: "0-1 hour" },
    formCues: ["Box: inhale 4, hold 4, exhale 4, hold 4", "4-7-8: inhale 4, hold 7, exhale 8", "Eyes closed, comfortable seated position"]
  },
  {
    id: "foam-rolling-full-body",
    name: "Foam Rolling Full Body",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "1 round",
    duration: "15 min",
    description: "Systematic self-myofascial release (SMR) covering quads, IT band, thoracic spine, lats, and calves",
    progression: "Lacrosse Ball Precision Work",
    muscleGroups: ["full-body", "fascia"],
    equipment: ["foam-roller"],
    musclesWorked: {
      primary: ["Quadriceps", "IT Band", "Thoracic Fascia"],
      secondary: ["Latissimus Dorsi", "Gastrocnemius", "Hamstrings"],
      stabilizers: ["Deep Core"]
    },
    tendonsInvolved: ["IT Band", "Thoracolumbar Fascia"],
    recoveryTime: { muscle: "0 hours", tendon: "0 hours", nervous: "0 hours" },
    formCues: ["Roll slowly — 1 inch per second", "Pause on tender spots for 30-60s", "Breathe through pressure"]
  },
  {
    id: "hanging-decompression",
    name: "Hanging Decompression",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "3×60s",
    description: "Passive hanging from a bar for spinal decompression, shoulder opening, and grip strength maintenance",
    progression: "Active Hanging with Shoulder CAR",
    muscleGroups: ["spine", "shoulders", "grip"],
    equipment: ["pull-up-bar"],
    musclesWorked: {
      primary: ["Latissimus Dorsi", "Serratus Anterior", "Forearm Flexors"],
      secondary: ["Trapezius", "Rhomboids", "Erector Spinae"],
      stabilizers: ["Rotator Cuff", "Deep Core"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Biceps Tendon", "Flexor Digitorum Tendons"],
    recoveryTime: { muscle: "4-8 hours", tendon: "8-12 hours", nervous: "4 hours" },
    formCues: ["Relax completely — let gravity decompress you", "Breath naturally", "Use dead hang, not active pull"]
  },
  {
    id: "sleep-hygiene-routine",
    name: "Sleep Hygiene Routine",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "Nightly",
    duration: "20 min",
    description: "Pre-sleep protocol: dim lights 2h before bed, no screens, deep breathing, room temperature 65-68°F",
    progression: "Advanced Sleep Optimization",
    muscleGroups: ["nervous-system"],
    equipment: [],
    musclesWorked: {
      primary: ["Nervous System", "Circadian System"],
      secondary: ["Immune System"],
      stabilizers: []
    },
    tendonsInvolved: [],
    recoveryTime: { muscle: "0 hours", tendon: "0 hours", nervous: "0 hours" },
    formCues: ["Same sleep and wake time daily", "Cold, dark, quiet room", "No caffeine after 2pm"]
  },
  {
    id: "meditation-movement",
    name: "Meditation Movement",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "1 session",
    duration: "15-20 min",
    description: "Walking meditation or gentle Qigong combining mindful movement and breath awareness",
    progression: "Seated Vipassana",
    muscleGroups: ["nervous-system", "full-body"],
    equipment: [],
    musclesWorked: {
      primary: ["Nervous System", "Diaphragm"],
      secondary: ["Gastrocnemius", "Hip Flexors"],
      stabilizers: ["Deep Core", "Erector Spinae"]
    },
    tendonsInvolved: [],
    recoveryTime: { muscle: "0 hours", tendon: "0 hours", nervous: "0 hours" },
    formCues: ["Move at half your normal speed", "Full attention on sensation of movement", "Breathe in sync with steps"]
  },
  {
    id: "joint-prehab-circuit",
    name: "Joint Prehab Circuit",
    category: "longevity-recovery",
    difficulty: "beginner",
    sets: "2×10 per joint",
    duration: "15 min",
    description: "Systematic joint strengthening circuit: wrists, elbows, shoulders, knees, ankles — preventive maintenance",
    progression: "Advanced FRC Protocol",
    muscleGroups: ["wrists", "elbows", "shoulders", "knees", "ankles"],
    equipment: ["resistance-band", "light-dumbbells"],
    musclesWorked: {
      primary: ["Rotator Cuff", "Tibialis Anterior", "Wrist Extensors"],
      secondary: ["Forearm Flexors", "Gastrocnemius", "Serratus Anterior"],
      stabilizers: ["Deep Core", "Deep Spinal Stabilizers"]
    },
    tendonsInvolved: ["Supraspinatus Tendon", "Achilles Tendon", "Patellar Tendon", "Wrist Extensor Tendons"],
    recoveryTime: { muscle: "12-18 hours", tendon: "18-24 hours", nervous: "8-12 hours" },
    formCues: ["Pain-free range only", "3-second eccentric on every rep", "This is medicine — treat it as such"]
  }
];

export const getExercisesByCategory = (category: string) => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: string) => {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
};
