// Created on Mon Apr 15 2024 || Copyright© 2024 || By: Alex Buzmion II

// Import the callUnityAPI function from where it is defined
import { callUnityAPI } from '@/services/unityService'
import { defineStore } from 'pinia'
export const useRemoteConfigStore = defineStore('remoteConfig', {
  state: () => ({
    environmentNames: [],
  }),
  actions: {
    async fetchEnvironmentNames() {
      const projectId = import.meta.env.VITE_PROJECT_ID;
      try {
        const data = await callUnityAPI(`/remote-config/v1/projects/${encodeURIComponent(projectId)}/environments`);
        this.environmentNames = data.environments; // Adjust according to the actual structure of the response
        console.log('Environment names:', this.environmentNames);
      } catch (error) {
        console.error('Error fetching environment names:', error);
      }
    }
  }
});


