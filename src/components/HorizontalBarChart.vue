<template>
  <div class="horizontal-bar-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
  
<script setup>
import { Chart, registerables } from 'chart.js';
import { onMounted, ref, nextTick, computed, watch, defineProps } from 'vue';
import { usePlayerInfo } from '@/stores/playerIDinfo';

Chart.register(...registerables)

const playerData = usePlayerInfo() // reference to Pinia Store
const chartCanvas = ref(null);

// example use <HorizontalBarChart barChartDataKey="(getter from Pinia)"></HorizontalBarChart> 
const { barChartDataKey } = defineProps({
    barChartDataKey: String,
})
// uses the string in chartDataKey and concatenates the actual call to the pinia store
const chartData = computed(() => {
    const data = playerData[barChartDataKey] ? playerData[barChartDataKey] : [0, 0, 0]; // playerData.pHBarChartData
    const stats = data // saves the returned data from Pinia
    const labels = Object.keys(stats) // stores the labels for dynamic use of different stats as labels
    const values = Object.values(stats) // stores the values of the keys/labels received from Pinia
    console.log('chartData updated:', chartData.value);
    return {labels, values};
})

let chartInstance = null

// setup function to initialize the chart
const setupChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  const ctx = chartCanvas.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: chartData.value.labels, // uses the dynamic labels from chartData
        datasets: [{
          label: '',
          data: chartData.value.values, // uses the dynamic values from chartData
          backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 205, 86, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1,
        }]
      },
      options: {
          indexAxis: 'y',
          // animations: {
          //   y: {
          //     easing: 'easeInOutElastic',
          //     from: (ctx) => {
          //       if (ctx.type === 'data') {
          //         if (ctx.mode === 'default' && ! ctx.dropped) {
          //           ctx.dropped = true
          //           return 0
          //         }
          //       }
          //     }
          //   }
          // }
    },
  })
}

  watch(() => playerData.selectedPID, () => {
      nextTick(() => {
          if (chartCanvas.value) {
              setupChart()
          }
      })
  }, {immediate: true})

  onMounted(() => {
      nextTick(() => {
          setupChart()
      })
  })
  </script>
  
<style scoped>
.horizontal-bar-chart {
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 300px; 
}

canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>

  