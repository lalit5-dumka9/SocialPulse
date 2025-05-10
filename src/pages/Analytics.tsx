import React, { useState } from 'react';
import { socialData } from '../utils/mockData';

const platforms = [
  { id: 'instagram', name: 'Instagram', color: 'pink' },
  { id: 'youtube', name: 'YouTube', color: 'red' },
  { id: 'facebook', name: 'Facebook', color: 'blue' }
];

const timeRanges = [
  { id: '7days', name: 'Last 7 days' },
  { id: '30days', name: 'Last 30 days' },
  { id: '3months', name: 'Last 3 months' },
  { id: '12months', name: 'Last 12 months' }
];

// Simple analytics card component
const MetricCard = ({ title, value, change, isPositive }: any) => (
  <div className="stats-card">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold">{value.toLocaleString()}</p>
      <p className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? '+' : ''}{change}%
      </p>
    </div>
  </div>
);

// Simple bar chart component
const BarChart = ({ data, title }: any) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="stats-card">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-40 flex items-end justify-between space-x-1">
        {data.map((value: number, index: number) => (
          <div 
            key={index} 
            className="w-full bg-primary dark:bg-primary/80 rounded-t"
            style={{ height: `${(value / maxValue) * 100}%` }}
            title={`Month ${index + 1}: ${value.toLocaleString()}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  );
};

// Donut chart component
const DonutChart = ({ data, title }: any) => {
  const total = Object.values(data).reduce((sum: any, val: any) => sum + val, 0);
  let currentOffset = 0;
  
  const colors = {
    likes: '#10B981', // green
    comments: '#3B82F6', // blue
    shares: '#8B5CF6', // purple
    saves: '#F59E0B', // amber
    reactions: '#EC4899' // pink
  };
  
  return (
    <div className="stats-card">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="flex justify-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {Object.entries(data).map(([key, value]: [string, any]) => {
              const percentage = (value / total) * 100;
              const strokeWidth = 24;
              const radius = 50 - strokeWidth / 2;
              const circumference = 2 * Math.PI * radius;
              const strokeDasharray = circumference;
              const strokeDashoffset = circumference - (percentage / 100) * circumference;
              
              // Calculate rotation to continue from previous segment
              const rotation = (currentOffset / total) * 360;
              currentOffset += value;
              
              return (
                <circle
                  key={key}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={colors[key as keyof typeof colors] || '#CBD5E1'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(${rotation - 90} 50 50)`}
                />
              );
            })}
            <circle cx="50" cy="50" r={50 - 24} fill="white" className="dark:fill-gray-800" />
            <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-xl font-bold fill-gray-900 dark:fill-gray-100">
              {total.toLocaleString()}
            </text>
          </svg>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: colors[key as keyof typeof colors] || '#CBD5E1' }}
            />
            <span className="text-sm capitalize">{key}: {((value / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  
  // Get data for the selected platform
  const platformData = socialData[selectedPlatform as keyof typeof socialData];
  
  // Engagement data for donut chart
  const engagementData = {
    likes: platformData.likes || 0,
    comments: platformData.comments || 0,
    shares: platformData.shares || 0,
    ...(platformData.saves ? { saves: platformData.saves } : {}),
    ...(platformData.reactions ? { reactions: platformData.reactions } : {})
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <button className="btn btn-primary">
          <span className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
            Export Report
          </span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Platform
          </label>
          <select 
            className="input-field"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            {platforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Range
          </label>
          <select 
            className="input-field"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title={selectedPlatform === 'youtube' ? 'Subscribers' : 'Followers'} 
          value={selectedPlatform === 'youtube' ? platformData.subscribers : platformData.followers} 
          change={platformData.growth} 
          isPositive={platformData.growth >= 0} 
        />
        <MetricCard 
          title="Likes" 
          value={platformData.likes || 0} 
          change={2.5} 
          isPositive={true} 
        />
        <MetricCard 
          title="Comments" 
          value={platformData.comments || 0} 
          change={1.8} 
          isPositive={true} 
        />
        <MetricCard 
          title={selectedPlatform === 'youtube' ? 'Views' : 'Shares'} 
          value={selectedPlatform === 'youtube' ? platformData.views || 0 : platformData.shares || 0} 
          change={selectedPlatform === 'youtube' ? 3.2 : -0.7} 
          isPositive={selectedPlatform === 'youtube' ? true : false} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          data={platformData.monthlyData} 
          title={`Monthly ${selectedPlatform === 'youtube' ? 'Subscribers' : 'Followers'} Growth`} 
        />
        <DonutChart 
          data={engagementData} 
          title="Engagement Breakdown" 
        />
      </div>
      
      {/* Additional Stats */}
      <div className="stats-card">
        <h3 className="text-lg font-medium mb-4">Performance Insights</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Audience Growth</span>
              <span className="text-sm font-medium">
                {platformData.growth >= 0 ? '+' : ''}{platformData.growth}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${platformData.growth >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(platformData.growth) * 5, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Engagement Rate</span>
              <span className="text-sm font-medium">3.2%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: '32%' }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Reach vs. Target</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: '78%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;