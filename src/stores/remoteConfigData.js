// Created on Mon Apr 15 2024 || Copyright© 2024 || By: Alex Buzmion II
/*  API call structure: takes in the authentication type, the endpoint, and the body of the request
  * The function then fetches the access token and makes the API call to the specific endpoint
  * Then passes to callUnityAPI() in unityService.js for proper formatting & handling
  * The function returns the data from the API call and stores it in the state
*/

import { callUnityAPI } from '@/services/unityService';
import { defineStore } from 'pinia';

const projectId = () => import.meta.env.VITE_PROJECT_ID;

export const useRemoteConfigStore = defineStore('remoteConfig', {
  state: () => ({
    environmentNames: [],
    configurations: {},
    gameConfigs: {},
    playerConfigs: {},
    trapConfigs: {},
  }),

  actions: {
    // fetches all the environment names available in the project
    async FetchEnvironmentNames(authType = 'Basic') {
      try {
        const data = await callUnityAPI(`/remote-config/v1/projects/${encodeURIComponent(projectId())}/environments`, authType);
        this.environmentNames = data.environments;
      } catch (error) {
        console.error('Error fetching environment names:', error);
      }
    },

    async FetchConfigsForEnvironment(envId, authType = 'Basic') {
      if (!envId) {
        console.error('No environment selected');
        return;
      }

      try {
        const endpoint = `/remote-config/v1/projects/${encodeURIComponent(projectId())}/environments/${encodeURIComponent(envId)}/configs`;
        const response = await callUnityAPI(endpoint, authType)
        this.configurations = response.configs
        this.SetConfigurations(this.configurations)
      } catch (error) {
        console.error('Error fetching configs:', error)
      }
    },

    SetConfigurations(configsArray) {
      const configItems = configsArray[0].value;
      configItems.forEach(config => {      
        if (config.key === 'Game Configurations') {
          this.gameConfigs = this.parseConfigurationsObject(config.value);
        } else if (config.key === 'Player Configurations') {
          this.playerConfigs = this.parseConfigurationsObject(config.value);
        } else if (config.key === 'Trap Configurations') {
          this.trapConfigs = this.parseConfigurationsObject(config.value);
        }
      });
    },

    // Helper function to parse configuration object
    parseConfigurationsObject(configObject) {
      const configDictionary = {};
      Object.keys(configObject).forEach(key => {
        configDictionary[key] = configObject[key];
      });
      return configDictionary;
    },

    async UpdateConfigs (configId, configValues, authType = 'Basic') {
      const endpoint = `/remote-config/v1/projects/${encodeURIComponent(projectId)}/configs/${encodeURIComponent(configId)}`
      const body = {
        type: "settings",
        value: configValues
      }
  
      try {
        const response = await callUnityAPI(endpoint, authType, body, 'PUT')
        console.log("Successfully updated configs: ", response )
        return response
      }
      catch (error) {
        console.error("Error updating configs: ", error)
      }
    },
  },
  
});
