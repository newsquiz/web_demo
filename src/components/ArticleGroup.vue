<template>
  <v-container grid-list-lg>
    <div>
      <h1>
        {{ `${topic.groupTitle || topic.name}` }}
      </h1>
    </div>
    <v-layout row wrap>
      <v-flex v-for="article in articles" 
        :key="article.id" xs12 sm6 md4 xl3>
          <article-item :article="article"/>
      </v-flex>
    </v-layout>
    
    <div class="text-xs-center">
      <v-btn @click="loadMore"
        :loading="loading"
        icon large color="info" ripple>
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>


<script>
  import ArticleItem from '../components/ArticleItem'
  import axios from 'axios'

  export default {
    components: {
        ArticleItem
    },
    data: () => ({
      articles: [],
      page: 0,
      items_per_page: 12,
      loading: false
    }),
    props: {
      topic: {
        default: {
          name: 'Politics',
          value: 'politics'
        }
      }
    },
    methods: {
      loadMore () {
        var component = this
        var offset = component.page * component.items_per_page
        var url = process.env.VUE_APP_API_URL + '/api/' + component.topic.value + `/articles?start=${offset}&max_count=${component.items_per_page}`
        
        this.loading = true
        axios.get(url).then(response => {
          var data = response.data.data
          for (var i=0; i<data.length; i++) {
            component.articles.push(data[i])
          }
          component.page += 1
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          component.loading = false
        })
      },
    },
    mounted() {
      this.loadMore()
    }
  }
</script>