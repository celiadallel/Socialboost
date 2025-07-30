import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function ConnectionAnalytics() {
  const [timeRange, setTimeRange] = useState("3m");
  const [viewMode, setViewMode] = useState("overview");
  
  // Mock data
  const connectionGrowth = [
    { month: 'Jan', connections: 24 },
    { month: 'Feb', connections: 37 },
    { month: 'Mar', connections: 43 },
    { month: 'Apr', connections: 51 },
    { month: 'May', connections: 62 },
    { month: 'Jun', connections: 78 },
    { month: 'Jul', connections: 91 },
  ];

  const industryData = [
    { name: 'Technology', value: 35 },
    { name: 'Marketing', value: 20 },
    { name: 'Finance', value: 15 },
    { name: 'Healthcare', value: 12 },
    { name: 'Education', value: 10 },
    { name: 'Other', value: 8 },
  ];

  const recentConnections = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director at TechCorp",
      date: "2025-07-24",
      mutual: 8,
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Senior Software Engineer at CloudSystems",
      date: "2025-07-22",
      mutual: 5,
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      position: "Product Manager at FinTech Solutions",
      date: "2025-07-20",
      mutual: 12,
      avatar: "https://i.pravatar.cc/150?img=26"
    }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Filter data based on selected time range
  const getFilteredData = (data) => {
    switch(timeRange) {
      case "1m":
        return data.slice(-1);
      case "3m":
        return data.slice(-3);
      case "6m":
        return data.slice(-6);
      case "1y":
        return data;
      default:
        return data;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Connection Analytics</h2>
        
        <div className="flex space-x-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select 
              className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1 text-sm border"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View
            </label>
            <select 
              className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1 text-sm border"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
            >
              <option value="overview">Overview</option>
              <option value="growth">Growth Analytics</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Overview Dashboard */}
      {viewMode === "overview" && (
        <div className="space-y-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Connections</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">386</span>
                <span className="text-green-600 text-xs font-semibold ml-2">+15%</span>
              </div>
              <p className="text-gray-600 text-xs mt-1">From previous period</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium mb-1">New Connections</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">42</span>
                <span className="text-green-600 text-xs font-semibold ml-2">+28%</span>
              </div>
              <p className="text-gray-600 text-xs mt-1">Last 30 days</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Connection Requests</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">18</span>
                <span className="text-gray-600 text-xs font-semibold ml-2">Pending</span>
              </div>
              <p className="text-gray-600 text-xs mt-1">7 new this week</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Engagement Rate</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">8.3%</span>
                <span className="text-amber-600 text-xs font-semibold ml-2">+2%</span>
              </div>
              <p className="text-gray-600 text-xs mt-1">Interaction with your network</p>
            </div>
          </div>
          
          {/* Connection Growth Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Connection Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData(connectionGrowth)}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="connections" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Connections */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Recent Connections</h3>
            <div className="overflow-x-auto">
              <div className="space-y-4">
                {recentConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors">
                    <img 
                      src={connection.avatar} 
                      alt={`${connection.name}'s avatar`} 
                      className="h-12 w-12 rounded-full object-cover mr-4 border border-gray-200" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{connection.name}</p>
                      <p className="text-sm text-gray-500 truncate">{connection.position}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(connection.date).toLocaleDateString()} • {connection.mutual} mutual connections</p>
                    </div>
                    <button className="ml-4 px-3 py-1 text-xs text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Industry Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Industry Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Growth Analytics View */}
      {viewMode === "growth" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2">Connection Growth</h4>
              <div className="text-3xl font-bold text-blue-900">+15%</div>
              <p className="text-sm text-blue-600 mt-2">Month over month</p>
              <div className="mt-4 text-xs text-gray-600">Your network is growing at a healthy rate</div>
            </div>
            
            <div className="border rounded-lg p-4 bg-green-50">
              <h4 className="font-medium text-green-800 mb-2">Acceptance Rate</h4>
              <div className="text-3xl font-bold text-green-900">72%</div>
              <p className="text-sm text-green-600 mt-2">Of outbound requests</p>
              <div className="mt-4 text-xs text-gray-600">Higher than industry average</div>
            </div>
            
            <div className="border rounded-lg p-4 bg-amber-50">
              <h4 className="font-medium text-amber-800 mb-2">Network Quality</h4>
              <div className="text-3xl font-bold text-amber-900">83/100</div>
              <p className="text-sm text-amber-600 mt-2">Quality score</p>
              <div className="mt-4 text-xs text-gray-600">Based on relevance and engagement</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Monthly Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getFilteredData(connectionGrowth)}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="connections" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Growth Recommendations</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-blue-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-blue-800">Target Finance Sector</h4>
                    <p className="text-sm text-blue-600 mt-1">Your network is underrepresented in the finance sector (15%)</p>
                  </div>
                </div>
                <button className="mt-3 text-xs font-medium text-blue-700 hover:text-blue-900">
                  View Suggested Connections →
                </button>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-green-800">Re-engage Dormant Connections</h4>
                    <p className="text-sm text-green-600 mt-1">42 connections haven't engaged with you in over 6 months</p>
                  </div>
                </div>
                <button className="mt-3 text-xs font-medium text-green-700 hover:text-green-900">
                  Generate Re-engagement Strategy →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}