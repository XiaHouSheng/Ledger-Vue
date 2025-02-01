<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const inputMessage = ""

const emit = defineEmits(["onMessageClick"])

function onClickListener(inputMessage){
    emit("onMessageClick",inputMessage)
}

</script>

<template>
    <div class="t-border d-flex flex-row" style="height: 100%;width: 100%;">
        <textarea v-model="inputMessage" style="resize: none;" class="form-control flex-grow-1"></textarea>
        <div style="padding: 3px;"><button @click="onClickListener(inputMessage)" class="btn t-border">Send</button></div>
    </div>
</template>

<style lang="css" scoped>
button{
    border: solid 1px black;
    border-radius: 3px;
}
button:hover{
    background-color: rgba(0, 0, 0, 0.20)
}

.t-border{
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
</style>