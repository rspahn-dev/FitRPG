
// Mock data for FitRPG UI

export const userProfile = {
  displayName: 'Alex',
  fitnessGoals: 'Build muscle and improve cardiovascular health.',
  fitnessLevel: 'intermediate',
  creature: {
    name: 'Sparky',
    species: 'Electric Squirrel',
    image: 'https://picsum.photos/seed/creature1/128/128',
    skills: [
        { name: 'Quick Attack', description: 'A speedy physical attack.' },
        { name: 'Thunder Shock', description: 'An electric shock that may paralyze the foe.' },
    ]
  }
};

export const userStats = {
  level: 5,
  xp: 450,
  xpToNext: 1000,
  str: 15,
  agi: 12,
  sta: 18,
  streakDays: 5,
  workoutsThisWeek: 4,
  activeMinutesThisWeek: 180,
};

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
        { type: 'strength', name: 'Squat', sets: 3, reps: 8, weightKg: 120 },
        { type: 'strength', name: 'Bench Press', sets: 3, reps: 8, weightKg: 90 },
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
        { type: 'strength', name: 'Deadlift', sets: 1, reps: 5, weightKg: 150 },
        { type: 'strength', name: 'Leg Press', sets: 4, reps: 10, weightKg: 200 },
    ]
  },
  {
    id: 'w4',
    name: 'HIIT Session',
    type: 'cardio',
    ts: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
        { type: 'cardio', name: 'Burpees', minutes: 5 },
        { type: 'cardio', name: 'Jump Rope', minutes: 10 },
    ]
  }
];

export const workoutTemplates = [
    {
        id: 'template1',
        name: 'Upper Body Focus',
        exercises: [
            { type: 'strength', name: 'Bench Press', sets: 3, reps: 8, weightKg: 90 },
            { type: 'strength', name: 'Overhead Press', sets: 3, reps: 10, weightKg: 50 },
            { type: 'strength', name: 'Pull Ups', sets: 3, reps: 8 },
        ]
    },
    {
        id: 'template2',
        name: 'Quick Cardio',
        exercises: [
            { type: 'cardio', name: 'Treadmill Run', minutes: 20 },
            { type: 'cardio', name: 'Cycling', minutes: 15 },
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
];

export const monsters = [
    {
        id: 'm1',
        name: 'Grumble',
        species: 'Cave Goblin',
        level: 3,
        image: 'https://picsum.photos/seed/monster1/128/128',
    },
    {
        id: 'm2',
        name: 'Slime',
        species: 'Gelatinous Cube',
        level: 1,
        image: 'https://picsum.photos/seed/monster2/128/128',
    },
    {
        id: 'm3',
        name: 'Wyvern',
        species: 'Young Dragon',
        level: 7,
        image: 'https://picsum.photos/seed/monster3/128/128',
    },
    {
        id: 'rival',
        name: 'AI Rival',
        species: 'Cyborg Athlete',
        level: userStats.level, // Level scales with the user
        image: 'https://picsum.photos/seed/rival/128/128',
    }
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
