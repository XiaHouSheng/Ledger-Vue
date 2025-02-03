<template>
  <div ref="chartDom" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let chartInstance = null;

let prepareOptionDay = {
    title: {
      text: ''
    },
    tooltip: {}, 
    xAxis: {
      data: ["类别1", "类别2", "类别3", "类别4", "类别5"]
    },
    yAxis: {},
    series: [{
      name: '金额|以日为单位',
      type: 'bar',
      data: [120, 200, 150, 80, 70]
    }]
}

let prepareOptionMonth = {
    title: {
      text: ''
    },
    tooltip: {}, 
    xAxis: {
      data: ["类别1", "类别2", "类别3", "类别4", "类别5"]
    },
    yAxis: {},
    series: [{
      name: '金额|以月为单位',
      type: 'bar',
      data: [120, 200, 150, 80, 70]
    }]
}

const changeMode = (mode) => {
  if (!chartInstance){
    return
  }
  if (mode == "month"){
    chartInstance.setOption(prepareOptionMonth)
  }else{
    chartInstance.setOption(prepareOptionDay)
  }
}

const props = defineProps({
  urlParams:Array
})

defineExpose({
  changeMode,
})

onMounted(async () => {
  await nextTick();
  //第一次初始化时
  //console.log(props.urlParams)
  chartInstance = echarts.init(chartDom.value);
  const option = {
    title: {
      text: ''
    },
    tooltip: {}, 
    xAxis: {
      data: ["类别1", "类别2", "类别3", "类别4", "类别5"]
    },
    yAxis: {},
    series: [{
      name: '金额',
      type: 'bar',
      data: [120, 200, 150, 80, 70]
    }]
  };
  chartInstance.setOption(option);
});

onUnmounted(() => {
  if (chartInstance != null && chartInstance.dispose) {
    chartInstance.dispose();
  }
});

</script>

<style scoped>

</style>
