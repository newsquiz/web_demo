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
        articles: [
        ]
    }),
    props: {
      topic: {
        default: {
          name: 'Politics',
          value: 'politics'
        }
      }
    },
    mounted() {
      this.fetchArticles();
    },
    methods: {
      fetchArticles: function() {
        const component = this
        axios.get(process.env.VUE_APP_API_URL + '/api/' + this.topic.value + '/articles').then(response => {
          component.articles = response.data.data
        })
      }
    }
  }
</script>