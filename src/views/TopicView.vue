<template>
  <div>
    <app-frame v-if="topic" navLocation="topics"
      :barColor="topic.value" :accentColor="topic.value">
      <v-container fluid fill-height>
        <v-layout fill-height row wrap>
          <v-flex xs12 md10 offset-md1 
            lg8 offset-lg2 xl6 offset-xl3 d-flex fill-height>
            <div>
              <p class="welcome-text">
                {{ topic.name }}
              </p>

              <h1 class="headline">
                Featured
              </h1>

              <article-horiz-list :articles="featured.articles"
                ></article-horiz-list>
              <br>
              <article-list :articles="all.articles"
                ></article-list>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </app-frame>

    <page-404 v-if="topic === undefined"></page-404>
  </div>
</template>

<script>
import axios from 'axios'

import AppFrame from '../components/AppFrame'
import Page404 from '../views/Page404'
import ArticleList from '../components/ArticleList'
import ArticleHorizList from '../components/ArticleHorizList'

export default {
  components: {
    AppFrame, Page404, ArticleList, ArticleHorizList
  },
  data() {
    return {
      topic: null,
      featured: {
        articles: [],
        loading: false,
        items: 6
      },
      all: {
        articles: [],
        loading: false,
      },
      itemsPerPage: 12
    }
  },
  computed: {

  },
  mounted() {
    const topicName = this.$route.params.topic
    const topics = this.$store.state.topics
    this.topic = topics.find(x => {
      return x.value === topicName
    })

    document.title = `${this.topic.name} - NewsQuiz`

    const component = this
    this.loadMore().then(() => {
      window.onscroll = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          component.loadMore()        
        }
      }
    })
  },
  methods: {
    loadMore() {
      const component = this
      const offset = this.featured.articles.length + this.all.articles.length
      const maxCount = this.itemsPerPage
      const url = `${process.env.VUE_APP_API_URL}/api/${this.topic.value}/articles?start=${offset}&max_count=${maxCount}`

      this.all.loading = true
      if (this.featured.length < 1) this.featured.loading = true

      return axios.get(url, {
        headers: {
          'User-Id': this.$store.state.user.id
        }
      }).then(response => {
        var data = response.data.data
        var i = 0
        if (component.featured.articles.length < 1) {
          const pushItems = Math.min(component.featured.items, data.length)
          for (; i<pushItems; i++) {
            component.featured.articles.push(data[i])
          }
        }
        for (; i<data.length; i++) {
          component.all.articles.push(data[i])
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        component.all.loading = false
        component.featured.loading = false
      })
    }
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
</style>
