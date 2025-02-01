<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
defineExpose({
    name: "shengWeatherCard"
})
defineProps({
    tweather:Object,
    fweather:Array
})
</script>

<template>
<div class="wea-card-cont d-flex flex-column">
    <div class="row-temp-weather t-border">
        <div class="d-flex flex-row">
            <img class="weather-icon" alt="" :src="tweather.isrc">
            <div class="weather-cont d-flex flex-column justify-content-center">
                <p>{{ tweather.weather }}</p>
                <p>{{ tweather.temp }}</p>
            </div>
        </div>
    </div>
    <div class="row-forecast t-border">
        <div class="forecast-card-cont d-flex flex-row">
            <div v-for="forecast in fweather" class="forecast-card t-border">
                <img class="weather-icon-forecast" alt="" :src="forecast.isrc">
                <p>{{ forecast.weather }}</p>
                <p>{{ forecast.time }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.forecast-card{
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    margin: 6px;
    padding: 6px;
}
.forecast-card p{
    margin: 0;
    text-align: center;
}
.weather-cont p{
    font-size: 32px;
    margin: 0;
}
.weather-icon{
    width: 118px;
    height: 118px;
}
.weather-icon-forecast{
    height: 72px;
    width: 72px;
}
.row-temp-weather{
    flex-grow: 0.2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.row-forecast{
    margin-top: 3px;
    flex-grow: 0.8;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.wea-card-cont{
    height: 100%;
    flex-basis: 49%;
    padding: 6px;
}
.t-border{
  border: solid 1px rgb(0, 0, 0);
  border-radius: 3px;
}
</style>