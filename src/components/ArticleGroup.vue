<template>
  <v-container grid-list-lg>
    {{title}}
    <hr>
    <v-layout>
        <v-flex v-for="article in articles" :key="article.id" sm3>
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
        id: 1,
        title: 'The thao',
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
        articleGroup:{
            default: {
                id: 1,
                title: 'The thao',
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
            }
        }
    }
  }
</script>