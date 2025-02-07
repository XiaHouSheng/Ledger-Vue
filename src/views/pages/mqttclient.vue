<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue';
import shengList from '../../components/shengList.vue'
import shengInput from '../../components/shengInput.vue'
import shengClientMsgCard from '../../components/shengClientMsgCard.vue';
import shengClientSender from '../../components/shengClientSender.vue';
import { useFetch } from '@vueuse/core';
import Paho from "paho-mqtt"
defineExpose({
    name: "mqttclient"
})

const testData = ref(null)

const testMsgData = ref(null)

String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
      formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

let defaultServer = null
let defaultTopic = null
let defaultClient = null

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
    let messageStr = JSON.parse(message.payloadString)
    let initMessageSendUrl = " /sapi/getmessage/"
    useFetch(initMessageSendUrl,{
      headers: {
        "authorization":"Token 4076609b77d0c1eb71f2cda1d33498437cf709a7"
      }
    }).post({"topic":{"server":{"server":defaultServer},"topic":defaultTopic},"message":message.payloadString,"msgtype":1}).json()
    .then(response => {
      if (response.statusCode.value == 201){
        testMsgData.value.push({
          isSend:true,
          topicName:defaultTopic,
          msgTime:response.data.value.rastime,
          message:messageStr
        })
      }
    })
	}
	return client
}

function updateList(data){
  let listData = []
  for(let item of data.value){
    listData.push({
      mainStr:item.topic,
      rlabelStr:"连接"
    })
  }
  testData.value = listData
}

function updateMessageList(data){
  let listData = []
  for(let item of data.value){
    let isSend = item.msgtype == 1 ? true : false
    let sendTime = item.rastime
    let message = JSON.parse(item.message)
    let topicName = item.topic.topic
    listData.push({
      isSend:isSend,
      topicName:topicName,
      msgTime:sendTime.split("T")[0],
      message:message,
    })
  }
  testMsgData.value = listData
  //toastr
}

function onItemDelete(item,index){
  console.log(item,index)
  testData.value.splice(index,1)
}

function onConnectClick(item,index){
  let initMessageUrl = " /sapi/getmessage/?server={0}&topic={1}".format(defaultServer,item.mainStr)
  useFetch(initMessageUrl,{
    headers: {
      "authorization":"Token 4076609b77d0c1eb71f2cda1d33498437cf709a7"
    }
  }).get().json()
  .then(response => {
    if (response.statusCode.value == 200){
      updateMessageList(response.data)
      defaultTopic = item.mainStr
      defaultClient.unsubscribe(defaultTopic)
      if (item.mainStr.includes("/")){
          defaultTopic = item.mainStr.split("/")[0]+"/#"
      }else{
        defaultTopic = item.mainStr
      }
      defaultClient.subscribe(defaultTopic,{"qos":0})
    }
    //toastr
  })
}

function onSConnectClick(server){
  let initServerUrl = " /sapi/getserver/?server={0}".format(server)
  let initTopicUrl = " /sapi/gettopic/?server={0}".format(server)
  useFetch(initServerUrl).get().json().then(response => {
    if (response.data.value.length != 0){
      defaultServer = server
      //toastr
      useFetch(initTopicUrl,{
        headers: {
          "authorization":"Token 4076609b77d0c1eb71f2cda1d33498437cf709a7"
        }
      }).get().json()
      .then(response => {
        updateList(response.data)
        defaultClient = initMQTT("topic/#")
      })
    }
    else{
      //toastr
    }
  })
}

function onATopicClick(topicName){
  if (defaultServer){
    let initTopicAddUrl = " /sapi/gettopic/"
    useFetch(initTopicAddUrl,{
      headers: {
        "authorization":"Token 4076609b77d0c1eb71f2cda1d33498437cf709a7"
      }
    }).post({"server":{"server":defaultServer},"topic":topicName}).json()
    .then(response => {
      if (response.statusCode.value == 201){
        testData.value.push({
        mainStr:topicName,
        rlabelStr:"连接"
        })
        //toastr
      }
    })
  }
}

function onMessageClick(message){
  let initMessageSendUrl = " /sapi/getmessage/"
  let messageStr = JSON.stringify(message)
  useFetch(initMessageSendUrl,{
    headers: {
      "authorization":"Token 4076609b77d0c1eb71f2cda1d33498437cf709a7"
    }
  }).post({"topic":{"server":{"server":defaultServer},"topic":defaultTopic},"message":messageStr,"msgtype":1}).json()
  .then(response => {
    if (response.statusCode.value == 201){
      testMsgData.value.push({
        isSend:true,
        topicName:defaultTopic,
        msgTime:response.data.value.rastime,
        message:message
      })
    }
  })
}

</script>

<template>
<div class="container">
    <div class="row">
        <div class="col-4 d-flex flex-column">
            <div class="input-server-cont t-border">
                <shengInput :btnStr="'Connect'" @onClick="onSConnectClick"></shengInput>
            </div>
            <div :class="[testData ? '': 'd-flex flex-column justify-content-center' ,'topic-list-cont','flex-grow-1','t-border']" >
                <p v-if="!testData" style="text-align: center;">
                  Edit Server IP and Press Connect
                </p>
                <ol v-if="testData" class="topic-list list-group">
                <shengList :dataList="testData" @onRootLabelClick="onConnectClick" @onItemDelete="onItemDelete"></shengList>
                </ol>
            </div>
            <div class="input-topic-cont t-border">
                <shengInput :btnStr="'Add'" @onClick="onATopicClick"></shengInput>
            </div>
        </div>
        <div class="col-8 d-flex flex-column">
            <div :class="[testMsgData ? '': 'd-flex flex-column justify-content-center' ,'message-list-cont t-border flex-grow-1']">
                <p v-if="!testMsgData" style="text-align: center;">Select Topic And Connect</p>
                <ul v-if="testMsgData" class="message-list">
                  <shengClientMsgCard v-for="data of testMsgData" :mqttMsgObj="data"></shengClientMsgCard>
                </ul>
            </div>
            <div class="input-message-cont t-height-l">
              <shengClientSender @onMessageClick="onMessageClick" ></shengClientSender>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.row{
  height: 724px;
}
.message-list-cont{
  max-height: 412.01px;
  overflow: scroll;
  overflow-x: hidden;
}
.message-list{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 12px;
}
.topic-list{
    padding: 6px;
}
.topic-list-cont{
    margin-bottom: 0;
    margin-top: 12px;
}
.input-topic-cont{
    margin-top: 12px;
    padding: 6px;
}
.input-server-cont{
    padding: 6px;
}
.input-message-cont{
    margin-top: 12px;
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