<template>
    
    <div>
        <h2>Client Configurations</h2>
        <label for="Env" class="spacer">Environment: </label>
            <select v-model="selectedEnvironment" id="Env" class="spacer"> 
              <option v-for="env in environmentNames" :key="env.name" :value="env.id">{{ env.name }}</option> 
            </select> <button :disabled="!selectedEnvironment" @click="retrieveEnvConfigs" style="margin-left: 50px;">Retrieve Configs</button><br/>
          <label for="Version" class="spacer">Client Version:
            <input id="Version" disabled placeholder="N/A">
          </label><br/>
          <label for="Debug" class="spacer">Debug Mode:
            <input id="Debug" disabled placeholder="N/A">
          </label><br/><br/>
        
          <h2>Player Configurations</h2>
        <div class="">
          <label for="MS" class="spacer">Movement Speed:
            <input id="MS" placeholder="N/A">
          </label><br/>
            <label for="deathPosX" class="spacer">Dash Speed: 
                <input id="deathPosX" placeholder="N/A">
            </label><br/>
            <label for="deathPosY" class="spacer">Jump Height: 
                <input name="deathPosY" placeholder="N/A">
            </label><br/>
            <label for="wins" class="spacer">Trap Setting Speed: 
                <input name="wins" placeholder="N/A">
            </label><br/>            
        </div><br/>
        
        <h2>Trap Configurations</h2>
        <select>Trap 1
          <option value="Trap1">Bouncing Betty</option>
          <option value="Trap2">Poison Dart</option>
          <option value="Trap3">Doom Puff</option>
          <option value="Trap4">Skyfall Snare</option>
          <option value="Trap5">Trap 5</option>
          <option value="Trap6">Trap 6</option>
          <option value="Trap7">Trap 7</option>
        </select><br/>
        <label for="Enabled" class="spacer">Enabled in Game: 
          <input name="Enabled" placeholder="N/A">
        </label><br/>
        <label for="Damage" class="spacer">Damage: 
          <input name="Damage" placeholder="N/A">
        </label><br/>
        <label for="Range" class="spacer">Effective Range: 
          <input name="Range" placeholder="N/A">
        </label><br/>
        <label for="Range" class="spacer">Setting Range: 
          <input name="Range" placeholder="N/A">
        </label><br/>
        <label for="DSpeed" class="spacer">Detonate Speed: 
          <input name="DSpeed" placeholder="N/A">
        </label><br/><br/>
        
        <h2>Game Configurations</h2>
        <label for="TrapSS" class="spacer">Trap Spawn Speed: 
          <input name="TrapSS" placeholder="N/A">
        </label><br/>
        <label for="RoomSize" class="spacer">Room Size: 
            <input name="RoomSize" placeholder="N/A">
        </label><br/>
        <label for="RoomQty" class="spacer">Number of Rooms: 
            <input name="RoomQty" placeholder="N/A">
        </label><br/>
        <label for="deaths" class="spacer">Deaths: 
            <input name="deaths" placeholder="N/A">
        </label>
      </div>
  </template>
  
  <script setup>
    import { useRemoteConfigStore } from '@/stores/remoteConfigData';
    import { onMounted, ref, computed} from 'vue'

    const store = useRemoteConfigStore()
    const projectId = import.meta.env.VITE_PROJECT_ID
    const selectedEnvironment = ref('')
    
    async function retrieveEnvConfigs() {
      await store.fetchConfigsForEnvironment(selectedEnvironment.value);
    }

    onMounted(async () => {
      await store.fetchEnvironmentNames().value;
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
  </style>
  