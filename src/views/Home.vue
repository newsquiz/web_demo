<template>
  <app-frame>
      <article-group/>
  </app-frame>
</template>

<script>
  import AppFrame from '../components/AppFrame'
  import ArticleItem from '../components/ArticleItem'
  import ArticleGroup from '../components/ArticleGroup'
  export default {
    components: {
      AppFrame,
      ArticleGroup
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
