<template>
  <v-carousel height="300px" 
    :cycle="true" hide-delimiters>
    <v-carousel-item v-for="(group, i) in articleGroups" :key="i">
      <v-layout row align-center justify-center>
      <v-flex v-for="(article, index) in group" 
        :key="article.id" xs12
        class="bottom-pad" d-flex>
          <article-horiz-list-item :article="article"
            :style="index < itemsPerPage - 1 ? 'margin-right: 10px' : ''"/>
      </v-flex>
    </v-layout>
    </v-carousel-item>
    
  </v-carousel>
</template>

<script>
import ArticleHorizListItem from '../components/ArticleHorizListItem'

export default {
  components: {
      ArticleHorizListItem
  },
  data() {
    return {
      currentPage: 0
    }
  },
  computed: {
    itemsPerPage() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl':
          return 1
      }
    },
    currentArticles() {
      const start = this.currentPage * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.articles.slice(start, end)
    },
    articleGroups() {
      var groups = []
      for (var start=0; start < this.articles.length; start += this.itemsPerPage) {
        const end = start + this.itemsPerPage
        groups.push(this.articles.slice(start, end))
      }
      return groups
    }
  },
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
.bottom-pad {
  margin-bottom: 15px;
}

.left-btn {
  margin-left: -110px;
}
</style>

