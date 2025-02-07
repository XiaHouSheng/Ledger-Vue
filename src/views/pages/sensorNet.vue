<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { nextTick, onMounted, reactive, ref } from 'vue';
import ShengList from '../../components/shengList.vue';
import shengDeviceCard from '../../components/shengDeviceCard.vue';
import { useFetch } from '@vueuse/core';
import Paho from "paho-mqtt"
defineExpose({
    name: "sensornet"
})

const testData = ref(null)
const testDevicesData = ref(null)
let defaultClient = null
let defaultTopic = null

let keyOfDevice = {}

function processParams(){
 let msgtypes = []
 let msgnames = []

 if (name1 && type1){
  msgtypes.push(type1)
  msgnames.push(name1)
 }
 if (name2 && type2){
  msgtypes.push(type2)
  msgnames.push(name2)
 }
 if (name3 && type3){
  msgtypes.push(type3)
  msgnames.push(name3)
 }

 let params = {
  name: inputDeviceName,
  topic: inputTopicName,
  msgs: {
    msgtypes: msgtypes,
    msgnames: msgnames
  }
 }
 return params
}

function onItemDelete(item,index){
  testData.value.splice(index,1) 
}

function onItemClick(item){
  defaultClient.unsubscribe(defaultTopic)
  if (item.rlabelStr.includes("/")){
      defaultTopic = item.rlabelStr.split("/")[0]+"/#"
  }else{
    defaultTopic = item.rlabelStr
  }
  defaultClient.subscribe(defaultTopic,{"qos":0})
  //toastr
}

function updateCardAList(item){
      testData.value.push({
        mainStr:item.name,
        rlabelStr:item.topic
      })
      let sensors = {}
      for (let i=0;i<item.msgs.msgnames.length;++i){
        sensors[item.msgs.msgtypes[i]] = {"value":"wait","name":item.msgs.msgnames[i]}
      }
      testDevicesData.value.push({
        name:item.name,
        topic:item.topic,
        sensors:sensors
      })
      keyOfDevice[item.topic] = keyOfDevice.length
}

function onDeviceAddBtnClick(){
 let initDeviceAddUrl = " /sapi/getdevice/"
 let params = processParams()
 useFetch(initDeviceAddUrl,{
  headers: {
  }
 }).post(params).json()
 .then(response => {
    if (response.statusCode.value == 201){
      updateCardAList(params)
    }
 })
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
    if (message.destinationName in keyOfDevice){
      testDevicesData.value[keyOfDevice[message.destinationName]]["sensors"][messageObj.type].value = messageObj.value
    }
	}
	return client
}


let inputDeviceName = ""
let inputTopicName = ""

let name1 = ""
let name2 = ""
let name3 = ""
let type1 = ""
let type2 = ""
let type3 = ""

onMounted(async () => {
  await nextTick()
  let initUrl = " /sapi/getdevice/"
  useFetch(initUrl).get().json()
  .then(response => {
    let listData = []
    let cardData = []
    let key = 0
    for (let item of response.data.value){
      listData.push({
        mainStr:item.name,
        rlabelStr:item.topic
      })
      let sensors = {}
      for (let i=0;i<item.msgs.msgnames.length;++i){
        sensors[item.msgs.msgtypes[i]] = {"value":"wait","name":item.msgs.msgnames[i]}
      }
      cardData.push({
        name:item.name,
        topic:item.topic,
        sensors:sensors
      })
      keyOfDevice[item.topic] = key
      key++
    }
    testData.value = listData
    testDevicesData.value = cardData
  })
  defaultTopic = "topic/#"
  defaultClient = initMQTT("topic/#")
})

</script>

<template>
<div class="container">
  <div class="modal fade" id="modal-add-device">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
                <h5 class="modal-title">添加设备</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="inputDeviceName" class="form-control" placeholder="Device Name">
            <div style="height: 12px;"></div>
            <input v-model="inputTopicName" class="form-control" placeholder="Topic Name">
            <div style="height: 6px;border-bottom: solid 1px black;"></div>
            <div class="d-flex flex-row" style="gap: 6px;margin-top: 6px">
              <div class="d-flex flex-column" style="gap: 6px;">
                <input v-model="name1" class="form-control" placeholder="name">
                <input v-model="type1" class="form-control" placeholder="type">
              </div>
              <div class="d-flex flex-column" style="gap: 6px;">
                <input v-model="name2" class="form-control" placeholder="name">
                <input v-model="type2" class="form-control" placeholder="type">
              </div>
              <div class="d-flex flex-column" style="gap: 6px;">
                <input v-model="name3" class="form-control" placeholder="name">
                <input v-model="type3" class="form-control" placeholder="type">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="onDeviceAddBtnClick" type="button" class="btn btn-primary" data-bs-dismiss="modal">Commit</button>
          </div>
      </div>
    </div>
  </div>
    <div class="row">
        <div class="col-3 d-flex flex-column">
            <div class="device-list-cont flex-grow-1 t-border">
                <ul class="list-group device-list">
                  <shengList :dataList="testData" @onItemDelete="onItemDelete" @onItemClick="onItemClick"></shengList>
                </ul>
            </div>
            <div class="input-device-cont t-height-s">
              <button class="btn t-border" data-bs-toggle="modal" data-bs-target="#modal-add-device">Add Device</button>
            </div>
        </div>
        <div class="col-9">
            <div class="device-table t-border">
              <shengDeviceCard v-for="device in testDevicesData" :deviceData="device" ></shengDeviceCard>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.row{
  height: 724px;
}
.device-list-cont{
  max-height: 612.01px;
  overflow: scroll;
  overflow-x: hidden;
}
.device-table{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-auto-rows: 180px 180px 180px;
  height: 724px;
  max-height: 724.01px;
  gap: 6px;
  padding: 6px;
  overflow: scroll;
  overflow-x: hidden;
} 
.input-device-cont button:hover{
  background-color: rgba(0, 0, 0, 0.20);
}
.input-device-cont button{
  width: 100%;
  height: 100%;
}
.input-device-cont{
    margin-top: 12px;
    padding: 12px;
}
.device-list{
  padding: 6px;
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