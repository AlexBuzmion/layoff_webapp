<template>
    <div class="radar-chart">
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
    
    // example use <RadarChart chartDataKey="(getter from Pinia)"></RadarChart> 
    const { chartDataKey } = defineProps({
        chartDataKey: String,
    })

    // uses the string in chartDataKey and concatenates the actual call to the pinia store
    const chartData = computed(() => {
        const data = playerData[chartDataKey] ? playerData[chartDataKey] : [0, 0, 0]; // playerData.pRadarChartData
        const stats = data // saves the returned data from Pinia
        const labels = Object.keys(stats) // stores the labels for dynamic use of different stats as labels
        const values = Object.values(stats) // stores the values of the keys/labels received from Pinia

        return {labels, values};
    })

    let chartInstance = null
    // creates the chart and checks if there is an instance, and destroys it to ensure singleton model
    const setupChart = () => {
        if (chartInstance) {
            chartInstance.destroy()
        }
        // charts.js specific config
        const ctx = chartCanvas.value.getContext('2d')
        chartInstance = new Chart(ctx, {
            type:'radar',
            data: {
                labels: chartData.value.labels, // uses the dynamic labels from chartData
                datasets: [{
                    label:'',
                    data: chartData.value.values, // uses the dynamic values from chartData
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointBorderColor: 'rgb(0, 0, 0)',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                }] 
            }, 
            
            options: {
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
                // },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 500,
                    }
                }
            },
        })
    }

    // Update function to constantly check if the selectedPID had changed then setup the chart. 
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
.radar-chart {
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 300px; 
  border: 3px solid white; 
}


canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
