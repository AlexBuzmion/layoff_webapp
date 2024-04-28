<template>
    
  <div>
    <h1 v-if="selectedEnvironment === remoteConfigStore.environmentNames[0]?.id" style="color: darkorange; border: dotted 1px; text-align: center;">YOU ARE NOW EDITING PRODUCTION</h1>
    <h2>Client Configurations</h2>
    <label>Environment: </label>
    <select v-model="selectedEnvironment" > 
      <option v-for="env in environmentNames" :key="env.id" :value="env.id">{{ env.name }}</option> 
    </select><br/>
    <div class="block">
      <div>
        <label for="Version" >Client Version: </label>
        <input id="Version" v-model="clientVersion" placeholder="N/A">
      </div>
      <div>
        <label for="Debug" >Debug Mode: </label>
        <input type="checkbox" id="Debug" v-model="debugMode" placeholder="N/A">
      </div>
    </div>
    <hr style="width:35%;text-align:left;margin-left:0">
    
    <!-- Auto populate the fields by running for and if statements pulled from the different configurations -->
    <div v-for="(config, configName) in configurations" :key="configName">
      <div class="block" v-if="configName !== 'Trap Configurations'">
        <h2>{{ configName }}</h2>
        <div v-for="(value, key) in config" :key="key">
          <label :for="key">{{ key }}:</label>
          <input v-if="typeof value === 'boolean'" type="checkbox" :id="key" :checked="value" @change="updateConfigurations(`${configName}.${key}`, $event.target.checked)">
          <input v-else :id="key" @input="updateConfigurations(`${configName}.${key}`, $event.target.value)" v-model="config[key]">
          <br/>
        </div>
      </div>
      <div class="block-select" v-else>
        <h2>{{ configName }}</h2>
        <select v-model="selectedTrap">
          <option v-for="(trapDetails, trapKey) in config" :key="trapKey" :value="trapKey">{{ trapDetails.Name }}</option>
        </select>
        <div v-for="(trapDetails, trapKey) in config[selectedTrap]" :key="trapKey">
          <div v-if="trapKey !== 'Name'"></div>
            <label  :for="trapKey">{{ trapKey }}:</label>
            <input v-if="typeof trapDetails === 'boolean'" type="checkbox" :id="trapKey" :checked="trapDetails" @change="updateConfigurations(`Trap Configurations.${selectedTrap}.${trapKey}`, $event.target.checked)">
            <input v-else :id="trapKey" @input="updateConfigurations(`Trap Configurations.${selectedTrap}.${trapKey}`, $event.target.value)" :value="trapDetails">
        </div> <br/>

      </div>
      <br/>
    </div>

    
    <button @click="SaveChanges">Save</button>
    
  </div>
  </template>
  
  <script setup>
    import { onMounted, ref, computed, watch, } from 'vue'
    import { useRemoteConfigStore } from '@/stores/remoteConfigData';

    const remoteConfigStore = useRemoteConfigStore()
    const selectedEnvironment = ref('')
    const selectedTrap = ref('')
    const environmentNames = computed(() => remoteConfigStore.environmentNames)

    //Remote Config Data reactive variables
    // configurations map stored in a computed var 
    const configArray = computed(() => remoteConfigStore.configurations[0]?.value || []) 
    const clientVersion = computed ({
      get: () => {
        const config = configArray.value.find(config => config.key === 'Client Version')
        return config ? config.value : ''
      },
      set: (newValue) => remoteConfigStore.UpdateConfigState('Client Version', newValue)
    })
    const debugMode = computed ({
      get: () => {
        const config = configArray.value.find(config => config.key === 'Debug Mode')
        return config ? config.value : ''
      },
      set: (newValue) => remoteConfigStore.UpdateConfigState('Debug Mode', newValue)
    })
    
    // event handler for any input changes
    const updateConfigurations = (key, value) => {
      // Call the action from your store
      remoteConfigStore.UpdateConfigState(key, value);
    };
    async function SaveChanges() {
      await remoteConfigStore.UpdateConfigsInUnity()
      console.log("Changes Saved")
    }

    watch(selectedEnvironment, async (newEnvId) => {
      if (newEnvId) {
        await remoteConfigStore.FetchConfigsForEnvironment(newEnvId)
      }
    });
    
    // Watch for changes in playerConfigs
    watch(
      () => remoteConfigStore.playerConfigs,
      (newPlayerConfigs) => {
        // When playerConfigs changes, update configurations state accordingly
        remoteConfigStore.configurations['Player Configurations'] = newPlayerConfigs;
      },
      { deep: true }
    );
    const configurations = computed(() => {
      return {
        'Player Configurations': remoteConfigStore.playerConfigs,
        'Game Configurations': remoteConfigStore.gameConfigs,
        'Trap Configurations': remoteConfigStore.trapConfigs
      }
    })

    onMounted(async () => {
      await remoteConfigStore.FetchEnvironmentNames();
      if (environmentNames.value.length > 0) {
        selectedEnvironment.value = environmentNames.value[1].id
        await remoteConfigStore.FetchConfigsForEnvironment(selectedEnvironment.value)
      }
      
    });
  </script>
  
<style scoped>
  @media (max-width: 1024px ) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }

  .flex-container {
    display: flex;
  }

  .flex-container > div {
    background-color: #f1f1f1;
    margin: 10px;
    padding: 20px;
    font-size: 30px;
  }

  label {
  display: inline-block;
  width: 150px; /* Fixed width for labels */
  text-align: left; /* Right-align text in labels */
  margin-right: 10px; /* Space between label and input */
  }

  /* Style for input fields */
  input, select {
    margin-bottom: 10px; /* Space below each input/select */
  }

  /* Special style for checkboxes */
  input[type="checkbox"] {
    margin-top: 0; /* Adjust top margin for checkboxes */
    accent-color: darkorange; /* Color of the checkbox */
  }

  /* Wrapper for each configuration block */
  .block, .block-select {
    margin-bottom: 20px; /* Space below each configuration block */
  }

  /* Style for the dropdown select */
  select {
    margin-bottom: 10px; /* Space below the select dropdown */
  }

  .logger {
    background-color: #c24d4d; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
  }
</style>
  