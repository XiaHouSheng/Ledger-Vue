<script setup>
import { ref } from 'vue';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
defineExpose({
    name:"shengInput"
})
defineProps({
    placeHolder:{
        type: String,
        default:"testPlaceHolder"
    },
    btnStr:{
        type: String,
        default:"Send"
    }
})
const emit = defineEmits(["onClick"])

function onClickListener(inputText){
    emit("onClick",inputText)
}

const inputText = ""

</script>

<template>
<div class="d-flex flex-row">
    <input v-model="inputText" v-bind:placeholder="placeHolder" class="form-control flex-grow-1">
    <div class="btn-group">
        <button class="btn" @click="onClickListener(inputText)" >{{ btnStr }}</button>
    </div>
</div>
</template>

<style scoped>
input{
    margin-right: 6px;
}
button{
    border: solid 1px black;
    border-radius: 3px;
}
button:hover{
    background-color: rgba(0, 0, 0, 0.20)
}
</style>