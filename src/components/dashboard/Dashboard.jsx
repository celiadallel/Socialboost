import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnalyticsDashboard from "./AnalyticsDashboard";
import PostScheduler from "./PostScheduler";
import AutoCommenter from "./AutoCommenter";
import ConnectionSuggestions from "./ConnectionSuggestions";
import SettingsPanel from "./SettingsPanel";
import BoostPost from "./BoostPost";
import ContentAIGenerator from "./ContentAIGenerator";
import ConnectionAnalytics from "./ConnectionAnalytics";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "5 new connection suggestions available",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Your post received 24 likes",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "Engagement increased by 12% this week",
      time: "1 day ago",
      read: true,
    },
  ]);
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <div className="w-64 hidden md:block flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="py-4 px-6 bg-white shadow-sm border-b flex justify-between items-center">
            <div className="md:hidden">
              <Sidebar />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center">
              {/* Search */}
              <div className="mr-4 relative hidden md:block">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search..."
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {isNotificationOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2 px-4 border-b">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b hover:bg-gray-50 ${
                              notification.read ? "bg-white" : "bg-blue-50"
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <p className={`text-sm ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="py-2 px-4 border-t text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Routes>
              <Route path="/" element={<AnalyticsDashboard />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/scheduler" element={<PostScheduler />} />
              <Route path="/autocommenter" element={<AutoCommenter />} />
              <Route path="/connections" element={<ConnectionSuggestions />} />
              <Route path="/settings" element={<SettingsPanel />} />
              <Route path="/boost" element={<BoostPost />} />
              <Route path="/content" element={<ContentAIGenerator />} />
              <Route path="/connection-analytics" element={<ConnectionAnalytics />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}