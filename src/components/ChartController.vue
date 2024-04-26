<template>
    
    <section class="wrapper">
        <h5>Filters</h5>
        <div class="flexbox item">

            <form class="sample-form" @submit.prevent="handleSubmit">
                <label for="player-info" class="spacer  ">Player:
                    <select id="player-info" v-model="selectedPlayerID" 
                    @change="cloudSaveData.SetSelectedPID(selectedPlayerID)">
                        <option selected value=''>All Players</option> 
                        <option v-for="player in cloudSaveData.playerList" 
                        :key="player.id" :value="player.id">{{ player.id }}</option>
                    </select>
                </label>
                <label v-if="selectedPlayerID!=''" for="session-info" class="spacer">Session:
                    <select id="session-info" v-model="selectedSessionID" @change="cloudSaveData.SetSelectedSID(selectedSessionID)">
                        <option selected value=''>All Sessions...</option>
                        <option v-for="session in sessionOptions" :key="session" :value="session">{{ session }}</option>
                    </select>
                </label><br/>
                
                <label for="PID" class="spacer">PlayerID:
                    <input disabled id="PID" v-model="selectedPlayerID">
                </label><br/>
            </form> 
                <div>
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th v-if="selectedPlayerID === '' || selectedSessionID === ''">Sessions</th>
                                <th v-else>Session ID</th>
                                <th v-if="selectedSessionID === '' ">Ave. Time<br/> per Round</th>
                                <th v-else>Time Played</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Deaths</th>
                                <th>Death By Enemy</th>
                                <th>Death By Self</th>
                                <th>Room Death <br/>(Kill Protocol)</th>
                                <th>Kills</th>
                                <th>Trap Set</th>
                                <th>Trap Kills</th>
                                <th>Traps Triggered</th>
                                <th>Traps Avoided</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="selectedPlayerID === '' || selectedSessionID === ''">
                                <td>{{ selectedSessionID || displayData.sessions }}</td>
                                <td>{{ displayData.averageTime }}s</td>
                                <td>{{ displayData.wins }}</td>
                                <td>{{ displayData.losses }}</td>
                                <td>{{ displayData.deaths }}</td>
                                <td>{{ displayData.deathbyEnemy }}</td>
                                <td>{{ displayData.deathbySelf }}</td>
                                <td>{{ displayData.roomDeaths }}</td>
                                <td>{{ displayData.kills }}</td>
                                <td>{{ displayData.trapsSet }}</td>
                                <td>{{ displayData.trapKills }}</td>
                                <td>{{ displayData.trapsTriggered }}</td>
                                <td>{{ displayData.trapsAvoided}}</td>
                            </tr>
                            <tr v-else-if="selectedSessionID"></tr>
                                <td>{{ selectedSessionID }}</td>
                                <td>{{ displayData.TimePlayed }}</td>
                                <td>{{ displayData.Wins }}</td>
                                <td>{{ displayData.Losses }}</td>
                                <td>{{ displayData.Deaths }}</td>
                                <td>{{ displayData.DeathbyEnemyTrap }}</td>
                                <td>{{ displayData.DeathbyOwnTrap }}</td>
                                <td>{{ displayData.DeathbyRoom }}</td>
                                <td>{{ displayData.Kills }}</td>
                                <td>{{ displayData.TrapsSet }}</td>
                                <td>{{ displayData.TrapKills }}</td>
                                <td>{{ displayData.TrapsTriggered }}</td>
                                <td>{{ displayData.TrapsAvoided }}</td>
                        </tbody>
                    </table>
                </div>

                <div>
                    <table class="styled-table">
                        <thead>
                            <tr class="vertical">
                                <th><img src="/src/assets/BouncingBetty.png" class="trap-icon"></th>
                                <th><img src="/src/assets/DoomPuff.png" class="trap-icon"></th>
                                <th><img src="/src/assets/Frame 5PoisonDart (1).png" class="trap-icon"></th>
                                <th><img src="/src/assets/SkyfallSnare.png" class="trap-icon"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>138</td>
                                <td>67</td>
                                <td>136</td>
                                <td>111</td>
                            </tr>
                        </tbody>
                            
                    </table>
                </div>
            

        </div>


    </section>

</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useCloudSaveStore } from '@/stores/cloudSaveData';
    const cloudSaveData = useCloudSaveStore();
    
    async function retrieveAllPlayerData() {
      await cloudSaveData.FetchAllPlayerData();
    }

    async function retrievePlayerList(){
        try {
            await cloudSaveData.FetchPlayerList();
        }
        catch (error) {
            console.log('Error retrieving player list', error)
        }
    }

    // Fetch player list on component mount 
    onMounted(async () => {
        await retrievePlayerList();
        await retrieveAllPlayerData();
        cloudSaveData.GetAggregateData();
    })
    // update selected PID in cloudSaveData pinia store
    const selectedPlayerID = computed({
        get: () => cloudSaveData.selectedPID|| '',
        set: (valueX) => {
            cloudSaveData.SetSelectedPID(valueX)
        }
    })

    const selectedSessionID = computed({
        get: () => cloudSaveData.selectedSID|| '',
        set: (valueX) => {
            cloudSaveData.SetSelectedSID(valueX)
        }
    })

    const sessionOptions = computed(() => {
        if (!selectedPlayerID.value) return [];
        return Object.keys(cloudSaveData.playerData[selectedPlayerID.value] || {});
    })
    
    const displayData = computed(() => {
        if (!selectedPlayerID.value) {
            return cloudSaveData.GetAggregateData(); // gets aggregate data for all players
        } else if (selectedPlayerID.value && !selectedSessionID.value) {
            return cloudSaveData.GetPlayerAggregateData(selectedPlayerID.value); // gets aggregate for one player
        } else {
            return cloudSaveData.GetSessionData(selectedPlayerID.value, selectedSessionID.value); // data for a specific session
        }
    })
    
</script>

<style scoped>
.submit {
    width: 100px; 
    height:25px;
    margin-left: 20px;
    text-align:center;
}

.spacer {
    font-size: 15px;
    padding-left: 10px; 
}
*:disabled {
  background-color: rgb(124, 124, 124);
  color: linen;
  opacity: 1;
  width: fit-content;
}
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(63, 63, 63, 0.15);
}
.styled-table thead tr {
    background-color: #e47900;
    color: #ffffff;
    text-align: left;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #242424;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #e47900;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #d6801e;
}
.trap-icon {
    align-content: center;
    width: 50px;
}
</style>