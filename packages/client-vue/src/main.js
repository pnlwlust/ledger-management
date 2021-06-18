import {createApp } from 'vue'
import installElementPlus from './plugins/element'
import router from "@/router";
import App from "@/App";
import store from "@/store";

const app = createApp(App)
app.use(router)
app.use(store)
installElementPlus(app)
app.mount('#app')