<template>
  <app-frame navLocation="my-content">
    
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
      topics() {
        return this.$store.state.topics
      }
    }
  }
</script>
