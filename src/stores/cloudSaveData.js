// Created on Wed Apr 19 2024 || Copyright© 2024 || By: Alex Buzmion II
/*  API call structure: takes in the authentication type, the endpoint, and the body of the request
  * The function then fetches the access token and makes the API call to the specific endpoint
  * Then passes to callUnityAPI() in unityService.js for proper formatting & handling
  * The function returns the data from the API call and stores it in the state
*/

import { callUnityAPI } from '@/services/unityService'
import { defineStore } from 'pinia'
import { convCSToDict } from '@/utility/utils'

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
        async FetchPlayerList(authType = 'Basic') {
            try {
                const data = await callUnityAPI(`/player-identity/v1/projects/${encodeURIComponent(projectId)}/users?limit=500`, authType, 1)
                this.playerList = data.results || []; // append player list in the state playerList
            }
            catch (error){
                console.error('Error fetching player list:', error)
            }
        },

        // a function to iterate through the player list and get the player data and store them in the state playerData
        async FetchAllPlayerData(authType = 'Bearer') {
            let allPlayerData = {};
            
            for (let i = 0; i < this.playerList.length; i++) {
                const player = this.playerList[i];
                try {
                    const response = await callUnityAPI(`/v1/data/projects/${encodeURIComponent(projectId)}/players/${player.id}/items`, authType, 2);
                    // if data.items is an array and transformToDictionary transforms it to an object
                    if (response.results && Array.isArray(response.results) && response.results.length > 0) {
                        allPlayerData[player.id] = convCSToDict(response.results);
                    } else {
                        // if no data found for a specific player, delete the playerID from the playerList[]
                        this.playerList.splice(i, 1);
                        i--; // adjust index after removal
                    }
                } catch (error) {
                    console.error('Error fetching player data for player ID:', player.id, error);
                }
            }
        
            // Now update the state with all fetched and transformed player data
            this.playerData = allPlayerData;
            // console.log('All player data:', allPlayerData);
        },
        
        SetSelectedPID(id) {
            this.selectedPID = id;
        },

        SetSelectedSID(id) {
            this.selectedSID = id;
        },

        // method when all players is selected
        GetAggregateData() {
            let totalStats = {
                sessions: 0,
                averageTime: 0,
                wins: 0,
                losses: 0,
                deaths: 0,
                kills: 0,
                trapKills: 0,
                trapsSet: 0,
                trapsTriggered: 0,
                trapsAvoided: 0,
                timesCrouched: 0,
                timesDashed: 0,
                timesShoved: 0,
                timeOfFirstCrouch: 0,
                timeOfFirstDash: 0,
                timeOfFirstDeath: 0,
                timeOfFirstKill: 0,
                timeOfFirstShove: 0,
                timeOfFirstTrapSet: 0,
                timeFirstKeyCollected: 0,
                timeSecondKeyCollected: 0,
                timeThirdKeyCollected: 0,
                deathByCause: {},
                killsByTrap: {},
                trapsSetByType: {},
                trapsTriggeredByType: {}
            }

            let keyCard1Count = 0;
            let keyCard2Count = 0;
            let keyCard3Count = 0;

            Object.values(this.playerData).forEach(player => {
                Object.values(player).forEach(stats => {
                    totalStats.sessions += 1;
                    totalStats.averageTime += stats.TimePlayed || 0;
                    totalStats.wins += stats.Wins || 0;
                    totalStats.losses += stats.Losses || 0;
                    totalStats.deaths += stats.Deaths || 0;
                    totalStats.kills += stats.Kills || 0;
                    totalStats.trapKills += stats.TrapKills || 0;
                    totalStats.trapsSet += stats.TrapsSet || 0;
                    totalStats.trapsTriggered += stats.TrapsTriggered || 0;
                    totalStats.trapsAvoided += stats.TrapsAvoided || 0;
                    totalStats.timesCrouched += stats.TimesCrouched || 0;
                    totalStats.timesDashed += stats.TimesDashed || 0;
                    totalStats.timesShoved += stats.TimesShoved || 0;
                    totalStats.timeOfFirstCrouch += stats.timeOfFirstCrouch || 0;
                    totalStats.timeOfFirstDash += stats.timeOfFirstDash || 0;
                    totalStats.timeOfFirstDeath += stats.timeOfFirstDeath || 0;
                    totalStats.timeOfFirstKill += stats.timeOfFirstKill || 0;
                    totalStats.timeOfFirstShove += stats.timeOfFirstShove || 0;
                    totalStats.timeOfFirstTrapSet += stats.timeOfFirstTrapSet || 0;

                    if (stats.timeFirstKeyCollected > 0) {
                        totalStats.timeFirstKeyCollected += stats.timeFirstKeyCollected;
                        keyCard1Count++;
                    }
                    if (stats.timeSecondKeyCollected > 0) {
                        totalStats.timeSecondKeyCollected += stats.timeSecondKeyCollected;
                        keyCard2Count++;
                    }
                    if (stats.timeThirdKeyCollected > 0) {
                        totalStats.timeThirdKeyCollected += stats.timeThirdKeyCollected;
                        keyCard3Count++;
                    }

                    for (let key in stats.DeathsByCause) {
                        if (totalStats.deathByCause[key]) {
                            totalStats.deathByCause[key] += stats.DeathsByCause[key];
                        } else {
                            totalStats.deathByCause[key] = stats.DeathsByCause[key];
                        }
                    }

                    for (let key in stats.KillsByTrap) {
                        if (totalStats.killsByTrap[key]) {
                            totalStats.killsByTrap[key] += stats.KillsByTrap[key];
                        } else {
                            totalStats.killsByTrap[key] = stats.KillsByTrap[key];
                        }
                    }

                    for (let key in stats.TrapsSetByType) {
                        if (totalStats.trapsSetByType[key]) {
                            totalStats.trapsSetByType[key] += stats.TrapsSetByType[key];
                        } else {
                            totalStats.trapsSetByType[key] = stats.TrapsSetByType[key];
                        }
                    }

                    for (let key in stats.TrapsTriggeredByType) {
                        if (totalStats.trapsTriggeredByType[key]) {
                            totalStats.trapsTriggeredByType[key] += stats.TrapsTriggeredByType[key];
                        } else {
                            totalStats.trapsTriggeredByType[key] = stats.TrapsTriggeredByType[key];
                        }
                    }
                })
            })
            
            // Compute averages
            if (totalStats.sessions > 0) {
                totalStats.averageTime /= totalStats.sessions;
                totalStats.deaths /= totalStats.sessions;
                totalStats.kills /= totalStats.sessions;
                totalStats.trapKills /= totalStats.sessions;
                totalStats.trapsSet /= totalStats.sessions;
                totalStats.trapsTriggered /= totalStats.sessions;
                totalStats.trapsAvoided /= totalStats.sessions;
                totalStats.timesCrouched /= totalStats.sessions;
                totalStats.timesDashed /= totalStats.sessions;
                totalStats.timesShoved /= totalStats.sessions;
                totalStats.timeOfFirstCrouch /= totalStats.sessions;
                totalStats.timeOfFirstDash /= totalStats.sessions;
                totalStats.timeOfFirstDeath /= totalStats.sessions;
                totalStats.timeOfFirstKill /= totalStats.sessions;
                totalStats.timeOfFirstShove /= totalStats.sessions;
                totalStats.timeOfFirstTrapSet /= totalStats.sessions;

                if (keyCard1Count > 0) {
                    totalStats.timeFirstKeyCollected /= keyCard1Count;
                }
                if (keyCard2Count > 0) {
                    totalStats.timeSecondKeyCollected /= keyCard2Count;
                }
                if (keyCard3Count > 0) {
                    totalStats.timeThirdKeyCollected /= keyCard3Count;
                }
            }

            for (let key in totalStats) {
                if (typeof totalStats[key] === 'number') {
                    totalStats[key] = parseFloat(totalStats[key].toFixed(2));
                }
            }
            return totalStats
        },


        GetPlayerAggregateData(playerId) {
            const playerStats = {
                sessions: 0,
                averageTime: 0,
                wins: 0,
                losses: 0,
                deaths: 0,
                kills: 0,
                trapKills: 0,
                trapsSet: 0,
                trapsTriggered: 0,
                trapsAvoided: 0,
                timesCrouched: 0,
                timesDashed: 0,
                timesShoved: 0,
                timeOfFirstCrouch: 0,
                timeOfFirstDash: 0,
                timeOfFirstDeath: 0,
                timeOfFirstKill: 0,
                timeOfFirstShove: 0,
                timeOfFirstTrapSet: 0,
                timeFirstKeyCollected: 0,
                timeSecondKeyCollected: 0,
                timeThirdKeyCollected: 0,
                deathByCause: {},
                killsByTrap: {},
                trapsSetByType: {},
                trapsTriggeredByType: {},
                PlayerActions: []
            };
        
            const sessions = Object.values(this.playerData[playerId] || {});
            playerStats.sessions = sessions.length;
            
            let keyCard1Count = 0;
            let keyCard2Count = 0;
            let keyCard3Count = 0;

            sessions.forEach(session => {
                playerStats.averageTime += session.TimePlayed || 0;
                // aggregate other stats...
                playerStats.PlayerActions.push(...(session.PlayerActions || []));
            })

            sessions.forEach(session => {
                playerStats.averageTime += session.TimePlayed || 0;
                playerStats.wins += session.Wins || 0;
                playerStats.losses += session.Losses || 0;
                playerStats.deaths += session.Deaths || 0;
                playerStats.kills += session.Kills || 0;
                playerStats.trapKills += session.TrapKills || 0;
                playerStats.trapsSet += session.TrapsSet || 0;
                playerStats.trapsTriggered += session.TrapsTriggered || 0;
                playerStats.trapsAvoided += session.TrapsAvoided || 0;
                playerStats.timesCrouched += session.TimesCrouched || 0;
                playerStats.timesDashed += session.TimesDashed || 0;
                playerStats.timesShoved += session.TimesShoved || 0;
                playerStats.timeOfFirstCrouch += session.timeOfFirstCrouch || 0;
                playerStats.timeOfFirstDash += session.timeOfFirstDash || 0;
                playerStats.timeOfFirstDeath += session.timeOfFirstDeath || 0;
                playerStats.timeOfFirstKill += session.timeOfFirstKill || 0;
                playerStats.timeOfFirstShove += session.timeOfFirstShove || 0;
                playerStats.timeOfFirstTrapSet += session.timeOfFirstTrapSet || 0;

                if (session.timeFirstKeyCollected > 0) {
                    playerStats.timeFirstKeyCollected += session.timeFirstKeyCollected;
                    keyCard1Count++;
                }
                if (session.timeSecondKeyCollected > 0) {
                    playerStats.timeSecondKeyCollected += session.timeSecondKeyCollected;
                    keyCard2Count++;
                }
                if (session.timeThirdKeyCollected > 0) {
                    playerStats.timeThirdKeyCollected += session.timeThirdKeyCollected;
                    keyCard3Count++;
                }

                for (let key in session.DeathsByCause) {
                    if (playerStats.deathByCause[key]) {
                        playerStats.deathByCause[key] += session.DeathsByCause[key];
                    } else {
                        playerStats.deathByCause[key] = session.DeathsByCause[key];
                    }
                }

                for (let key in session.KillsByTrap) {
                    if (playerStats.killsByTrap[key]) {
                        playerStats.killsByTrap[key] += session.KillsByTrap[key];
                    } else {
                        playerStats.killsByTrap[key] = session.KillsByTrap[key];
                    }
                }

                for (let key in session.TrapsSetByType) {
                    if (playerStats.trapsSetByType[key]) {
                        playerStats.trapsSetByType[key] += session.TrapsSetByType[key];
                    } else {
                        playerStats.trapsSetByType[key] = session.TrapsSetByType[key];
                    }
                }

                for (let key in session.TrapsTriggeredByType) {
                    if (playerStats.trapsTriggeredByType[key]) {
                        playerStats.trapsTriggeredByType[key] += session.TrapsTriggeredByType[key];
                    } else {
                        playerStats.trapsTriggeredByType[key] = session.TrapsTriggeredByType[key];
                    }
                }
            });

            // Compute averages
            if (playerStats.sessions > 0) {
                playerStats.averageTime /= playerStats.sessions;
                playerStats.deaths /= playerStats.sessions;
                playerStats.kills /= playerStats.sessions;
                playerStats.trapKills /= playerStats.sessions;
                playerStats.trapsSet /= playerStats.sessions;
                playerStats.trapsTriggered /= playerStats.sessions;
                playerStats.trapsAvoided /= playerStats.sessions;
                playerStats.timesCrouched /= playerStats.sessions;
                playerStats.timesDashed /= playerStats.sessions;
                playerStats.timesShoved /= playerStats.sessions;
                playerStats.timeOfFirstCrouch /= playerStats.sessions;
                playerStats.timeOfFirstDash /= playerStats.sessions;
                playerStats.timeOfFirstDeath /= playerStats.sessions;
                playerStats.timeOfFirstKill /= playerStats.sessions;
                playerStats.timeOfFirstShove /= playerStats.sessions;
                playerStats.timeOfFirstTrapSet /= playerStats.sessions;

                if (keyCard1Count > 0) {
                    playerStats.timeFirstKeyCollected /= keyCard1Count;
                }
                if (keyCard2Count > 0) {
                    playerStats.timeSecondKeyCollected /= keyCard2Count;
                }
                if (keyCard3Count > 0) {
                    playerStats.timeThirdKeyCollected /= keyCard3Count;
                }
            }

            for (let key in playerStats) {
                if (typeof playerStats[key] === 'number') {
                    playerStats[key] = parseFloat(playerStats[key].toFixed(2));
                }
            }
            return playerStats;
        },

        GetSessionData(playerId, sessionId) {
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
    }
})