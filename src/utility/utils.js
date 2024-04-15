// Function to Base64 encode credentials
export function encodeCredentials(keyId, secretKey) {
    return btoa(`${keyId}:${secretKey}`);
}

// Function to handle rate limiting
export function handleRateLimit() {
    // Implement your logic to handle rate limiting, e.g., delaying requests
    return new Promise(resolve => setTimeout(resolve, 1000));  // Delays the next request by 1 second
}