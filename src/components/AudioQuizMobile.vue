<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-tabs mandatory grow
          v-model="activeTab"
          :color="barColor"
          slider-color="white"
          dark centered>
          <v-tab v-if="finished"><v-icon>mdi-clipboard-text-outline</v-icon></v-tab>
          <v-tab><v-icon>mdi-pencil</v-icon></v-tab>

          <v-tab-item v-if="finished">
            <text-content-pane :article="article"
              height="80vh" :showContent="finished">
              <template slot="subheader">
                <v-card-text style="margin-bottom: -20px">
                  <p>Audio transcript</p>
                </v-card-text>
              </template>
            </text-content-pane>
          </v-tab-item>

          <v-tab-item>
            <questions-pane :questions="article.questions"
              :article_id="article.id" height="80vh"
              hide-title></questions-pane>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>

    <v-snackbar right bottom
      :color="article.topic"
      :timeout="snackbar.timeout"
      v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import QuestionsPane from '@/components/QuestionsPane'
import TextContentPane from '@/components/TextContentPane'
import { finished } from 'stream';

export default {
  components: {
    QuestionsPane, TextContentPane
  },
  data() {
    return {
      activeTab: 0,
      snackbar: {
        message: '',
        show: false,
        timeout: 5000
      }
    }
  },
  props: {
    article: Object,
    barColor: String
  },
  computed: {
    finished() {
      return this.$store.state.finished
    }
  },
  watch: {
    finished(newVal) {
      if (newVal) {
        this.activeTab = 1
        this.snackbar.message = 'Swipe left to view audio transcript'
        this.snackbar.show = true
      }
    }
  }
}
</script>

<style scoped>
.heading-text {
  font-style: italic;
}
</style>
