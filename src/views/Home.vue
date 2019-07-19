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
             
              <h1 class="bottom-pad">
                Recommended for you
              </h1>
              
              <h1 class="bottom-pad">
                Latest news
              </h1>
              <article-list
                :articles="latest.articles"></article-list>
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

export default {
  components: {
    AppFrame, ArticleList
  },
  data() {
    return {
      recommended: {
        articles: [],
        loading: false,
        page: 0
      },
      latest: {
        articles: [],
        loading: false,
        page: 0
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
      const offset = this.itemsPerPage * this.latest.page
      const url = `${process.env.VUE_APP_API_URL}/api/new/articles?start=${offset}&max_count=${this.itemsPerPage}`

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
      const offset = this.itemsPerPage * this.latest.page
      const url = `${process.env.VUE_APP_API_URL}/api/recommended/articles?start=${offset}&max_count=${this.itemsPerPage}`

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
  font-size: 20pt;
}

.bottom-pad {
  margin-bottom: 20px;
}
</style>
