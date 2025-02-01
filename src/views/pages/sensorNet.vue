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
</script>

<template>
<div class="container">
    <div class="row">
        <div class="col-3 d-flex flex-column">
            <div class="device-list-cont flex-grow-1 t-border">
                <ul class="list-group device-list">
                  <shengList :dataList="testData" @onItemDelete="onItemDelete"></shengList>
                </ul>
            </div>
            <div class="input-device-cont t-height-s">
              <button class="btn t-border">Add Device</button>
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
button:hover{
  background-color: rgba(0, 0, 0, 0.20);
}
button{
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