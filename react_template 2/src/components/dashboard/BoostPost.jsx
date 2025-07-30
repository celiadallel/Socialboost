import { useState, useEffect } from 'react';

export default function BoostPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [boostSettings, setBoostSettings] = useState({
    budget: 50,
    duration: 7,
    audience: 'connections',
    objective: 'engagement'
  });
  const [boostedPosts, setBoostedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBoostModal, setShowBoostModal] = useState(false);

  // Load sample posts data
  useEffect(() => {
    // In a real application, this would fetch from LinkedIn API
    setTimeout(() => {
      const samplePosts = [
        {
          id: 1,
          content: "Excited to announce that our team has been recognized with the Innovation Award at the annual Tech Summit. This wouldn't have been possible without the dedication and creativity of every team member. #Innovation #TeamSuccess #TechAwards",
          publishedAt: "2025-07-20T14:30:00",
          likes: 145,
          comments: 28,
          shares: 17,
          impressions: 2430,
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          content: "Just finished reading 'AI Superpowers' by Kai-Fu Lee - a fascinating look at how artificial intelligence is reshaping industries and our future. What books on emerging tech have influenced your thinking? #AI #FutureOfWork #ProfessionalDevelopment",
          publishedAt: "2025-07-15T09:45:00",
          likes: 89,
          comments: 42,
          shares: 8,
          impressions: 1850,
          image: null
        },
        {
          id: 3,
          content: "Thrilled to be speaking at next month's Digital Marketing Conference on the integration of AI in content strategy. If you're attending, let's connect! #DigitalMarketing #SpeakerAnnouncement #AI",
          publishedAt: "2025-07-10T11:20:00",
          likes: 216,
          comments: 34,
          shares: 23,
          impressions: 3240,
          image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 4,
          content: "Our latest case study on implementing sustainable practices in manufacturing is now available on our website. Learn how we helped reduce carbon emissions by 40% while increasing efficiency. #Sustainability #Manufacturing #GreenBusiness",
          publishedAt: "2025-07-05T15:10:00",
          likes: 102,
          comments: 19,
          shares: 31,
          impressions: 1920,
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ];

      const sampleBoostedPosts = [
        {
          id: 5,
          postContent: "Proud to announce the launch of our new remote work platform that helps teams stay connected, collaborative, and productive from anywhere in the world. Check out the link in comments for more details! #RemoteWork #ProductLaunch #Collaboration",
          startDate: "2025-07-22T00:00:00",
          endDate: "2025-07-29T00:00:00",
          budget: 100,
          spent: 43,
          impressions: 4230,
          clicks: 215,
          engagement: 187,
          status: "active",
          audience: "industry professionals"
        },
        {
          id: 6,
          postContent: "I'm excited to share that I'll be joining the panel discussion on 'Future of Work' at the upcoming Business Innovation Forum. Looking forward to exchanging ideas with industry leaders!",
          startDate: "2025-07-15T00:00:00",
          endDate: "2025-07-22T00:00:00",
          budget: 75,
          spent: 75,
          impressions: 6842,
          clicks: 342,
          engagement: 291,
          status: "completed",
          audience: "HR professionals and executives"
        }
      ];
      
      setPosts(samplePosts);
      setBoostedPosts(sampleBoostedPosts);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleBoostSettingChange = (setting, value) => {
    setBoostSettings({
      ...boostSettings,
      [setting]: value
    });
  };

  const handleBoostPost = () => {
    if (!selectedPost) return;
    
    // In a real application, this would call the LinkedIn API
    const newBoostedPost = {
      id: Date.now(),
      postContent: selectedPost.content,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + boostSettings.duration * 86400000).toISOString(),
      budget: boostSettings.budget,
      spent: 0,
      impressions: Math.floor(Math.random() * 500) + 100, // Add initial random impressions
      clicks: Math.floor(Math.random() * 50) + 10, // Add initial random clicks
      engagement: Math.floor(Math.random() * 30) + 5, // Add initial random engagement
      status: "active",
      audience: boostSettings.audience
    };
    
    setBoostedPosts([newBoostedPost, ...boostedPosts]);
    setShowBoostModal(false);
    setSelectedPost(null);
    
    // Show success message
    alert("Post boost activated successfully! You can see it in the 'Your Boosted Posts' section below.");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const calculateROI = (spent, engagement) => {
    if (spent === 0) return 0;
    // Simple ROI calculation - in a real app this would be more sophisticated
    return ((engagement / spent) * 100).toFixed(2);
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
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Active Boosts</h3>
          <p className="text-3xl font-bold text-gray-900">
            {boostedPosts.filter(post => post.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Impressions</h3>
          <p className="text-3xl font-bold text-gray-900">
            {boostedPosts.reduce((total, post) => total + post.impressions, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Budget</h3>
          <p className="text-3xl font-bold text-gray-900">
            ${boostedPosts.reduce((total, post) => total + post.budget, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Avg. Engagement Rate</h3>
          <p className="text-3xl font-bold text-gray-900">
            {(boostedPosts.reduce((total, post) => total + (post.engagement / post.impressions), 0) / boostedPosts.length * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Posts to Boost */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Your Recent Posts</h3>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg p-4">
              <p className="text-gray-800 mb-3 line-clamp-2">{post.content}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-500">
                  <span>Published {formatDate(post.publishedAt)} • </span>
                  <span>{post.likes} likes • </span>
                  <span>{post.comments} comments • </span>
                  <span>{post.impressions} impressions</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPost(post);
                  setShowBoostModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Boost Post
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active and Past Boosts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Your Boosted Posts</h3>
        {boostedPosts.length === 0 ? (
          <p className="text-gray-500">No boosted posts yet</p>
        ) : (
          <div className="space-y-6">
            {boostedPosts.map(post => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDate(post.startDate)} - {formatDate(post.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-3 line-clamp-3">{post.postContent}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                    <div>
                      <p className="text-gray-500 text-xs">Budget</p>
                      <p className="font-medium">${post.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Spent</p>
                      <p className="font-medium">${post.spent}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Impressions</p>
                      <p className="font-medium">{post.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Engagement</p>
                      <p className="font-medium">{post.engagement}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">ROI</p>
                      <p className="font-medium">{calculateROI(post.spent, post.engagement)}%</p>
                    </div>
                  </div>
                </div>
                
                {post.status === 'active' && (
                  <div className="mt-3 flex justify-end">
                    <button
                      className="px-3 py-1 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-md"
                    >
                      Stop Boost
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Boost Modal */}
      {showBoostModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Boost Your Post</h3>
                <button
                  onClick={() => setShowBoostModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border rounded-lg p-4 mb-4">
                <p className="text-gray-800 line-clamp-3 mb-2">{selectedPost.content}</p>
                <span className="text-sm text-gray-500">Published {formatDate(selectedPost.publishedAt)}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget (USD)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    value={boostSettings.budget}
                    onChange={(e) => handleBoostSettingChange('budget', parseInt(e.target.value))}
                  />
                  <p className="mt-1 text-sm text-gray-500">Minimum budget is $10</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (days)
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    value={boostSettings.duration}
                    onChange={(e) => handleBoostSettingChange('duration', parseInt(e.target.value))}
                  >
                    <option value={3}>3 days</option>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                    <option value={30}>30 days</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    value={boostSettings.audience}
                    onChange={(e) => handleBoostSettingChange('audience', e.target.value)}
                  >
                    <option value="connections">Your Connections</option>
                    <option value="industry">People in Your Industry</option>
                    <option value="jobTitle">People with Specific Job Titles</option>
                    <option value="skills">People with Specific Skills</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objective
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    value={boostSettings.objective}
                    onChange={(e) => handleBoostSettingChange('objective', e.target.value)}
                  >
                    <option value="awareness">Brand Awareness</option>
                    <option value="engagement">Post Engagement</option>
                    <option value="traffic">Website Traffic</option>
                    <option value="leads">Lead Generation</option>
                  </select>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">Boost Preview</h4>
                  <div className="flex justify-between text-blue-700">
                    <span>Estimated Reach:</span>
                    <span>{(boostSettings.budget * 85).toLocaleString()} - {(boostSettings.budget * 110).toLocaleString()} people</span>
                  </div>
                  <div className="flex justify-between text-blue-700">
                    <span>Estimated Engagement:</span>
                    <span>{(boostSettings.budget * 2.5).toLocaleString()} - {(boostSettings.budget * 3.2).toLocaleString()} interactions</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowBoostModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBoostPost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Boost for ${boostSettings.budget}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Boost Strategy Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">AI-Powered Boost Strategy</h3>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Boost Recommendations</h4>
          <ul className="space-y-3 text-blue-700">
            <li className="flex space-x-2">
              <span>•</span>
              <span>Your post about "Innovation Award" has 3x higher engagement than average. Consider boosting it to reach a wider audience in the tech industry.</span>
            </li>
            <li className="flex space-x-2">
              <span>•</span>
              <span>Tuesday and Wednesday between 10AM-2PM show the highest ROI for your boosted posts. Schedule future boosts during these times.</span>
            </li>
            <li className="flex space-x-2">
              <span>•</span>
              <span>Posts with images receive 40% more clicks when boosted. Prioritize visual content for future boosts.</span>
            </li>
            <li className="flex space-x-2">
              <span>•</span>
              <span>For your industry, a 7-day boost duration with a $75-$100 budget delivers the optimal balance of reach and engagement.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}