<template>
    <section class="wrapper">
      <h5>Filters</h5>
      <div class="flexbox item">
        <form class="sample-form" @submit.prevent="handleSubmit">
          <label for="player-info" class="spacer">Player:
            <select id="player-info" v-model="selectedPlayerID" @change="cloudSaveData.SetSelectedPID(selectedPlayerID)">
              <option selected value=''>All Players</option>
              <option v-for="player in cloudSaveData.playerList" :key="player.id" :value="player.id">{{ player.id }}</option>
            </select>
          </label>
          <label v-if="selectedPlayerID != ''" for="session-info" class="spacer">Session:
            <select id="session-info" v-model="selectedSessionID" @change="cloudSaveData.SetSelectedSID(selectedSessionID)">
              <option selected value=''>All Sessions...</option>
              <option v-for="session in sessionOptions" :key="session" :value="session">{{ session }}</option>
            </select>
          </label><br />
          <label for="PID" class="spacer">PlayerID:
            <input disabled id="PID" v-model="selectedPlayerID">
          </label><br />
        </form>
        <div>
          <table class="styled-table">
            <thead>
              <tr v-if="selectedPlayerID === '' || selectedSessionID === ''">
                <th>Sessions</th>
                <th>Play Time Ave.</th>
                <th>Deaths</th>
                <th>Kills</th>
                <th>Trap Set</th>
              </tr>
              <tr v-else-if="selectedSessionID">
                <th>Session ID</th>
                <th>Time Played</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Deaths</th>
                <th>Kills</th>
                <th>Trap Set</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="selectedPlayerID === '' || selectedSessionID === ''">
                <td>{{ selectedSessionID || displayData.sessions }}</td>
                <td>{{ displayData.averageTime }}s</td>
                <td>{{ displayData.deaths }}</td>
                <td>{{ displayData.kills }}</td>
                <td>{{ displayData.trapsSet }}</td>
              </tr>
              <tr v-else-if="selectedSessionID">
                <td>{{ selectedSessionID }}</td>
                <td>{{ displayData.TimePlayed }}</td>
                <td>{{ displayData.Wins }}</td>
                <td>{{ displayData.Losses }}</td>
                <td>{{ displayData.Deaths }}</td>
                <td>{{ displayData.Kills }}</td>
                <td>{{ displayData.TrapsSet }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
            <div>
          <h3>Player Actions</h3>
          <table class="styled-table">
            <thead>
              <tr class="vertical">
                <th>Dashed</th>
                <th>Crouched</th>
                <th>Shoved</th>
                <th>Time of First Dash</th>
                <th>Time of First Crouch</th>
                <th>Time of First Shove</th>
                <th>Time of First Trap Set</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ displayData.timesDashed }}</td>
                <td>{{ displayData.timesCrouched }}</td>
                <td>{{ displayData.timesShoved }}</td>
                <td>{{ displayData.timeOfFirstDash }}s</td>
                <td>{{ displayData.timeOfFirstCrouch }}s</td>
                <td>{{ displayData.timeOfFirstShove }}s</td>
                <td>{{ displayData.timeOfFirstTrapSet }}s</td>
              </tr>
            </tbody>
          </table>
        </div>
          <h3>Keycard Stats</h3>
          <h5>Time of</h5>
          <table class="styled-table">
            <thead>
              <tr class="vertical">
                <th>1st Card Collected</th>
                <th>2nd Card Collected</th>
                <th>3rd Card Collected</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="selectedPlayerID === '' || selectedSessionID === ''">
                <td>{{ displayData.timeFirstKeyCollected }}s</td>
                <td>{{ displayData.timeSecondKeyCollected }}s</td>
                <td>{{ displayData.timeThirdKeyCollected }}s</td>
              </tr>
              <tr v-else-if="selectedSessionID">
                <td>{{ displayData.timeFirstKeyCollected }}s</td>
                <td>{{ displayData.timeSecondKeyCollected }}s</td>
                <td>{{ displayData.timeThirdKeyCollected }}s</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Deaths</h3>
          <h5>By Cause</h5>
          <table class="styled-table">
            <thead>
              <tr class="vertical">
                <th v-if="displayData.player === 1">Self</th>
                <th v-else>Player 1</th>
                <th v-if="displayData.player === 2">Self</th>
                <th v-else>Player 2</th>
                <th v-if="displayData.player === 3">Self</th>
                <th v-else>Player 3</th>
                <th v-if="displayData.player === 4">Self</th>
                <th v-else>Player 4</th>
                <th>Environment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="selectedPlayerID === '' || selectedSessionID === ''">
                <td>{{ displayData.totalsByPlayerKills?.Player1 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Player2 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Player3 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Player4 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Environment || 0 }}</td>
              </tr>
              <tr v-else-if="selectedSessionID">
                <td>{{ displayData.totalsByPlayerKills?.Player1 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Player2 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Player3 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Player4 || 0 }}</td>
                <td>{{ displayData.totalsByPlayerKills?.Environment || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Trap Stats</h3>
          <table class="styled-table">
            <thead>
              <tr class="vertical">
                <th>Poison Dart</th>
                <th>Bouncing Betty</th>
                <th>Ceiling Trap</th>
                <th>Doom Puff</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ displayData.trapsSetByType?.Trap1 || 0 }}</td>
                <td>{{ displayData.trapsSetByType?.Trap2 || 0 }}</td>
                <td>{{ displayData.trapsSetByType?.Trap3 || 0 }}</td>
                <td>{{ displayData.trapsSetByType?.Trap4 || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useCloudSaveStore } from '@/stores/cloudSaveData';

const cloudSaveData = useCloudSaveStore();

async function retrieveAllPlayerData() {
  await cloudSaveData.FetchAllPlayerData();
}

async function retrievePlayerList() {
  try {
    await cloudSaveData.FetchPlayerList();
  } catch (error) {
    //console.log('Error retrieving player list', error);
  }
}

onMounted(async () => {
  await retrievePlayerList();
  await retrieveAllPlayerData();
  cloudSaveData.GetAggregateData();
});

const selectedPlayerID = computed({
  get: () => cloudSaveData.selectedPID || '',
  set: (valueX) => {
    cloudSaveData.SetSelectedPID(valueX);
    resetSessionID();
  }
});

const selectedSessionID = computed({
  get: () => cloudSaveData.selectedSID || '',
  set: (valueX) => {
    cloudSaveData.SetSelectedSID(valueX);
  }
});

const sessionOptions = computed(() => {
  if (!selectedPlayerID.value) return [];
  return Object.keys(cloudSaveData.playerData[selectedPlayerID.value] || {});
});

const displayData = computed(() => {
  let data = {};
  if (!selectedPlayerID.value) {
    data = cloudSaveData.GetAggregateData();
  } else if (selectedPlayerID.value && !selectedSessionID.value) {
    data = cloudSaveData.GetPlayerAggregateData(selectedPlayerID.value);
  } else {
    data = cloudSaveData.GetSessionData(selectedPlayerID.value, selectedSessionID.value);
  }

  if (data.KillsByTrap) {
    data.totalKillsByTrap = calculateTotalByType(data.KillsByTrap);
    data.totalsByPlayerKills = calculateTotalsByPlayer(data.KillsByTrap);
  }

  if (data.DeathsByCause) {
    data.totalDeathsByCause = calculateTotalByType(data.DeathsByCause);
    data.totalsByPlayerDeaths = calculateTotalsByPlayer(data.DeathsByCause);
  }

  // Adding new data calculations for PlayerActions and TrapsSetByType
  if (data.PlayerActions) {
    data.timesDashed = calculateTotalActions(data.PlayerActions, 'Dash');
    data.timesCrouched = calculateTotalActions(data.PlayerActions, 'Crouch');
    data.timesInteracted = calculateTotalActions(data.PlayerActions, 'Interacted');
    data.timesShoved = calculateTotalActions(data.PlayerActions, 'Shove');
    data.timesJumped = calculateTotalActions(data.PlayerActions, 'Jump');

    data.timeOfFirstDash = calculateFirstActionTime(data.PlayerActions, 'Dash');
    data.timeOfFirstCrouch = calculateFirstActionTime(data.PlayerActions, 'Crouch');
    data.timeOfFirstShove = calculateFirstActionTime(data.PlayerActions, 'Shove');
    data.timeOfFirstTrapSet = calculateFirstActionTime(data.PlayerActions, 'TrapSet');
  }

  if (data.TrapsSetByType) {
    data.trapsSetByType = data.TrapsSetByType;
  }

  return data;
});

function calculateTotalByType(dataByType) {
  let total = 0;
  for (let key in dataByType) {
    if (typeof dataByType[key] === 'object') {
      for (let type in dataByType[key]) {
        total += dataByType[key][type];
      }
    } else {
      total += dataByType[key];
    }
  }
  return total;
}

function calculateTotalsByPlayer(dataByType) {
  let totalsByPlayer = {};
  for (let key in dataByType) {
    if (typeof dataByType[key] === 'object') {
      for (let type in dataByType[key]) {
        if (!totalsByPlayer[key]) {
          totalsByPlayer[key] = 0;
        }
        totalsByPlayer[key] += dataByType[key][type];
      }
    } else {
      if (!totalsByPlayer['Environment']) {
        totalsByPlayer['Environment'] = 0;
      }
      totalsByPlayer['Environment'] += dataByType[key];
    }
  }
  return totalsByPlayer;
}

function calculateTotalActions(actions, actionType) {
  return actions.filter(action => action.Action === actionType).length;
}

function calculateFirstActionTime(actions, actionType) {
  const action = actions.find(action => action.Action === actionType);
  return action ? action.Time : 0;
}

function resetSessionID() {
  cloudSaveData.SetSelectedSID('');
}

watch(selectedPlayerID, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    resetSessionID();
  }
});
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