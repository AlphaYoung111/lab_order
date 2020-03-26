import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios'
import './assets/filter/filter'
// 全局样式
import './assets/css/global.css'
// 上传表格
import XLSX from 'xlsx'
// 导出表格
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(XLSX)
Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:33301/api/'
})

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')