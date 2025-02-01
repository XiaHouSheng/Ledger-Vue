<script setup> 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 

defineProps({
    deviceData:Object
})


</script>

<template>
    <div class="card-cont d-flex flex-column t-border" style="width: 100%;height: 100%;">
        <div class="device-top d-flex flex-row align-item-center">
            <p>{{ deviceData.name }}</p>
        </div>
        <div class="device-body d-flex flex-row justify-content-center flex-grow-1">
            <div v-for="sensor in deviceData.sensors" class="sensor-cont t-border d-flex flex-column justify-content-center">
                <p>{{ sensor.value }}</p>
                <p>{{ sensor.name }}</p>
            </div>  
        </div>
        <div class="device-bottom d-flex flex-row">
            <p>{{ deviceData.topic }}</p>
        </div>
    </div>
</template>

<style scoped>
.sensor-cont p{
    padding: 6px;
}
.sensor-cont :first-child{
    border-bottom: solid 1px black;
}
.device-body{
    padding: 6px;
    gap: 6px;
}
.device-bottom{
    border-top: solid 1px black;
}
.device-bottom p{
    width: 100%;
    text-align: center;
    padding: 6px;
}
.device-top{
    border-bottom: solid 1px black;
}
.device-top p{
    width: 100%;
    text-align: center;
    padding: 6px;
}
p{
    margin: 0;
}
.t-border{
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
</style>