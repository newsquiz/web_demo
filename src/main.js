import '@babel/polyfill'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueCookies from 'vue-cookies'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'typeface-comfortaa'
import '@mdi/font/css/materialdesignicons.css'
import '@/stylesheets/decor.css'

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(VueCookies)
VueCookies.config('30d')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
