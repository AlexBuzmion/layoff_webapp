<template>
    <div class="scatter-chart">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { Chart, registerables } from 'chart.js';
  import { onMounted, ref, nextTick, computed, watch } from 'vue';
  import { useCloudSaveStore } from '@/stores/cloudSaveData';
  
  Chart.register(...registerables);
  
  const cloudSaveData = useCloudSaveStore();
  const chartCanvas = ref(null);
  
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
  
  let chartInstance = null;
  
  const setupChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    const ctx = chartCanvas.value.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = '/src/assets/LayOffMap.png';
  
    backgroundImage.onload = () => {
      const actionMap = {};
      if (displayData.value.PlayerActions) {
        displayData.value.PlayerActions.forEach(action => {
          if (!actionMap[action.Action]) {
            actionMap[action.Action] = [];
          }
          actionMap[action.Action].push({
            x: action.Position.x,
            y: action.Position.y,
            time: action.Time
          });
        });
      }
  
      const datasets = Object.keys(actionMap).map((action) => ({
        label: action,
        data: actionMap[action],
        backgroundColor: actionColorMap[action] || 'black',
      }));
  
      chartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: datasets,
        },
        options: {
          responsive: true,
          plugins: {
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              const canvas = chart.canvas;
              const { width, height } = canvas;
              ctx.drawImage(backgroundImage, 0, 0, width, height);
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const action = context.dataset.label;
                  const time = context.raw.time;
                  return `${action} at (${context.raw.x}, ${context.raw.y}) - ${time}s`;
                },
              },
            },
          },
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              min: -20,
              max: 25,
            },
            y: {
              type: 'linear',
              position: 'left',
              min: 0,
              max: 60,
            },
          },
        },
      });
    };
  };
  
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
  
  onMounted(() => {
    nextTick(() => {
      setupChart();
    });
  });
  
  watch(() => cloudSaveData.selectedPID, () => {
    nextTick(() => {
      setupChart();
    });
  }, { immediate: true });
  
  watch(() => cloudSaveData.selectedSID, () => {
    nextTick(() => {
      setupChart();
    });
  }, { immediate: true });
  </script>
  
<style scoped>
canvas {
  height: 714px;
  width: 889px;
}
</style>

  