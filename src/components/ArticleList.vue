<template>
  <v-layout row wrap>
    <v-flex v-for="article in articles" 
      :key="article.id" xs12
      class="bottom-pad">
        <article-list-item :article="article"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import ArticleListItem from '../components/ArticleListItem'

  export default {
    components: {
        ArticleListItem
    },
    data: () => ({
      
    }),
    props: {
      articles: Array
    },
    methods: {
      
    },
    mounted() {
      
    }
  }
</script>

<style scoped>
.topic-text {
  font-size: 28pt;
}

.bottom-pad {
  margin-bottom: 15px;
}
</style>

