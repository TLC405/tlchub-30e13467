export const APP_NAME = "CONTROL";
export const APP_TAGLINE = "Calisthenics · Yoga · Balance · Mobility";
export const APP_PHILOSOPHY = "If you cannot control the position, you do not earn the movement.";

export interface NonNegotiable {
  id: string;
  title: string;
  shortCue: string;
  description: string;
  violations: string;
  fix: string;
  applyTo: string[];
}

export const nonNegotiables: NonNegotiable[] = [
  {
    id: "ribs-down",
    title: "Ribs Down",
    shortCue: "Full exhale → stack ribs over pelvis",
    description: "Full exhale to draw lower ribs toward pelvis. Prevents anterior pelvic tilt and lumbar hyperextension. Apply on every straight-arm hold, inversion, and compression drill.",
    violations: "Banana back, flared ribs, arched lower back",
    fix: "Exhale fully + Glutes 30%",
    applyTo: ["planche", "handstand", "rings", "l-sit", "compression", "inversion"],
  },
  {
    id: "glutes-30",
    title: "Glutes 30%",
    shortCue: "Quiet hips, prevent banana-back",
    description: "Gentle glute squeeze — just enough to quiet the hips and stop banana back. Never full clench. Use on planche leans, handstand, rings support, pistols.",
    violations: "Banana back, anterior pelvic tilt, hips sagging",
    fix: "Exhale fully + light squeeze — not a max clench",
    applyTo: ["planche", "handstand", "rings", "pistols", "lever"],
  },
  {
    id: "shoulders-tall",
    title: "Shoulders Tall",
    shortCue: "Push floor away — serratus + traps",
    description: "Actively push the floor away. Depress scapulae then protract (serratus + lower traps). Lock elbows where required. Critical for all straight-arm strength and inversions.",
    violations: "Collapsed shoulders, scapular winging, bent elbows",
    fix: "Push floor away harder + lock elbows",
    applyTo: ["planche", "handstand", "rings", "l-sit", "push-up"],
  },
  {
    id: "active-legs",
    title: "Active Legs",
    shortCue: "Quads on, toes sharp",
    description: "Quads locked, toes pointed or dorsiflexed as needed. Creates full-body tension and protects knees/lower back.",
    violations: "Loose legs, bent knees, floppy feet",
    fix: "Squeeze quads + point toes deliberately",
    applyTo: ["planche", "handstand", "lever", "l-sit", "rings"],
  },
];

export interface BlockAction {
  type: 'skill' | 'integrity';
  treeId?: string;
  blockId?: string;
}

export interface TrainingBlock {
  label: string;
  action?: BlockAction;
}

export interface StackedDay {
  id: string;
  label: string;
  title: string;
  emphasis: string;
  blocks: TrainingBlock[];
  icon: string;
  optional?: boolean;
}

export const stackedWeek: StackedDay[] = [
  {
    id: "day-a",
    label: "Day A",
    title: "Leverage",
    emphasis: "Planche Path / Straight-arm push",
    typicalBlocks: [
      "Warm-up (wrists + shoulders)",
      "Planche leans / tucks / straddle",
      "Accessory scap work",
      "Integrity (wrists + shoulders)",
      "Cool-down",
    ],
    icon: "Dumbbell",
  },
  {
    id: "day-b",
    label: "Day B",
    title: "Pull + Grip",
    emphasis: "Rings dominant",
    typicalBlocks: [
      "Warm-up (shoulders + lats)",
      "Ring support / rows / dips",
      "Grip hangs + dead hangs",
      "Integrity (thoracic + shoulders)",
      "Cool-down",
    ],
    icon: "ArrowUp",
  },
  {
    id: "day-c",
    label: "Day C",
    title: "Inversions",
    emphasis: "Handstand / Forearm / Elbow / Headstand",
    typicalBlocks: [
      "Warm-up (wrists + neck + shoulders)",
      "Wall / freestanding drills",
      "Shoulder prehab",
      "Integrity (wrists + thoracic)",
      "Cool-down",
    ],
    icon: "Zap",
  },
  {
    id: "day-d",
    label: "Day D",
    title: "Legs + Mobility",
    emphasis: "Pistols, lunges, nordics, cossacks + mobility",
    typicalBlocks: [
      "Warm-up (hips + ankles)",
      "Pistols / nordics / cossacks",
      "Compression work",
      "Full integrity block (hips + pancake + ankles)",
      "Cool-down",
    ],
    icon: "Target",
  },
  {
    id: "day-e",
    label: "Day E",
    title: "Skill Play",
    emphasis: "Light skill practice / recovery",
    typicalBlocks: [
      "Freestyle skill practice",
      "Full integrity session",
      "No prescribed volume",
    ],
    icon: "Star",
    optional: true,
  },
];

export const comingSoon = [
  {
    title: "Barre",
    description: "Isometric pliés with ribs down + turnout. Integrates into Day D.",
    level: "L1",
    eta: "Q3 2026",
    stackedDay: "day-d",
  },
  {
    title: "Pilates",
    description: "Mat breathwork + core alignment. Ribs Down mandatory.",
    level: "L1",
    eta: "Q3 2026",
    stackedDay: "day-d",
  },
  {
    title: "Ballet",
    description: "Pointed-toe balances + ankle lines. Pairs with Legs path.",
    level: "L1",
    eta: "Q4 2026",
    stackedDay: "day-d",
  },
  {
    title: "Endurance",
    description: "EMOM straight-arm/leg holds. Adds to any day without volume bloat.",
    level: "L1",
    eta: "Q4 2026",
    stackedDay: "any",
  },
];

export const integrityBlocks = [
  {
    id: "wrist-prep",
    title: "Wrist Prep",
    duration: "5 min",
    description: "Essential wrist conditioning for handstands and planche work.",
    cues: ["Shoulders Tall during all wrist positions", "Breathe through discomfort — never push through pain"],
    drills: ["Wrist circles", "Finger pulses", "Wrist flexion/extension stretches", "Knuckle push-ups (light)"],
  },
  {
    id: "thoracic-mobility",
    title: "Thoracic Mobility",
    duration: "8 min",
    description: "Open the upper back for overhead positions and ring work.",
    cues: ["Ribs Down throughout", "Exhale into each stretch"],
    drills: ["Cat-cow", "Thoracic rotations", "Thread the needle", "Foam roller extensions"],
  },
  {
    id: "hip-opening",
    title: "Hip Opening",
    duration: "10 min",
    description: "Deep hip work for pistols, pancake, and straddle positions.",
    cues: ["Active Legs — even in stretches", "Never bounce into end range"],
    drills: ["90/90 switches", "Pigeon pose", "Frog stretch", "Cossack squats (slow)"],
  },
  {
    id: "pancake",
    title: "Pancake Progression",
    duration: "8 min",
    description: "Seated straddle forward fold for compression and flexibility.",
    cues: ["Ribs Down — fold from hips, not back", "Active Legs — quads on, toes up"],
    drills: ["Straddle sit", "Pancake pulses", "Weighted pancake (light)", "Contract-relax cycles"],
  },
  {
    id: "ankle-mobility",
    title: "Ankle Mobility",
    duration: "5 min",
    description: "Ankle dorsiflexion for deep squats, pistols, and cossacks.",
    cues: ["Keep heel down", "Drive knee over toes with control"],
    drills: ["Wall ankle stretches", "Banded dorsiflexion", "Calf raises (full ROM)", "Ankle circles"],
  },
];

export const skillPaths = [
  {
    id: "planche",
    title: "Planche Path",
    description: "From lean to full planche. Straight-arm pushing mastery.",
    gates: ["L1: Planche Lean 30s", "L2: Tuck Planche 15s", "L3: Adv. Tuck 10s", "L4: Straddle Planche"],
    why: "The planche teaches total-body tension, scapular control, and straight-arm strength. It builds real pushing power that transfers to everything.",
    stackedDay: "day-a",
    skillTreeId: "planche-progression",
  },
  {
    id: "handstand",
    title: "Handstand Path",
    description: "Wall to freestanding. Shoulder control and balance.",
    gates: ["L1: Wall Hold 60s", "L2: Kick-up + 10s Hold", "L3: Freestanding 20s", "L4: Press to Handstand"],
    why: "Inversions rewire your proprioception, build bulletproof shoulders, and teach you to control your body in space.",
    stackedDay: "day-c",
    skillTreeId: "handstand-progression",
  },
  {
    id: "front-lever",
    title: "Front Lever Path",
    description: "Tuck to full front lever. Pulling strength and core control.",
    gates: ["L1: Tuck FL 15s", "L2: Adv. Tuck FL 10s", "L3: Straddle FL 8s", "L4: Full Front Lever"],
    why: "The front lever builds pulling strength, lat power, and teaches you to maintain a rigid body under load.",
    stackedDay: "day-b",
    skillTreeId: "front-lever-progression",
  },
  {
    id: "muscle-up",
    title: "Muscle-Up Path",
    description: "Pull-up to ring muscle-up. The transition skill.",
    gates: ["L1: High Pull-up", "L2: Slow Negative MU", "L3: Strict Bar MU", "L4: Ring Muscle-Up"],
    why: "The muscle-up connects pulling to pushing — it's the gateway to advanced ring work.",
    stackedDay: "day-b",
    skillTreeId: "muscle-up-progression",
  },
  {
    id: "pistol",
    title: "Pistol & Legs Path",
    description: "Unilateral leg strength and mobility mastery.",
    gates: ["L1: Assisted Pistol", "L2: Full Pistol", "L3: Weighted Pistol", "L4: Pistol + Nordic combo"],
    why: "Single-leg strength protects your knees, builds real-world balance, and fixes left/right imbalances.",
    stackedDay: "day-d",
    skillTreeId: null,
  },
];
