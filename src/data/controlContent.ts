export const APP_NAME = "CONTROL";
export const APP_TAGLINE = "Olympic Mastery";
export const APP_POWERED_BY = "Powered by TLC";
export const APP_FOUNDATION = "Inspire Oklahoma City";
export const APP_COPYRIGHT = `© ${new Date().getFullYear()} Inspire Oklahoma City. All rights reserved.`;
export const APP_VERSION = "1.0.0";
export const APP_PHILOSOPHY = "If you cannot control the position, you do not earn the movement.";

// ── TLCtv & CalisthenicsByTLC Branding ──────────────────────
export const APP_SOCIAL_HANDLE = "@calisthenicsbytlc";
export const APP_GITHUB = "TLC405";
export const APP_BRAND_TLCTV = "TLCtv";
export const APP_SOCIAL_LINKS = {
  github: "https://github.com/TLC405",
  youtube: null as string | null,
  tiktok: null as string | null,
  instagram: null as string | null,
};

// ── STACKED System ──────────────────────────────────────────
export const STACKED_LEVELS = [
  { level: 1, name: "Foundation", description: "Positions, tissue tolerance, clean locks. Build the base before the house." },
  { level: 2, name: "Development", description: "Leverage exposure with control. Start loading the patterns." },
  { level: 3, name: "Advanced", description: "Consistent holds, strong negatives. Own the position." },
  { level: 4, name: "Elite", description: "Clean peaks + endurance under fatigue. Master the skill." },
  { level: 5, name: "Peak", description: "Full expression of the skill. No compensation, no breakdown." },
];

export const STACKED_LAWS = [
  "Never progress leverage and volume at the same time.",
  "Straight-arm days are low fatigue, high quality.",
  "If you cannot control the position, you do not earn the movement.",
  "Recovery is part of the program, not optional.",
  "Tendons adapt slower than muscles — respect the timeline.",
  "Every rep is practice. Sloppy reps teach sloppy patterns.",
];

// ── Non-Negotiables ─────────────────────────────────────────
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

// ── Weekly Structure ────────────────────────────────────────
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
    id: "day-a", label: "Day A", title: "Leverage", emphasis: "Planche Path / Straight-arm push",
    blocks: [
      { label: "Warm-up (wrists + shoulders)", action: { type: "integrity", blockId: "wrist-prep" } },
      { label: "Planche leans / tucks / straddle", action: { type: "skill", treeId: "planche-progression" } },
      { label: "Accessory scap work" },
      { label: "Integrity (wrists + shoulders)", action: { type: "integrity", blockId: "wrist-prep" } },
      { label: "Cool-down" },
    ],
    icon: "Dumbbell",
  },
  {
    id: "day-b", label: "Day B", title: "Pull + Grip", emphasis: "Rings dominant",
    blocks: [
      { label: "Warm-up (shoulders + lats)", action: { type: "integrity", blockId: "thoracic-mobility" } },
      { label: "Ring support / rows / dips", action: { type: "skill", treeId: "iron-cross-progression" } },
      { label: "Front lever work", action: { type: "skill", treeId: "front-lever-progression" } },
      { label: "Grip hangs + dead hangs" },
      { label: "Integrity (thoracic + shoulders)", action: { type: "integrity", blockId: "thoracic-mobility" } },
      { label: "Cool-down" },
    ],
    icon: "ArrowUp",
  },
  {
    id: "day-c", label: "Day C", title: "Inversions", emphasis: "Handstand / Forearm / Elbow / Headstand",
    blocks: [
      { label: "Warm-up (wrists + neck + shoulders)", action: { type: "integrity", blockId: "wrist-prep" } },
      { label: "Wall / freestanding drills", action: { type: "skill", treeId: "handstand-progression" } },
      { label: "Shoulder prehab" },
      { label: "Integrity (wrists + thoracic)", action: { type: "integrity", blockId: "thoracic-mobility" } },
      { label: "Cool-down" },
    ],
    icon: "Zap",
  },
  {
    id: "day-d", label: "Day D", title: "Legs + Mobility", emphasis: "Pistols, lunges, nordics, cossacks + mobility",
    blocks: [
      { label: "Warm-up (hips + ankles)", action: { type: "integrity", blockId: "hip-opening" } },
      { label: "Pistols / nordics / cossacks" },
      { label: "Compression work (Manna path)", action: { type: "skill", treeId: "manna-progression" } },
      { label: "Full integrity block (hips + pancake + ankles)", action: { type: "integrity", blockId: "pancake" } },
      { label: "Cool-down" },
    ],
    icon: "Target",
  },
  {
    id: "day-e", label: "Day E", title: "Skill Play", emphasis: "Light skill practice / recovery",
    blocks: [
      { label: "Freestyle skill practice" },
      { label: "Back lever / muscle-up play", action: { type: "skill", treeId: "back-lever-progression" } },
      { label: "Full integrity session", action: { type: "integrity", blockId: "hip-opening" } },
      { label: "No prescribed volume" },
    ],
    icon: "Star",
    optional: true,
  },
];

// ── Coming Soon ─────────────────────────────────────────────
export const comingSoon = [
  { title: "Barre", description: "Isometric pliés with ribs down + turnout. Integrates into Day D.", level: "L1", eta: "Coming Soon", stackedDay: "day-d" },
  { title: "Pilates", description: "Mat breathwork + core alignment. Ribs Down mandatory.", level: "L1", eta: "Coming Soon", stackedDay: "day-d" },
  { title: "Ballet", description: "Pointed-toe balances + ankle lines. Pairs with Legs path.", level: "L1", eta: "Coming Soon", stackedDay: "day-d" },
  { title: "Endurance", description: "EMOM straight-arm/leg holds. Adds to any day without volume bloat.", level: "L1", eta: "Coming Soon", stackedDay: "any" },
];

// ── Integrity Blocks ────────────────────────────────────────
export const integrityBlocks = [
  {
    id: "wrist-prep", title: "Wrist Prep", duration: "5 min",
    description: "Essential wrist conditioning for handstands and planche work.",
    cues: ["Shoulders Tall during all wrist positions", "Breathe through discomfort — never push through pain"],
    drills: ["Wrist circles", "Finger pulses", "Wrist flexion/extension stretches", "Knuckle push-ups (light)"],
  },
  {
    id: "thoracic-mobility", title: "Thoracic Mobility", duration: "8 min",
    description: "Open the upper back for overhead positions and ring work.",
    cues: ["Ribs Down throughout", "Exhale into each stretch"],
    drills: ["Cat-cow", "Thoracic rotations", "Thread the needle", "Foam roller extensions"],
  },
  {
    id: "hip-opening", title: "Hip Opening", duration: "10 min",
    description: "Deep hip work for pistols, pancake, and straddle positions.",
    cues: ["Active Legs — even in stretches", "Never bounce into end range"],
    drills: ["90/90 switches", "Pigeon pose", "Frog stretch", "Cossack squats (slow)"],
  },
  {
    id: "pancake", title: "Pancake Progression", duration: "8 min",
    description: "Seated straddle forward fold for compression and flexibility.",
    cues: ["Ribs Down — fold from hips, not back", "Active Legs — quads on, toes up"],
    drills: ["Straddle sit", "Pancake pulses", "Weighted pancake (light)", "Contract-relax cycles"],
  },
  {
    id: "ankle-mobility", title: "Ankle Mobility", duration: "5 min",
    description: "Ankle dorsiflexion for deep squats, pistols, and cossacks.",
    cues: ["Keep heel down", "Drive knee over toes with control"],
    drills: ["Wall ankle stretches", "Banded dorsiflexion", "Calf raises (full ROM)", "Ankle circles"],
  },
];

// ── Skill Paths (all 9) ────────────────────────────────────
export const skillPaths = [
  {
    id: "planche", title: "Planche Path",
    description: "From lean to full planche. Straight-arm pushing mastery.",
    gates: ["L1: Planche Lean", "L2: Tuck Planche", "L3: Advanced Tuck", "L4: Straddle Planche", "L5: Full Planche"],
    why: "The planche teaches total-body tension, scapular control, and straight-arm strength. It builds real pushing power that transfers to everything.",
    stackedDay: "day-a", skillTreeId: "planche-progression",
  },
  {
    id: "front-lever", title: "Front Lever Path",
    description: "Tuck to full front lever. Pulling strength and core control.",
    gates: ["L1: Tuck FL", "L2: Advanced Tuck FL", "L3: One Leg FL", "L4: Straddle FL", "L5: Full Front Lever"],
    why: "The front lever builds pulling strength, lat power, and teaches you to maintain a rigid body under load.",
    stackedDay: "day-b", skillTreeId: "front-lever-progression",
  },
  {
    id: "back-lever", title: "Back Lever Path",
    description: "German hang to full back lever. Shoulder flexibility and strength.",
    gates: ["L1: German Hang", "L2: Tuck BL", "L3: Advanced Tuck BL", "L4: Straddle BL", "L5: Full Back Lever"],
    why: "The back lever demands shoulder flexibility and posterior chain control. It's the gateway to advanced ring work.",
    stackedDay: "day-e", skillTreeId: "back-lever-progression",
  },
  {
    id: "human-flag", title: "Human Flag Path",
    description: "Vertical flag to full horizontal. Ultimate side strength.",
    gates: ["L1: Vertical Flag", "L2: Tuck Flag", "L3: Straddle Flag", "L4: Full Human Flag"],
    why: "The human flag builds lateral core strength, shoulder stability, and iron grip — a true showstopper.",
    stackedDay: "day-e", skillTreeId: "human-flag-progression",
  },
  {
    id: "handstand", title: "Handstand Path",
    description: "Wall to one-arm handstand. Shoulder control and balance.",
    gates: ["L1: Wall Handstand", "L2: Chest-to-Wall", "L3: Heel Pulls", "L4: Freestanding", "L5: One Arm Handstand"],
    why: "Inversions rewire your proprioception, build bulletproof shoulders, and teach you to control your body in space.",
    stackedDay: "day-c", skillTreeId: "handstand-progression",
  },
  {
    id: "iron-cross", title: "Iron Cross Path",
    description: "Ring support to full iron cross. Straight-arm ring strength.",
    gates: ["L1: Ring Support", "L2: Ring Flyes", "L3: IC Negatives", "L4: Band-Assisted IC", "L5: Full Iron Cross"],
    why: "The iron cross is the pinnacle of straight-arm ring strength — pure chest, shoulder, and bicep tendon power.",
    stackedDay: "day-b", skillTreeId: "iron-cross-progression",
  },
  {
    id: "maltese", title: "Maltese Path",
    description: "Beyond the planche. Arms behind the body plane.",
    gates: ["L1: Planche Lean", "L2: Tuck Planche", "L3: Full Planche", "L4: Maltese Lean", "L5: Full Maltese"],
    why: "The maltese goes beyond the planche — it demands extreme shoulder flexibility and strength behind the body.",
    stackedDay: "day-a", skillTreeId: "maltese-progression",
  },
  {
    id: "manna", title: "Manna Path",
    description: "L-Sit to full manna. Maximum compression and strength.",
    gates: ["L1: L-Sit", "L2: V-Sit", "L3: High V-Sit", "L4: Manna Tuck", "L5: Full Manna"],
    why: "The manna requires extreme hip compression, shoulder depression, and core strength — one of the rarest skills in calisthenics.",
    stackedDay: "day-d", skillTreeId: "manna-progression",
  },
  {
    id: "muscle-up", title: "Muscle-Up Path",
    description: "Pull-up and dip to strict muscle-up. The transition skill.",
    gates: ["L1: Pull-up + Dip", "L2: High Pull-up", "L3: Negative MU", "L4: Band MU", "L5: Strict Muscle-Up"],
    why: "The muscle-up connects pulling to pushing — it's the gateway to advanced ring work and bar combinations.",
    stackedDay: "day-b", skillTreeId: "muscle-up-progression",
  },
];
