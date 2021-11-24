import {createApp} from 'vue'
import App from './App.vue'
import axios from "axios";
import router from "./routher";

function getCookie(a) {
    // console.log(a)
    let d;
    let b = decodeURIComponent(document.cookie);
    // console.log(b)
    let c = b.split(";");
    for (let e = 0; e < c.length; e++) {
        let f = c[e].split("=");
        if (a === f[0].toString().trim()) {
            d = f[1];
            break;
        }
    }
    if (void 0 === d || null == d) {
        return "";
    } else {
        return unescape(d.trim());
    }
}
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

app.config.globalProperties.$getCookie = getCookie
app.config.globalProperties.$axios = axios
