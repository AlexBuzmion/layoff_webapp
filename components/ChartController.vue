<template>
    
    <section class="wrapper">
        <h5>Filters</h5>
        <div class="flexbox item">

            <form class="sample-form" @submit.prevent="handleSubmit">
                <label for="player-info" class="spacer  ">Player:
                    <select id="player-info" v-model="selectedPlayerID" 
                    @change="playerData.pSetSelectedPID(selectedPlayerID)">
                        <option selected disabled value=''>Select a player...</option> 
                        <option v-for="player in playerData.playerIDs" 
                        :key="player.id" :value="player.id">{{ player.name }}</option>
                    </select>
                </label>
                <!-- Todo: instantiate all of the input and labels programmatically -->
                <!-- <label v-for="key in statKeys" :key="key" :for="key" class="spacer">{{ key }}:
                <input :id="key" v-model="formState[key]" placeholder="N/A">
                </label> -->
                <label for="PID" class="spacer">PlayerID:
                    <input id="PID" v-model="selectedPlayerID">
                </label>
                <label for="deathPos" class="spacer">Death Position</label>
                <label for="deathPosX" class="spacer">| X: 
                    <input id="deathPosX" v-model="DeathPosX" placeholder="N/A">
                </label>
                <label for="deathPosY" class="spacer">Y: 
                    <input name="deathPosY" v-model="DeathPosY" placeholder="N/A">  |
                </label>
                <label for="wins" class="spacer">Wins: 
                    <input name="wins" v-model="Wins" placeholder="N/A">
                </label>
                <label for="losses" class="spacer">Losses: 
                    <input name="losses" v-model="Losses" placeholder="N/A">
                </label>
                <label for="draws" class="spacer">Draws: 
                    <input name="draws" v-model="Draws" placeholder="N/A">
                </label>
                <br/>
                <label for="kills" class="spacer">Kills: 
                    <input name="kills" v-model="Kills" placeholder="N/A">
                </label>
                <label for="deaths" class="spacer">Deaths: 
                    <input name="deaths" v-model="Deaths" placeholder="N/A">
                </label>
                <label for="assists" class="spacer">Assists: 
                    <input name="assists" v-model="Assists" placeholder="N/A">
                </label>
                

                <br/>
                <button type="submit" class="submit">Submit</button>
            </form> 

        </div>


    </section>

</template>

<script setup>
    import { ref, computed} from 'vue'
    import { usePlayerInfo } from '@/stores/playerIDinfo';

    const playerData = usePlayerInfo();

    // these are the variables to programmatically instantiate input and labels in the DOM
    // const statKeys = ref(['ID', 'Name', 'DeathPosX','DeathPosY', 'matchID','Wins', 'Losses','Draws', 'GameMode','Kills', 'Assists','Deaths', 'ShotAccuracy',])
    
    const selectedPlayerID = computed({
        get: () => playerData.selectedPID || '',
        set: (valueX) => {
            playerData.pSetSelectedPID(valueX)
        }
    })

    const DeathPosY = computed({
        get: () => playerData.pSelectedPlayer?.deathPosY?? 'N/A',
        set: (valueY) => {
            if(playerData.selectedPID){
                playerData.pDeathPosY(valueY)
            }
        }
    })

    const DeathPosX = computed({
        get: () => playerData.pSelectedPlayer?.deathPosX?? 'N/A',
        set: (valueX) => {
            if(playerData.selectedPID){
                playerData.pDeathPosX(valueX)
            }
        }
    })
    const Wins = computed({
        get: () => playerData.pSelectedPlayer?.wins?? 'N/A',
        set: (newWins) => {
            if(playerData.selectedPID){
                playerData.pWins(newWins)
            }
        }
    })
    const Losses = computed({
        get: () => playerData.pSelectedPlayer?.losses?? 'N/A',
        set: (newLoss) => {
            if(playerData.selectedPID){
                playerData.pLosses(newLoss)
            }
        }
    })
    const Draws = computed({
        get: () => playerData.pSelectedPlayer?.draws?? 'N/A',
        set: (newDraw) => {
            if(playerData.selectedPID){
                playerData.pDraws(newDraw)
            }
        }
    })
    const Kills = computed({
        get: () => playerData.pSelectedPlayer?.kills?? 'N/A',
        set: (newDraw) => {
            if(playerData.selectedPID){
                playerData.pKills(newDraw)
            }
        }
    })
    const Deaths = computed({
        get: () => playerData.pSelectedPlayer?.deaths?? 'N/A',
        set: (newDraw) => {
            if(playerData.selectedPID){
                playerData.pDeaths(newDraw)
            }
        }
    })
    const Assists = computed({
        get: () => playerData.pSelectedPlayer?.assists?? 'N/A',
        set: (newDraw) => {
            if(playerData.selectedPID){
                playerData.pAssists(newDraw)
            }
        }
    })

    function handleSubmit(){
        playerData.pDeathPosX(DeathPosX.value)
        playerData.pWins(Wins.value)
        playerData.pLosses(Losses.value)
        playerData.pDraws(Draws.value)
        playerData.pKills(Kills.value)
        playerData.pDeaths(Deaths.value)
        playerData.pAssists(Assists.value)
    }

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
    padding-left: 20px; 
}

input {
    width: 70px
}
    
</style>