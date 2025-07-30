import { useState, useEffect } from 'react';

export default function AnalyticsDashboard() {
  // In a real app, these would come from API calls to LinkedIn
  // For now, we'll use sample data
  const [analyticsData, setAnalyticsData] = useState({
    profileViews: {
      total: 0,
      change: 0,
      data: []
    },
    postEngagement: {
      total: 0,
      change: 0,
      data: []
    },
    connections: {
      total: 0,
      change: 0
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const generateRandomData = (min, max, days) => {
      return Array(days).fill().map((_, i) => ({
        day: i + 1,
        value: Math.floor(Math.random() * (max - min + 1) + min)
      }));
    };

    const timer = setTimeout(() => {
      const profileViewsData = generateRandomData(10, 50, 30);
      const postEngagementData = generateRandomData(5, 100, 30);
      
      const totalProfileViews = profileViewsData.reduce((acc, item) => acc + item.value, 0);
      const totalEngagements = postEngagementData.reduce((acc, item) => acc + item.value, 0);
      
      setAnalyticsData({
        profileViews: {
          total: totalProfileViews,
          change: 12.5,
          data: profileViewsData
        },
        postEngagement: {
          total: totalEngagements,
          change: 23.7,
          data: postEngagementData
        },
        connections: {
          total: 1254,
          change: 3.2
        }
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  // Function to render a chart (simplified for now)
  const renderChart = (data, title, color) => {
    const max = Math.max(...data.map(item => item.value));
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="h-48">
          <div className="flex h-40 items-end space-x-1">
            {data.map((item, index) => (
              <div 
                key={index}
                className="w-2 bg-blue-600 rounded-t"
                style={{ 
                  height: `${(item.value / max) * 100}%`,
                  backgroundColor: color
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
        <p className={`ml-2 text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Profile Views (30 days)" 
          value={analyticsData.profileViews.total}
          change={analyticsData.profileViews.change}
        />
        <StatCard 
          title="Post Engagements (30 days)" 
          value={analyticsData.postEngagement.total}
          change={analyticsData.postEngagement.change}
        />
        <StatCard 
          title="Total Connections" 
          value={analyticsData.connections.total}
          change={analyticsData.connections.change}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderChart(analyticsData.profileViews.data, 'Profile Views Trend', '#3b82f6')}
        {renderChart(analyticsData.postEngagement.data, 'Post Engagement Trend', '#10b981')}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">AI Insights</h3>
        <ul className="space-y-3">
          <li className="flex space-x-3">
            <span className="text-blue-600">•</span>
            <span>Your profile visibility has increased by 12.5% in the last 30 days.</span>
          </li>
          <li className="flex space-x-3">
            <span className="text-blue-600">•</span>
            <span>Posts with images receive 45% more engagement than text-only posts.</span>
          </li>
          <li className="flex space-x-3">
            <span className="text-blue-600">•</span>
            <span>Tuesday mornings (9-11 AM) show the highest engagement rates for your content.</span>
          </li>
          <li className="flex space-x-3">
            <span className="text-blue-600">•</span>
            <span>Consider joining 3 more relevant groups to expand your network reach.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}