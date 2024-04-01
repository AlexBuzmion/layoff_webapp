<template>
    <div class="scatter-chart">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
    import { Chart, registerables } from 'chart.js';
    import { onMounted, ref, nextTick, watch, computed, defineProps, watchEffect } from 'vue';
    import { usePlayerInfo } from '@/stores/playerIDinfo'

    
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
            type: 'scatter',
            data: {
                datasets: [{
                label: 'Death Positions',
                data: playerData.scatterChart,

                }]
            },
            options: {
                responsive: true,
                // plugins: {
                // backgroundImage: '/src/assets/LevelMap.png',
                // },
            }
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
canvas {
  height: 1080px;
  width: 920px;
  align-content: center;
  margin: 50px;
  
}
</style>