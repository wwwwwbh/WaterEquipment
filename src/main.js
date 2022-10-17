import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http'
import XLSX from 'xlsx'
import echarts from 'echarts'
import SvgIcon from '@/components/SvgIcon' // svg组件
import TagTop from '@/components/TagTop' // svg组件
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false

// 注册全局组件
Vue.component('svg-icon', SvgIcon)
Vue.component('tag-top', TagTop)
const req = require.context('./icons/svg', false, /\.svg$/)
// console.log(req)
const requireAll = reqireContext => {
  // console.log(reqireContext)
  reqireContext.keys().map(reqireContext)
}
requireAll(req)

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: 'hydssxShGwneWvLDMM5nW7nWQqcXaSEn'
})
Vue.prototype.$echarts = echarts
Vue.prototype.XLSX = XLSX
Vue.prototype.$http = http

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
