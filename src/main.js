import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import './assets/css/global.css'
// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')