import {createApp } from 'vue'
import installElementPlus from './plugins/element'
import router from "@/router";
import App from "@/App";

const app = createApp(App)
app.use(router)
installElementPlus(app)
app.mount('#app')