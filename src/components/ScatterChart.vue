<template>
    <v-chart :option="chartOptions" autoresize />
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useCloudSaveStore } from '@/stores/cloudSaveData';
  import * as echarts from 'echarts';
  import { defineComponent } from 'vue';
  import VChart from 'vue-echarts';
  
  defineComponent({
    components: {
      'v-chart': VChart
    }
  });
  
  const cloudSaveData = useCloudSaveStore();
  
  const displayData = computed(() => {
    let data = {};
    if (!cloudSaveData.selectedPID) {
      data = cloudSaveData.GetAggregateData();
    } else if (cloudSaveData.selectedPID && !cloudSaveData.selectedSID) {
      data = cloudSaveData.GetPlayerAggregateData(cloudSaveData.selectedPID);
    } else {
      data = cloudSaveData.GetSessionData(cloudSaveData.selectedPID, cloudSaveData.selectedSID);
    }
    return data;
  });
  
  const chartOptions = ref({});
  
  const actionColorMap = {
    Died: 'red',
    Spawned: 'green',
    Interacted: 'yellow',
    Trap1Set: '#800080',
    Trap2Set: '#9370DB',
    Trap3Set: '#BA55D3',
    Trap4Set: '#DA70D6',
    Dash: '#1E90FF',
    Crouch: '#4682B4',
    Shove: '#87CEEB',
    WasShoved: '#B0E0E6',
    Jump: 'darkblue',
  };
  
  const actionPointStyleMap = {
    Died: 'crossRot',
    Spawned: 'circle',
    Interacted: 'rect',
    Trap1Set: 'triangle',
    Trap2Set: 'triangle',
    Trap3Set: 'triangle',
    Trap4Set: 'triangle',
    Dash: 'rectRot',
    Crouch: 'star',
    Shove: 'rectRounded',
    WasShoved: 'rectRounded',
    Jump: 'line',
  };
  
  const updateChartOptions = () => {
    const actionMap = {};
    if (displayData.value.PlayerActions) {
      displayData.value.PlayerActions.forEach(action => {
        if (!actionMap[action.Action]) {
          actionMap[action.Action] = [];
        }
        actionMap[action.Action].push({
          value: [action.Position.x, action.Position.y],
          time: action.Time
        });
      });
    }
  
    const seriesData = Object.keys(actionMap).map(action => ({
      name: action,
      type: 'scatter',
      data: actionMap[action],
      symbolSize: 10,
      itemStyle: {
        color: actionColorMap[action] || 'black'
      },
      symbol: actionPointStyleMap[action] || 'circle'
    }));
  
    chartOptions.value = {
      xAxis: {
        min: -20,
        max: 25,
        type: 'value'
      },
      yAxis: {
        min: 0,
        max: 60,
        type: 'value'
      },
      series: seriesData,
      graphic: {
        type: 'image',
        z: -1,
        style: {
          image: '/src/assets/LayOffMap.png',
          width: 714,
          height: 889
        },
        left: 'center',
        top: 'center',
        bounding: 'raw',
      },
      tooltip: {
        trigger: 'item',
        formatter: params => {
          const action = params.seriesName;
          const time = params.data.time;
          return `${action} at (${params.value[0]}, ${params.value[1]}) - ${time}s`;
        }
      }
    };
  };
  
  watch(() => [cloudSaveData.selectedPID, cloudSaveData.selectedSID, displayData], () => {
    updateChartOptions();
  }, { immediate: true });
  </script>
  
  <style scoped>
  .v-chart {
    height: 100vh; /* Full height */
    width: calc(100vh * 714 / 889); /* Maintain aspect ratio */
  }
  </style>
  