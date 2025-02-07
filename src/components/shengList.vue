<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
defineExpose({
    name: "shengList"
})
defineProps({
    useDelete: {
        type: Boolean,
        default: true,
    },
    useRLabel:{
        type: Boolean,
        default: true
    },
    dataList:{
        type:Array
    },

})
const emit = defineEmits(["onItemDelete","onRootLabelClick","onItemClick"])

function onItemDeleteListener(item,index){
    emit("onItemDelete",item,index);
}

function onRootLabelListener(item,index){
    emit("onRootLabelClick",item,index)
}

function onItemClickListener(item){
    emit("onItemClick",item)
}

</script>

<template>
<li v-if="dataList" v-for="(item,index) in dataList" @click="onItemClickListener(item)" class="list-group-item">
    <p>{{ item.mainStr }}</p>
    <span v-if="useRLabel" class="rootLabel" @click="onRootLabelListener(item,index)">{{ item.rlabelStr }}</span>
    <div v-if="useDelete" style="width: 12px;"></div>
    <span v-if="useDelete" class="deleteBtn" @click="onItemDeleteListener(item,index)">删除</span>
</li>
</template>

<style scoped>
.rootLabel{
    border: solid 1px black;
    border-radius: 3px;
    padding: 0 6px 0 6px;
}
.deleteBtn{
    border: solid 1px black;
    border-radius: 3px;
    padding: 0 6px 0 6px;
}
.deleteBtn:hover{
    background-color: rgb(255, 138, 138);
    transition: ease-in-out 0.15s;
}
li{
    display: flex;
    flex-direction: row;
}
li:hover{
    background-color: rgba(0, 0, 0, 0.20);
    transition: ease-in-out 0.15s;
}
p{
    margin: 0;
    flex-grow: 1;
}
</style>