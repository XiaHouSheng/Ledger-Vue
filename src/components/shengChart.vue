<template>
  <div ref="chartDom" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let chartInstance = null;
let testData = ["类别1", "类别2", "类别3", "类别4", "类别5"]

const props = defineProps({
  urlParams:Array
})

//传递请求参数
console.log(props.urlParams)

onMounted(async () => {
  await nextTick();
  chartInstance = echarts.init(chartDom.value);
  const option = {
    title: {
      text: ''
    },
    tooltip: {}, 
    xAxis: {
      data: testData
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
