import { callUnityAPI } from '@/services/unityService'
import { defineStore } from 'pinia'
import { convCSToDict } from '@/utility/utils'

const projectId = import.meta.env.VITE_PROJECT_ID

export const useCloudSaveStore = defineStore('cloudSaveData', {
  state: () => ({
    selectedPID: '',
    selectedSID: '',
    playerData: {},
    playerList: [],
  }),

  actions: {
    async FetchPlayerList(authType = 'Basic') {
      try {
        const data = await callUnityAPI(`/player-identity/v1/projects/${encodeURIComponent(projectId)}/users?limit=500`, authType, 1)
        this.playerList = data.results || []
        await this.filterPlayerListWithNoData()
      } catch (error) {
        console.error('Error fetching player list:', error)
      }
    },

    async filterPlayerListWithNoData() {
      let allPlayerData = {}
      let validPlayers = []
      for (let player of this.playerList) {
        try {
          const response = await callUnityAPI(`/v1/data/projects/${encodeURIComponent(projectId)}/players/${player.id}/items`, 'Bearer', 2)
          if (response.results && Array.isArray(response.results) && response.results.length > 0) {
            allPlayerData[player.id] = convCSToDict(response.results)
            validPlayers.push(player)
          }
        } catch (error) {
          console.error('Error fetching player data for player ID:', player.id, error)
        }
      }
      this.playerData = allPlayerData
      this.playerList = validPlayers
    },

    async FetchAllPlayerData(authType = 'Bearer') {
      let allPlayerData = {}

      for (let player of this.playerList) {
        try {
          const response = await callUnityAPI(`/v1/data/projects/${encodeURIComponent(projectId)}/players/${player.id}/items`, authType, 2)
          if (response.results && Array.isArray(response.results) && response.results.length > 0) {
            allPlayerData[player.id] = convCSToDict(response.results)
          }
        } catch (error) {
          console.error('Error fetching player data for player ID:', player.id, error)
        }
      }
      this.playerData = allPlayerData
    },

    SetSelectedPID(id) {
      this.selectedPID = id
    },

    SetSelectedSID(id) {
      this.selectedSID = id
    },

    GetAggregateData() {
      let totalStats = this.initializeStats()
      let keyCardCounts = this.initializeKeyCardCounts()

      Object.values(this.playerData).forEach(player => {
        Object.values(player).forEach(session => {
          this.aggregateSessionData(totalStats, session, keyCardCounts)
        })
      })

      this.computeAverages(totalStats, keyCardCounts)

      return totalStats
    },

    GetPlayerAggregateData(playerId) {
      let totalStats = this.initializeStats()
      let keyCardCounts = this.initializeKeyCardCounts()
      const playerSessions = this.playerData[playerId] || []

      Object.values(playerSessions).forEach(session => {
        this.aggregateSessionData(totalStats, session, keyCardCounts)
      })

      this.computeAverages(totalStats, keyCardCounts)

      return totalStats
    },

    GetSessionData(playerId, sessionId) {
        const playerSessions = this.playerData[playerId] || {};
        const sessionData = playerSessions[sessionId] || {};
        // Ensure all fields are returned
        return {
          ...this.initializeStats(),
          ...sessionData,
          PlayerActions: sessionData.PlayerActions || [],
        };
    },

    initializeStats() {
        return {
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
        }
      },

    initializeKeyCardCounts() {
      return {
        keyCard1Count: 0,
        keyCard2Count: 0,
        keyCard3Count: 0
      }
    },

    aggregateSessionData(totalStats, session, keyCardCounts) {
      totalStats.sessions += 1
      totalStats.averageTime += session.TimePlayed || 0
      totalStats.wins += session.Wins || 0
      totalStats.losses += session.Losses || 0
      totalStats.deaths += session.Deaths || 0
      totalStats.kills += session.Kills || 0
      totalStats.trapKills += session.TrapKills || 0
      totalStats.trapsSet += session.TrapsSet || 0
      totalStats.trapsTriggered += session.TrapsTriggered || 0
      totalStats.trapsAvoided += session.TrapsAvoided || 0
      totalStats.timesCrouched += session.TimesCrouched || 0
      totalStats.timesDashed += session.TimesDashed || 0
      totalStats.timesShoved += session.TimesShoved || 0
      totalStats.timeOfFirstCrouch += session.timeOfFirstCrouch || 0
      totalStats.timeOfFirstDash += session.timeOfFirstDash || 0
      totalStats.timeOfFirstDeath += session.timeOfFirstDeath || 0
      totalStats.timeOfFirstKill += session.timeOfFirstKill || 0
      totalStats.timeOfFirstShove += session.timeOfFirstShove || 0
      totalStats.timeOfFirstTrapSet += session.timeOfFirstTrapSet || 0

      if (session.timeFirstKeyCollected > 0) {
        totalStats.timeFirstKeyCollected += session.timeFirstKeyCollected
        keyCardCounts.keyCard1Count++
      }
      if (session.timeSecondKeyCollected > 0) {
        totalStats.timeSecondKeyCollected += session.timeSecondKeyCollected
        keyCardCounts.keyCard2Count++
      }
      if (session.timeThirdKeyCollected > 0) {
        totalStats.timeThirdKeyCollected += session.timeThirdKeyCollected
        keyCardCounts.keyCard3Count++
      }

      this.aggregateByType(totalStats.deathByCause, session.DeathsByCause)
      this.aggregateByType(totalStats.killsByTrap, session.KillsByTrap)
      this.aggregateByType(totalStats.trapsSetByType, session.TrapsSetByType)
      this.aggregateByType(totalStats.trapsTriggeredByType, session.TrapsTriggeredByType)
      totalStats.PlayerActions = totalStats.PlayerActions.concat(session.PlayerActions || [])
    },

    aggregateByType(target, source) {
      for (let key in source) {
        if (target[key]) {
          target[key] += source[key]
        } else {
          target[key] = source[key]
        }
      }
    },

    computeAverages(totalStats, keyCardCounts) {
      if (totalStats.sessions > 0) {
        totalStats.averageTime /= totalStats.sessions
        totalStats.deaths /= totalStats.sessions
        totalStats.kills /= totalStats.sessions
        totalStats.trapKills /= totalStats.sessions
        totalStats.trapsSet /= totalStats.sessions
        totalStats.trapsTriggered /= totalStats.sessions
        totalStats.trapsAvoided /= totalStats.sessions
        totalStats.timesCrouched /= totalStats.sessions
        totalStats.timesDashed /= totalStats.sessions
        totalStats.timesShoved /= totalStats.sessions
        totalStats.timeOfFirstCrouch /= totalStats.sessions
        totalStats.timeOfFirstDash /= totalStats.sessions
        totalStats.timeOfFirstDeath /= totalStats.sessions
        totalStats.timeOfFirstKill /= totalStats.sessions
        totalStats.timeOfFirstShove /= totalStats.sessions
        totalStats.timeOfFirstTrapSet /= totalStats.sessions

        if (keyCardCounts.keyCard1Count > 0) {
          totalStats.timeFirstKeyCollected /= keyCardCounts.keyCard1Count
        }
        if (keyCardCounts.keyCard2Count > 0) {
          totalStats.timeSecondKeyCollected /= keyCardCounts.keyCard2Count
        }
        if (keyCardCounts.keyCard3Count > 0) {
          totalStats.timeThirdKeyCollected /= keyCardCounts.keyCard3Count
        }
      }

      for (let key in totalStats) {
        if (typeof totalStats[key] === 'number') {
          totalStats[key] = parseFloat(totalStats[key].toFixed(2))
        }
      }
    }
  }
})
