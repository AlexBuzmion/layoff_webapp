<template>
    
    <div class="mini-chart chart-border">
        Content here: {{ msg }}
        Chart Name: {{ myInfo.chartTypeName }}

        <slot></slot>
    </div>

</template>

<script setup>
    defineProps({
        msg: {type: String, required: false}, 
        data: Object,
    })

    let myInfo = {
        chartTypeName: "Bar Chart", 
        chartRange: 100,
    }
</script>

<style scoped>
    .mini-chart {
        width: 20rem;
        height: 30rem;
    }

    .chart-border {
        border: 2px solid violet; 
    }
</style>