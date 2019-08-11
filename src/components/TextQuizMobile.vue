<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs mandatory grow
        v-model="activeTab"
        :color="barColor"
        slider-color="white"
        dark centered>
        <v-tab><v-icon>mdi-clipboard-text-outline</v-icon></v-tab>
        <v-tab><v-icon>mdi-pencil</v-icon></v-tab>

        <v-tab-item>
          <text-content-pane :article="article"
            height="80vh">
          </text-content-pane>
        </v-tab-item>
        <v-tab-item>
          <questions-pane :questions="article.questions"
            :article_id="article.id" height="80vh"></questions-pane>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  
    <v-flex xs12 md6>
      
    </v-flex>
  </v-layout>
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
      activeTab: 0
    }
  },
  props: {
    article: Object,
    barColor: String
  }
}
</script>

<style scoped>

</style>
