import { defineStore } from "pinia";

export const useChartInfo = defineStore('chartInfo', {

    state: () => ({
        playerStats: [
            { matchId: 1, wins: 5, losses: 3, draws: 2, gameMode: 'Solo', kills: 10, assists: 4, deaths: 6, jumpTimes: 15 },

        ],
    }),

    // getters and actions
    getters: {

        getPlayerStats(state) {
            return state.playerStats;
        },
        
    }, 

    actions: {

        updatePlayerStat(matchId, newStats) {
            const statIndex = this.playerStats.findIndex(stat => stat.matchId === matchId);
            if(statIndex !== -1) {
                this.playerStats[statIndex] = {...this.playerStats[statIndex], ...newStats};
            }
            
        },
    }
    
})
