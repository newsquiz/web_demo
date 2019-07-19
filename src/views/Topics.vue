<template>
  <app-frame navLocation="topics">
    
  </app-frame>
</template>

<script>
import AppFrame from '../components/AppFrame'
import ArticleList from '../components/ArticleList'
export default {
  components: {
    AppFrame
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
