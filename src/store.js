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
          background: '/images/technology.jpg'
        }
      },
      {
        name: 'Society',
        value: 'society',
        tile: {
          background: '/images/society.jpg'
        }
      },
      {
        name: 'Health',
        value: 'health',
        tile: {
          background: '/images/health.png'
        }
      },
      {
        name: 'Sports',
        value: 'sport',
        tile: {
          background: '/images/sport.jpg'
        }
      },
      {
        name: 'Business',
        value: 'business',
        tile: {
          background: '/images/business.png'
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
