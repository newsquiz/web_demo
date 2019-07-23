<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <text-content-pane :article="article"
            height="80vh" :showContent="finished">
            <template slot="subheader">
              <v-card-text style="margin-bottom: -20px">
                <p>{{ subheaderText }}</p>
              </v-card-text>
            </template>
          </text-content-pane>
        </v-flex>

        <v-flex xs12 md6>
          <questions-pane :questions="article.questions"
            :article_id="article.id" height="80vh"></questions-pane>
        </v-flex>
      </v-layout>
    </v-container>

    
  </div>
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
