// Mock data for FitRPG UI

export const userProfile = {
  displayName: 'Alex',
  fitnessGoals: 'Build muscle and improve cardiovascular health.',
  fitnessLevel: 'intermediate',
  creature: {
    name: 'Sparky',
    species: 'Electric Squirrel',
    image: 'https://picsum.photos/seed/creature1/128/128',
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

export const recentWorkouts = [
  {
    id: 'w1',
    name: 'Morning Run',
    type: 'cardio',
    ts: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    minutes: 30,
    steps: 4000,
  },
  {
    id: 'w2',
    name: 'Upper Body Strength',
    type: 'strength',
    ts: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    sets: 3,
    reps: 10,
    weightKg: 20,
  },
  {
    id: 'w3',
    name: 'Yoga Flow',
    type: 'mobility',
    ts: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    minutes: 45,
  },
];

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
