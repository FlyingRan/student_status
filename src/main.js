import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import qs from 'qs';
Vue.prototype.$qs = qs
// import qs from 'qs'
Vue.prototype.$axios = axios
// Vue.use(axios)

Vue.config.productionTip = false

Vue.use(ElementUI)
import '@assets/css/base.css'    
    
    

// axios.defaults.baseURL = 'localhost/phpvue'  //关键代码 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
