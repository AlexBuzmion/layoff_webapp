<template>
    <div class="chart-container">
      <nav class="nav-button">
        <button class="button" @click="selectAll">Select All</button>
        <button class="button" @click="deselectAll">Deselect All</button>
      </nav>
      <div>
        <label for="show-all-actions">
          <input type="checkbox" id="show-all-actions" v-model="showAllActions" @change="updateChartOptions" />
          Show All Actions (0:00 - 10:00)
        </label>
      </div>
      <div>
        <label for="time-slider">Time (minutes): </label>
        <input type="range" id="time-slider" v-model="selectedTimeRange" min="0" max="10" @input="updateChartOptions" :disabled="showAllActions" />
        <span v-if="showAllActions">All actions (0:00 - 10:00)</span>
        <span v-else>{{ selectedTimeRange }}:00 - {{ selectedTimeRange }}:59</span>
      </div>
      <v-chart :option="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useCloudSaveStore } from '@/stores/cloudSaveData';
  import VChart from 'vue-echarts';
  import * as echarts from 'echarts/core';
  import { ScatterChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    GraphicComponent,
  } from 'echarts/components';
  import { use } from 'echarts/core';
  
  use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ScatterChart,
    CanvasRenderer,
    GraphicComponent,
  ]);
  
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
  const selectedTimeRange = ref(0);
  const showAllActions = ref(false);
  
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
    const startTime = showAllActions.value ? 0 : (selectedTimeRange.value - 1) * 60;
    const endTime = showAllActions.value ? 600 : selectedTimeRange.value * 60;
  
    if (displayData.value.PlayerActions) {
      displayData.value.PlayerActions.forEach(action => {
        if (action.Time >= startTime && action.Time < endTime) {
          if (!actionMap[action.Action]) {
            actionMap[action.Action] = [];
          }
          actionMap[action.Action].push({
            value: [action.Position.x, action.Position.y],
            time: action.Time
          });
        }
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
        min: -23,
        max: 20.7,
        type: 'value'
      },
      yAxis: {
        min: -1,
        max: 53,
        type: 'value'
      },
      series: seriesData,
      legend: {
        data: Object.keys(actionMap),
        selected: Object.keys(actionMap).reduce((acc, action) => {
          acc[action] = true;
          return acc;
        }, {})
      },
      graphic: {
        type: 'image',
        z: -1,
        style: {
          image: '/LayOffMap.png',
          width: 750,
          height: 990
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
  
  const selectAll = () => {
    const legendData = chartOptions.value.legend.data;
    const selected = legendData.reduce((acc, action) => {
      acc[action] = true;
      return acc;
    }, {});
    chartOptions.value = {
      ...chartOptions.value,
      legend: {
        ...chartOptions.value.legend,
        selected,
      },
    };
  };
  
  const deselectAll = () => {
    const legendData = chartOptions.value.legend.data;
    const selected = legendData.reduce((acc, action) => {
      acc[action] = false;
      return acc;
    }, {});
    chartOptions.value = {
      ...chartOptions.value,
      legend: {
        ...chartOptions.value.legend,
        selected,
      },
    };
  };
  
  watch(() => [cloudSaveData.selectedPID, cloudSaveData.selectedSID, displayData, selectedTimeRange, showAllActions], () => {
    updateChartOptions();
  }, { immediate: true });
  </script>
  
  <style scoped>
  .chart-container {
      width: 920px;
      height: 1080px;
  }
  .v-chart {
      width: 100%; /* Use full width of the container */
      height: 100%; /* Use full height of the container */
  }
  
  .nav-button button {
      margin-right: 10px;
      margin-bottom: 25px;
      display: inline-block;
      padding: 5px 10px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color: #dd720e;
      border: none;
      border-radius: 15px;
      box-shadow: 0 9px #363636;
  }
  .button:hover { background-color: #dd8430 }
  
  .button:active {
      background-color: #dd8430;
      box-shadow: 0 5px #666;
      transform: translateY(4px);
  }
  </style>
  