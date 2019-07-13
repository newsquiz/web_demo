<template>
  <div>
    <v-container grid-list-lg>
      <h1>
        {{ `${topic.name}` }}
      </h1>
      <!-- <hr> -->
      <v-layout row wrap>
          <v-flex v-for="article in articles" 
            :key="article.id" xs12 sm4 md3>
              <article-item :article="article"/>
          </v-flex>
      </v-layout>   
    </v-container>
    <div class="text-xs-center">
      <v-btn round class="text" color="primary" dark>Load more</v-btn>
    </div>
  </div>
</template>


<script>
  import ArticleItem from '../components/ArticleItem'
  import axios from 'axios'
import { Z_NO_FLUSH } from 'zlib';

  export default {
    components: {
        ArticleItem
    },
    data: () => ({
      articles: [],
      page: 0,
      items_per_page: 12,
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
      fetchArticles: function() {
        // const component = this
        // axios.get(process.env.VUE_APP_API_URL + this.topic.value + `/articles?start=${this.page*this.items_per_page}&max_count=${this.items_per_page}`).then(response => {
        //   console.log(this.page)
        //   // Array.prototype.push.apply(component.articles, response.data.data)
        //   component.articles = response.data.data
        //   component.page += 1
        // })
      },
      loadMore () {
        var component = this
        axios.get(process.env.VUE_APP_API_URL + component.topic.value + `/articles?start=${component.page*component.items_per_page}&max_count=${component.items_per_page}`).then(response => {
          Array.prototype.push.apply(component.articles,response.data.data)
          console.log(component.articles)
          component.page += 1
        })
      },
    },
    mounted() {
      // this.fetchArticles();
      this.loadMore()
    }
  }
</script>