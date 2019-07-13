import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'John Smith',
      imageUrl: 'http://extendthemes.com/demos/mesmerize-pro-furniture/wp-content/uploads/sites/9/2018/06/cropped-pexels-photo-839011.png'
    },
    recommend: {
      checked: false,
      articles: [
        {
          _id: '1',
          topic: '',
          created_time: '13/07/2019',
          thumbnail: 'https://znews-photo.zadn.vn/w480/Uploaded/jaegtn/2019_07_13/Business_ZuckerbergCapitol944719958_1.jpg',
          type: 'text',
          title: 'Zuckerberg at Facebook'
        }
      ]
    },
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
    ]
  },
  mutations: {

  },
  actions: {

  }
})
