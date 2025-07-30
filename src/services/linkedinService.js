import { LINKEDIN_CONFIG } from '../config/linkedin';

class LinkedInService {
  constructor() {
    this.accessToken = localStorage.getItem('linkedin_access_token');
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code) {
    try {
      const response = await fetch('/api/linkedin/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: LINKEDIN_CONFIG.REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      localStorage.setItem('linkedin_access_token', this.accessToken);
      return data;
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  // Get user profile from LinkedIn
  async getUserProfile() {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const response = await fetch(`${LINKEDIN_CONFIG.API_BASE_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  }

  // Get user email
  async getUserEmail() {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const response = await fetch(`${LINKEDIN_CONFIG.API_BASE_URL}/emailAddress?q=members&projection=(elements*(handle~))`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user email');
      }

      const data = await response.json();
      return data.elements[0]['handle~'].emailAddress;
    } catch (error) {
      console.error('Email fetch error:', error);
      throw error;
    }
  }

  // Share a post to LinkedIn
  async sharePost(content, visibility = 'PUBLIC') {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const profile = await this.getUserProfile();
      const personUrn = `urn:li:person:${profile.id}`;

      const shareData = {
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': visibility
        }
      };

      const response = await fetch(`${LINKEDIN_CONFIG.API_BASE_URL}/ugcPosts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(shareData)
      });

      if (!response.ok) {
        throw new Error('Failed to share post');
      }

      return await response.json();
    } catch (error) {
      console.error('Post sharing error:', error);
      throw error;
    }
  }

  // Clear stored token
  clearToken() {
    this.accessToken = null;
    localStorage.removeItem('linkedin_access_token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.accessToken;
  }
}

export default new LinkedInService();