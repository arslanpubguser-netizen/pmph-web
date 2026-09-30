import type {
  Team,
  PlayerProfile,
  Tournament,
  NewsArticle,
  Product,
  RecruitmentPost,
  Ranking,
  PlayerRanking,
  Notification,
} from '@/types';

const regions = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan', 'Faisalabad', 'Quetta', 'Rawalpindi'] as const;
const roles = ['IGL', 'Entry Fragger', 'Support', 'Sniper', 'Assaulter', 'Flex'] as const;
const ranks = ['Conqueror', 'Ace Dominator', 'Ace', 'Crown', 'Diamond', 'Platinum', 'Gold'] as const;
const levels = ['Amateur', 'Semi-Pro', 'Professional', 'Elite'] as const;

const teamNames = [
  'Team Stalwart', 'Free Style', 'Team Raptor', 'Pak Eagles', 'Quantum Esports',
  'Team i8', 'Dead End Guys', 'Team Qalandars', 'Rampage XS', 'Team Solid',
  'Crescent Esports', 'Team Venom', 'Pak Warriors', 'Team Sabretooth', 'Dragon Esports',
  'Team Inferno', 'Nightfall Esports', 'Team Phoenix', 'Gaming Syndicate', 'Team Apex',
];

const playerNames = [
  'GhostKiller', 'SniperWolf', 'DesertFalcon', 'ShadowBlade', 'ProGamerPK',
  'AceShooter', 'TacticalOps', 'NightHunter', 'FragMaster', 'HeadshotKing',
  'SilentKiller', 'RushKing', 'ClutchGod', 'AimBot', 'NoScopeNinja',
  'CobraStrike', 'VenomShot', 'IronClad', 'StormRider', 'BlazeFury',
  'FrostByte', 'ThunderBolt', 'PhantomX', 'ViperVenom', 'RogueAgent',
  'SteelTitan', 'ChaosLord', 'VenomStrike', 'ApexPredator', 'DarkAngel',
  'FlameThrower', 'IceBreaker', 'ShadowReaper', 'GoldenEagle', 'CrimsonWolf',
  'BlueDragon', 'SilverFox', 'BronzeBeast', 'IronWolf', 'CopperHead',
  'PlatinumGod', 'DiamondHand', 'CrownJewel', 'AceMaster', 'KingSlayer',
  'QueenBee', 'JokerWild', 'PenguinKing', 'TigerClaw', 'EagleEye',
];

const teamLogos = [
  'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&w=200',
  'https://images.pexels.com/photos/316533/pexels-photo-316533.jpeg?auto=compress&w=200',
  'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&w=200',
  'https://images.pexels.com/photos/7974199/pexels-photo-7974199.jpeg?auto=compress&w=200',
];

const tournamentBanners = [
  'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/316533/pexels-photo-316533.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/7974199/pexels-photo-7974199.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/1670767/pexels-photo-1670767.jpeg?auto=compress&w=800',
];

const newsThumbnails = [
  'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/316533/pexels-photo-316533.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/7974199/pexels-photo-7974199.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/1670767/pexels-photo-1670767.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/326100/pexels-photo-326100.jpeg?auto=compress&w=800',
  'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&w=800',
];

const productImages = [
  'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3945689/pexels-photo-3945689.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&w=600',
];

function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length];
}

function randomKd(): number {
  return Math.round((2 + Math.random() * 6) * 100) / 100;
}

function randomWinRate(): number {
  return Math.round(30 + Math.random() * 50);
}

export const mockTeams: Team[] = teamNames.map((name, i) => ({
  id: `team-${i + 1}`,
  name,
  logoUrl: pick(teamLogos, i),
  bannerUrl: pick(tournamentBanners, i),
  region: pick(regions, i),
  description: `${name} is a competitive PUBG Mobile team based in ${pick(regions, i)}, Pakistan. Competing in regional and national tournaments with a focus on tactical gameplay and team coordination.`,
  level: pick(levels, i),
  achievements: i % 3 === 0
    ? ['PMPL Pakistan 2025 - Top 3', 'Lahore Showdown 2025 - Winner', 'National Cup 2024 - Runner Up']
    : i % 3 === 1
    ? ['Karachi Open 2025 - Top 5', 'Regional Championship 2024 - Semi Finalist']
    : ['Islamabad Cup 2025 - Top 8', 'Newcomer Tournament 2025 - Winner'],
  isRecruiting: i % 3 !== 2,
  socialLinks: {
    discord: `https://discord.gg/${name.toLowerCase().replace(/\s+/g, '-')}`,
    youtube: `https://youtube.com/@${name.toLowerCase().replace(/\s+/g, '')}`,
    instagram: `https://instagram.com/${name.toLowerCase().replace(/\s+/g, '_')}`,
  },
  managerId: `user-${i + 1}`,
  points: Math.round(500 + Math.random() * 2000),
  wins: Math.round(10 + Math.random() * 80),
  matches: Math.round(30 + Math.random() * 120),
  rank: i + 1,
  createdAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
}));

export const mockPlayers: PlayerProfile[] = playerNames.map((name, i) => {
  const team = i < 40 ? mockTeams[i % mockTeams.length] : undefined;
  return {
    id: `player-${i + 1}`,
    userId: `user-${i + 100}`,
    username: name,
    pubgId: `${500000000 + i * 1379}`.slice(0, 10),
    avatarUrl: pick(teamLogos, i % 4),
    rank: pick(ranks, i),
    primaryRole: pick(roles, i),
    secondaryRole: pick(roles, i + 2),
    region: pick(regions, i),
    level: pick(levels, i),
    kd: randomKd(),
    winRate: randomWinRate(),
    matches: Math.round(50 + Math.random() * 500),
    kills: Math.round(100 + Math.random() * 2000),
    wins: Math.round(10 + Math.random() * 200),
    bio: i % 2 === 0
      ? `Competitive PUBG Mobile player from ${pick(regions, i)}. Specializing in ${pick(roles, i)} role with ${Math.round(2 + Math.random() * 5)} years of competitive experience.`
      : `Passionate esports athlete aiming for the global stage. Currently grinding ranked and scrims daily.`,
    isAvailable: i % 3 !== 0,
    teamId: team?.id,
    socialLinks: {
      discord: `https://discord.gg/${name.toLowerCase()}`,
      youtube: `https://youtube.com/@${name.toLowerCase()}`,
    },
    achievements: i % 4 === 0
      ? ['MVP - Lahore Showdown 2025', 'Top Fragger - PMPL Qualifier', 'Best IGL - Regional Cup']
      : i % 4 === 1
      ? ['Winner - Karachi Open', 'Top 10 National Rankings']
      : ['Rising Star 2025'],
    createdAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  };
});

export const mockTournaments: Tournament[] = Array.from({ length: 15 }, (_, i) => {
  const statuses: Tournament['status'][] = i < 2 ? ['LIVE'] : i < 6 ? ['OPEN'] : i < 10 ? ['UPCOMING'] : ['COMPLETED'];
  const status = statuses[0];
  const startDate = new Date(2026, (i % 12), ((i * 3) % 28) + 1);
  return {
    id: `tour-${i + 1}`,
    name: [
      'PMPL Pakistan Fall 2026',
      'Lahore Showdown Championship',
      'Karachi Open Cup',
      'National Esports League',
      'Islamabad Masters',
      'PUBG Mobile Campus Clash',
      'Ramadan Cup 2026',
      'Pakistan Pro Series',
      'South Asian Showdown',
      'Crescent Tournament',
      'Pak Esports Grand Prix',
      'Dragon Championship',
      'Phoenix Rising Cup',
      'Apex Legends Tournament',
      'Inferno Series Finals',
    ][i],
    bannerUrl: pick(tournamentBanners, i),
    organizer: ['ESL Pakistan', 'Pak Esports', 'GameOn PK', 'PUBG Mobile PK', 'TournamentX'][i % 5],
    prizePool: [500000, 200000, 100000, 75000, 50000, 25000, 15000, 10000][i % 8],
    registrationDeadline: new Date(startDate.getTime() - 7 * 86400000).toISOString(),
    startDate: startDate.toISOString(),
    endDate: new Date(startDate.getTime() + 3 * 86400000).toISOString(),
    status,
    region: pick(regions, i),
    maxTeams: [16, 24, 32, 48][i % 4],
    registeredTeams: status === 'COMPLETED' ? [16, 24, 32][i % 3] : Math.round(5 + Math.random() * 20),
    description: `Premier PUBG Mobile esports tournament featuring top teams from across Pakistan. Compete for glory and a massive prize pool.`,
    rules: [
      'Squad mode (4 players per team)',
      'Map rotation: Erangel, Miramar, Sanhok',
      'Best of 6 matches per day',
      'Standard PMPL scoring system',
      'No use of third-party tools or cheats',
      'Players must be 16+ years old',
    ],
    prizeBreakdown: [
      { position: '1st Place', amount: Math.round(500000 * 0.4) },
      { position: '2nd Place', amount: Math.round(500000 * 0.2) },
      { position: '3rd Place', amount: Math.round(500000 * 0.1) },
      { position: '4th-6th', amount: Math.round(500000 * 0.05) },
    ],
    participatingTeamIds: mockTeams.slice(0, 8 + (i % 8)).map(t => t.id),
    createdAt: new Date(2025, i % 12, 1).toISOString(),
  };
});

export const mockRecruitmentPosts: RecruitmentPost[] = Array.from({ length: 20 }, (_, i) => {
  const team = mockTeams[i % mockTeams.length];
  return {
    id: `recruit-${i + 1}`,
    teamId: team.id,
    team,
    title: `Looking for ${pick(roles, i)}`,
    description: `${team.name} is searching for a skilled ${pick(roles, i)} to join our competitive roster. Must be ${pick(ranks, i)} or above with competitive experience.`,
    role: pick(roles, i),
    rankRequired: pick(ranks, i),
    region: pick(regions, i),
    level: pick(levels, i),
    status: i % 4 === 3 ? 'CLOSED' : i % 4 === 2 ? 'FILLED' : 'OPEN',
    createdAt: new Date(2026, 8, (i % 28) + 1).toISOString(),
  };
});

export const mockNews: NewsArticle[] = Array.from({ length: 20 }, (_, i) => {
  const categories = ['PUBG Updates', 'Esports News', 'Tournament Results', 'Team News', 'Player News', 'Community'];
  const titles = [
    'PMPL Pakistan Fall 2026: Full Schedule and Format Revealed',
    'Team Stalwart Dominates Lahore Showdown Finals',
    'PUBG Mobile 3.5 Update: New Map, Weapons, and Features',
    'Rising Star: How GhostKiller Became Pakistan\'s Top Fragger',
    'Free Style Signs New IGL Ahead of Pro Series',
    'Karachi Open Cup Registration Now Open',
    'PUBG Mobile World Cup 2026: Pakistan Qualifier Details',
    'Team Raptor Announces Sponsorship Deal with TechBrand',
    'Esports in Pakistan: Growth and Future Prospects',
    'National Esports League Announces Record Prize Pool',
    'Islamabad Masters: Day 1 Recap and Highlights',
    'Pak Eagles Roster Changes for 2026 Season',
    'How to Go Pro in PUBG Mobile: Tips from Top Players',
    'PMPL Qualifier: Underdogs Upset Champions in Thriller',
    'PUBG Mobile Adds New Anti-Cheat Measures',
    'Crescent Esports Wins Ramadan Cup 2026',
    'Community Spotlight: Grassroots Esports in Peshawar',
    'Tournament Organizer ESL Pakistan Announces 2026 Roadmap',
    'PUBG Mobile Campus Clash Returns Bigger Than Ever',
    'Interview: Team i8 Captain on Winning the National Cup',
  ];
  return {
    id: `news-${i + 1}`,
    slug: titles[i].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title: titles[i],
    excerpt: `${titles[i]}. Read the full story with analysis, stats, and expert commentary on the Pakistani PUBG Mobile esports scene.`,
    content: `<p>${titles[i]}</p><p>The Pakistani PUBG Mobile esports scene continues to grow at an unprecedented rate, with more teams, players, and tournaments emerging every month. This development marks another milestone in the country's rapidly expanding competitive gaming ecosystem.</p><p>With increasing investment from sponsors and growing viewership numbers, the future of PUBG Mobile esports in Pakistan looks brighter than ever. Stay tuned for more updates as the story develops.</p><p>For more details and analysis, follow our coverage of the Pakistani esports scene.</p>`,
    category: categories[i % categories.length],
    author: ['Ahmed Raza', 'Bilal Khan', 'Usman Tariq', 'Hassan Ali'][i % 4],
    authorAvatar: pick(teamLogos, i),
    thumbnailUrl: pick(newsThumbnails, i),
    publishedAt: new Date(2026, 8, ((i * 2) % 28) + 1).toISOString(),
    readingTime: 3 + (i % 5),
    tags: ['PUBG Mobile', 'Esports', 'Pakistan', categories[i % categories.length]],
    isPublished: true,
  };
});

export const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => {
  const categories = ['Gaming Triggers', 'Cooling Fans', 'Earbuds', 'Controllers', 'Gaming Phones', 'Gaming Accessories'];
  const brands = ['Black Shark', 'Razer', 'PUBG Mobile Gear', 'GameSir', 'Flydigi', 'iPega'];
  const names = [
    'Pro Mobile Gaming Trigger L2R2',
    'Black Shark Cooling Fan Pro',
    'Wireless Gaming Earbuds Pro',
    'Bluetooth Game Controller X8',
    'Gaming Phone 16GB 512GB',
    'Mobile Gaming Finger Sleeves',
    'Pro Gaming Trigger Set V2',
    'RGB Cooling Fan Mini',
    'Bass Boosted Earbuds Gaming',
    'Telescopic Controller Pro',
    'Flagship Gaming Phone 5G',
    'Phone Stand with Cooling',
    'Trigger L1R1 Premium',
    'Semiconductor Cooling Pad',
    'Low Latency Earbuds X1',
    'Mini Game Controller',
    'Gaming Phone Cooler RGB',
    'Thumb Sleeves Gaming Pro',
    '4-Trigger Combo Pack',
    'Peltier Cooling Fan V3',
    'TWS Gaming Earbuds 2',
    'Wireless Controller S8',
    'Pro Gaming Phone 2026',
    'Gaming Grip with Triggers',
    'Trigger Fire Button Set',
    'Dual Fan Cooling System',
    'Noise Cancelling Earbuds',
    'Gamepad Controller Mobile',
    'Gaming Phone Ultra 256GB',
    'Esports Finger Sleeves 10pk',
  ];
  return {
    id: `prod-${i + 1}`,
    name: names[i],
    slug: names[i].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    description: `${names[i]} - Premium quality gaming accessory designed for competitive PUBG Mobile players. Enhance your gameplay with professional-grade equipment.`,
    price: [999, 1499, 2499, 3499, 4999, 7999, 12999, 19999, 29999][i % 9],
    originalPrice: i % 3 === 0 ? [1299, 1999, 2999, 3999, 5999, 9999, 15999, 24999, 39999][i % 9] : undefined,
    category: categories[i % categories.length],
    imageUrl: pick(productImages, i),
    images: [pick(productImages, i), pick(productImages, i + 1)],
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    reviews: Math.round(10 + Math.random() * 500),
    inStock: i % 5 !== 4,
    isFeatured: i % 4 === 0,
    brand: brands[i % brands.length],
    features: [
      'Premium build quality',
      'Compatible with all smartphones',
      'Low latency response',
      'Ergonomic design',
      '1 year warranty',
    ],
    createdAt: new Date(2026, (i % 9), 1).toISOString(),
  };
});

export const mockTeamRankings: Ranking[] = mockTeams
  .map((team, i) => ({
    id: `ranking-${i + 1}`,
    teamId: team.id,
    team,
    points: team.points,
    wins: team.wins,
    matches: team.matches,
    winRate: Math.round((team.wins / team.matches) * 100),
    rankChange: i % 5 === 0 ? 0 : (i % 3) - 1,
    isNew: i < 3,
  }))
  .sort((a, b) => b.points - a.points)
  .map((r, i) => ({ ...r, id: `ranking-${i + 1}` }));

export const mockPlayerRankings: PlayerRanking[] = mockPlayers
  .slice(0, 50)
  .map((player, i) => ({
    id: `pranking-${i + 1}`,
    playerId: player.id,
    player,
    teamName: player.teamId ? mockTeams.find(t => t.id === player.teamId)?.name : 'Free Agent',
    kills: player.kills,
    matches: player.matches,
    points: Math.round(player.kills * 10 + player.wins * 50),
    kd: player.kd,
    rankChange: i % 5 === 0 ? 0 : (i % 4) - 2,
    isNew: i < 3,
  }))
  .sort((a, b) => b.points - a.points)
  .map((r, i) => ({ ...r, id: `pranking-${i + 1}` }));

export const mockNotifications: Notification[] = Array.from({ length: 8 }, (_, i) => {
  const types: Notification['type'][] = ['application', 'tournament', 'recruitment', 'team_invite', 'system'];
  return {
    id: `notif-${i + 1}`,
    userId: 'user-1',
    type: types[i % types.length],
    title: ['Application Update', 'Tournament Reminder', 'Recruitment Response', 'Team Invitation', 'System Update'][i % 5],
    message: [
      'Your application to Team Stalwart has been reviewed.',
      'PMPL Pakistan Fall starts in 24 hours!',
      'Team Raptor is interested in your profile.',
      'You have been invited to join Free Style.',
      'New features available on your dashboard.',
    ][i % 5],
    isRead: i % 3 !== 0,
    link: ['/dashboard/applications', '/tournaments', '/dashboard/recruitment', '/dashboard/team', '/dashboard'][i % 5],
    createdAt: new Date(2026, 8, 28 - i).toISOString(),
  };
});

export const mockDashboardStats = {
  totalPlayers: 12450,
  totalTeams: 328,
  totalTournaments: 74,
  totalMatches: 1284,
};

export const mockAdminStats = {
  totalUsers: 12890,
  totalTeams: 328,
  totalPlayers: 12450,
  totalTournaments: 74,
  totalNewsArticles: 156,
  totalProducts: 89,
  activeRecruitmentPosts: 42,
  totalRevenue: 459900,
};
