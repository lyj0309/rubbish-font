import {createApp} from 'vue'
import App from './App.vue'
import axios from "axios";
import router from "./routher";


const app = createApp(App)
app.use(router)
app.mount('#app')


app.config.globalProperties.$axios = axios
