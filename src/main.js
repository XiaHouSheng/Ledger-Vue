import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import ledger from './views/pages/ledger.vue'
import mqttclient from './views/pages/mqttclient.vue'
import sensornet from './views/pages/sensorNet.vue'

const routes = [
    { path: '/ledger', component: ledger },
    { path: '/mqttclient', component: mqttclient },
    { path: '/sensornet', component: sensornet }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });

createApp(App).use(router).mount('#app')

