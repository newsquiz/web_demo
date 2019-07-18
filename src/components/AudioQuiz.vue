<template>
  <div>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md6 :offset-md3="!finished">
          <questions-pane :questions="article.questions"
            :article_id="article.id" :height="'70vh'"></questions-pane>
        </v-flex>
        
        <v-flex xs12 md6 v-show="finished">
          <v-card
            height="70vh" style="overflow-y: auto">
            <v-card-title>
              <span class="heading-text">
                Audio transcript
              </span>
            </v-card-title>

            <v-card-text>
              <div v-html="article.content" class="article-text"></div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    
  </div>
</template>

<script>
import QuestionsPane from '@/components/QuestionsPane'

export default {
  components: {
    QuestionsPane
  },
  data() {
    return {
      
    }
  },
  props: {
    article: Object
  },
  computed: {
    finished() {
      return this.$store.state.finished
    }
  }
}
</script>

<style scoped>
.heading-text {
  font-style: italic;
}
</style>
