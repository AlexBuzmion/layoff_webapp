// Created on Mon Apr 15 2024 || Copyright© 2024 || By: Alex Buzmion II

// Import the callUnityAPI function from where it is defined
import { callUnityAPI } from '@/services/unityService'
import { defineStore } from 'pinia'
import { transformToDictionary } from '@/utility/utils'

const projId = import.meta.env.VITE_PROJECT_ID
export const useRemoteConfigStore = defineStore('remoteConfig', {
  state: () => ({
    
    environmentNames: [],
    envIdConfigs: [],
    configs: {},

  }),
  actions: {
    async fetchEnvironmentNames(authType = 'Basic') {
      const projectId = projId
      try {
        const data = await callUnityAPI(`/remote-config/v1/projects/${encodeURIComponent(projectId)}/environments`, authType)
        this.environmentNames = data.environments; // Adjust according to the actual structure of the response
      } catch (error) {
        console.error('Error fetching environment names:', error)
      }
    },

    async fetchConfigsForEnvironment(envId, authType = 'Basic') {
        const projectId = projId;
        if (!envId) {
          console.error('No environment selected')
          return;
        }
      
        try {
          const endpoint = `/remote-config/v1/projects/${encodeURIComponent(projectId)}/environments/${encodeURIComponent(envId)}/configs`
          const configs = await callUnityAPI(endpoint, authType)
          this.envIdConfigs = configs.configs
          this.configs = transformToDictionary(configs.configs)
        } catch (error) {
          console.error('Error fetching configs:', error)
        }
    },
    
    

  }
});


