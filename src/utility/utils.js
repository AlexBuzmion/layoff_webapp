// Created on Thu Apr 12 2024 || Copyright© 2024 || By: Alex Buzmion II

// function to Base64 encode credentials
export function encodeCredentials(keyId, secretKey) {
    return btoa(`${keyId}:${secretKey}`);
}

// function to handle rate limiting
export function handleRateLimit() {
    // Implement your logic to handle rate limiting, e.g., delaying requests
    return new Promise(resolve => setTimeout(resolve, 1000)) // Delays the next request by 1 second
}

// function to convert an array of key-value pairs to a dictionary
export function convCSToDict(resultsArray) {
  const statsDictionary = {}
  resultsArray.forEach(item => {
    // takes the key value pair and stores it in the dictionary
    statsDictionary[item.key] = item.value
  })
  console.log(statsDictionary)
  return statsDictionary
}

// used for Remote Config to convert the array of key-value pairs to a dictionary
// separate conversion due to different structure of the response
// 1 key with multiple values as an array
export function convRCToDict(resultsArray) {
  const statsDictionary = {}

  if (resultsArray.length === 1 && Array.isArray(resultsArray[0].value)) {
    resultsArray[0].value.forEach(item => {
      statsDictionary[item.key] = item.value
    })
  }
  return statsDictionary;
}
