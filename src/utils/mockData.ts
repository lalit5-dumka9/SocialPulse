// Mock data for social media platforms

export const socialData = {
  instagram: {
    followers: 12453,
    growth: 5.7,
    likes: 8765,
    comments: 1234,
    shares: 987,
    saves: 567,
    monthlyData: [3200, 3300, 3400, 3600, 3700, 3800, 3900, 4000, 4100, 4300, 4500, 4700]
  },
  youtube: {
    subscribers: 24680,
    growth: 3.2,
    views: 156890,
    likes: 23456,
    comments: 4567,
    shares: 2134,
    monthlyData: [2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200]
  },
  facebook: {
    followers: 34567,
    growth: -0.8,
    likes: 12345,
    comments: 6789,
    shares: 5432,
    reactions: 9876,
    pageViews: 45678,
    monthlyData: [5400, 5350, 5300, 5250, 5200, 5150, 5100, 5050, 5000, 4950, 4900, 4850]
  }
};

export const activities = [
  {
    id: 1,
    platform: 'instagram',
    title: 'New Followers Milestone',
    description: 'You\'ve reached 10,000 followers on Instagram!',
    time: '2 hours ago',
    timestamp: '2023-06-15T10:30:00Z'
  },
  {
    id: 2,
    platform: 'youtube',
    title: 'Video Performance',
    description: 'Your latest video has reached 5,000 views in the first 24 hours.',
    time: '5 hours ago',
    timestamp: '2023-06-15T07:45:00Z'
  },
  {
    id: 3,
    platform: 'facebook',
    title: 'Post Engagement',
    description: 'Your post about product launch received 200% more engagement than usual.',
    time: '1 day ago',
    timestamp: '2023-06-14T14:20:00Z'
  },
  {
    id: 4,
    platform: 'instagram',
    title: 'Story Views',
    description: 'Your stories are performing better than 85% of similar accounts.',
    time: '2 days ago',
    timestamp: '2023-06-13T09:15:00Z'
  },
  {
    id: 5,
    platform: 'youtube',
    title: 'Channel Milestone',
    description: 'Congratulations! You\'ve reached 20,000 subscribers.',
    time: '3 days ago',
    timestamp: '2023-06-12T16:50:00Z'
  }
];

export const connections = [
  {
    id: 1,
    userId: 1,
    platform: 'instagram',
    username: 'social_dash_insta',
    connected: true
  },
  {
    id: 2,
    userId: 1,
    platform: 'youtube',
    username: 'SocialDashOfficial',
    connected: true
  },
  {
    id: 3,
    userId: 1,
    platform: 'facebook',
    username: 'SocialDashBusiness',
    connected: true
  }
];