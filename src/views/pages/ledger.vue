<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import shengList from '../../components/shengList.vue';
import shengWeatherCard from '../../components/shengWeatherCard.vue';
import shengChart from '../../components/shengChart.vue';
import { useFetch } from '@vueuse/core';
defineExpose({
    name: "ledger"
})

const testData = ref(null)

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

let date = new Date();
const nowYear = date.getFullYear();
const nowMonth = date.getMonth() + 1;
let searchYear = ""
let searchMonth = ""
let shengChartObj = ref(null)

String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
      formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

//月参数 -> fetch 请求
function getMonthRange(year, month) {
  let startDate, endDate;
  if (month < 10) {
      month = "0" + month;
  }
  startDate = year + "-" + month + "-01";
  let nextMonth = parseInt(month) + 1;
  let nextMonthStr = nextMonth < 10? "0" + nextMonth : "" + nextMonth;
  let yearForEnd = nextMonth > 12? parseInt(year) + 1 : year;
  let monthForEnd = nextMonth > 12? "01" : nextMonthStr;
  endDate = yearForEnd + "-" + monthForEnd + "-01";
  endDate = new Date(endDate);
  endDate.setDate(endDate.getDate() - 1);
  endDate = endDate.toISOString().slice(0, 10);
  return {
      "bte": startDate,
      "lte": endDate
  };
}

//年参数 -> fetch 请求
function getYearRange(year) {
  const startDate = year + "-01-01";
  const endDate = year + "-12-31";
  return {
      "bte": startDate,
      "lte": endDate
  };
}

function updateList(data){
  let listData = []
  for(let item of data.value.results){
    let details = item["details"]
    let nummoney = item["nummoney"]
    let paytime = item["paytime"]
    listData.push({mainStr:"{0} 支出 {1}".format(details,nummoney),rlabelStr:paytime})
  }
  testData.value = listData
}

function onSearchBtnClick(){
  console.log("Year",searchYear,"Month",searchMonth)
  let preReData=getMonthRange(searchYear,searchMonth)
  let biggerthaneSer=preReData["bte"]
  let lessthaneSer=preReData["lte"]
  let initUrl = '/sapi/payitem/?format=json&paytime_gte={0}&paytime_lte={1}&ordering=+paytime'
  .format(biggerthaneSer,lessthaneSer) 
  useFetch(initUrl,{mode: 'cors'}).get().json()
  .then(fetchObj =>{
    //图标传参
    response.value = fetchObj.data
    //列表传参
    updateList(fetchObj.data)
  })
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


function initMQTT(subTopic){
	const clientId = 'clientId-' + Math.random().toString(36).substr(2, 10); // 生成一个随机的客户端 ID
	const client = new Paho.Client("xxxx",9001,"",clientId);
	// 设置连接选项
	const options = {
	 	timeout: 3,
	 	onSuccess: onConnect,
	 	onFailure: onFailure,
		cleanSession: true,
	};
	// 连接服务器
	client.connect(options);
	// 连接成功的回调函数
	function onConnect() {
		//toastr.success("连接成功 IP : {0}".format(client_.host))
    client.subscribe(subTopic)
		client.onMessageArrived = onMessageArrived;
	}  
	// 连接失败的回调函数
	function onFailure(message) {
	  console.error('Connection failed:', message.errorMessage);
	}
	// 接收到消息的回调函数
	function onMessageArrived(message) {
    let messageObj = JSON.parse(message.payloadString)
	}
	return client
}


const response = ref(null)

onMounted(async() =>{
  await nextTick()
  let preReData=getMonthRange(nowYear,nowMonth)
  let biggerthaneSer=preReData["bte"]
  let lessthaneSer=preReData["lte"]
  let initUrl = '/sapi/payitem/?format=json&paytime_gte={0}&paytime_lte={1}&ordering=+paytime'
  .format(biggerthaneSer,lessthaneSer) 
  const { data, isFetching, error } = await useFetch(initUrl,{mode: 'cors'}).get().json()
  //图标传参
  response.value = data
  //列表传参
  updateList(data)
})

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
          <shengChart :responseData="response" ref="shengChartObj"></shengChart>
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
      <div :class="[testData ? '': 'd-flex flex-column justify-content-center t-border','pay-list-cont']">
        <p v-if="!testData" style="text-align: center;">Loading ... ...</p>
        <ol v-if="testData" class="pay-list list-group t-border">
          <shengList :useDelete="false" :dataList="testData" @onItemDelete="onItemDelete"></shengList>
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
  overflow-y: scroll;
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