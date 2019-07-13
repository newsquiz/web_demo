<template>
  <v-container grid-list-lg>
    <h1>
      {{ `${topic.name}` }}
    </h1>
    <!-- <hr> -->
    <v-layout row wrap>
        <v-flex v-for="article in articles" 
          :key="article.id" xs12 sm6 md3>
            <article-item :article="article"/>
        </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import ArticleItem from '../components/ArticleItem'
  export default {
    components: {
        ArticleItem
    },
    data: () => ({
        articles: [
            {
                id: 1,
                thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                title: 'Number 10',
                date: '25-07-2019',
                level: 'beginner'
            },
            {
                id: 2,
                thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                title: 'Number 1012',
                date: '25-07-2019',
                level: 'beginner'
            },
        ]
    }),
    props: {
      topic: {
        default: {
          name: 'Politics',
          value: 'politics'
        }
      }
    }
  }
</script>