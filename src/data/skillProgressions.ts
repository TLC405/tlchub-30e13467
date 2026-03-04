export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';

export interface ProgressionStep {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  sets: string;
  reps: string;
  restTime: string;
  holdTime?: string;
  formCues: string[];
  commonMistakes: string[];
  prerequisites: string[];
  nextProgression?: string;
  musclesWorked: {
    primary: string[];
    secondary: string[];
  };
  estimatedWeeksToMaster: number;
  videoUrl?: string;
  videoSource?: string;
}

export interface SkillTree {
  id: string;
  name: string;
  category: 'push' | 'pull' | 'core' | 'legs' | 'skill';
  description: string;
  eliteGoal: string;
  icon: string;
  color: string;
  progressions: ProgressionStep[];
}

export const skillProgressions: SkillTree[] = [
  // ===============================
  // PUSH-UP TO PLANCHE PROGRESSION
  // ===============================
  {
    id: 'planche-progression',
    name: 'Planche Mastery',
    category: 'push',
    description: 'From basic push-ups to the ultimate pushing strength skill',
    eliteGoal: 'Full Planche Hold (10+ seconds)',
    icon: 'Dumbbell',
    color: 'orange',
    progressions: [
      {
        id: 'wall-pushup',
        name: 'Wall Push-Up',
        description: 'Standing push-up against a wall. Perfect for building initial pushing strength and form.',
        level: 'beginner',
        sets: '3',
        reps: '15-20',
        restTime: '60s',
        formCues: [
          'Hands shoulder-width apart on wall',
          'Body straight from head to heels',
          'Lower chest to wall with control',
          'Full arm extension at top'
        ],
        commonMistakes: [
          'Sagging hips',
          'Flaring elbows too wide',
          'Not going full range'
        ],
        prerequisites: [],
        nextProgression: 'incline-pushup',
        musclesWorked: {
          primary: ['Chest', 'Triceps', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 1
      },
      {
        id: 'incline-pushup',
        name: 'Incline Push-Up',
        description: 'Push-up with hands elevated on a bench or step. Increases difficulty progressively.',
        level: 'beginner',
        sets: '3',
        reps: '12-15',
        restTime: '60s',
        formCues: [
          'Hands on elevated surface',
          'Body in straight line',
          'Lower chest to surface',
          'Squeeze chest at top'
        ],
        commonMistakes: [
          'Lifting hips too high',
          'Dropping head forward',
          'Partial range of motion'
        ],
        prerequisites: ['wall-pushup'],
        nextProgression: 'knee-pushup',
        musclesWorked: {
          primary: ['Chest', 'Triceps', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'knee-pushup',
        name: 'Knee Push-Up',
        description: 'Full push-up motion with knees on ground. Builds strength for standard push-ups.',
        level: 'beginner',
        sets: '3',
        reps: '12-15',
        restTime: '60s',
        formCues: [
          'Knees on ground, ankles crossed',
          'Straight line from knees to head',
          'Lower chest to ground',
          'Full lockout at top'
        ],
        commonMistakes: [
          'Hips too high or too low',
          'Not touching chest to ground',
          'Elbows flaring 90 degrees'
        ],
        prerequisites: ['incline-pushup'],
        nextProgression: 'standard-pushup',
        musclesWorked: {
          primary: ['Chest', 'Triceps', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'standard-pushup',
        name: 'Standard Push-Up',
        description: 'The classic push-up. Foundation for all advanced pushing movements.',
        level: 'beginner',
        sets: '3-4',
        reps: '10-15',
        restTime: '90s',
        formCues: [
          'Hands slightly wider than shoulders',
          'Body straight from head to heels',
          'Lower until chest touches ground',
          'Elbows at 45-degree angle'
        ],
        commonMistakes: [
          'Sagging lower back',
          'Flaring elbows to 90 degrees',
          'Incomplete range of motion'
        ],
        prerequisites: ['knee-pushup'],
        nextProgression: 'diamond-pushup',
        musclesWorked: {
          primary: ['Chest', 'Triceps', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior', 'Rhomboids']
        },
        estimatedWeeksToMaster: 3
      },
      {
        id: 'diamond-pushup',
        name: 'Diamond Push-Up',
        description: 'Close-grip push-up with hands forming diamond shape. Emphasizes triceps.',
        level: 'intermediate',
        sets: '3',
        reps: '8-12',
        restTime: '90s',
        formCues: [
          'Hands together forming diamond under chest',
          'Elbows track close to body',
          'Lower chest to hands',
          'Full extension at top'
        ],
        commonMistakes: [
          'Elbows flaring out',
          'Hands too far forward',
          'Incomplete depth'
        ],
        prerequisites: ['standard-pushup'],
        nextProgression: 'archer-pushup',
        musclesWorked: {
          primary: ['Triceps', 'Chest', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 3
      },
      {
        id: 'archer-pushup',
        name: 'Archer Push-Up',
        description: 'Wide stance push-up with weight shifting to one arm. Builds unilateral strength.',
        level: 'intermediate',
        sets: '3',
        reps: '5-8 each side',
        restTime: '120s',
        formCues: [
          'Very wide hand placement',
          'Shift weight to working arm',
          'Assistance arm stays straight',
          'Full depth on working side'
        ],
        commonMistakes: [
          'Bending the assistance arm',
          'Not shifting weight fully',
          'Rotating torso'
        ],
        prerequisites: ['diamond-pushup'],
        nextProgression: 'pseudo-planche-pushup',
        musclesWorked: {
          primary: ['Chest', 'Triceps', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior', 'Obliques']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'pseudo-planche-pushup',
        name: 'Pseudo Planche Push-Up',
        description: 'Push-up with hands positioned low by hips and leaning forward. Planche preparation.',
        level: 'intermediate',
        sets: '3',
        reps: '8-12',
        restTime: '120s',
        formCues: [
          'Hands by waist/hips, fingers forward or out',
          'Lean shoulders past hands',
          'Hollow body position',
          'Protract shoulders at top'
        ],
        commonMistakes: [
          'Hands too far forward',
          'Not leaning enough',
          'Breaking hollow position'
        ],
        prerequisites: ['archer-pushup'],
        nextProgression: 'planche-lean',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Chest', 'Triceps'],
          secondary: ['Core', 'Serratus Anterior', 'Biceps (isometric)']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'planche-lean',
        name: 'Planche Lean',
        description: 'Static hold leaning forward with straight arms. Develops planche-specific strength.',
        level: 'intermediate',
        sets: '5',
        reps: '15-30s holds',
        restTime: '120s',
        holdTime: '15-30s',
        formCues: [
          'Hands by hips or lower',
          'Lean forward as far as possible',
          'Straight arms, locked elbows',
          'Protracted scapula, hollow body'
        ],
        commonMistakes: [
          'Bending elbows',
          'Rounding upper back',
          'Not leaning far enough'
        ],
        prerequisites: ['pseudo-planche-pushup'],
        nextProgression: 'frog-stand',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Serratus Anterior', 'Core'],
          secondary: ['Chest', 'Triceps', 'Wrist Flexors']
        },
        estimatedWeeksToMaster: 8,
        videoUrl: 'https://www.youtube.com/watch?v=tMyO7id-lKM',
        videoSource: 'Tom Merrick'
      },
      {
        id: 'frog-stand',
        name: 'Frog Stand / Crow Pose',
        description: 'Balance on hands with knees resting on triceps. Develops balance and wrist strength.',
        level: 'intermediate',
        sets: '5',
        reps: '20-30s holds',
        restTime: '90s',
        holdTime: '20-30s',
        formCues: [
          'Hands shoulder-width, fingers spread',
          'Knees on outside of triceps',
          'Lean forward until feet lift',
          'Look slightly forward'
        ],
        commonMistakes: [
          'Not leaning forward enough',
          'Hands too close together',
          'Collapsing at shoulders'
        ],
        prerequisites: ['planche-lean'],
        nextProgression: 'tuck-planche',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Core', 'Wrist Flexors'],
          secondary: ['Triceps', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'tuck-planche',
        name: 'Tuck Planche',
        description: 'Planche with knees tucked to chest. First true planche position.',
        level: 'advanced',
        sets: '5-6',
        reps: '5-10s holds',
        restTime: '180s',
        holdTime: '5-10s',
        formCues: [
          'Straight arms, locked elbows',
          'Knees tight to chest',
          'Hips at shoulder height',
          'Protracted shoulders, hollow back'
        ],
        commonMistakes: [
          'Hips too low',
          'Bending elbows',
          'Knees not tucked tight'
        ],
        prerequisites: ['frog-stand', 'planche-lean'],
        nextProgression: 'advanced-tuck-planche',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Serratus Anterior', 'Core'],
          secondary: ['Chest', 'Triceps', 'Biceps Tendon']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'advanced-tuck-planche',
        name: 'Advanced Tuck Planche',
        description: 'Tuck planche with back parallel to ground and knees away from chest.',
        level: 'advanced',
        sets: '5-6',
        reps: '5-10s holds',
        restTime: '180s',
        holdTime: '5-10s',
        formCues: [
          'Back completely horizontal',
          'Knees away from chest',
          'Hips at shoulder level',
          'Maximum protraction'
        ],
        commonMistakes: [
          'Back not horizontal',
          'Knees still touching chest',
          'Hips dropping'
        ],
        prerequisites: ['tuck-planche'],
        nextProgression: 'straddle-planche',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Serratus Anterior', 'Core'],
          secondary: ['Chest', 'Triceps', 'Lower Back']
        },
        estimatedWeeksToMaster: 16
      },
      {
        id: 'straddle-planche',
        name: 'Straddle Planche',
        description: 'Planche with legs extended in straddle position. Near-elite level skill.',
        level: 'advanced',
        sets: '5-6',
        reps: '3-8s holds',
        restTime: '240s',
        holdTime: '3-8s',
        formCues: [
          'Legs extended wide in straddle',
          'Body completely horizontal',
          'Straight arms, locked elbows',
          'Point toes, engage glutes'
        ],
        commonMistakes: [
          'Legs not wide enough',
          'Piking at hips',
          'Bending elbows'
        ],
        prerequisites: ['advanced-tuck-planche'],
        nextProgression: 'full-planche',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Serratus Anterior', 'Core', 'Hip Flexors'],
          secondary: ['Chest', 'Triceps', 'Glutes', 'Adductors']
        },
        estimatedWeeksToMaster: 24
      },
      {
        id: 'full-planche',
        name: 'Full Planche',
        description: 'The ultimate pushing skill. Body horizontal with legs together and straight.',
        level: 'elite',
        sets: '6-8',
        reps: '3-10s holds',
        restTime: '300s',
        holdTime: '3-10s',
        formCues: [
          'Body perfectly horizontal',
          'Legs together and straight',
          'Straight arms, protracted shoulders',
          'Point toes, squeeze glutes'
        ],
        commonMistakes: [
          'Any pike at hips',
          'Bending elbows',
          'Not fully horizontal'
        ],
        prerequisites: ['straddle-planche'],
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Serratus Anterior', 'Core', 'Hip Flexors'],
          secondary: ['Chest', 'Triceps', 'Glutes', 'Full Body Tension']
        },
        estimatedWeeksToMaster: 52
      }
    ]
  },

  // ===============================
  // PULL-UP TO ONE ARM PULL-UP
  // ===============================
  {
    id: 'pullup-progression',
    name: 'Pull-Up Mastery',
    category: 'pull',
    description: 'From dead hang to one-arm pull-up dominance',
    eliteGoal: 'One Arm Pull-Up (clean form)',
    icon: 'ArrowUp',
    color: 'blue',
    progressions: [
      {
        id: 'dead-hang',
        name: 'Dead Hang',
        description: 'Passive hang from bar. Builds grip strength and shoulder mobility.',
        level: 'beginner',
        sets: '3',
        reps: '20-60s',
        restTime: '60s',
        holdTime: '20-60s',
        formCues: [
          'Full grip on bar',
          'Shoulders relaxed, ears away from shoulders',
          'Body still, no swinging',
          'Breathe normally'
        ],
        commonMistakes: [
          'Shrugging shoulders',
          'Swinging or kipping',
          'Holding breath'
        ],
        prerequisites: [],
        nextProgression: 'active-hang',
        musclesWorked: {
          primary: ['Forearms', 'Grip'],
          secondary: ['Lats', 'Shoulders']
        },
        estimatedWeeksToMaster: 1
      },
      {
        id: 'active-hang',
        name: 'Active Hang (Scapular Pull)',
        description: 'Hang with shoulders engaged. Activates back muscles.',
        level: 'beginner',
        sets: '3',
        reps: '10-15',
        restTime: '60s',
        formCues: [
          'Start from dead hang',
          'Pull shoulders down and back',
          'Chest rises slightly',
          'Arms stay straight'
        ],
        commonMistakes: [
          'Bending elbows',
          'Not fully releasing between reps',
          'Using momentum'
        ],
        prerequisites: ['dead-hang'],
        nextProgression: 'australian-pullup',
        musclesWorked: {
          primary: ['Lower Trapezius', 'Rhomboids', 'Lats'],
          secondary: ['Rear Deltoid', 'Grip']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'australian-pullup',
        name: 'Australian Pull-Up (Inverted Row)',
        description: 'Horizontal pulling with feet on ground. Develops pulling strength.',
        level: 'beginner',
        sets: '3',
        reps: '10-15',
        restTime: '90s',
        formCues: [
          'Body in straight line',
          'Pull chest to bar',
          'Elbows at 45 degrees',
          'Squeeze shoulder blades together'
        ],
        commonMistakes: [
          'Sagging hips',
          'Not pulling high enough',
          'Using hip thrust'
        ],
        prerequisites: ['active-hang'],
        nextProgression: 'negative-pullup',
        musclesWorked: {
          primary: ['Lats', 'Rhomboids', 'Rear Deltoid'],
          secondary: ['Biceps', 'Core', 'Forearms']
        },
        estimatedWeeksToMaster: 3
      },
      {
        id: 'negative-pullup',
        name: 'Negative Pull-Up',
        description: 'Controlled lowering from top of pull-up. Builds eccentric strength.',
        level: 'beginner',
        sets: '3',
        reps: '5-8',
        restTime: '120s',
        formCues: [
          'Jump or step to top position',
          'Lower for 5-10 seconds',
          'Control entire descent',
          'Full extension at bottom'
        ],
        commonMistakes: [
          'Dropping too fast',
          'Not starting from full chin over bar',
          'Inconsistent tempo'
        ],
        prerequisites: ['australian-pullup'],
        nextProgression: 'band-assisted-pullup',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Rhomboids', 'Core', 'Forearms']
        },
        estimatedWeeksToMaster: 3
      },
      {
        id: 'band-assisted-pullup',
        name: 'Band-Assisted Pull-Up',
        description: 'Full pull-up with band assistance. Progressive overload toward unassisted.',
        level: 'beginner',
        sets: '3-4',
        reps: '8-12',
        restTime: '120s',
        formCues: [
          'Loop band under feet or knees',
          'Full range of motion',
          'Chin over bar at top',
          'Full extension at bottom'
        ],
        commonMistakes: [
          'Using too heavy a band',
          'Kipping or swinging',
          'Partial range of motion'
        ],
        prerequisites: ['negative-pullup'],
        nextProgression: 'standard-pullup',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Rhomboids', 'Core', 'Forearms']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'standard-pullup',
        name: 'Standard Pull-Up',
        description: 'The classic pull-up. Foundation for all advanced pulling movements.',
        level: 'intermediate',
        sets: '3-4',
        reps: '5-10',
        restTime: '120s',
        formCues: [
          'Overhand grip, slightly wider than shoulders',
          'Dead hang start, active hang initiate',
          'Pull until chin clears bar',
          'Controlled descent'
        ],
        commonMistakes: [
          'Kipping or swinging',
          'Chin not clearing bar',
          'Partial range at bottom'
        ],
        prerequisites: ['band-assisted-pullup'],
        nextProgression: 'chest-to-bar-pullup',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Rhomboids', 'Core', 'Forearms', 'Trapezius']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'chest-to-bar-pullup',
        name: 'Chest-to-Bar Pull-Up',
        description: 'High pull-up with chest touching bar. Increases pulling power.',
        level: 'intermediate',
        sets: '3-4',
        reps: '5-8',
        restTime: '120s',
        formCues: [
          'Pull until chest touches bar',
          'Lead with chest, not chin',
          'Slight lean back at top',
          'Full control throughout'
        ],
        commonMistakes: [
          'Only touching with neck',
          'Excessive kip',
          'Not pulling high enough'
        ],
        prerequisites: ['standard-pullup'],
        nextProgression: 'typewriter-pullup',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid', 'Rhomboids'],
          secondary: ['Core', 'Forearms', 'Trapezius']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'typewriter-pullup',
        name: 'Typewriter Pull-Up',
        description: 'Pull up then move side to side at top. Develops unilateral strength.',
        level: 'intermediate',
        sets: '3',
        reps: '4-6 each direction',
        restTime: '150s',
        formCues: [
          'Pull to chest-to-bar height',
          'Shift weight to one side',
          'Slide across maintaining height',
          'Keep one arm straight while other bent'
        ],
        commonMistakes: [
          'Dropping height during transition',
          'Not shifting weight fully',
          'Rushing the movement'
        ],
        prerequisites: ['chest-to-bar-pullup'],
        nextProgression: 'archer-pullup',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Core', 'Obliques', 'Forearms']
        },
        estimatedWeeksToMaster: 8
      },
      {
        id: 'archer-pullup',
        name: 'Archer Pull-Up',
        description: 'Wide grip pull-up shifting weight to one arm. Pre-one-arm work.',
        level: 'advanced',
        sets: '3-4',
        reps: '4-6 each side',
        restTime: '180s',
        formCues: [
          'Very wide grip',
          'Pull toward one hand',
          'Assistance arm stays straight',
          'Full range on working side'
        ],
        commonMistakes: [
          'Bending assistance arm',
          'Not pulling high enough',
          'Uneven descent'
        ],
        prerequisites: ['typewriter-pullup'],
        nextProgression: 'weighted-pullup',
        musclesWorked: {
          primary: ['Unilateral Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Core', 'Obliques', 'Grip']
        },
        estimatedWeeksToMaster: 10
      },
      {
        id: 'weighted-pullup',
        name: 'Weighted Pull-Up',
        description: 'Pull-up with added weight. Builds maximal pulling strength.',
        level: 'advanced',
        sets: '4-5',
        reps: '3-6',
        restTime: '180s',
        formCues: [
          'Add weight via belt or vest',
          'Maintain perfect form',
          'Full range of motion',
          'Progress weight gradually'
        ],
        commonMistakes: [
          'Adding too much weight too fast',
          'Sacrificing form for weight',
          'Partial range of motion'
        ],
        prerequisites: ['archer-pullup'],
        nextProgression: 'one-arm-negative',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid', 'Rhomboids'],
          secondary: ['Core', 'Forearms', 'Trapezius']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'one-arm-negative',
        name: 'One Arm Negative',
        description: 'Controlled one-arm lowering. Essential eccentric preparation.',
        level: 'advanced',
        sets: '3-4',
        reps: '2-4 each arm',
        restTime: '240s',
        formCues: [
          'Jump or pull to top with two arms',
          'Release one arm and lower slowly',
          'Control entire 10+ second descent',
          'Full extension at bottom'
        ],
        commonMistakes: [
          'Dropping too fast',
          'Excessive rotation',
          'Starting from half position'
        ],
        prerequisites: ['weighted-pullup'],
        nextProgression: 'assisted-one-arm-pullup',
        musclesWorked: {
          primary: ['Unilateral Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Core', 'Obliques', 'Grip']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'assisted-one-arm-pullup',
        name: 'Assisted One-Arm Pull-Up',
        description: 'One arm pull-up with minimal assistance from other hand.',
        level: 'advanced',
        sets: '4-5',
        reps: '2-4 each arm',
        restTime: '300s',
        formCues: [
          'Main arm on bar, assist hand on wrist/forearm',
          'Use minimal assistance',
          'Full range of motion',
          'Control descent'
        ],
        commonMistakes: [
          'Too much assistance',
          'Not progressing assistance position',
          'Inconsistent form'
        ],
        prerequisites: ['one-arm-negative'],
        nextProgression: 'one-arm-pullup',
        musclesWorked: {
          primary: ['Unilateral Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Core', 'Obliques', 'Grip']
        },
        estimatedWeeksToMaster: 16
      },
      {
        id: 'one-arm-pullup',
        name: 'One Arm Pull-Up',
        description: 'The ultimate pulling achievement. Full pull-up with one arm.',
        level: 'elite',
        sets: '5-6',
        reps: '1-3 each arm',
        restTime: '300s',
        formCues: [
          'Dead hang start',
          'Pull with zero assistance',
          'Chin over bar',
          'Controlled descent'
        ],
        commonMistakes: [
          'Kipping',
          'Not full range',
          'Excessive rotation'
        ],
        prerequisites: ['assisted-one-arm-pullup'],
        musclesWorked: {
          primary: ['Lats (unilateral)', 'Biceps', 'Rear Deltoid'],
          secondary: ['Core', 'Obliques', 'Grip', 'Full Body Tension']
        },
        estimatedWeeksToMaster: 52
      }
    ]
  },

  // ===============================
  // HANDSTAND PROGRESSION
  // ===============================
  {
    id: 'handstand-progression',
    name: 'Handstand Mastery',
    category: 'skill',
    description: 'From wall support to freestanding one-arm handstand',
    eliteGoal: 'One Arm Handstand (30+ seconds)',
    icon: 'Zap',
    color: 'purple',
    progressions: [
      {
        id: 'wrist-prep',
        name: 'Wrist Prep & Conditioning',
        description: 'Essential wrist mobility and strength work before any handstand training.',
        level: 'beginner',
        sets: '2-3',
        reps: '10-15 each direction',
        restTime: '30s',
        formCues: [
          'Wrist circles in both directions',
          'Fingers forward rocks, fingers back rocks',
          'Prayer stretch and reverse prayer',
          'Knuckle push-ups for strength'
        ],
        commonMistakes: [
          'Skipping wrist warmup',
          'Rushing through movements',
          'Ignoring pain signals'
        ],
        prerequisites: [],
        nextProgression: 'wall-plank',
        musclesWorked: {
          primary: ['Wrist Flexors', 'Wrist Extensors'],
          secondary: ['Forearms']
        },
        estimatedWeeksToMaster: 1
      },
      {
        id: 'wall-plank',
        name: 'Wall Plank Hold',
        description: 'Feet on wall in plank position, gradually walking feet higher.',
        level: 'beginner',
        sets: '3',
        reps: '30-60s holds',
        restTime: '90s',
        holdTime: '30-60s',
        formCues: [
          'Start in plank with feet on wall',
          'Walk feet up wall gradually',
          'Keep arms straight',
          'Hollow body position'
        ],
        commonMistakes: [
          'Arching lower back',
          'Going too high too fast',
          'Not engaging core'
        ],
        prerequisites: ['wrist-prep'],
        nextProgression: 'chest-to-wall-handstand',
        musclesWorked: {
          primary: ['Shoulders', 'Core'],
          secondary: ['Triceps', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'chest-to-wall-handstand',
        name: 'Chest-to-Wall Handstand',
        description: 'Handstand facing wall. Develops proper line and shoulder position.',
        level: 'beginner',
        sets: '4-5',
        reps: '30-60s holds',
        restTime: '120s',
        holdTime: '30-60s',
        formCues: [
          'Walk feet up wall until vertical',
          'Chest and nose near wall',
          'Arms straight, shoulders elevated',
          'Hollow body, toes pointed'
        ],
        commonMistakes: [
          'Banana back position',
          'Shoulders not over hands',
          'Looking at ground instead of wall'
        ],
        prerequisites: ['wall-plank'],
        nextProgression: 'back-to-wall-handstand',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Upper Trapezius', 'Core'],
          secondary: ['Triceps', 'Serratus Anterior', 'Forearms']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'back-to-wall-handstand',
        name: 'Back-to-Wall Handstand',
        description: 'Handstand with back to wall, kick-up entry. Develops kick-up control.',
        level: 'beginner',
        sets: '5-8',
        reps: '20-40s holds',
        restTime: '120s',
        holdTime: '20-40s',
        formCues: [
          'Kick up with control',
          'Heels light on wall',
          'Practice taking feet off wall',
          'Find balance point'
        ],
        commonMistakes: [
          'Kicking too hard',
          'Relying too much on wall',
          'Not practicing float attempts'
        ],
        prerequisites: ['chest-to-wall-handstand'],
        nextProgression: 'wall-handstand-shoulder-taps',
        musclesWorked: {
          primary: ['Anterior Deltoid', 'Core', 'Hip Flexors'],
          secondary: ['Triceps', 'Upper Trapezius']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'wall-handstand-shoulder-taps',
        name: 'Wall Handstand Shoulder Taps',
        description: 'Shoulder taps while in wall handstand. Builds stability.',
        level: 'intermediate',
        sets: '3-4',
        reps: '8-12 taps total',
        restTime: '120s',
        formCues: [
          'Shift weight to one arm',
          'Light tap opposite shoulder',
          'Keep hips square',
          'Minimize body movement'
        ],
        commonMistakes: [
          'Excessive hip shift',
          'Resting hand on shoulder too long',
          'Losing hollow position'
        ],
        prerequisites: ['back-to-wall-handstand'],
        nextProgression: 'freestanding-kickup-attempts',
        musclesWorked: {
          primary: ['Unilateral Shoulder Stability', 'Core', 'Obliques'],
          secondary: ['Triceps', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'freestanding-kickup-attempts',
        name: 'Freestanding Kick-Up Attempts',
        description: 'Practice kicking to handstand away from wall with bail strategy.',
        level: 'intermediate',
        sets: '10-15',
        reps: '1-5s attempts',
        restTime: '60s',
        formCues: [
          'Practice pirouette bail',
          'Kick with control, not power',
          'Find the balance point',
          'Arms locked, shoulders elevated'
        ],
        commonMistakes: [
          'Kicking too hard',
          'No consistent bail strategy',
          'Fear of falling'
        ],
        prerequisites: ['wall-handstand-shoulder-taps'],
        nextProgression: 'freestanding-handstand',
        musclesWorked: {
          primary: ['Full Shoulder Complex', 'Core', 'Hip Flexors'],
          secondary: ['Wrists', 'Forearms']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'freestanding-handstand',
        name: 'Freestanding Handstand',
        description: 'Unsupported handstand hold. Major milestone.',
        level: 'intermediate',
        sets: '10-15',
        reps: '5-30s holds',
        restTime: '60s',
        holdTime: '5-30s',
        formCues: [
          'Consistent kick-up entry',
          'Balance through fingers and wrists',
          'Straight line from wrists to toes',
          'Breathe and stay calm'
        ],
        commonMistakes: [
          'Over-correcting balance',
          'Tension throughout body',
          'Inconsistent entry'
        ],
        prerequisites: ['freestanding-kickup-attempts'],
        nextProgression: 'handstand-walking',
        musclesWorked: {
          primary: ['Full Shoulder Complex', 'Core', 'Forearms'],
          secondary: ['Full Body Tension', 'Proprioception']
        },
        estimatedWeeksToMaster: 24
      },
      {
        id: 'handstand-walking',
        name: 'Handstand Walking',
        description: 'Walking on hands. Dynamic balance and coordination.',
        level: 'advanced',
        sets: '5-10',
        reps: '10-50 steps',
        restTime: '90s',
        formCues: [
          'Lean slightly forward',
          'Small, controlled steps',
          'Maintain straight line',
          'Look between hands'
        ],
        commonMistakes: [
          'Too large steps',
          'Losing straight line',
          'Panicking when off balance'
        ],
        prerequisites: ['freestanding-handstand'],
        nextProgression: 'press-to-handstand',
        musclesWorked: {
          primary: ['Shoulders', 'Core', 'Wrists'],
          secondary: ['Full Body Coordination']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'press-to-handstand',
        name: 'Press to Handstand',
        description: 'Pressing from ground to handstand with control. Strength + balance.',
        level: 'advanced',
        sets: '5-8',
        reps: '3-8',
        restTime: '180s',
        formCues: [
          'Straddle or pike starting position',
          'Lean shoulders past hands',
          'Press through floor',
          'Stack body segment by segment'
        ],
        commonMistakes: [
          'Not leaning forward enough',
          'Jumping instead of pressing',
          'Rushing the movement'
        ],
        prerequisites: ['freestanding-handstand'],
        nextProgression: 'one-arm-handstand-prep',
        musclesWorked: {
          primary: ['Shoulders', 'Core', 'Hip Flexors'],
          secondary: ['Hamstrings (flexibility)', 'Triceps']
        },
        estimatedWeeksToMaster: 24
      },
      {
        id: 'one-arm-handstand-prep',
        name: 'One Arm Handstand Prep',
        description: 'Weight shifting, finger lifts, and straddle holds for OAHS.',
        level: 'advanced',
        sets: '5-8',
        reps: 'Various drills',
        restTime: '120s',
        formCues: [
          'Practice weight shifts in handstand',
          'Lift fingers on light side',
          'Straddle for easier balance',
          'Build time on fingertips only'
        ],
        commonMistakes: [
          'Rushing to one arm',
          'Not enough two-arm volume',
          'Poor alignment before shifting'
        ],
        prerequisites: ['press-to-handstand', 'handstand-walking'],
        nextProgression: 'one-arm-handstand',
        musclesWorked: {
          primary: ['Unilateral Shoulder', 'Core', 'Obliques'],
          secondary: ['Wrist Stabilizers', 'Full Body Tension']
        },
        estimatedWeeksToMaster: 24
      },
      {
        id: 'one-arm-handstand',
        name: 'One Arm Handstand',
        description: 'The ultimate handstand skill. Complete balance on one arm.',
        level: 'elite',
        sets: '10-20',
        reps: '5-30s+ holds',
        restTime: '60s',
        holdTime: '5-30s+',
        formCues: [
          'Perfect alignment before lifting',
          'Hip shift to support side',
          'Free arm position for balance',
          'Micro-corrections through fingers'
        ],
        commonMistakes: [
          'Rushing the weight shift',
          'Poor starting alignment',
          'Holding breath'
        ],
        prerequisites: ['one-arm-handstand-prep'],
        musclesWorked: {
          primary: ['Unilateral Shoulder Complex', 'Core', 'Obliques'],
          secondary: ['Full Body Tension', 'Wrist Stabilizers']
        },
        estimatedWeeksToMaster: 104
      }
    ]
  },

  // ===============================
  // FRONT LEVER PROGRESSION
  // ===============================
  {
    id: 'front-lever-progression',
    name: 'Front Lever Mastery',
    category: 'pull',
    description: 'From tuck holds to full front lever',
    eliteGoal: 'Full Front Lever (10+ seconds)',
    icon: 'Minus',
    color: 'cyan',
    progressions: [
      {
        id: 'hanging-knee-raises',
        name: 'Hanging Knee Raises',
        description: 'Foundation core exercise for lever progressions.',
        level: 'beginner',
        sets: '3',
        reps: '10-15',
        restTime: '60s',
        formCues: [
          'Dead hang start',
          'Raise knees to chest',
          'Control the descent',
          'Minimize swinging'
        ],
        commonMistakes: [
          'Using momentum',
          'Not raising high enough',
          'Swinging excessively'
        ],
        prerequisites: ['dead-hang'],
        nextProgression: 'hanging-leg-raises',
        musclesWorked: {
          primary: ['Lower Abs', 'Hip Flexors'],
          secondary: ['Grip', 'Lats']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'hanging-leg-raises',
        name: 'Hanging Leg Raises',
        description: 'Straight leg raises from hang. Develops hip flexor strength.',
        level: 'beginner',
        sets: '3',
        reps: '8-12',
        restTime: '90s',
        formCues: [
          'Keep legs straight',
          'Raise to parallel or higher',
          'Controlled tempo',
          'Engaged lats throughout'
        ],
        commonMistakes: [
          'Bending knees',
          'Using swing momentum',
          'Not raising high enough'
        ],
        prerequisites: ['hanging-knee-raises'],
        nextProgression: 'tuck-front-lever',
        musclesWorked: {
          primary: ['Abs', 'Hip Flexors', 'Lats'],
          secondary: ['Grip', 'Obliques']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'tuck-front-lever',
        name: 'Tuck Front Lever',
        description: 'First front lever progression with tucked knees.',
        level: 'intermediate',
        sets: '4-5',
        reps: '8-15s holds',
        restTime: '120s',
        holdTime: '8-15s',
        formCues: [
          'Pull shoulders back and down',
          'Knees tight to chest',
          'Back horizontal to ground',
          'Arms straight, engage lats'
        ],
        commonMistakes: [
          'Hips too high or low',
          'Shoulders not retracted',
          'Bent arms'
        ],
        prerequisites: ['hanging-leg-raises', 'standard-pullup'],
        nextProgression: 'advanced-tuck-front-lever',
        musclesWorked: {
          primary: ['Lats', 'Core', 'Rear Deltoid'],
          secondary: ['Rhomboids', 'Biceps', 'Lower Back']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'advanced-tuck-front-lever',
        name: 'Advanced Tuck Front Lever',
        description: 'Tuck lever with knees extended away from chest.',
        level: 'intermediate',
        sets: '4-5',
        reps: '5-12s holds',
        restTime: '150s',
        holdTime: '5-12s',
        formCues: [
          'Knees bent but away from chest',
          'Thighs closer to parallel',
          'Strong lat engagement',
          'Maintain horizontal back'
        ],
        commonMistakes: [
          'Knees still too close',
          'Hips dropping',
          'Losing horizontal line'
        ],
        prerequisites: ['tuck-front-lever'],
        nextProgression: 'one-leg-front-lever',
        musclesWorked: {
          primary: ['Lats', 'Core', 'Rear Deltoid'],
          secondary: ['Rhomboids', 'Biceps', 'Lower Back']
        },
        estimatedWeeksToMaster: 8
      },
      {
        id: 'one-leg-front-lever',
        name: 'One Leg Front Lever',
        description: 'One leg extended, one leg tucked. Progressive extension.',
        level: 'advanced',
        sets: '4-5',
        reps: '5-10s each leg',
        restTime: '180s',
        holdTime: '5-10s',
        formCues: [
          'One leg fully extended',
          'Other leg tucked or bent',
          'Maintain horizontal position',
          'Alternate legs for balance'
        ],
        commonMistakes: [
          'Extended leg dropping',
          'Twisting torso',
          'Losing horizontal body line'
        ],
        prerequisites: ['advanced-tuck-front-lever'],
        nextProgression: 'straddle-front-lever',
        musclesWorked: {
          primary: ['Lats', 'Core', 'Hip Flexors'],
          secondary: ['Rear Deltoid', 'Rhomboids', 'Obliques']
        },
        estimatedWeeksToMaster: 10
      },
      {
        id: 'straddle-front-lever',
        name: 'Straddle Front Lever',
        description: 'Both legs extended in wide straddle position.',
        level: 'advanced',
        sets: '5-6',
        reps: '3-8s holds',
        restTime: '180s',
        holdTime: '3-8s',
        formCues: [
          'Legs wide in straddle',
          'Body horizontal',
          'Strong lat and core engagement',
          'Point toes'
        ],
        commonMistakes: [
          'Legs not wide enough',
          'Hips piking',
          'Dropping from horizontal'
        ],
        prerequisites: ['one-leg-front-lever'],
        nextProgression: 'full-front-lever',
        musclesWorked: {
          primary: ['Lats', 'Core', 'Hip Flexors', 'Adductors'],
          secondary: ['Rear Deltoid', 'Rhomboids', 'Glutes']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'full-front-lever',
        name: 'Full Front Lever',
        description: 'Complete front lever with legs together and straight.',
        level: 'elite',
        sets: '6-8',
        reps: '3-10s holds',
        restTime: '240s',
        holdTime: '3-10s',
        formCues: [
          'Legs together, fully extended',
          'Body perfectly horizontal',
          'Maximum lat engagement',
          'Point toes, squeeze glutes'
        ],
        commonMistakes: [
          'Any hip pike',
          'Body not horizontal',
          'Bent arms'
        ],
        prerequisites: ['straddle-front-lever'],
        musclesWorked: {
          primary: ['Lats', 'Core', 'Rear Deltoid', 'Lower Back'],
          secondary: ['Rhomboids', 'Glutes', 'Hip Flexors']
        },
        estimatedWeeksToMaster: 24
      }
    ]
  },

  // ===============================
  // MUSCLE-UP PROGRESSION
  // ===============================
  {
    id: 'muscle-up-progression',
    name: 'Muscle-Up Mastery',
    category: 'pull',
    description: 'From pull-ups to clean bar and ring muscle-ups',
    eliteGoal: 'Strict Ring Muscle-Up (10+ reps)',
    icon: 'CircleDot',
    color: 'green',
    progressions: [
      {
        id: 'strict-pullups',
        name: 'Strict Pull-Ups (15+ reps)',
        description: 'Build pulling strength foundation with high rep pull-ups.',
        level: 'beginner',
        sets: '4-5',
        reps: '8-15',
        restTime: '120s',
        formCues: [
          'Full dead hang start',
          'Chin clearly over bar',
          'Controlled descent',
          'No kipping'
        ],
        commonMistakes: [
          'Partial range',
          'Kipping or swinging',
          'Not building volume'
        ],
        prerequisites: ['standard-pullup'],
        nextProgression: 'high-pullup',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid'],
          secondary: ['Core', 'Forearms']
        },
        estimatedWeeksToMaster: 8
      },
      {
        id: 'high-pullup',
        name: 'High Pull-Up (to chest/stomach)',
        description: 'Explosive pulling to bring bar to lower chest or stomach.',
        level: 'intermediate',
        sets: '4',
        reps: '5-8',
        restTime: '150s',
        formCues: [
          'Explosive pull from bottom',
          'Pull bar to chest or stomach level',
          'Slight lean back at top',
          'Control the descent'
        ],
        commonMistakes: [
          'Not pulling high enough',
          'Using too much kip',
          'Losing control at top'
        ],
        prerequisites: ['strict-pullups'],
        nextProgression: 'straight-bar-dips',
        musclesWorked: {
          primary: ['Lats', 'Biceps', 'Rear Deltoid', 'Core'],
          secondary: ['Forearms', 'Lower Chest']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'straight-bar-dips',
        name: 'Straight Bar Dips',
        description: 'Dips on a straight bar. Essential for the transition phase.',
        level: 'intermediate',
        sets: '3-4',
        reps: '8-12',
        restTime: '120s',
        formCues: [
          'Start in support on bar',
          'Lower chest toward bar',
          'Elbows track back',
          'Press back to support'
        ],
        commonMistakes: [
          'Flaring elbows',
          'Not going deep enough',
          'Leaning too far forward'
        ],
        prerequisites: ['high-pullup'],
        nextProgression: 'negative-muscle-up',
        musclesWorked: {
          primary: ['Triceps', 'Chest', 'Anterior Deltoid'],
          secondary: ['Core', 'Wrist Flexors']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'negative-muscle-up',
        name: 'Negative Muscle-Up',
        description: 'Controlled descent from support through transition to hang.',
        level: 'intermediate',
        sets: '4-5',
        reps: '3-5',
        restTime: '180s',
        formCues: [
          'Start in support above bar',
          'Slowly lower through transition',
          'Control the turn-over moment',
          'Full 5+ second descent'
        ],
        commonMistakes: [
          'Dropping through transition',
          'Not controlling entire descent',
          'Poor starting position'
        ],
        prerequisites: ['straight-bar-dips', 'high-pullup'],
        nextProgression: 'kipping-muscle-up',
        musclesWorked: {
          primary: ['Lats', 'Chest', 'Triceps', 'Core'],
          secondary: ['Biceps', 'Shoulders']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'kipping-muscle-up',
        name: 'Kipping Bar Muscle-Up',
        description: 'Muscle-up using swing momentum. First full muscle-up.',
        level: 'intermediate',
        sets: '5-8',
        reps: '1-5',
        restTime: '120s',
        formCues: [
          'Build swing momentum',
          'Aggressive hip thrust at peak',
          'Fast transition over bar',
          'Press to support'
        ],
        commonMistakes: [
          'Pulling too early',
          'No hip drive',
          'Slow transition'
        ],
        prerequisites: ['negative-muscle-up'],
        nextProgression: 'strict-bar-muscle-up',
        musclesWorked: {
          primary: ['Lats', 'Hip Flexors', 'Chest', 'Triceps'],
          secondary: ['Core', 'Shoulders']
        },
        estimatedWeeksToMaster: 8
      },
      {
        id: 'strict-bar-muscle-up',
        name: 'Strict Bar Muscle-Up',
        description: 'Muscle-up with minimal kip. Pure strength.',
        level: 'advanced',
        sets: '5-6',
        reps: '1-5',
        restTime: '180s',
        formCues: [
          'Explosive high pull',
          'Lean forward during transition',
          'Fast wrist turn-over',
          'Press to full support'
        ],
        commonMistakes: [
          'Not pulling high enough',
          'Slow transition',
          'Chicken winging'
        ],
        prerequisites: ['kipping-muscle-up'],
        nextProgression: 'ring-muscle-up-false-grip',
        musclesWorked: {
          primary: ['Lats', 'Chest', 'Triceps', 'Core'],
          secondary: ['Biceps', 'Shoulders', 'Wrists']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'ring-muscle-up-false-grip',
        name: 'False Grip Ring Hold',
        description: 'Essential grip position for ring muscle-ups.',
        level: 'advanced',
        sets: '5',
        reps: '20-30s holds',
        restTime: '90s',
        holdTime: '20-30s',
        formCues: [
          'Wrist crease on top of ring',
          'Deep grip, rings in palm heel',
          'Maintain through pull movement',
          'Build up hold time gradually'
        ],
        commonMistakes: [
          'Grip too shallow',
          'Losing false grip during pull',
          'Not practicing enough'
        ],
        prerequisites: ['strict-bar-muscle-up'],
        nextProgression: 'ring-muscle-up',
        musclesWorked: {
          primary: ['Wrist Flexors', 'Forearms'],
          secondary: ['Grip']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'ring-muscle-up',
        name: 'Ring Muscle-Up',
        description: 'The ultimate muscle-up. Smooth transition on rings.',
        level: 'elite',
        sets: '5-8',
        reps: '3-10',
        restTime: '180s',
        formCues: [
          'False grip throughout',
          'Pull rings to chest/armpits',
          'Fast, aggressive transition',
          'Deep dip at bottom, full lockout top'
        ],
        commonMistakes: [
          'Losing false grip',
          'Chicken winging',
          'Slow transition'
        ],
        prerequisites: ['ring-muscle-up-false-grip'],
        musclesWorked: {
          primary: ['Lats', 'Chest', 'Triceps', 'Core'],
          secondary: ['Biceps', 'Shoulders', 'Forearms']
        },
        estimatedWeeksToMaster: 16
      }
    ]
  },

  // ===============================
  // HUMAN FLAG PROGRESSION
  // ===============================
  {
    id: 'human-flag-progression',
    name: 'Human Flag Mastery',
    category: 'core',
    description: 'From side planks to the iconic human flag',
    eliteGoal: 'Full Human Flag (10+ seconds)',
    icon: 'Flag',
    color: 'red',
    progressions: [
      {
        id: 'side-plank',
        name: 'Side Plank Hold',
        description: 'Foundation for lateral core strength.',
        level: 'beginner',
        sets: '3',
        reps: '30-60s each side',
        restTime: '60s',
        holdTime: '30-60s',
        formCues: [
          'Elbow under shoulder',
          'Body in straight line',
          'Hips lifted, not sagging',
          'Top arm on hip or extended'
        ],
        commonMistakes: [
          'Hips dropping',
          'Rotating torso',
          'Holding breath'
        ],
        prerequisites: [],
        nextProgression: 'side-plank-dips',
        musclesWorked: {
          primary: ['Obliques', 'Quadratus Lumborum'],
          secondary: ['Shoulder Stabilizers', 'Glutes']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'side-plank-dips',
        name: 'Side Plank Hip Dips',
        description: 'Dynamic side plank for strength building.',
        level: 'beginner',
        sets: '3',
        reps: '12-15 each side',
        restTime: '60s',
        formCues: [
          'Start in side plank',
          'Lower hip toward ground',
          'Raise back to straight line',
          'Control the movement'
        ],
        commonMistakes: [
          'Moving too fast',
          'Rotating torso',
          'Not full range of motion'
        ],
        prerequisites: ['side-plank'],
        nextProgression: 'vertical-pole-hold',
        musclesWorked: {
          primary: ['Obliques', 'Quadratus Lumborum'],
          secondary: ['Hip Abductors', 'Shoulders']
        },
        estimatedWeeksToMaster: 3
      },
      {
        id: 'vertical-pole-hold',
        name: 'Vertical Pole Hold',
        description: 'Holding vertical position against pole. First pole work.',
        level: 'intermediate',
        sets: '4-5',
        reps: '15-30s each side',
        restTime: '120s',
        holdTime: '15-30s',
        formCues: [
          'Top arm pushes, bottom arm pulls',
          'Body vertical along pole',
          'Feet may touch pole',
          'Build grip and push/pull strength'
        ],
        commonMistakes: [
          'Not engaging both arms',
          'Slipping grip',
          'Not staying vertical'
        ],
        prerequisites: ['side-plank-dips'],
        nextProgression: 'tuck-flag-hold',
        musclesWorked: {
          primary: ['Lats', 'Deltoids', 'Obliques'],
          secondary: ['Grip', 'Core']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'tuck-flag-hold',
        name: 'Tuck Human Flag',
        description: 'Human flag with knees tucked. First horizontal flag position.',
        level: 'intermediate',
        sets: '5-6',
        reps: '5-15s each side',
        restTime: '180s',
        holdTime: '5-15s',
        formCues: [
          'Push hard with top arm',
          'Pull hard with bottom arm',
          'Knees tucked to chest',
          'Body perpendicular to pole'
        ],
        commonMistakes: [
          'Not pushing/pulling hard enough',
          'Body not perpendicular',
          'Rotating toward pole'
        ],
        prerequisites: ['vertical-pole-hold'],
        nextProgression: 'straddle-flag-hold',
        musclesWorked: {
          primary: ['Obliques', 'Lats', 'Deltoids'],
          secondary: ['Quadratus Lumborum', 'Grip', 'Core']
        },
        estimatedWeeksToMaster: 10
      },
      {
        id: 'straddle-flag-hold',
        name: 'Straddle Human Flag',
        description: 'Flag with legs in wide straddle position.',
        level: 'advanced',
        sets: '5-6',
        reps: '5-10s each side',
        restTime: '180s',
        holdTime: '5-10s',
        formCues: [
          'Legs wide in straddle',
          'Body horizontal',
          'Strong push and pull',
          'Point toes'
        ],
        commonMistakes: [
          'Legs not wide enough',
          'Body not horizontal',
          'Losing grip'
        ],
        prerequisites: ['tuck-flag-hold'],
        nextProgression: 'full-human-flag',
        musclesWorked: {
          primary: ['Obliques', 'Lats', 'Deltoids', 'Hip Abductors'],
          secondary: ['Core', 'Grip', 'Lower Back']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'full-human-flag',
        name: 'Full Human Flag',
        description: 'The iconic human flag with legs together and straight.',
        level: 'elite',
        sets: '6-8',
        reps: '5-15s each side',
        restTime: '240s',
        holdTime: '5-15s',
        formCues: [
          'Body perfectly horizontal',
          'Legs together and straight',
          'Maximum push and pull force',
          'Point toes, squeeze glutes'
        ],
        commonMistakes: [
          'Body not horizontal',
          'Legs apart or bent',
          'Insufficient strength output'
        ],
        prerequisites: ['straddle-flag-hold'],
        musclesWorked: {
          primary: ['Obliques', 'Quadratus Lumborum', 'Lats', 'Deltoids'],
          secondary: ['Full Core', 'Grip', 'Glutes']
        },
        estimatedWeeksToMaster: 24
      }
    ]
  },

  // ===============================
  // L-SIT TO MANNA PROGRESSION
  // ===============================
  {
    id: 'lsit-manna-progression',
    name: 'L-Sit to Manna',
    category: 'core',
    description: 'From floor L-sit to the legendary manna hold',
    eliteGoal: 'Full Manna (3+ seconds)',
    icon: 'Star',
    color: 'yellow',
    progressions: [
      {
        id: 'knee-tuck-hold',
        name: 'Knee Tuck Hold',
        description: 'Hold yourself up with knees tucked. Foundation for L-sit.',
        level: 'beginner',
        sets: '4',
        reps: '15-30s holds',
        restTime: '60s',
        holdTime: '15-30s',
        formCues: [
          'Hands on floor or parallettes',
          'Push floor away, elevate shoulders',
          'Knees tucked to chest',
          'Hips lifted off ground'
        ],
        commonMistakes: [
          'Not pushing through shoulders',
          'Hips touching ground',
          'Rounded back'
        ],
        prerequisites: [],
        nextProgression: 'one-leg-l-sit',
        musclesWorked: {
          primary: ['Hip Flexors', 'Core', 'Triceps'],
          secondary: ['Shoulders', 'Wrist Flexors']
        },
        estimatedWeeksToMaster: 3
      },
      {
        id: 'one-leg-l-sit',
        name: 'One Leg L-Sit',
        description: 'L-sit with one leg extended, one tucked. Progressive extension.',
        level: 'beginner',
        sets: '4',
        reps: '10-20s each leg',
        restTime: '60s',
        holdTime: '10-20s',
        formCues: [
          'One leg fully extended parallel',
          'Other leg tucked or slightly extended',
          'Push hard through shoulders',
          'Keep extended leg straight'
        ],
        commonMistakes: [
          'Extended leg dropping',
          'Hips sinking',
          'Bent extended leg'
        ],
        prerequisites: ['knee-tuck-hold'],
        nextProgression: 'l-sit',
        musclesWorked: {
          primary: ['Hip Flexors', 'Core', 'Quadriceps'],
          secondary: ['Triceps', 'Shoulders']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'l-sit',
        name: 'L-Sit',
        description: 'Classic L-sit hold. Both legs extended parallel to ground.',
        level: 'intermediate',
        sets: '5',
        reps: '10-30s holds',
        restTime: '90s',
        holdTime: '10-30s',
        formCues: [
          'Both legs straight, parallel to floor',
          'Point toes',
          'Push through shoulders',
          'Hollow body position'
        ],
        commonMistakes: [
          'Legs below parallel',
          'Bent knees',
          'Rounded shoulders forward'
        ],
        prerequisites: ['one-leg-l-sit'],
        nextProgression: 'v-sit',
        musclesWorked: {
          primary: ['Hip Flexors', 'Core', 'Quadriceps'],
          secondary: ['Triceps', 'Serratus Anterior', 'Shoulders']
        },
        estimatedWeeksToMaster: 8
      },
      {
        id: 'v-sit',
        name: 'V-Sit',
        description: 'L-sit with legs raised above parallel. Increased hip flexor demand.',
        level: 'intermediate',
        sets: '5',
        reps: '5-15s holds',
        restTime: '120s',
        holdTime: '5-15s',
        formCues: [
          'Legs raised above horizontal',
          'Strive for 45+ degrees above parallel',
          'Point toes',
          'Lean torso back slightly'
        ],
        commonMistakes: [
          'Legs not high enough',
          'Bent knees',
          'Collapsing at shoulders'
        ],
        prerequisites: ['l-sit'],
        nextProgression: 'manna-prep',
        musclesWorked: {
          primary: ['Hip Flexors', 'Core', 'Quadriceps'],
          secondary: ['Shoulders', 'Triceps', 'Lower Back']
        },
        estimatedWeeksToMaster: 12
      },
      {
        id: 'manna-prep',
        name: 'Manna Prep (Middle Split Hold)',
        description: 'High V-sit progressing toward manna. Extreme hip flexor work.',
        level: 'advanced',
        sets: '6-8',
        reps: '5-15s holds',
        restTime: '150s',
        holdTime: '5-15s',
        formCues: [
          'Legs approaching vertical',
          'Torso leans back significantly',
          'Hands may turn backward',
          'Extreme hip flexor compression'
        ],
        commonMistakes: [
          'Not leaning back enough',
          'Legs not high enough',
          'Rushing progression'
        ],
        prerequisites: ['v-sit'],
        nextProgression: 'manna',
        musclesWorked: {
          primary: ['Hip Flexors (extreme)', 'Core', 'Shoulders'],
          secondary: ['Triceps', 'Wrist Extensors']
        },
        estimatedWeeksToMaster: 24
      },
      {
        id: 'manna',
        name: 'Manna',
        description: 'Legendary skill. Legs above horizontal behind shoulders.',
        level: 'elite',
        sets: '8-10',
        reps: '1-5s holds',
        restTime: '180s',
        holdTime: '1-5s',
        formCues: [
          'Legs above and behind shoulders',
          'Torso nearly horizontal facing down',
          'Hands rotated backward',
          'Extreme hip flexor and shoulder flexibility'
        ],
        commonMistakes: [
          'Insufficient flexibility',
          'Insufficient hip flexor strength',
          'Not years of preparation'
        ],
        prerequisites: ['manna-prep'],
        musclesWorked: {
          primary: ['Hip Flexors (maximal)', 'Shoulders', 'Core'],
          secondary: ['Triceps', 'Wrist Extensors', 'Full Body']
        },
        estimatedWeeksToMaster: 104
      }
    ]
  },

  // ===============================
  // DIPS PROGRESSION
  // ===============================
  {
    id: 'dips-progression',
    name: 'Dips Mastery',
    category: 'push',
    description: 'From bench dips to weighted and ring dips',
    eliteGoal: 'Weighted Ring Dips (+50% BW)',
    icon: 'TrendingDown',
    color: 'teal',
    progressions: [
      {
        id: 'bench-dips',
        name: 'Bench Dips',
        description: 'Dips with hands on bench and feet on ground.',
        level: 'beginner',
        sets: '3',
        reps: '12-20',
        restTime: '60s',
        formCues: [
          'Hands on bench behind you',
          'Lower until upper arms parallel',
          'Keep back close to bench',
          'Press up to full extension'
        ],
        commonMistakes: [
          'Going too deep',
          'Flaring elbows excessively',
          'Not full range of motion'
        ],
        prerequisites: [],
        nextProgression: 'assisted-dips',
        musclesWorked: {
          primary: ['Triceps', 'Anterior Deltoid'],
          secondary: ['Chest', 'Shoulders']
        },
        estimatedWeeksToMaster: 2
      },
      {
        id: 'assisted-dips',
        name: 'Assisted Parallel Bar Dips',
        description: 'Dips with band or machine assistance.',
        level: 'beginner',
        sets: '3',
        reps: '10-15',
        restTime: '90s',
        formCues: [
          'Use band or machine for assistance',
          'Full depth, elbows to 90 degrees',
          'Slight forward lean',
          'Full lockout at top'
        ],
        commonMistakes: [
          'Too much assistance',
          'Partial range',
          'Excessive forward lean'
        ],
        prerequisites: ['bench-dips'],
        nextProgression: 'parallel-bar-dips',
        musclesWorked: {
          primary: ['Triceps', 'Chest', 'Anterior Deltoid'],
          secondary: ['Core', 'Shoulders']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'parallel-bar-dips',
        name: 'Parallel Bar Dips',
        description: 'Standard dips on parallel bars. Pushing foundation.',
        level: 'intermediate',
        sets: '3-4',
        reps: '8-15',
        restTime: '120s',
        formCues: [
          'Slight forward lean for chest emphasis',
          'Lower to 90 degrees or below',
          'Elbows track back',
          'Full lockout at top'
        ],
        commonMistakes: [
          'Not going deep enough',
          'Excessive forward swing',
          'Partial lockout'
        ],
        prerequisites: ['assisted-dips'],
        nextProgression: 'ring-support-hold',
        musclesWorked: {
          primary: ['Triceps', 'Chest', 'Anterior Deltoid'],
          secondary: ['Core', 'Serratus Anterior']
        },
        estimatedWeeksToMaster: 6
      },
      {
        id: 'ring-support-hold',
        name: 'Ring Support Hold',
        description: 'Static hold in support position on rings. Ring stability.',
        level: 'intermediate',
        sets: '5',
        reps: '20-40s holds',
        restTime: '90s',
        holdTime: '20-40s',
        formCues: [
          'Arms straight, rings turned out',
          'Shoulders depressed and back',
          'Body vertical and tight',
          'Minimize ring wobble'
        ],
        commonMistakes: [
          'Bent arms',
          'Rings not turned out',
          'Shoulders shrugged'
        ],
        prerequisites: ['parallel-bar-dips'],
        nextProgression: 'ring-dips',
        musclesWorked: {
          primary: ['Triceps', 'Shoulder Stabilizers', 'Core'],
          secondary: ['Chest', 'Biceps (isometric)']
        },
        estimatedWeeksToMaster: 4
      },
      {
        id: 'ring-dips',
        name: 'Ring Dips',
        description: 'Dips on gymnastics rings. Increased stability demand.',
        level: 'advanced',
        sets: '4',
        reps: '6-12',
        restTime: '150s',
        formCues: [
          'Turn rings out at top',
          'Lower with control',
          'Maintain ring stability',
          'Full depth and lockout'
        ],
        commonMistakes: [
          'Not turning rings out',
          'Rings wobbling excessively',
          'Partial range of motion'
        ],
        prerequisites: ['ring-support-hold'],
        nextProgression: 'weighted-dips',
        musclesWorked: {
          primary: ['Triceps', 'Chest', 'Anterior Deltoid'],
          secondary: ['Core', 'Shoulder Stabilizers']
        },
        estimatedWeeksToMaster: 8
      },
      {
        id: 'weighted-dips',
        name: 'Weighted Ring Dips',
        description: 'Ring dips with added weight. Maximum pushing strength.',
        level: 'elite',
        sets: '4-5',
        reps: '3-8',
        restTime: '180s',
        formCues: [
          'Add weight gradually',
          'Maintain perfect form',
          'Full range of motion',
          'Control entire movement'
        ],
        commonMistakes: [
          'Adding weight too fast',
          'Sacrificing form',
          'Partial reps'
        ],
        prerequisites: ['ring-dips'],
        musclesWorked: {
          primary: ['Triceps', 'Chest', 'Anterior Deltoid'],
          secondary: ['Core', 'Full Upper Body']
        },
        estimatedWeeksToMaster: 16
      }
    ]
  }
];

// Helper functions
export const getProgressionsByCategory = (category: SkillTree['category']) => {
  return skillProgressions.filter(tree => tree.category === category);
};

export const getProgressionById = (treeId: string, stepId: string) => {
  const tree = skillProgressions.find(t => t.id === treeId);
  return tree?.progressions.find(p => p.id === stepId);
};

export const getNextProgression = (treeId: string, currentStepId: string) => {
  const tree = skillProgressions.find(t => t.id === treeId);
  const current = tree?.progressions.find(p => p.id === currentStepId);
  if (current?.nextProgression) {
    return tree?.progressions.find(p => p.id === current.nextProgression);
  }
  return undefined;
};

export const getPrerequisites = (treeId: string, stepId: string) => {
  const tree = skillProgressions.find(t => t.id === treeId);
  const step = tree?.progressions.find(p => p.id === stepId);
  return step?.prerequisites.map(prereqId => 
    tree?.progressions.find(p => p.id === prereqId)
  ).filter(Boolean) || [];
};
