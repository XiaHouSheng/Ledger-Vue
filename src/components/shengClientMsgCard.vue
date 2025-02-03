<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue';
defineExpose({
    name:"shengClientCard"
})
const props = defineProps({
    mqttMsgObj:Object,
})
</script>

<template>
<div :class="[mqttMsgObj.isSend ? 'justify-content-end':'justify-content-start','item-cont']" style="width: 100%;height: 250px">
    <div class="card-cont d-flex flex-column">
        <div class="card-top d-flex flex-row justify-content-between">
            <p class="t-border">TOPIC:{{ mqttMsgObj.topicName }}</p>
            <p class="t-border">{{ mqttMsgObj.msgTime }}</p>
        </div>
        <div class="card-body flex-grow-1 t-border">
            {{ mqttMsgObj.message }}
        </div>
    </div>
</div>
</template>

<style scoped>
.item-cont{
    display: flex;
    flex-direction: row;
    margin-top: 12px;
}
.card-body{
    margin-top: 12px;
    width: 100%;
    padding: 6px;
}
.card-cont{
    width: 500px;
    height: 100%;
}
.card-top{
    width: 100%;
}
.card-top p{
    font-size: 18px;
    margin: 0;
}
.t-border{
    border: solid 1px rgb(0, 0, 0);
    border-radius: 3px;
}

</style>