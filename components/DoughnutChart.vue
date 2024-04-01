<template>
    <div class="donut-chart">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
    import { Chart, registerables } from 'chart.js';
    import { onMounted, ref, nextTick, watch, computed, defineProps, watchEffect } from 'vue';
    import { usePlayerInfo } from '@/stores/playerIDinfo';

    Chart.register(...registerables)
    const playerData = usePlayerInfo() // reference to Pinia Store
    const chartCanvas = ref(null) 

    const { donutChartDataKey } = defineProps({
        donutChartDataKey: String,
    })

    // uses the string in chartDataKey and concatenates the actual call to the pinia store
    const chartData = computed(() => {
        const data = playerData[donutChartDataKey] ? playerData[donutChartDataKey] : [0, 0, 0]; // playerData.pRadarChartData
        const stats = data // saves the returned data from Pinia
        const labels = Object.keys(stats) // stores the labels for dynamic use of different stats as labels
        const values = Object.values(stats) // stores the values of the keys/labels received from Pinia

        return {labels, values};
    })

    let chartInstance = null

    const setupChart = () => {
        if (chartInstance) {
            chartInstance.destroy()
        }
        // charts.js specific config
        const ctx = chartCanvas.value.getContext('2d')
        chartInstance = new Chart(ctx, {
            type: 'doughnut',
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
                hoverOffset: 50
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
.donut-chart {
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