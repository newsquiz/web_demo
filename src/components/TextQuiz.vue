<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card height="70vh" style="overflow-y: auto">
          <v-card-title>
            <span class="heading-text">
              <v-icon small>mdi-pencil</v-icon> Read the article and answer the questions.
            </span>
          </v-card-title>

          <v-card-text>
            <div v-html="article.content" class="article-text"></div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <questions-pane :questions="article.questions"
          :article_id="article.id" :height="'70vh'"></questions-pane>
      </v-flex>
    </v-layout>
  </v-container>
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
  }
}
</script>

<style>
.heading-text {
  font-style: italic;
}

.article-text {
  font-size: large;
}
</style>
