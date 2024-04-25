// Created on Wed Apr 19 2024 || Copyright© 2024 || By: Alex Buzmion II
import { callUnityAPI } from '@/services/unityService'
import { defineStore } from 'pinia'
import { convertToDictionary } from '@/utility/utils'

const projectId = import.meta.env.VITE_PROJECT_ID

export const useCloudSaveStore = defineStore('cloudSaveData', {
    state: () => ({
        selectedPID:'',
        selectedSID:'',
        playerData: {},
        movePositions: {}, 
        playerList: [],
    }),

    actions: {
        async fetchPlayerData(authType = 'Bearer') {
            const playerId = "OhtjllIePqaXKkLjczbnvRQcLiJa" // const for now but needs a way to pull it all
            try {
              const data = await callUnityAPI(`/v1/data/projects/${encodeURIComponent(projectId)}/players/${playerId}/items`, authType, 2, 'GET')
              console.log(data)
            } 
            catch (error) {
              console.error('Error fetching environment names:', error)
            }
        },

        async fetchPlayerList(authType = 'Basic') {
            try {
                const data = await callUnityAPI(`/player-identity/v1/projects/${encodeURIComponent(projectId)}/users?limit=500`, authType, 1)
                this.playerList = data.results || []; // append player list in the state playerList
            }
            catch (error){
                console.error('Error fetching player list:', error)
            }
        },

        // a function to iterate through the player list and get the player data and store them in the state playerData
        async fetchAllPlayerData(authType = 'Bearer') {
            let allPlayerData = {};
            
            for (let player of this.playerList) {
                try {
                    const response = await callUnityAPI(`/v1/data/projects/${encodeURIComponent(projectId)}/players/${player.id}/items`, authType, 2);
                    console.log(`Data for player ${player.id}:`, response);
                    
                    // if data.items is an array and transformToDictionary transforms it to an object
                    if (response.results && Array.isArray(response.results)) {
                        allPlayerData[player.id] = convertToDictionary(response.results);
                    } else {
                        console.error(`Expected an array for player data, received:`, response.results);
                    }
                } catch (error) {
                    console.error('Error fetching player data for player ID:', player.id, error);
                }
            }
        
            // Now update the state with all fetched and transformed player data
            this.playerData = allPlayerData;
        },
        
        pSetSelectedPID(id) {
            this.selectedPID = id;
        },

        pSetSelectedSID(id) {
            this.selectedSID = id;
        },

        // method when all players is selected
        getAggregateData() {
            let totalStats = {
                sessions: 0, // total
                averageTime: 0, // average
                wins: 0, // total
                losses: 0, // total
                deaths: 0, // average
                deathbyEnemy: 0, // average
                deathbySelf: 0, // average
                roomDeaths: 0, // average
                kills: 0, // average
                trapKills: 0, // average
                trapsSet: 0, // average
                trapsTriggered: 0, // average
                trapsAvoided: 0, // average
            }

            Object.values(this.playerData).forEach(player => {
                Object.values(player).forEach(stats => {
                    totalStats.sessions += 1;
                    totalStats.averageTime += stats.TimePlayed || 0;
                    totalStats.wins += stats.Wins || 0;
                    totalStats.losses += stats.Losses || 0;
                    totalStats.deaths += stats.Deaths || 0;
                    totalStats.deathbyEnemy += stats.DeathbyEnemyTrap || 0;
                    totalStats.deathbySelf += stats.DeathbyOwnTrap || 0;
                    totalStats.roomDeaths += stats.DeathbyRoom || 0;
                    totalStats.kills += stats.Kills || 0;
                    totalStats.trapKills += stats.TrapKills || 0;
                    totalStats.trapsSet += stats.TrapsSet || 0;
                    totalStats.trapsTriggered += stats.TrapsTriggered || 0;
                    totalStats.trapsAvoided += stats.TrapsAvoided || 0;
                })
            })
            
            // Compute averages
            if (totalStats.sessions > 0) {
                totalStats.averageTime /=  totalStats.sessions
                totalStats.deaths /=       totalStats.sessions
                totalStats.deathbyEnemy /= totalStats.sessions
                totalStats.deathbySelf /=  totalStats.sessions
                totalStats.roomDeaths /= totalStats.sessions
                totalStats.kills /= totalStats.sessions
                totalStats.trapKills /= totalStats.sessions
                totalStats.trapsSet /= totalStats.sessions
                totalStats.trapsTriggered /= totalStats.sessions
                totalStats.trapsAvoided /= totalStats.sessions
            }
            for (let key in totalStats) {
                totalStats[key] = parseFloat(totalStats[key].toFixed(2))
            }
            return totalStats
        },

        getPlayerAggregateData(playerId) {
            const playerStats = {
                sessions: 0, // total
                averageTime: 0, // average
                wins: 0, // total
                losses: 0, // total
                deaths: 0, // average
                deathbyEnemy: 0, // average
                deathbySelf: 0, // average
                roomDeaths: 0, // average
                kills: 0, // average
                trapKills: 0, // average
                trapsSet: 0, // average
                trapsTriggered: 0, // average
                trapsAvoided: 0, // average
            };
        
            const sessions = Object.values(this.playerData[playerId] || {});
            playerStats.sessions = sessions.length;
        
            sessions.forEach(session => {
                playerStats.averageTime += session.TimePlayed || 0;
                playerStats.wins += session.Wins || 0;
                playerStats.losses += session.Losses || 0;
                playerStats.deaths += session.Deaths || 0;
                playerStats.deathbyEnemy += session.DeathbyEnemyTrap || 0;
                playerStats.deathbySelf += session.DeathbyOwnTrap || 0;
                playerStats.roomDeaths += session.DeathbyRoom || 0;
                playerStats.kills += session.Kills || 0;
                playerStats.trapKills += session.TrapKills || 0;
                playerStats.trapsSet += session.TrapsSet || 0;
                playerStats.trapsTriggered += session.TrapsTriggered || 0;
                playerStats.trapsAvoided += session.TrapsAvoided || 0;
            });
        
            // Compute averages
            if (playerStats.sessions > 0) {
                playerStats.averageTime /= playerStats.sessions
                playerStats.deaths /= playerStats.sessions
                playerStats.deathbyEnemy /= playerStats.sessions
                playerStats.deathbySelf /= playerStats.sessions
                playerStats.roomDeaths /= playerStats.sessions
                playerStats.kills /= playerStats.sessions
                playerStats.trapKills /= playerStats.sessions
                playerStats.trapsSet /= playerStats.sessions
                playerStats.trapsTriggered /= playerStats.sessions
                playerStats.trapsAvoided /= playerStats.sessions
            }
            for (let key in playerStats) {
                playerStats[key] = parseFloat(playerStats[key].toFixed(2))
            }
            return playerStats;
        },
        
        getSessionData(playerId, sessionId) {
            const playerSessions = this.playerData[playerId];
            if (!playerSessions) return {};
        
            const sessionKeys = Object.keys(playerSessions); // get all session keys like ['playerStats1', 'playerStats2', ...]
            const sessionIndex = sessionKeys.findIndex(key => key === sessionId); // Find the index of the specific session key
        
            if (sessionIndex === -1) return {}; // if the session key is not found
        
            const sessionData = playerSessions[sessionId];
            if (!sessionData) return {};
        
            return {
                sessionId: sessionId, // the key of the session
                averageTime: parseFloat((sessionData.TimePlayed).toFixed(2)), // time played
                ...sessionData  // spread the session data
            };
        }
        
    },

    getters: {
        pSelectedPlayer: (state) => {
            return state.playerList.find(p => p.id === state.selectedPID) || null
        },

    }

})