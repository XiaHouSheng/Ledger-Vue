<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue';
import shengList from '../../components/shengList.vue';
import shengWeatherCard from '../../components/shengWeatherCard.vue';
import shengChart from '../../components/shengChart.vue';
defineExpose({
    name: "ledger"
})

const testData = ref([
  {
    mainStr:"tStr",
    rlabelStr:"rlStr"
  }
  ,
  {
    mainStr:"tStr",
    rlabelStr:"rlStr"
  }
  ,
  {
    mainStr:"tStr",
    rlabelStr:"rlStr"
  }
  , 
  {
    mainStr:"tStr",
    rlabelStr:"rlStr"
  }
  ,
  {
    mainStr:"tStr",
    rlabelStr:"rlStr"
  }
])

const testTWeather = {
  weather:"晴",
  temp:"31",
  isrc:"http://xx/static/images/icons/100.svg"
}

const testFWeather = [
  {
    weather:"晴",
    time:"2025-1-27",
    isrc:"http://xx/static/images/icons/100.svg"
  }
  ,
  {
    weather:"晴",
    time:"2025-1-27",
    isrc:"http://xx/static/images/icons/100.svg"
  }
  ,
  {
    weather:"晴",
    time:"2025-1-27",
    isrc:"http://xx/static/images/icons/100.svg"
  }
]

const testUrlParams = {
  "lte":"data",
  "ste":"data"
}

let searchYear = ""
let searchMonth = ""
let shengChartObj = ref(null)

function onSearchBtnClick(){
  console.log("Year",searchYear,"Month",searchMonth)
}

function onItemDelete(item,index){
  console.log(item,index)
  testData.value.splice(index,1)
}

function selectToMonth(){
  if (shengChartObj.value){
    shengChartObj.value.changeMode("month")
  }
}

function selectToDay(){
  if (shengChartObj.value){
    shengChartObj.value.changeMode("day")
  }
}




</script>

<template>
  <div class="container">
    <div class="modal fade" id="modal-search">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
                <h5 class="modal-title">查询记录</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="searchYear" class="form-control" placeholder="年" type="number" maxlength="4">
            <div style="height: 12px;"></div>
            <input v-model="searchMonth" class="form-control" placeholder="月" type="number" maxlength="2">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="onSearchBtnClick" type="button" class="btn btn-primary" data-bs-dismiss="modal">Commit</button>
          </div>
      </div>
  </div>
</div>
  <div class="row">
    <div class="col-8">
      <div class="chart-switch-cont d-flex t-border">
        <div class="btn-group flex-grow-1">
          <button @click="selectToMonth" class="btn t-border">按月看</button>
          <button @click="selectToDay" class="btn t-border">按日看</button>
        </div>
      </div>
      <div class="chart-cont t-height-l">
          <shengChart ref="shengChartObj" :urlParams="testUrlParams"></shengChart>
      </div>
      <div class="card-cont t-height-l">
          <shengWeatherCard :tweather="testTWeather" :fweather="testFWeather"></shengWeatherCard>
          <shengWeatherCard :tweather="testTWeather" :fweather="testFWeather"></shengWeatherCard>
      </div>
    </div>
    <div class="col-4">
      <div class="search-btn-cont t-height-s">
        <button class="btn t-border" data-bs-toggle="modal" data-bs-target="#modal-search">查询记录</button>
      </div>
      <div class="pay-list-cont">
        <ol class="pay-list list-group t-border">
          <shengList :dataList="testData" @onItemDelete="onItemDelete"></shengList>
        </ol>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.row{
  height: 724px;
}
.search-btn-cont button{
  width: 100%;
  height: 100%;
}
.search-btn-cont{
  padding: 12px;
}
.chart-switch-cont{
  padding: 12px;
  height: 100px;
}
.chart-cont{
  margin-top: 12px;
}
.card-cont{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
}
.pay-list-cont{
  margin-bottom: 0;
  margin-top: 12px;
  height: 612px;
}
.pay-list{
  height: 100%;
  padding: 6px;
}
button:hover{
  background-color: rgba(0, 0, 0, 0.20);
}
.t-border{
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
.t-height-s{
  height: 100px;
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
.t-height-l{
  height: 300px;
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
.t-height-pl{
  height: 500px;
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
</style>