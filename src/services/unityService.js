// Created on Sun Apr 01 2024 || Copyright© 2024 || By: Alex Buzmion II
// Import necessary utilities
import { encodeCredentials } from '/src/utility/utils.js';

const BASE_URL = 'https://services.api.unity.com'
let accessToken = ''
let tokenExpiry = 0;
const webAppScopes = ["unity.projects.get", "remote_config.configs.list", "remote_config.configs.update", "remote_config.configs.get"];

// Import environment variables
const keyId = import.meta.env.VITE_KEY_ID
const secretKey = import.meta.env.VITE_SECRET_KEY
const projectId = import.meta.env.VITE_PROJECT_ID
// Function to fetch a new access token
async function fetchAccessToken(keyId, secretKey, projectId, scopes = webAppScopes) {
  const credentials = encodeCredentials(keyId, secretKey)
  
  // Append the projectId as a query parameter to the URL
  const urlWithProjectId = `${BASE_URL}/auth/v1/token-exchange?projectId=${encodeURIComponent(projectId)}`

  const response = await fetch(urlWithProjectId, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ scopes: scopes })
  });
  // Check if the request was successful
  if (response.ok) {
    const data = await response.json()
    accessToken = data.accessToken;
    tokenExpiry = Date.now() + 3600 * 1000; // tracks token expiration (1 hour)
    return accessToken; // Return the access token
  } else {
    // Handle errors if the response was not ok
    const errorBody = await response.json();
    console.error('Error response:', errorBody)
    throw new Error(`Token fetch failed: ${errorBody.message || 'No error message provided'}`)
  }
}

// Ensure the access token is valid
export async function ensureValidToken( scopes = webAppScopes ) {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await fetchAccessToken(keyId, secretKey, projectId, scopes)

  }
}

// Example of using the access token to make an API call
export async function callUnityAPI(endpoint, authType) {
  let authHeader
  switch (authType) {
    case 'Bearer':
      authHeader = `Bearer ${accessToken}`
      break
    case 'Basic':
      authHeader = 'Basic ' + encodeCredentials(keyId, secretKey)
      break
  }
  const basicAuth = encodeCredentials(keyId, secretKey)
  await ensureValidToken();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': authHeader,
    }
  });


  if (!response.ok) {
    const errorBody = await response.json()
    console.error('Error response:', errorBody)
    throw new Error(`API call failed: ${errorBody.message || 'No error message provided'}`)
  }
  return await response.json()
}
