<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue';
import ShengList from '../../components/shengList.vue';
import shengDeviceCard from '../../components/shengDeviceCard.vue';
defineExpose({
    name: "sensornet"
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

const testDevicesData = [
  {
    name:"Device Name",
    topic:"Device Topic",
    sensors:[{
      value:"wait",
      name:"name"
    }]
  }
  ,
  {
    name:"Device Name",
    topic:"Device Topic",
    sensors:[{
      value:"wait",
      name:"name"
    }
    ,
    {
      value:"wait",
      name:"name"
    }
  ]
  }
  
]

function onItemDelete(item,index){
  console.log(item,index)
  testData.value.splice(index,1)
}

function onDeviceAddBtnClick(){

}

let inputDeviceName = ""
let inputTopicName = ""
let sensor1 = {
  name:"",
  type:""
}
let sensor2 = {
  name:"",
  type:""
}
let sensor3 = {
  name:"",
  type:""
}

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
                <input v-model="sensor1.name" class="form-control" placeholder="name">
                <input v-model="sensor1.type" class="form-control" placeholder="type">
              </div>
              <div class="d-flex flex-column" style="gap: 6px;">
                <input v-model="sensor2.name" class="form-control" placeholder="name">
                <input v-model="sensor2.type" class="form-control" placeholder="type">
              </div>
              <div class="d-flex flex-column" style="gap: 6px;">
                <input v-model="sensor3.name" class="form-control" placeholder="name">
                <input v-model="sensor3.type" class="form-control" placeholder="type">
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
                  <shengList :dataList="testData" @onItemDelete="onItemDelete"></shengList>
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