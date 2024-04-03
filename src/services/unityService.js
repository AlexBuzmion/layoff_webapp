import { encodeCredentials } from '@/utils/utils';

// Function to fetch data from Unity's Remote Config service
export async function fetchData(endpoint, projectId, environmentId) {
    const keyId = process.env.VUE_APP_KEY_ID;
    const secretKey = process.env.VUE_APP_SECRET_KEY;
    const credentials = encodeCredentials(keyId, secretKey);
    const authHeader = `Basic ${credentials}`;
    try {
        const tokenResponse = await fetch(`https://services.api.unity.com/auth/v1/token-exchange?projectId=${projectId}&environmentId=${environmentId}`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
          },
        });
    
        if (!tokenResponse.ok) throw new Error('Token exchange failed');
    
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.accessToken;
    
        const response = await fetch(`https://services.api.unity.com/${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
    
        if (!response.ok) throw new Error('API request failed');
    
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Or handle it as fits your error handling strategy
      }
    }