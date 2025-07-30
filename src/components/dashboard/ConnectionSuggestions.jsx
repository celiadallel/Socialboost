import { useState, useEffect } from 'react';

export default function ConnectionSuggestions() {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, industry, company, school
  
  // Sample data - in a real app this would come from LinkedIn API
  useEffect(() => {
    const fetchData = () => {
      // Simulate API delay
      setTimeout(() => {
        const sampleConnections = [
          {
            id: 1,
            name: "Jennifer Morris",
            title: "Marketing Director at TechGrowth Inc.",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            mutualConnections: 8,
            industry: "Marketing and Advertising",
            company: "TechGrowth Inc.",
            reason: "Based on your industry",
            connected: false
          },
          {
            id: 2,
            name: "David Wilson",
            title: "Senior Software Engineer at CodeCraft",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            mutualConnections: 5,
            industry: "Computer Software",
            company: "CodeCraft",
            reason: "You may know each other from Stanford University",
            connected: false
          },
          {
            id: 3,
            name: "Sophia Rodriguez",
            title: "Product Manager at InnovateTech",
            avatar: "https://randomuser.me/api/portraits/women/45.jpg",
            mutualConnections: 12,
            industry: "Technology",
            company: "InnovateTech",
            reason: "You both follow Digital Transformation Weekly",
            connected: false
          },
          {
            id: 4,
            name: "Michael Chen",
            title: "Data Scientist at Analytics Pro",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            mutualConnections: 3,
            industry: "Data Science",
            company: "Analytics Pro",
            reason: "Based on your interests in AI and Machine Learning",
            connected: false
          },
          {
            id: 5,
            name: "Emma Johnson",
            title: "UX Designer at Creative Solutions",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            mutualConnections: 7,
            industry: "Design",
            company: "Creative Solutions",
            reason: "You both worked at DesignHub Inc.",
            connected: false
          },
          {
            id: 6,
            name: "Robert Lee",
            title: "VP of Operations at LogisticsPlus",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            mutualConnections: 9,
            industry: "Supply Chain",
            company: "LogisticsPlus",
            reason: "Based on your recent activity",
            connected: false
          }
        ];
        
        setConnections(sampleConnections);
        setIsLoading(false);
      }, 1500);
    };
    
    fetchData();
  }, []);
  
  const handleConnect = (id) => {
    setConnections(connections.map(connection => 
      connection.id === id ? {...connection, connected: true} : connection
    ));
  };
  
  const handleIgnore = (id) => {
    setConnections(connections.filter(connection => connection.id !== id));
  };
  
  const filteredConnections = () => {
    if (filter === 'all') return connections;
    
    const filterMap = {
      'industry': conn => conn.reason.toLowerCase().includes('industry'),
      'company': conn => conn.reason.toLowerCase().includes('worked'),
      'school': conn => conn.reason.toLowerCase().includes('university')
    };
    
    return connections.filter(filterMap[filter] || (() => true));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recommended Connections</h3>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Recommendations</option>
              <option value="industry">By Industry</option>
              <option value="company">By Company</option>
              <option value="school">By School</option>
            </select>
          </div>
        </div>
        
        {filteredConnections().length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No connection suggestions found for this filter</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredConnections().map(connection => (
              <div key={connection.id} className="border rounded-lg p-4 flex">
                <img 
                  src={connection.avatar} 
                  alt={connection.name} 
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{connection.name}</h4>
                  <p className="text-gray-600 text-sm">{connection.title}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {connection.mutualConnections} mutual connections
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{connection.reason}</p>
                  
                  <div className="mt-3 flex space-x-2">
                    {connection.connected ? (
                      <span className="px-4 py-2 text-sm text-green-700 bg-green-50 rounded-md flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Connected
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleConnect(connection.id)}
                          className="px-4 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
                        >
                          Connect
                        </button>
                        <button
                          onClick={() => handleIgnore(connection.id)}
                          className="px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md"
                        >
                          Ignore
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">AI Connection Strategy</h3>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Weekly Connection Strategy</h4>
          <p className="text-blue-700 mb-4">
            Based on your profile and industry, our AI recommends connecting with 5-8 people weekly in the Marketing and Technology sectors to optimize your network growth.
          </p>
          <ul className="space-y-3 text-sm text-blue-700">
            <li className="flex space-x-2">
              <span>•</span>
              <span>Focus on connecting with Marketing Directors and CTOs to expand your professional ecosystem</span>
            </li>
            <li className="flex space-x-2">
              <span>•</span>
              <span>Include a personalized message mentioning shared interests in AI and digital transformation</span>
            </li>
            <li className="flex space-x-2">
              <span>•</span>
              <span>Engage with new connections by commenting on their recent posts within 48 hours</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}