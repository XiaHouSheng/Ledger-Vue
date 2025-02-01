<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue';
import shengList from '../../components/shengList.vue'
import shengInput from '../../components/shengInput.vue'
import shengClientMsgCard from '../../components/shengClientMsgCard.vue';
import shengClientSender from '../../components/shengClientSender.vue';
defineExpose({
    name: "mqttclient"
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

const testMsgData = {
  isSend:true,
  topicName:"testTopicName",
  msgTime:"2025-1-31",
  message:"message",
}

function onItemDelete(item,index){
  console.log(item,index)
  testData.value.splice(index,1)
}

function onSConnectClick(server){
  console.log("Server",server)
}

function onATopicClick(topicName){
  console.log("TopicName",topicName)
}

function onMessageClick(message){
  console.log("Message",message)
}

</script>

<template>
<div class="container">
    <div class="row">
        <div class="col-4 d-flex flex-column">
            <div class="input-server-cont t-border">
                <shengInput @onClick="onSConnectClick"></shengInput>
            </div>
            <div class="topic-list-cont flex-grow-1 t-border">
                <ol class="topic-list list-group">
                <shengList :dataList="testData" @onItemDelete="onItemDelete"></shengList>
            </ol>
            </div>
            <div class="input-topic-cont t-border">
                <shengInput @onClick="onATopicClick"></shengInput>
            </div>
        </div>
        <div class="col-8 d-flex flex-column">
            <div class="message-list-cont t-border flex-grow-1">
                <ul class="message-list">
                  <shengClientMsgCard :mqttMsgObj="testMsgData"></shengClientMsgCard>
                  <shengClientMsgCard :mqttMsgObj="testMsgData"></shengClientMsgCard>
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