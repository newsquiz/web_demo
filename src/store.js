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
          icon: ''
        }
      },
      {
        name: 'Society',
        value: 'society',
        tile: {
          icon: ''
        }
      },
      {
        name: 'Health',
        value: 'health',
        tile: {
          icon: ''
        }
      },
      {
        name: 'Sports',
        value: 'sport',
        tile: {
          icon: ''
        }
      },
      {
        name: 'Business',
        value: 'business',
        tile: {
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
