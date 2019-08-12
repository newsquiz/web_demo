<template>
  <app-frame navLocation="home">
    <v-container fluid fill-height>
      <v-layout fill-height row wrap>
        <v-flex xs12 md10 offset-md1 
          lg8 offset-lg2 xl6 offset-xl3 d-flex fill-height>
          <div>
            <p class="welcome-text">
              {{ welcomeMessage }}
            </p>
            
            <h1 class="bottom-pad headline">
              Featured articles
            </h1>
            <article-horiz-list v-if="!featured.loading"
              :articles="featured.articles"></article-horiz-list>
            <div class="text-xs-center bottom-pad">
              <v-progress-circular indeterminate
              v-if="featured.loading"
              size="64"></v-progress-circular>
            </div>
              
            <br>
            <h1 class="bottom-pad headline">
              Latest news
            </h1>
            <article-list 
              :articles="latest.articles"></article-list>
            <div class="text-xs-center">
              <v-progress-circular indeterminate
              v-if="latest.loading"
              size="48"></v-progress-circular>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </app-frame>
</template>

<script>
import axios from 'axios'

import AppFrame from '../components/AppFrame'
import ArticleList from '../components/ArticleList'
import ArticleHorizList from '../components/ArticleHorizList'

export default {
  components: {
    AppFrame, ArticleList, ArticleHorizList
  },
  data() {
    return {
      featured: {
        articles: [],
        loading: false,
        itemsPerPage: 6
      },
      latest: {
        articles: [],
        loading: false,
      },
      itemsPerPage: 12
    }
  },
  computed: {
    topics() {
      return this.$store.state.topics
    },
    user() {
      return this.$store.state.user
    },
    welcomeMessage() {
      const now = new Date()
      const h = now.getHours()
      var s = ''
      if (h >= 5 && h <= 12) {
        s += 'Good morning'
      } else if (h <= 18) {
        s += 'Good afternoon'
      } else {
        s += 'Good evening'
      }
      
      if (this.user.name) {
        s += `, ${this.user.name}`
      }

      s += '!'
      return s
    }
  },
  methods: {
    loadNew() {
      const component = this
      const offset = this.featured.articles.length + this.latest.articles.length
      const maxCount = this.itemsPerPage
      const url = `${process.env.VUE_APP_API_URL}/api/new/articles?start=${offset}&max_count=${maxCount}`

      this.latest.loading = true
      if (this.featured.length < 1) this.featured.loading = true

      var headers = {}
      if (this.$store.state.user.id) {
        headers['User-Id'] = this.$store.state.user.id
      }
      return axios.get(url, {
        headers: headers
      }).then(response => {
        var data = response.data.data
        var i = 0
        if (component.featured.articles.length < 1) {
          const pushItems = Math.min(component.featured.itemsPerPage, data.length)
          for (; i<pushItems; i++) {
            component.featured.articles.push(data[i])
          }
        }
        for (; i<data.length; i++) {
          component.latest.articles.push(data[i])
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        component.latest.loading = false
        component.featured.loading = false
      })
    }
  },
  mounted() {
    const component = this

    document.title = 'NewsQuiz'
    this.loadNew().then(() => {
      window.onscroll = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          component.loadNew()        
        }
      }
    })
  },
  beforeDestroy() {
    window.onscroll = () => {}
  }
}
</script>

<style scoped>
.welcome-text {
  font-weight: 500;
  font-size: 24pt;
}

.bottom-pad {
  margin-bottom: 20px;
}
</style>
