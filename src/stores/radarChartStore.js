// store/radarChartStore.js
import { defineStore } from 'pinia';
import {Axios} from 'axios'

export const useRadarChartStore = defineStore('radarChart', {
  state: () => ({
    // Example dataset for three radar charts
    chartsData: [
      {
        id: 'gameModes',
        labels: ['Solo', 'Coop', 'Vs'],
        datasetData: [10, 20, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        chartTitle: 'Game Modes Played',
      },
      {
        id: 'kda',
        labels: ['Kills', 'Deaths', 'Assists'],
        datasetData: [1522, 580, 971],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        chartTitle: 'K/D/A',
      },
      // add the rest of the data sets here
    ],
  }),
  getters: {
    getChartDataById: (state) => {
      return (chartId) => state.chartsData.find(chart => chart.id === chartId);
    }
  },
  actions: {
    add( newRecord ) {
      // add a new record in the chart data
    },

    fetchChartData () {
      // make AJAX request to the server to pull game data
      Axios.post('/user', { firstName: 'Fred', lastName: 'Flintstone' })
          .then(response => { console.log(response) })
          .catch(error => { console.log(error) });
    }
    
  },
});

