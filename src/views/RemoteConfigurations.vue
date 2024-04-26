<template>
    
    <div>
      <h1 v-if="selectedEnvironment === remoteConfigStore.environmentNames[0]?.id" style="color: darkorange; border: dotted 1px; text-align: center;">YOU ARE NOW EDITING PRODUCTION</h1>
      <h2>Client Configurations</h2>
      <label>Environment: </label>
      <select v-model="selectedEnvironment" > 
        <option v-for="env in environmentNames" :key="env.id" :value="env.id">{{ env.name }}</option> 
      </select><br/>
      <label for="Version" >Client Version:
        <input id="Version" disabled placeholder="N/A">
      </label><br/>
      <label for="Debug" >Debug Mode:
        <input id="Debug" :value="configurations['DebugMode']" placeholder="N/A">
      </label><br/><br/>
          
          <div v-for="(config, configName) in configurations" :key="configName">
            <h2>{{ configName }}</h2>
            <div>
              <div v-for="(value, key) in config" :key="key">
                <label :for="key" class="spacer">{{ key }}:
                  <input :id="key" v-model="config[key]">
                </label><br/>
              </div>
            </div>
            <br/>
          </div>
        
          <button @click="openModal">Save</button>
      </div>
  </template>
  
  <script setup>
    import { onMounted, ref, computed, watch, reactive} from 'vue'
    import { useRemoteConfigStore } from '@/stores/remoteConfigData';

    const configChanges = reactive({})
    const remoteConfigStore = useRemoteConfigStore()
    const selectedEnvironment = ref('')
    const environmentNames = computed(() => remoteConfigStore.environmentNames)
    const isModalOpened = ref(false);

    const openModal = () => {
      isModalOpened.value = true;
    };
    const closeModal = () => {
      isModalOpened.value = false;
    };

    const submitHandler = ()=>{
      //here you do whatever
    }

    watch(selectedEnvironment, async (newEnvId) => {
      if (newEnvId) {
        await remoteConfigStore.FetchConfigsForEnvironment(newEnvId)
      }
    });
    const configs = computed(() => remoteConfigStore.configurations)
    
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

  input[type=checkbox] {
    outline: 2px solid rgb(218, 120, 10);
    margin: 1%;
  }
  </style>
  