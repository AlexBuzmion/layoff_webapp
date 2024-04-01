<template>
    <div class="radar-chart-group">
        <RadarChart chartDataKey="pRadarChartData"></RadarChart>
        <RadarChart chartDataKey="pGetKDA"></RadarChart>
        <RadarChart chartDataKey="pGetGameModes"></RadarChart>
        <RadarChart chartDataKey="pGetFlagstats"></RadarChart>
        <RadarChart chartDataKey="pGetKillTypes"></RadarChart>
        <RadarChart chartDataKey="pBomb"></RadarChart>
        <RadarChart chartDataKey="pStreaks"></RadarChart>
        
    </div>
</template>

<script setup>
    import RadarChart from './RadarChart.vue';
</script>

<style scoped>
.radar-chart-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    
}

.big {
  font-size: 1vw;
  text-align: center;
  
}
</style>