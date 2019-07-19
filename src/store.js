import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'John Doe',
      imageUrl: 'https://previews.123rf.com/images/nomadsoul1/nomadsoul11402/nomadsoul1140200090/25932879-man-making-faces-square-shot.jpg',
      stats: {
        articlesToday: 5
      }
    },
    finished: false,
    topics: [
      {
        name: 'Technology',
        value: 'technology',
        tile: {
          gradient: 'to top right, #63a4ff, #004ba0',
          icon: ''
        }
      },
      {
        name: 'Society',
        value: 'society',
        tile: {
          gradient: 'to top left, #ab000d, #ff6f60',
          icon: ''
        }
      },
      {
        name: 'Health',
        value: 'health',
        tile: {
          gradient: 'to top, #8e24aa, #fdd835',
          icon: ''
        }
      },
      {
        name: 'Sports',
        value: 'sport',
        tile: {
          gradient: 'to bottom left, #8bc34a, #f9a825',
          icon: ''
        }
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
