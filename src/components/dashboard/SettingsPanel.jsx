import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPanel() {
  const { currentUser } = useAuth();
  
  const [notification, setNotification] = useState(null);
  const [settings, setSettings] = useState({
    emailNotifications: {
      newConnections: true,
      messages: true,
      postEngagement: true,
      weeklyDigest: true
    },
    privacySettings: {
      showProfileActivity: true,
      allowConnectionSuggestions: true
    },
    linkedInIntegration: {
      accountConnected: true,
      autoShareContent: false,
      syncContacts: true
    },
    aiPreferences: {
      contentSuggestions: 'moderate',
      automationLevel: 'medium',
      dataCollection: 'enhanced'
    }
  });

  const handleEmailNotificationChange = (setting) => {
    setSettings({
      ...settings,
      emailNotifications: {
        ...settings.emailNotifications,
        [setting]: !settings.emailNotifications[setting]
      }
    });
  };

  const handlePrivacyChange = (setting) => {
    setSettings({
      ...settings,
      privacySettings: {
        ...settings.privacySettings,
        [setting]: !settings.privacySettings[setting]
      }
    });
  };

  const handleLinkedInIntegrationChange = (setting) => {
    setSettings({
      ...settings,
      linkedInIntegration: {
        ...settings.linkedInIntegration,
        [setting]: !settings.linkedInIntegration[setting]
      }
    });
  };

  const handleAIPreferenceChange = (setting, value) => {
    setSettings({
      ...settings,
      aiPreferences: {
        ...settings.aiPreferences,
        [setting]: value
      }
    });
  };

  const saveSettings = () => {
    // In a real app, this would save to a backend
    setNotification({
      type: 'success',
      message: 'Settings saved successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className={`p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {notification.message}
        </div>
      )}

      {/* Account Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Account Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center">
              <input
                type="email"
                disabled
                value={currentUser?.email || ''}
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-sm"
              />
              <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Change
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
        <div className="space-y-3">
          {Object.entries({
            newConnections: 'New connection notifications',
            messages: 'Message notifications',
            postEngagement: 'Post engagement updates',
            weeklyDigest: 'Weekly activity digest'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{label}</span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.emailNotifications[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                onClick={() => handleEmailNotificationChange(key)}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.emailNotifications[key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
        <div className="space-y-3">
          {Object.entries({
            showProfileActivity: 'Show my profile activity to connections',
            allowConnectionSuggestions: 'Allow my profile in connection suggestions'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{label}</span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.privacySettings[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                onClick={() => handlePrivacyChange(key)}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.privacySettings[key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Integration */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">LinkedIn Integration</h3>
        <div className="mb-4 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${settings.linkedInIntegration.accountConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">{settings.linkedInIntegration.accountConnected ? 'Connected' : 'Not connected'}</span>
        </div>

        <div className="space-y-3">
          {Object.entries({
            autoShareContent: 'Auto-share created content to LinkedIn',
            syncContacts: 'Sync LinkedIn contacts'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{label}</span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.linkedInIntegration[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                onClick={() => handleLinkedInIntegrationChange(key)}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.linkedInIntegration[key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">AI Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Suggestions
            </label>
            <select
              value={settings.aiPreferences.contentSuggestions}
              onChange={(e) => handleAIPreferenceChange('contentSuggestions', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="minimal">Minimal - Rare suggestions</option>
              <option value="moderate">Moderate - Weekly suggestions</option>
              <option value="frequent">Frequent - Daily suggestions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Automation Level
            </label>
            <select
              value={settings.aiPreferences.automationLevel}
              onChange={(e) => handleAIPreferenceChange('automationLevel', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="low">Low - Require approval for all actions</option>
              <option value="medium">Medium - Automate routine tasks only</option>
              <option value="high">High - Full automation with reports</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Collection
            </label>
            <select
              value={settings.aiPreferences.dataCollection}
              onChange={(e) => handleAIPreferenceChange('dataCollection', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="basic">Basic - Essential data only</option>
              <option value="enhanced">Enhanced - Include post engagement</option>
              <option value="comprehensive">Comprehensive - Full profile analysis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}