<template>
  <app-frame navLocation="search">
    
  </app-frame>
</template>

<script>
import AppFrame from '../components/AppFrame'
import ArticleList from '../components/ArticleList'

export default {
  components: {
    AppFrame,
    ArticleList
  },
  data() {
    return {

    }
  },
  computed: {
    
  },
  mounted() {
    document.title = `Search results for "${this.$route.query.query}"`
  }
}
</script>

<style scoped>

</style>
