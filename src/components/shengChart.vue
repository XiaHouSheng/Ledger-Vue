<template>
  <div ref="chartDom" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts';
import { useFetch } from '@vueuse/core';


//format
String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
      formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

//数据处理
function preChartData(response,mode){
  if (mode == "day"){
    let xlabel = []
    let ylabelPre = {}
    let ylabel= []
    //以日为单位 y -> num x -> mm-dd
    for(let item of response["results"]){
      let date = item["paytime"].split("-").slice(1,3).join("-");
      let num = item["nummoney"];
      if (!xlabel.includes(date)) xlabel.push(date);
      ylabelPre[date] = ylabelPre[date] ? ylabelPre[date] + num : num
    }
    for(let item of xlabel){
      ylabel.push(ylabelPre[item])
    }
    return {"xlabel":xlabel,"ylabel":ylabel}
  }
  if (mode == "month"){
    let xlabel = [response["results"][0]["paytime"].split("-").slice(0,2).join("-")]
    let ylabelPre = {}
    let ylabel = [] 
    //以月为单位 y -> num x -> mm-dd
    for(let item of response["results"]){
      let num = item["nummoney"];
      ylabelPre[xlabel[0]] = ylabelPre[xlabel[0]] ? ylabelPre[xlabel[0]] + num : num
    }
    ylabel.push(ylabelPre[xlabel])
    return {"xlabel":xlabel,"ylabel":ylabel}
  }
}

const chartDom = ref(null);
let chartInstance = null;

let prepareOptionDay = {
    tooltip: {},
    xAxis: {
      data: ["类别1", "类别2", "类别3", "类别4", "类别5"]
    },
    yAxis: {type:"value"},
    series: [{
      name: '金额|以日为单位',
      type: 'bar',
      data: [200, 200, 200, 100, 90]
    }]
}

let prepareOptionMonth = {
    tooltip: {},
    xAxis: {
      data: ["类别1", "类别2", "类别3", "类别4", "类别5"]
    },
    yAxis: {type:"value"},
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

defineExpose({
  changeMode,
})

const props = defineProps({
  responseData:Object
})

onMounted(async () => {
  await nextTick();
  //第一次初始化时
  chartInstance = echarts.init(chartDom.value);
  chartInstance.showLoading()
  //nowYear nowMonth
  watch(() => props.responseData, (newData) => {
    let dataDay = preChartData(newData.value,"day")
    let dataMonth = preChartData(newData.value,"month")
    prepareOptionDay.xAxis.data = dataDay.xlabel
    prepareOptionDay.series[0].data = dataDay.ylabel
    prepareOptionMonth.xAxis.data = dataMonth.xlabel
    prepareOptionMonth.series[0].data = dataMonth.ylabel
    chartInstance.setOption(prepareOptionMonth);
    chartInstance.hideLoading()
  })
});

onUnmounted(() => {
  if (chartInstance != null && chartInstance.dispose) {
    chartInstance.dispose();
  }
});

</script>

<style scoped>

</style>
