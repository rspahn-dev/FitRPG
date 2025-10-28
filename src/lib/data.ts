

// Mock data for FitRPG

// Base stats that will scale with level
const baseStats = {
  str: 10,
  agi: 8,
  sta: 12,
};

const calculateLevelStats = (level: number) => {
    return {
        str: baseStats.str + (level - 1) * 2,
        agi: baseStats.agi + (level - 1) * 1,
        sta: baseStats.sta + (level - 1) * 3,
    }
}

export const userStats = {
  level: 5,
  xp: 450,
  xpToNext: 1000,
  ...calculateLevelStats(5),
  streakDays: 5,
  workoutsThisWeek: 4,
  activeMinutesThisWeek: 180,
  // NOTE: In a real app, this would be derived from the workout history.
  // We'll use this to simulate the "one rest day per week" rule.
  restDaysLoggedThisWeek: 0, 
};

export const userProfile = {
  displayName: 'Alex',
  fitnessGoals: 'I want to build muscle and improve my cardiovascular health.',
  fitnessLevel: 'intermediate',
  creature: {
    name: 'Sparky',
    species: 'Electric Squirrel',
    image: 'https://picsum.photos/seed/creature1/128/128',
    skills: [
        { name: 'Quick Attack', description: 'A speedy physical attack.' },
        { name: 'Thunder Shock', description: 'An electric shock that may paralyze the foe.' },
    ],
    gear: {
        helmet: null,
        armor: null,
    }
  },
  bag: [
    { id: 'loot1', name: 'Health Potion', description: 'Restores 20 HP.', icon: 'Heart' }
  ],
  settings: {
    units: 'kg',
    theme: 'light',
    notifications: true,
  }
};

export const allSkills = [
    { name: 'Quick Attack', description: 'A speedy physical attack.', unlockLevel: 1 },
    { name: 'Thunder Shock', description: 'An electric shock that may paralyze the foe.', unlockLevel: 1 },
    { name: 'Iron Defense', description: 'Hardens the body to raise Defense.', unlockLevel: 10 },
    { name: 'Aqua Jet', description: 'A quick charge of water.', unlockLevel: 15 },
    { name: 'Flame Burst', description: 'A fiery explosion that scorches the target.', unlockLevel: 20 },
    { name: 'Giga Drain', description: 'A powerful draining attack.', unlockLevel: 25 },
    { name: 'Dragon Claw', description: 'A vicious slash with sharp claws.', unlockLevel: 30 },
    { name: 'Psychic', description: 'A powerful psychic attack that may lower DEF.', unlockLevel: 35 },
    { name: 'Hyper Beam', description: 'An extremely powerful attack, but requires a recharge turn.', unlockLevel: 40 },
    { name: 'Solar Flare', description: 'A blinding flash of light that damages and may stun.', unlockLevel: 45 },
    { name: 'Meteor Mash', description: 'A powerful punch as fast and hard as a meteor.', unlockLevel: 50 },
];

export const personalRecords = [
    { exerciseName: 'Bench Press', value: '100 kg', date: '2023-10-26' },
    { exerciseName: 'Squat', value: '140 kg', date: '2023-10-24' },
    { exerciseName: '5k Run', value: '22:15', date: '2023-09-15' },
]

export const recentWorkouts = [
  {
    id: 'w1',
    name: 'Full Body Strength',
    type: 'strength',
    ts: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
        { type: 'strength', name: 'Squat', sets: [{ reps: 8, weightKg: 120 }, { reps: 8, weightKg: 120 }, { reps: 8, weightKg: 120 }] },
        { type: 'strength', name: 'Bench Press', sets: [{ reps: 8, weightKg: 90 }, { reps: 8, weightKg: 90 }, { reps: 8, weightKg: 90 }] },
    ]
  },
  {
    id: 'w2',
    name: 'Morning Cardio',
    type: 'cardio',
    ts: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
        { type: 'cardio', name: 'Running', minutes: 30 },
    ]
  },
  {
    id: 'w3',
    name: 'Leg Day',
    type: 'strength',
    ts: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
        { type: 'strength', name: 'Deadlift', sets: [{ reps: 5, weightKg: 150 }] },
        { type: 'strength', name: 'Leg Press', sets: [{ reps: 10, weightKg: 200 }, { reps: 10, weightKg: 200 }, { reps: 10, weightKg: 200 }, { reps: 10, weightKg: 200 }] },
    ]
  },
];

export const workoutTemplates = [
    {
        id: 'template_chest_tri',
        name: 'Chest & Triceps',
        exercises: [
            { type: 'strength', name: 'Bench Press', sets: [{ reps: 8, weightKg: 0 }, { reps: 8, weightKg: 0 }, { reps: 8, weightKg: 0 }] },
            { type: 'strength', name: 'Incline Dumbbell Press', sets: [{ reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }] },
            { type: 'strength', name: 'Tricep Dips', sets: [{ reps: 15, weightKg: 0 }, { reps: 15, weightKg: 0 }, { reps: 15, weightKg: 0 }] },
            { type: 'strength', name: 'Tricep Pushdown', sets: [{ reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }] },
        ]
    },
    {
        id: 'template_back_bi',
        name: 'Back & Biceps',
        exercises: [
            { type: 'strength', name: 'Pull Ups', sets: [{ reps: 5, weightKg: 0 }, { reps: 5, weightKg: 0 }, { reps: 5, weightKg: 0 }] },
            { type: 'strength', name: 'Bent Over Rows', sets: [{ reps: 8, weightKg: 0 }, { reps: 8, weightKg: 0 }, { reps: 8, weightKg: 0 }] },
            { type: 'strength', name: 'Bicep Curls', sets: [{ reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }] },
            { type: 'strength', name: 'Hammer Curls', sets: [{ reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }] },
        ]
    },
    {
        id: 'template_shoulders_core',
        name: 'Shoulders & Core',
        exercises: [
            { type: 'strength', name: 'Overhead Press', sets: [{ reps: 8, weightKg: 0 }, { reps: 8, weightKg: 0 }, { reps: 8, weightKg: 0 }] },
            { type: 'strength', name: 'Lateral Raises', sets: [{ reps: 15, weightKg: 0 }, { reps: 15, weightKg: 0 }, { reps: 15, weightKg: 0 }] },
            { type: 'strength', name: 'Plank', sets: [{ reps: 1, weightKg: 60 }, { reps: 1, weightKg: 60 }] }, // Using reps for seconds
            { type: 'strength', name: 'Leg Raises', sets: [{ reps: 20, weightKg: 0 }, { reps: 20, weightKg: 0 }, { reps: 20, weightKg: 0 }] },
        ]
    },
    {
        id: 'template_legs',
        name: 'Leg Day',
        exercises: [
            { type: 'strength', name: 'Squats', sets: [{ reps: 10, weightKg: 0 }, { reps: 10, weightKg: 0 }, { reps: 10, weightKg: 0 }] },
            { type: 'strength', name: 'Deadlifts', sets: [{ reps: 5, weightKg: 0 }, { reps: 5, weightKg: 0 }, { reps: 5, weightKg: 0 }] },
            { type: 'strength', name: 'Leg Press', sets: [{ reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }, { reps: 12, weightKg: 0 }] },
            { type: 'strength', name: 'Calf Raises', sets: [{ reps: 20, weightKg: 0 }, { reps: 20, weightKg: 0 }, { reps: 20, weightKg: 0 }] },
        ]
    },
    {
        id: 'template_full_body',
        name: 'Full Body Circuit',
        exercises: [
            { type: 'cardio', name: 'Jumping Jacks', minutes: 1 },
            { type: 'strength', name: 'Push Ups', sets: [{ reps: 15, weightKg: 0 }] },
            { type: 'strength', name: 'Air Squats', sets: [{ reps: 20, weightKg: 0 }] },
            { type: 'cardio', name: 'Burpees', minutes: 1 },
            { type: 'cardio', name: 'High Knees', minutes: 1 },
        ]
    }
]

export const progressData = {
  workoutsPerWeek: [
    { week: 'W1', workouts: 3 },
    { week: 'W2', workouts: 4 },
    { week: 'W3', workouts: 2 },
    { week: 'W4', workouts: 5 },
  ],
  volumeOverTime: [
    { date: '2023-01-01', volume: 2000 },
    { date: '2023-01-08', volume: 2200 },
    { date: '2023-01-15', volume: 2500 },
    { date: '2023-01-22', volume: 2300 },
    { date: '2023-01-29', volume: 2700 },
  ],
};

export const communityChallenges = [
  {
    id: 'c1',
    title: '5K Steps a Day',
    description: 'Walk or run 5,000 steps every day for a week.',
    progress: 80,
    reward: '100 XP',
    image: 'challengeSteps',
  },
  {
    id: 'c2',
    title: 'Strength Starter',
    description: 'Complete 3 strength training sessions this week.',
    progress: 33,
    reward: '150 XP',
    image: 'challengeStrength',
  },
  {
    id: 'c3',
    title: 'Mobility Master',
    description: 'Accumulate 60 minutes of mobility exercises.',
    progress: 50,
    reward: '120 XP',
    image: 'challengeMobility',
  },
  {
    id: 'c4',
    title: 'Cardio Crusher',
    description: 'Accumulate 90 minutes of cardio this week.',
    progress: 45,
    reward: '125 XP',
    image: 'cardioWorkout',
  },
  {
    id: 'c5',
    title: 'Volume Voyager',
    description: 'Lift a total of 5,000 kg this month.',
    progress: 25,
    reward: '200 XP',
    image: 'strengthTraining',
  },
  {
    id: 'c6',
    title: 'Perfect Week',
    description: 'Complete one workout every day for 7 days straight.',
    progress: 60,
    reward: '300 XP',
    image: 'challengePerfectWeek',
  },
];

export const lootTable = {
    'loot1': { id: 'loot1', name: 'Health Potion', description: 'Restores 20 HP.', icon: 'Heart' },
    'loot2': { id: 'loot2', name: 'Strength Elixir', description: 'Temporarily boosts STR by 2.', icon: 'Dumbbell' },
    'loot3': { id: 'loot3', name: 'Agility Draught', description: 'Temporarily boosts AGI by 2.', icon: 'Wind' },
    'loot4': { id: 'loot4', name: 'XP Scroll', description: 'Grants 100 XP.', icon: 'Star' },
    'loot5': { id: 'loot5', name: 'Dragon Scale', description: 'A rare crafting material.', icon: 'Shield' },
    'loot6': { id: 'loot6', name: 'Phoenix Down', description: 'Revives a fainted creature.', icon: 'Feather' },
};

export const monsters = [
    {
        id: 'm2',
        name: 'Slime',
        species: 'Gelatinous Cube',
        level: 1,
        image: 'https://images.unsplash.com/photo-1528697232296-9d339a972236?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot1,
        unlockLevel: 1,
    },
    {
        id: 'm1',
        name: 'Grumble',
        species: 'Cave Goblin',
        level: 3,
        image: 'https://images.unsplash.com/photo-1621834218510-7541743555aa?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot2,
        unlockLevel: 1,
    },
    {
        id: 'rival',
        name: 'AI Rival',
        species: 'Cyborg Athlete',
        level: userStats.level, // Level scales with the user
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot4,
        unlockLevel: 5,
    },
    {
        id: 'm3',
        name: 'Wyvern',
        species: 'Young Dragon',
        level: 7,
        image: 'https://images.unsplash.com/photo-1577489945899-cf87948a391c?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot4,
        unlockLevel: 7,
    },
    {
        id: 'm4',
        name: 'Golem',
        species: 'Rock Titan',
        level: 12,
        image: 'https://images.unsplash.com/photo-1604198188140-d2c676d549e3?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot3,
        unlockLevel: 10,
    },
    {
        id: 'm5',
        name: 'Hydra',
        species: 'Multi-headed Serpent',
        level: 18,
        image: 'https://images.unsplash.com/photo-1560962827-7a242fa5219e?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot5,
        unlockLevel: 15,
    },
    {
        id: 'm6',
        name: 'Griffin',
        species: 'Mythical Beast',
        level: 25,
        image: 'https://images.unsplash.com/photo-1631430442379-b46133755a30?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot5,
        unlockLevel: 20,
    },
    {
        id: 'm7',
        name: 'Chimera',
        species: 'Aberration',
        level: 32,
        image: 'https://images.unsplash.com/photo-1599933315993-94aa44b77f72?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot6,
        unlockLevel: 30,
    },
    {
        id: 'm8',
        name: 'Behemoth',
        species: 'Legendary Titan',
        level: 40,
        image: 'https://images.unsplash.com/photo-1549463690-84f7942a75a7?q=80&w=600&auto=format&fit=crop',
        loot: lootTable.loot6,
        unlockLevel: 35,
    },
    {
        id: 'm9',
        name: 'Tarrasque',
        species: 'World Ender',
        level: 50,
        image: 'https://images.unsplash.com/photo-1551733771-4a6b8d9b5e25?q=80&w=600&auto=format&fit=crop',
        unlockLevel: 45,
    },
]

export const friends = [
  {
    id: 'friend1',
    displayName: 'Sarah',
    level: 8,
    creature: {
      name: 'Flicker',
      species: 'Flame Fox',
      image: 'https://picsum.photos/seed/friend1/128/128',
    },
    isOnline: true,
  },
  {
    id: 'friend2',
    displayName: 'Mike',
    level: 4,
    creature: {
      name: 'Boulder',
      species: 'Rock Golem',
      image: 'https://picsum.photos/seed/friend2/128/128',
    },
    isOnline: false,
  },
];

    
