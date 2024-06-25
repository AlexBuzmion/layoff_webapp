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
  // console.log(statsDictionary)
  return statsDictionary
}

export function bodyMakerRC(configurations) {
  const body = {
      type: "settings",
      value: []
  };

  // Iterate through the configurations and convert them to the required array format
  Object.entries(configurations).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
          // If the value is an object (and not an array), stringify it as JSON
          body.value.push({
              key: key,
              type: 'json',
              value: JSON.stringify(value)
          });
      } else {
          // For primitive types, directly push the key and value with the proper type detection
          body.value.push({
              key: key,
              type: typeof value === 'boolean' ? 'bool' : typeof value,
              value: value
          });
      }
  });

  return body;
}

export function typeChecker(value) {
  switch (typeof value) {
    case 'boolean':
      return 'bool'
      break
    case 'object':
      return 'json'
      break
    case 'number':
      return 'int'
      break
    default:
      return typeof value;
      break
  }
}

// Helper function to recursively process configuration entries
export function processConfigEntry(config, body) {
  if (typeof config.value !== 'json' || config.value === null) {
    // Handle non-object types and null
    body.value.push({
      key: config.key,
      type: typeChecker(config.value),
      value: config.value
    });
  } else {
      // Handle objects including arrays
      let nestedValues = [];

      // Check if the value is an array or object
      if (Array.isArray(config.value)) {
        // Process each item in the array
        config.value.forEach(item => {
          if (typeof item === 'json' && item !== null) {
            nestedValues.push(processConfigEntry(item));  // Recursive call
          } else {
            nestedValues.push(item);
          }
        });
      } else {
        // Process each key-value pair in the object
        Object.entries(config.value).forEach(([key, value]) => {
          if (typeof value === 'json' && value !== null) {
            nestedValues.push({  // Recursive call with key concatenation
                key: `${config.key}.${key}`,
                type: typeChecker(value),
                value: processConfigEntry({key, value})  // Recursive dive
            });
          } else {
            nestedValues.push({
                key: `${config.key}.${key}`,
                type: typeChecker(value),
                value: value
            });
          }
        });
      }

    return nestedValues;  // Return the nested structure
  }
}

// Helper function to parse configuration object
export function parseConfigurationsObject(configObject) {
  const configDictionary = {};
  Object.keys(configObject).forEach(key => {
    configDictionary[key] = configObject[key];
  });
  return configDictionary;
}