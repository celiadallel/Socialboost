import { useState } from 'react';

export default function PostScheduler() {
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      content: "Excited to share my thoughts on the latest AI developments in our industry! Check out my new blog post for insights on how these technologies are shaping the future of work. #AI #FutureOfWork #Innovation",
      dateTime: "2025-08-05T09:00:00",
      hasImage: true,
      status: "scheduled"
    },
    {
      id: 2,
      content: "Just wrapped up an amazing webinar with industry leaders discussing digital transformation strategies. What are your biggest challenges in adapting to the digital landscape?",
      dateTime: "2025-08-10T15:30:00",
      hasImage: false,
      status: "scheduled"
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    content: "",
    dateTime: "",
    hasImage: false
  });
  
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPost.content.trim() === "" || newPost.dateTime === "") {
      return; // Basic validation
    }
    
    setScheduledPosts([
      ...scheduledPosts,
      {
        id: Date.now(),
        ...newPost,
        status: "scheduled"
      }
    ]);
    
    // Reset form
    setNewPost({
      content: "",
      dateTime: "",
      hasImage: false
    });
    setShowForm(false);
  };
  
  const cancelPost = (id) => {
    setScheduledPosts(scheduledPosts.map(post => 
      post.id === id ? {...post, status: "cancelled"} : post
    ));
  };
  
  const deletePost = (id) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
  };
  
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Posts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showForm ? "Cancel" : "Schedule New Post"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Post Content
              </label>
              <textarea
                id="content"
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                placeholder="What do you want to post?"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  value={newPost.dateTime}
                  onChange={(e) => setNewPost({...newPost, dateTime: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex items-center h-full pt-6">
                <input
                  id="hasImage"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={newPost.hasImage}
                  onChange={(e) => setNewPost({...newPost, hasImage: e.target.checked})}
                />
                <label htmlFor="hasImage" className="ml-2 block text-sm text-gray-900">
                  Include image (upload will be available in final version)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Schedule Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {scheduledPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No posts scheduled. Create your first post above.</p>
          </div>
        ) : (
          scheduledPosts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Scheduled for {formatDateTime(post.dateTime)}</span>
                    {post.hasImage && (
                      <span className="ml-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                        With image
                      </span>
                    )}
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      post.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {post.status === 'scheduled' ? 'Scheduled' : 'Cancelled'}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  {post.status === 'scheduled' && (
                    <button
                      onClick={() => cancelPost(post.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                      title="Cancel"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}