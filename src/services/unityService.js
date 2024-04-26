// Created on Sun Apr 01 2024 || Copyright© 2024 || By: Alex Buzmion II

//

import { encodeCredentials } from '/src/utility/utils.js';

const BASE_URL = 'https://services.api.unity.com'
let accessToken = ''
let tokenExpiry = 0;

// import environment variables
const keyId = import.meta.env.VITE_KEY_ID
const secretKey = import.meta.env.VITE_SECRET_KEY
const projectId = import.meta.env.VITE_PROJECT_ID
// function to fetch a new access token
async function fetchAccessToken(keyId, secretKey, projectId, environmentId = 'development') {
  const credentials = encodeCredentials(keyId, secretKey)
  
  // append the projectId as a query parameter to the URL
  const urlWithProjectId = `${BASE_URL}/auth/v1/token-exchange?projectId=${encodeURIComponent(projectId)}&environmentId=${encodeURIComponent(environmentId)}`

  const response = await fetch(urlWithProjectId, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },

  });
  // check if the request was successful
  if (response.ok) {
    const data = await response.json()
    accessToken = data.accessToken;
    tokenExpiry = Date.now() + 3600 * 1000; // tracks token expiration (1 hour)
    return accessToken; // return the access token
  } else {
    // Handle errors if the response was not ok
    const errorBody = await response.json();
    console.error('Error response:', errorBody)
    throw new Error(`Token fetch failed: ${errorBody.message || 'No error message provided'}`)
  }
}

// ensure the access token is valid
export async function ensureValidToken() {
  if (!accessToken || Date.now() >= tokenExpiry) {
    //await fetchAccessToken(keyId, secretKey, projectId, scopes)
    let environmentId = '68412558-aa05-4ce8-a6d8-3a1491b8c683'
    await fetchAccessToken(keyId, secretKey, projectId, environmentId)
  }
}

// main function to call Unity API, switch case handlers for type of authentication and service to call
// requires the type of service to switch case to the url of the service
// requires the type of authentication to switch case to the type of authentication
// requires the endpoint to call the API
export async function callUnityAPI(endpoint, authType, service, body= null, method = 'GET') {
  let urlAPI
  switch (service) {
    case 1:
      urlAPI = 'https://services.api.unity.com'
      break
    case 2: 
      urlAPI = 'https://cloud-save.services.api.unity.com'
      break
    default:
      urlAPI = 'https://services.api.unity.com'
      break
  }
  await ensureValidToken();

  let authHeader
  switch (authType) {
    case 'Bearer':
      authHeader = `Bearer ${accessToken}`
      break
    case 'Basic':
      authHeader = 'Basic ' + encodeCredentials(keyId, secretKey)
      break
  }
  
  let pathParameters = {
    method: method,
    headers: {
      'Authorization': authHeader,
    }, 
  }
  if (body && (method === 'POST' || method === 'PUT')) {
    pathParameters.body = JSON.stringify(body)
  }


  const response = await fetch(`${urlAPI}${endpoint}`, pathParameters)
  
  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(`API call failed: ${errorBody || 'No error message provided'}`);
  }
  
  return await response.json()

}
