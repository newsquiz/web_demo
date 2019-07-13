<template>
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
                level: 'easy',
                publisher: 'WSJ',
                source_url: 'https://www.bbc.co.uk/'
            },
            {
                id: 2,
                thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                title: 'Number 1012',
                date: '25-07-2019',
                level: 'medium',
                publisher: 'BBC news',
                source_url: 'https://www.bbc.co.uk/'
            },
            {
                id: 3,
                thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                title: 'Number 1012',
                date: '25-07-2019',
                level: 'hard',
                publisher: 'BBC news',
                source_url: 'https://www.bbc.co.uk/'
            },
            {
                id: 4,
                thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                title: 'Number 1012',
                date: '25-07-2019',
                level: 'hard',
                publisher: 'BBC news',
                source_url: 'https://www.bbc.co.uk/'
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