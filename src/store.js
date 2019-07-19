import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'John Doe',
      imageUrl: 'https://previews.123rf.com/images/nomadsoul1/nomadsoul11402/nomadsoul1140200090/25932879-man-making-faces-square-shot.jpg'
    },
    searchTerm: '',
    finished: false,
    topics: [
      {
        name: 'Technology',
        value: 'technology'
      },
      {
        name: 'Society',
        value: 'society'
      },
      {
        name: 'Health',
        value: 'health'
      },
      {
        name: 'Sports',
        value: 'sport'
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
    },
    setSearchTerm(state, term) {
      state.searchTerm = term
    }
  },
  actions: {

  }
})
