<template>
  <app-frame navLocation="search">
    <v-container fluid fill-height>
      <v-layout fill-height row wrap>
        <v-flex xs12 md10 offset-md1 
          lg8 offset-lg2 d-flex fill-height>
          <div>
            <h1 class="headline bottom-pad">
              {{ `Search results for '${shortQuery}'` }}
            </h1>

            <article-list 
              :articles="articles"></article-list>
            <div class="text-xs-center">
              <v-progress-circular v-if="loading"
                :size="80" indeterminate></v-progress-circular>
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

export default {
  components: {
    AppFrame,
    ArticleList
  },
  data() {
    return {
      loading: false,
      articles: []
    }
  },
  computed: {
    shortQuery() {
      const L = 10
      const query = this.$route.query.query
      if (query.length <= L) return query
      return `${query.slice(0, L)}...`
    }
  },
  mounted() {
    document.title = `Search results for "${this.$route.query.query}"`
    this.search()
  },
  methods: {
    search() {
      const query = this.$route.query.query
      const component = this
      const url = `${process.env.VUE_APP_API_URL}/api/search?title=${query}&content=${query}`

      var headers = {}
      if (this.$store.state.user.id) {
        headers['User-Id'] = this.$store.state.user.id
      }
      this.loading = true
      return axios.get(url, {
        headers: headers
      }).then(response => {
        const data = response.data.data
        component.articles = data
      }).catch(error => {
        console.log(error)
        alert(error.message)
      }).then(() => {
        component.loading = false
      })
    }
  }
}
</script>

<style scoped>
.bottom-pad {
  margin-bottom: 20px;
}
</style>
