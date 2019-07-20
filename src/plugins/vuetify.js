import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#424242',
    secondary: '#1b1b1b',
    accent: '#f44336',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    technology: '#01579b',
    society: '#ff6f00',
    health: '#e91e63',
    sport: '#087f23',
    business: '#9c27b0'
  },
  options: {
    customProperties: true
  },
  iconfont: 'mdi',
})
