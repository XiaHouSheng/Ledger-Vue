<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

let pageName = "Ledger"

</script>
<template>
<div class="container">
  <nav class="navbar navbar-expand-sm navbar-dark ledger-head" style="border-radius: 5px"> 
    <a style="margin-left: 5px" class="navbar-brand" href="#">{{ pageName }}</a>
    <ul class="navbar-nav" style="width: 100%;">
      <li class="nav-item"><RouterLink class="nav-link" to="/ledger">Ledger</RouterLink></li>
      <li class="nav-item"><RouterLink class="nav-link" to="/mqttclient">MqttClient</RouterLink></li>
      <li class="nav-item"><RouterLink class="nav-link" to="/sensornet">SensorNet</RouterLink></li>
      <li class="nav-item" style="margin-left: auto;"><a class="btn nav-link">Login</a></li>
    </ul>
  </nav>
</div>
<RouterView class="router-view"></RouterView>
</template>

<style scoped>
.router-view{
    margin-top: 12px;
}
nav{
    margin-top: 12px;
    background-color: blueviolet;
}
</style>