import { createApp } from 'vue'
import App from './App.vue'
import { initSeason } from './season.js'
import './styles.css'

initSeason()
createApp(App).mount('#app')
