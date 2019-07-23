<template>
  <v-container fill-height fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <text-content-pane :article="article"
          height="85vh">
        </text-content-pane>
      </v-flex>
    
      <v-flex xs12 md6>
        <questions-pane :questions="article.questions"
          :article_id="article.id" height="85vh"></questions-pane>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestionsPane from '@/components/QuestionsPane'
import TextContentPane from '@/components/TextContentPane'

export default {
  components: {
    QuestionsPane, TextContentPane
  },
  data() {
    return {

    }
  },
  props: {
    article: Object
  }
}
</script>

<style scoped>

</style>
