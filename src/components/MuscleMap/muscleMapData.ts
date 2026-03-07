export interface MuscleRegion {
  id: string;
  name: string;
  aliases: string[];
  view: 'front' | 'back';
  svgPath: string;
  center: { x: number; y: number };
}

// SVG viewBox is 200x400 (width x height)
export const muscleRegions: MuscleRegion[] = [
  // ── FRONT VIEW ─────────────────────────────────────────────────────────────
  {
    id: "anterior-deltoid",
    name: "Anterior Deltoid",
    aliases: ["Anterior Deltoid", "Front Delt", "Front Deltoid", "Deltoid Complex", "shoulders"],
    view: "front",
    svgPath: "M 62,92 Q 52,88 48,98 Q 46,108 54,112 Q 62,114 66,106 Z M 138,92 Q 148,88 152,98 Q 154,108 146,112 Q 138,114 134,106 Z",
    center: { x: 57, y: 102 },
  },
  {
    id: "pectoralis-major",
    name: "Pectoralis Major",
    aliases: ["Pectoralis Major", "Chest", "Pecs", "Pectorals"],
    view: "front",
    svgPath: "M 72,96 Q 64,94 60,102 Q 58,112 66,118 Q 78,122 88,118 Q 96,114 96,106 Q 94,96 86,94 Z M 128,96 Q 136,94 140,102 Q 142,112 134,118 Q 122,122 112,118 Q 104,114 104,106 Q 106,96 114,94 Z",
    center: { x: 100, y: 110 },
  },
  {
    id: "biceps-brachii",
    name: "Biceps Brachii",
    aliases: ["Biceps Brachii", "Biceps", "Bicep"],
    view: "front",
    svgPath: "M 50,116 Q 44,118 42,130 Q 40,142 46,146 Q 52,148 56,140 Q 58,130 56,120 Z M 150,116 Q 156,118 158,130 Q 160,142 154,146 Q 148,148 144,140 Q 142,130 144,120 Z",
    center: { x: 49, y: 132 },
  },
  {
    id: "rectus-abdominis",
    name: "Rectus Abdominis",
    aliases: ["Rectus Abdominis", "Abs", "Six Pack", "Core", "Abdominals", "Core Stabilizers"],
    view: "front",
    svgPath: "M 88,124 L 88,170 L 112,170 L 112,124 Z",
    center: { x: 100, y: 148 },
  },
  {
    id: "external-obliques",
    name: "External Obliques",
    aliases: ["External Obliques", "Obliques", "Side Abs"],
    view: "front",
    svgPath: "M 72,126 Q 64,130 62,148 Q 62,162 72,166 L 88,166 L 88,130 Z M 128,126 Q 136,130 138,148 Q 138,162 128,166 L 112,166 L 112,130 Z",
    center: { x: 74, y: 148 },
  },
  {
    id: "serratus-anterior",
    name: "Serratus Anterior",
    aliases: ["Serratus Anterior", "Serratus"],
    view: "front",
    svgPath: "M 68,118 Q 60,122 62,136 Q 64,142 72,140 Q 78,136 76,124 Z M 132,118 Q 140,122 138,136 Q 136,142 128,140 Q 122,136 124,124 Z",
    center: { x: 69, y: 130 },
  },
  {
    id: "hip-flexors",
    name: "Hip Flexors",
    aliases: ["Hip Flexors", "Iliopsoas", "Iliacus", "Psoas"],
    view: "front",
    svgPath: "M 80,172 Q 74,174 72,184 Q 72,192 82,194 Q 90,192 92,182 Q 92,174 86,172 Z M 120,172 Q 126,174 128,184 Q 128,192 118,194 Q 110,192 108,182 Q 108,174 114,172 Z",
    center: { x: 82, y: 183 },
  },
  {
    id: "quadriceps",
    name: "Quadriceps",
    aliases: ["Quadriceps", "Quads", "Rectus Femoris", "Vastus Lateralis", "Vastus Medialis", "VMO"],
    view: "front",
    svgPath: "M 72,198 Q 64,202 62,228 Q 62,252 72,258 Q 82,260 86,248 Q 90,236 88,214 Q 86,202 80,198 Z M 128,198 Q 136,202 138,228 Q 138,252 128,258 Q 118,260 114,248 Q 110,236 112,214 Q 114,202 120,198 Z",
    center: { x: 74, y: 228 },
  },
  {
    id: "tibialis-anterior",
    name: "Tibialis Anterior",
    aliases: ["Tibialis Anterior", "Shins"],
    view: "front",
    svgPath: "M 68,272 Q 62,276 62,296 Q 62,310 68,314 Q 74,316 76,306 Q 78,294 76,278 Z M 132,272 Q 138,276 138,296 Q 138,310 132,314 Q 126,316 124,306 Q 122,294 124,278 Z",
    center: { x: 69, y: 293 },
  },
  {
    id: "forearm-flexors",
    name: "Forearm Flexors",
    aliases: ["Forearm Flexors", "Forearms", "Wrist Flexors"],
    view: "front",
    svgPath: "M 40,152 Q 36,156 36,170 Q 36,180 40,182 Q 46,182 48,172 Q 50,162 48,154 Z M 160,152 Q 164,156 164,170 Q 164,180 160,182 Q 154,182 152,172 Q 150,162 152,154 Z",
    center: { x: 41, y: 167 },
  },
  {
    id: "adductors",
    name: "Adductors",
    aliases: ["Adductors", "Inner Thigh", "Groin"],
    view: "front",
    svgPath: "M 88,200 Q 84,212 86,232 Q 88,248 92,254 Q 98,258 100,250 Q 100,232 96,212 Q 92,202 88,200 Z M 112,200 Q 116,212 114,232 Q 112,248 108,254 Q 102,258 100,250 Q 100,232 104,212 Q 108,202 112,200 Z",
    center: { x: 100, y: 228 },
  },

  // ── BACK VIEW ──────────────────────────────────────────────────────────────
  {
    id: "posterior-deltoid",
    name: "Posterior Deltoid",
    aliases: ["Posterior Deltoid", "Rear Delt", "Deltoid Complex", "Deltoids", "shoulders"],
    view: "back",
    svgPath: "M 62,92 Q 50,88 46,100 Q 44,110 54,114 Q 62,116 66,108 Z M 138,92 Q 150,88 154,100 Q 156,110 146,114 Q 138,116 134,108 Z",
    center: { x: 55, y: 103 },
  },
  {
    id: "trapezius",
    name: "Trapezius",
    aliases: ["Trapezius", "Traps", "Upper Trapezius", "Middle Trapezius", "Lower Trapezius"],
    view: "back",
    svgPath: "M 80,72 Q 68,76 62,86 Q 58,96 66,102 Q 80,108 100,108 Q 120,108 134,102 Q 142,96 138,86 Q 132,76 120,72 Z",
    center: { x: 100, y: 90 },
  },
  {
    id: "rhomboids",
    name: "Rhomboids",
    aliases: ["Rhomboids", "Rhomboid Major", "Rhomboid Minor", "Upper Back"],
    view: "back",
    svgPath: "M 78,112 Q 72,114 70,122 Q 70,130 80,132 Q 90,132 100,130 Q 110,132 120,132 Q 130,130 130,122 Q 130,114 122,112 Z",
    center: { x: 100, y: 122 },
  },
  {
    id: "latissimus-dorsi",
    name: "Latissimus Dorsi",
    aliases: ["Latissimus Dorsi", "Lats", "Back", "Lat", "Core Stabilizers"],
    view: "back",
    svgPath: "M 66,106 Q 58,112 58,134 Q 60,154 70,162 Q 82,168 88,160 Q 92,148 88,130 Q 84,114 76,108 Z M 134,106 Q 142,112 142,134 Q 140,154 130,162 Q 118,168 112,160 Q 108,148 112,130 Q 116,114 124,108 Z",
    center: { x: 67, y: 138 },
  },
  {
    id: "erector-spinae",
    name: "Erector Spinae",
    aliases: ["Erector Spinae", "Spinal Erectors", "Lower Back", "Deep Spinal Stabilizers", "Multifidus", "Deep Core"],
    view: "back",
    svgPath: "M 90,136 Q 86,140 86,162 Q 86,176 92,180 Q 98,182 100,178 Q 102,182 108,180 Q 114,176 114,162 Q 114,140 110,136 Z",
    center: { x: 100, y: 158 },
  },
  {
    id: "triceps-brachii",
    name: "Triceps Brachii",
    aliases: ["Triceps Brachii", "Triceps", "Tricep"],
    view: "back",
    svgPath: "M 50,116 Q 44,120 42,132 Q 40,144 46,148 Q 52,150 56,142 Q 58,132 56,120 Z M 150,116 Q 156,120 158,132 Q 160,144 154,148 Q 148,150 144,142 Q 142,132 144,120 Z",
    center: { x: 49, y: 133 },
  },
  {
    id: "infraspinatus",
    name: "Infraspinatus / Rotator Cuff",
    aliases: ["Infraspinatus", "Rotator Cuff", "Rotator Cuff Complex", "Infraspinatus/Rotator Cuff"],
    view: "back",
    svgPath: "M 66,104 Q 58,106 56,116 Q 56,126 64,128 Q 74,128 78,120 Q 80,112 74,106 Z M 134,104 Q 142,106 144,116 Q 144,126 136,128 Q 126,128 122,120 Q 120,112 126,106 Z",
    center: { x: 67, y: 116 },
  },
  {
    id: "gluteus-maximus",
    name: "Gluteus Maximus",
    aliases: ["Gluteus Maximus", "Glutes", "Glute", "Butt", "Posterior Chain"],
    view: "back",
    svgPath: "M 70,186 Q 62,190 60,206 Q 60,222 70,228 Q 82,232 92,224 Q 100,218 100,204 Q 100,190 90,186 Z M 130,186 Q 138,190 140,206 Q 140,222 130,228 Q 118,232 108,224 Q 100,218 100,204 Q 100,190 110,186 Z",
    center: { x: 75, y: 207 },
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    aliases: ["Hamstrings", "Biceps Femoris", "Semitendinosus", "Semimembranosus", "Posterior Chain"],
    view: "back",
    svgPath: "M 68,232 Q 60,238 60,262 Q 60,280 70,284 Q 80,286 86,274 Q 90,260 88,240 Q 84,232 76,230 Z M 132,232 Q 140,238 140,262 Q 140,280 130,284 Q 120,286 114,274 Q 110,260 112,240 Q 116,232 124,230 Z",
    center: { x: 72, y: 258 },
  },
  {
    id: "gastrocnemius",
    name: "Gastrocnemius / Calves",
    aliases: ["Gastrocnemius", "Calves", "Calf", "Soleus", "Gastrocnemius/Calves"],
    view: "back",
    svgPath: "M 66,288 Q 60,294 60,314 Q 60,328 68,332 Q 76,334 80,322 Q 82,308 80,294 Q 76,286 70,286 Z M 134,288 Q 140,294 140,314 Q 140,328 132,332 Q 124,334 120,322 Q 118,308 120,294 Q 124,286 130,286 Z",
    center: { x: 70, y: 310 },
  },
  {
    id: "forearm-extensors",
    name: "Forearm Extensors",
    aliases: ["Forearm Extensors", "Forearms", "Wrist Extensors", "Forearm Flexors/Extensors"],
    view: "back",
    svgPath: "M 40,152 Q 36,156 36,170 Q 36,180 40,182 Q 46,182 48,172 Q 50,162 48,154 Z M 160,152 Q 164,156 164,170 Q 164,180 160,182 Q 154,182 152,172 Q 150,162 152,154 Z",
    center: { x: 41, y: 167 },
  },
];

export type MuscleRole = 'primary' | 'secondary' | 'stabilizer' | 'none';

export interface MuscleHighlight {
  muscleId: string;
  role: MuscleRole;
}

/**
 * Match exercise muscle names to muscle region IDs using aliases.
 */
export function matchMusclesToRegions(
  primary: string[],
  secondary: string[],
  stabilizers: string[]
): MuscleHighlight[] {
  const highlights: MuscleHighlight[] = [];

  const findRegionId = (muscleName: string): string | undefined => {
    const lower = muscleName.toLowerCase();
    return muscleRegions.find((r) =>
      r.aliases.some((alias) => alias.toLowerCase() === lower) ||
      r.name.toLowerCase().includes(lower) ||
      lower.includes(r.name.toLowerCase())
    )?.id;
  };

  const addHighlight = (names: string[], role: MuscleRole) => {
    for (const name of names) {
      const id = findRegionId(name);
      if (id && !highlights.some((h) => h.muscleId === id)) {
        highlights.push({ muscleId: id, role });
      }
    }
  };

  addHighlight(primary, 'primary');
  addHighlight(secondary, 'secondary');
  addHighlight(stabilizers, 'stabilizer');

  return highlights;
}
