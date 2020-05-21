import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import api from './api/index'
// import html2canvas from 'html2canvas'
import VueClipboard from 'vue-clipboard2'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
// Vue.use(html2canvas)
Vue.use(VueClipboard)
Vue.prototype.$ajax = axios;
Vue.prototype.api = api;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
Vue.use(preview)
Vue.use(ElementUI)
// Vue.use(Antd)
Vue.config.productionTip = false
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
