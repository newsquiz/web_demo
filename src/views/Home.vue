<template>
  <app-frame navLocation="home">
    <v-container fluid fill-height>
      <v-layout fill-height row wrap>
        <v-flex xs12 md10 offset-md1 
          lg8 offset-lg2 d-flex fill-height>
            <div>
              <p class="welcome-text">
                {{ welcomeMessage }}
              </p>
              <p v-if="user">
                {{ `You've completed ${user.stats.articlesToday} articles today.` }}
              </p>
             
              <h1 class="bottom-pad headline">
                Recommended for you
              </h1>
              <article-horiz-list v-if="!recommended.loading"
                :articles="recommended.articles"></article-horiz-list>
              <div class="text-xs-center">
                <v-progress-circular indeterminate
                v-if="recommended.loading"
                size="64"></v-progress-circular>
              </div>
              
              <br></br>
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
      recommended: {
        articles: [],
        loading: false,
        page: 0,
        itemsPerPage: 6
      },
      latest: {
        articles: [],
        loading: false,
        page: 0,
        itemsPerPage: 12
      },
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
      
      if (this.user) {
        s += `, ${this.user.name}`
      }

      s += '!'
      return s
    }
  },
  methods: {
    loadNew() {
      const component = this
      const offset = this.latest.itemsPerPage * this.latest.page
      const url = `${process.env.VUE_APP_API_URL}/api/new/articles?start=${offset}&max_count=${this.latest.itemsPerPage}`

      this.latest.loading = true
      return axios.get(url).then(response => {
        var data = response.data.data
        for (var i=0; i<data.length; i++) {
          component.latest.articles.push(data[i])
        }
        component.latest.page += 1
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        component.latest.loading = false
      })
    },
    loadRecommended() {
      const component = this
      const offset = this.recommended.itemsPerPage * this.recommended.page
      const url = `${process.env.VUE_APP_API_URL}/api/health/articles?start=${offset}&max_count=${this.recommended.itemsPerPage}`

      this.recommended.loading = true
      return axios.get(url).then(response => {
        var data = response.data.data
        for (var i=0; i<data.length; i++) {
          component.recommended.articles.push(data[i])
        }
        component.recommended.page += 1
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        component.recommended.loading = false
      })
    }
  },
  mounted() {
    this.loadNew()
    this.loadRecommended()
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
