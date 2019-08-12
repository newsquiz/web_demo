import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: VueCookies.get('user-id')
    },
    finished: false,
    topics: [
      {
        name: 'Technology',
        value: 'technology',
        color: '#01579b'
      },
      {
        name: 'Society',
        value: 'society',
        color: '#ff6f00'
      },
      {
        name: 'Health',
        value: 'health',
        color: '#e91e63'
      },
      {
        name: 'Sports',
        value: 'sports',
        color: '#087f23'        
      },
      {
        name: 'Business',
        value: 'business',
        color: '#9c27b0'        
      },
      {
        name: 'Lifestyle',
        value: 'life',
        color: '#4f9a94'
      },
      {
        name: 'Travel',
        value: 'travel',
        color: '#bf360c'
      },
      {
        name: 'Food',
        value: 'eat-drink',
        color: '#f9a825'
      },
      {
        name: 'Environment',
        value: 'environment',
        color: '#8c9900'
      },
      {
        name: 'K-Pop',
        value: 'kpop',
        color: '#ff9e80'
      },
      {
        name: 'Politics',
        value: 'politics',
        color: '#00675b'
      },
      {
        name: 'Arts & Culture',
        value: 'hanoi-arts-culture',
        color: '#a094b7'
      },
      {
        name: 'Urban Hanoi',
        value: 'urbanisthanoi-news',
        color: '#6d4c41'
      }
    ]
  },
  mutations: {
    setFinished(state, value) {
      state.finished = value
    },
    setUserId(state, userId) {
      state.user.id = userId
    }
  },
  actions: {

  }
})
