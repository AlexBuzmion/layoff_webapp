// Created on Mon Apr 15 2024 || Copyright© 2024 || By: Alex Buzmion II
/*  API call structure: takes in the authentication type, the endpoint, and the body of the request
  * The function then fetches the access token and makes the API call to the specific endpoint
  * Then passes to callUnityAPI() in unityService.js for proper formatting & handling
  * The function returns the data from the API call and stores it in the state
*/

import { callUnityAPI } from '@/services/unityService';
import { defineStore } from 'pinia';
import { processConfigEntry, parseConfigurationsObject } from '@/utility/utils';

const projectId = import.meta.env.VITE_PROJECT_ID;

export const useRemoteConfigStore = defineStore('remoteConfig', {
  state: () => ({
    environmentNames: [],
    configurations: {},
    gameConfigs: {},
    playerConfigs: {},
    trapConfigs: {},
    clientVers: {},
    debugMode: {},
  }),

  actions: {
    // fetches all the environment names available in the project
    async FetchEnvironmentNames(authType = 'Basic') {
      try {
        const data = await callUnityAPI(`/remote-config/v1/projects/${encodeURIComponent(projectId)}/environments`, authType);
        this.environmentNames = data.environments;
      } catch (error) {
        console.error('Error fetching environment names:', error);
      }
    },
    // fetches the configurations for the selected environment
    async FetchConfigsForEnvironment(envId, authType = 'Basic') {
      if (!envId) {
        console.error('No environment selected');
        return;
      }
      // clears the configs before fetching new ones
      try {
        this.gameConfigs = {}
        this.playerConfigs = {}
        this.trapConfigs = {}
        const endpoint = `/remote-config/v1/projects/${encodeURIComponent(projectId)}/environments/${encodeURIComponent(envId)}/configs`;
        // call the Unity API to fetch the configurations
        const response = await callUnityAPI(endpoint, authType)
        this.configurations = response.configs
        this.SetConfigurations(this.configurations)
      } catch (error) {
        console.error('Error fetching configs:', error)
      }
    },

    // todo remove and replace with a direct access to the configiurations state as opposed to parsed and stored in separate objects
    SetConfigurations(configsArray) {
      const configItems = configsArray[0].value;
      configItems.forEach(config => {      
        if (config.key === 'Game Configurations') {
          this.gameConfigs = parseConfigurationsObject(config.value);
        } else if (config.key === 'Player Configurations') {
          this.playerConfigs = parseConfigurationsObject(config.value);
        } else if (config.key === 'Trap Configurations') {
          this.trapConfigs = parseConfigurationsObject(config.value);
        } else if (config.key === 'Client Version') {
          this.clientVers = config.value
        } else if (config.key === 'Debug Mode') {
          this.debugMode = config.value
        }
      });
    },

    // This function updates the configurations in Unity. It takes in the authType and the configurations to update
    //! The body will overwrite the ENTIRE configurations. Ensure to add ALL of the configurations in the body
    async UpdateConfigsInUnity (authType = 'Basic') {
      const endpoint = `/remote-config/v1/projects/${encodeURIComponent(projectId)}/configs/${encodeURIComponent(this.configurations[0].id)}`
      const configsArray = this.configurations[0]?.value
      if (!configsArray) {
        console.error('No configurations found')
        return
      }

      // initialize the body with type and an empty value array
      const body = {
        type: "settings",
        value: []
      }

      // start processing the configurations object using a utlity function
      configsArray.forEach(config => {
          processConfigEntry(config, body)
      })

      try {
        // send the payload to the Unity API
        const response = await callUnityAPI(endpoint, authType, 1, body, 'PUT')
        return response
      }
      catch (error) {
        console.error("Error updating configs: ", error)
      }
    },

    // updates the state with the new values
    //? keys are the exact keys in the configurations object
    UpdateConfigState(path, newValue) {
      const parts = path.split('.'); // ["Player Configurations", "Movement Speed"]
      const configurationsArray = this.configurations[0].value // Array of configuration objects
      
      // find the configuration object with the string key e.g. ['Player Configurations'] and store it in configObject
      const configObject = configurationsArray.find(c => c.key === parts[0])
      // if not foound, post error message and return
      if (!configObject) {
        console.error(`Configuration '${parts[0]}' not found`)
        return
      }
      
      // check if the path is nested (e.g., "Movement Speed" inside "Player Configurations")
      if (parts.length > 1 && configObject.type === 'json' && typeof configObject.value === 'object') {
        let current = configObject.value // update current to the value of the configObject
        // loop through the parts array and stop at the second to last element as the last element is the value to update
        for (let i = 1; i < parts.length - 1; i++) {  
          if (current[parts[i]] !== undefined) {
            current = current[parts[i]]
          } else {
            console.error(`Path not found in the configurations: ${parts.slice(0, i + 1).join('.')}`)
            return
          }
        }
        // set the new value at the final part of the path
        current[parts[parts.length - 1]] = newValue;
      } 
      else {
        // the path is not nested and we can just update the value directly
        configObject.value = newValue;
      }
    }, 
  },
})
