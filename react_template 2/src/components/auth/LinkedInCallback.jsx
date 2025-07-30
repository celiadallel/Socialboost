import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import linkedinService from '../../services/linkedinService';

function LinkedInCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('Authentication failed: ' + error);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (!code) {
          setStatus('No authorization code received');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        setStatus('Exchanging code for access token...');
        
        // For demo purposes, we'll simulate the token exchange
        // In production, this should be handled by your backend
        const mockTokenResponse = await simulateTokenExchange(code);
        
        setStatus('Fetching your LinkedIn profile...');
        
        // Simulate getting user profile
        const userProfile = await simulateGetProfile();
        
        // Create user object for our auth context
        const user = {
          uid: `linkedin_${userProfile.id}`,
          email: userProfile.email,
          displayName: `${userProfile.firstName} ${userProfile.lastName}`,
          photoURL: userProfile.profilePicture,
          provider: 'linkedin',
          linkedinId: userProfile.id
        };

        // Store user in localStorage and auth context
        localStorage.setItem('socialboost_user', JSON.stringify(user));
        setCurrentUser(user);

        setStatus('Success! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);

      } catch (error) {
        console.error('LinkedIn callback error:', error);
        setStatus('Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, setCurrentUser]);

  // Simulate token exchange (in production, this would be handled by backend)
  const simulateTokenExchange = async (code) => {
    // This is a simulation - in real implementation, your backend would handle this
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'simulated_access_token_' + Date.now(),
          expires_in: 5184000
        });
      }, 1000);
    });
  };

  // Simulate getting LinkedIn profile (in production, use real LinkedIn API)
  const simulateGetProfile = async () => {
    // This is a simulation - in real implementation, use LinkedIn API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'linkedin_user_' + Date.now(),
          firstName: 'Your',
          lastName: 'Name',
          email: 'your.email@example.com',
          profilePicture: 'https://via.placeholder.com/150x150?text=LinkedIn+User'
        });
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connecting to LinkedIn
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LinkedInCallback;