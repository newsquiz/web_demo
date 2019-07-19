<template>
  <app-frame navLocation="home">

  </app-frame>
</template>

<script>
import AppFrame from '../components/AppFrame'
import ArticleItem from '../components/ArticleItem'
export default {
  components: {
    AppFrame, ArticleItem
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
