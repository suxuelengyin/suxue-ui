import Vue from 'vue'
import App from './App.vue'
import  DistPicker  from 'zjs-vue'

Vue.config.productionTip = false
console.log(DistPicker)
Vue.use(DistPicker)

new Vue({
    render: h => h(App),
}).$mount('#app')
