<template>
    
    <div class="chart-info">
      <ChartController class="column side"></ChartController>
      <h1>Wins/Losses</h1>
      <HorizontalBarChart class="horizontal-bar-chart" barChartDataKey="pGetKDA"/>
        <div class="row">
          <div class="column side big">
              <h1 class="row">Win Rate</h1>
              <h1 style="font-size: 6vw;">{{playerData.pShotAcc}}</h1>
          </div>
          <div class="column side big">
              <h1 class="row">Trap Kills Rate</h1>
              <h1 style="font-size: 6vw;">{{playerData.pShotAcc}}</h1>
          </div>
          <div class="column side big">
              <h1 class="row">Killed by Own</h1>
              <h1 style="font-size: 6vw;">{{playerData.pShotAcc}}</h1>
          </div>
          <div class="column side big">
              <h1 class="row">Gun Kills</h1>
              <h1 style="font-size: 6vw;">{{playerData.pShotAcc}}</h1>
          </div>
        </div><br/>
        <h1>Player Stats</h1>
        <div class="">
          <RadarChartGroup></RadarChartGroup>
        </div><br/>
        <div class="row">
          <DoughnutChart donutChartDataKey="pGetGameModes"></DoughnutChart>
          <DoughnutChart donutChartDataKey="pGetGameModes"></DoughnutChart>
        </div><br/>
        <div>
          <ScatterChart class="background-image"></ScatterChart>
        </div>

            
    </div>
    

</template>
    
<script setup>
import {computed} from 'vue'
  import HorizontalBarChart from '@/components/HorizontalBarChart.vue';
  import ChartController from '@/components/ChartController.vue';
  import RadarChartGroup from '@/components/RadarChartGroup.vue';
  import DoughnutChart from '@/components/DoughnutChart.vue';
  import ScatterChart from '@/components/ScatterChart.vue';
  import { usePlayerInfo } from '@/stores/playerIDinfo';
  
  const playerData = usePlayerInfo()

  // pass property reactively to charts data
  const chartsData = computed(() => store.chartsData);
</script>

<style scoped>
.horizontal-bar-chart {
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 300px; 
  margin: 10px;
}

.big {
  font-size: 1vw;
  text-align: center;
  border: 3px solid white; 
}

.background-image {
  background-image: url('/src/assets/LevelMap.png');
  height: 100%;
  width: 100%; 
  background-size: cover;
  margin-left: 0%;
}

.column.side {
  font-size: 25px;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 0 0 20%;
}

.row {
  display: -webkit-flex;
  display: flex;
}

</style>