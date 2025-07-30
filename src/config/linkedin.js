// LinkedIn OAuth Configuration
export const LINKEDIN_CONFIG = {
  CLIENT_ID: '78qn20602cbda6',
  REDIRECT_URI: 'https://celzoud.today/auth/linkedin/callback',
  SCOPE: 'r_liteprofile r_emailaddress w_member_social',
  AUTH_URL: 'https://www.linkedin.com/oauth/v2/authorization',
  TOKEN_URL: 'https://www.linkedin.com/oauth/v2/accessToken',
  API_BASE_URL: 'https://api.linkedin.com/v2'
};

// Generate LinkedIn OAuth URL
export const generateLinkedInAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: LINKEDIN_CONFIG.CLIENT_ID,
    redirect_uri: LINKEDIN_CONFIG.REDIRECT_URI,
    scope: LINKEDIN_CONFIG.SCOPE,
    state: generateRandomState()
  });
  
  return `${LINKEDIN_CONFIG.AUTH_URL}?${params.toString()}`;
};

// Generate random state for security
const generateRandomState = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};