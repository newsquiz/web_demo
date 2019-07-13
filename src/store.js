import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'John Smith',
      imageUrl: 'http://extendthemes.com/demos/mesmerize-pro-furniture/wp-content/uploads/sites/9/2018/06/cropped-pexels-photo-839011.png'
    },
    finished: false,
    topics: [
      {
        name: 'Politics',
        value: 'politics'
      },
      {
        name: 'Society',
        value: 'society'
      },
      {
        name: 'Economy',
        value: 'economy'
      },
      {
        name: 'Sports',
        value: 'sports'
      },
      {
        name: 'Recommended',
        groupTitle: 'Suggested articles for you',
        value: 'recommended'
      }
    ]
  },
  mutations: {
    setFinished(state, value) {
      state.finished = value
    }
  },
  actions: {

  }
})
