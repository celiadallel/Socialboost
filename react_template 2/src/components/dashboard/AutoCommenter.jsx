import { useState } from 'react';

export default function AutoCommenter() {
  const [settings, setSettings] = useState({
    enabled: true,
    commentFrequency: "medium", // low, medium, high
    targetKeywords: ["marketing", "digital transformation", "leadership", "ai"],
    commentTone: "professional", // professional, casual, enthusiastic
    maxCommentsPerDay: 10,
    replyToReplies: false
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      postAuthor: "Sarah Johnson",
      postContent: "Just published my thoughts on how AI is transforming the marketing landscape. What do you think?",
      comment: "Great insights, Sarah! I particularly appreciate your perspective on how AI can personalize customer journeys without losing the human touch. Have you explored how this affects small businesses with limited resources?",
      date: "2025-07-25T14:30:00",
      likes: 5
    },
    {
      id: 2,
      postAuthor: "Michael Chen",
      postContent: "Leadership in the digital age requires a completely different mindset. Here's my take on what matters most...",
      comment: "Excellent points, Michael. I'd add that adaptive leadership frameworks are becoming crucial as technology cycles accelerate. Your thoughts on balancing innovation with team stability resonated with my experience.",
      date: "2025-07-24T09:15:00",
      likes: 3
    }
  ]);

  const handleSettingsChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Settings Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Auto-Commenter Settings</h3>
        <div className="space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable Auto-Commenting</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
              onClick={() => handleSettingsChange('enabled', !settings.enabled)}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
          {/* Comment Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment Frequency
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={settings.commentFrequency}
              onChange={(e) => handleSettingsChange('commentFrequency', e.target.value)}
            >
              <option value="low">Low (1-3 per day)</option>
              <option value="medium">Medium (4-10 per day)</option>
              <option value="high">High (11-20 per day)</option>
            </select>
          </div>
          
          {/* Target Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Keywords (comma separated)
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={settings.targetKeywords.join(", ")}
              onChange={(e) => handleSettingsChange('targetKeywords', e.target.value.split(", ").map(k => k.trim()))}
            />
            <p className="mt-1 text-xs text-gray-500">
              The AI will prioritize posts containing these keywords
            </p>
          </div>
          
          {/* Comment Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment Tone
            </label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center">
                <input
                  id="professional"
                  name="commentTone"
                  type="radio"
                  checked={settings.commentTone === "professional"}
                  onChange={() => handleSettingsChange('commentTone', 'professional')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="professional" className="ml-3 block text-sm font-medium text-gray-700">
                  Professional
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="casual"
                  name="commentTone"
                  type="radio"
                  checked={settings.commentTone === "casual"}
                  onChange={() => handleSettingsChange('commentTone', 'casual')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="casual" className="ml-3 block text-sm font-medium text-gray-700">
                  Casual
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="enthusiastic"
                  name="commentTone"
                  type="radio"
                  checked={settings.commentTone === "enthusiastic"}
                  onChange={() => handleSettingsChange('commentTone', 'enthusiastic')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="enthusiastic" className="ml-3 block text-sm font-medium text-gray-700">
                  Enthusiastic
                </label>
              </div>
            </div>
          </div>
          
          {/* Max Comments Per Day */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Comments Per Day: {settings.maxCommentsPerDay}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={settings.maxCommentsPerDay}
              onChange={(e) => handleSettingsChange('maxCommentsPerDay', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Reply to Replies */}
          <div className="flex items-center">
            <input
              id="replyToReplies"
              name="replyToReplies"
              type="checkbox"
              checked={settings.replyToReplies}
              onChange={(e) => handleSettingsChange('replyToReplies', e.target.checked)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="replyToReplies" className="ml-3 block text-sm font-medium text-gray-700">
              Reply to comments on your posts automatically
            </label>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Recent Auto-Comments</h3>
        {recentActivity.length === 0 ? (
          <p className="text-gray-500">No recent comments yet</p>
        ) : (
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="mb-2">
                  <span className="font-medium">{activity.postAuthor}</span>
                  <span className="text-gray-500 ml-2">posted:</span>
                </div>
                <p className="text-gray-800 mb-2">"{activity.postContent}"</p>
                <div className="bg-gray-50 p-3 rounded-md border-l-4 border-blue-500">
                  <p className="text-gray-700">{activity.comment}</p>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>{formatDate(activity.date)}</span>
                    <span>{activity.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}