// Function to Base64 encode credentials
export function encodeCredentials(keyId, secretKey) {
    return btoa(`${keyId}:${secretKey}`);
}

// Function to handle rate limiting
export function handleRateLimit() {
    // Implement your logic to handle rate limiting, e.g., delaying requests
    return new Promise(resolve => setTimeout(resolve, 1000));  // Delays the next request by 1 second
}

export function transformToDictionary(configArray) {
    const configDict = {};
    configArray.forEach(item => {
      if (item.type === 'json' && item.value) {
        configDict[item.key] = item.value;
      } else {
        configDict[item.key] = item.value;
      }
    });
    // display the entire dictionary in order of key : pair
    for (const [key, value] of Object.entries(configDict)) {
        console.log(`${key}: ${value}`);
    }
    console.log(configDict);
    return configDict;
  }

  export function convertToDictionary(resultsArray) {
    const statsDictionary = {};
    resultsArray.forEach(item => {
      // takes the key value pair and stores it in the dictionary
      statsDictionary[item.key] = item.value;
    });
    return statsDictionary;
  }