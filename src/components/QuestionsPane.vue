<template>
  <v-card :height="height" style="overflow-y: auto">
    <v-card-text v-for="(qst, index) in questions" :key="qst.id"
      class="demargin">
      <fill-question-item v-if="qst.type == 'fill'"
        :index="index + 1" :question="qst" :showResult="showResult"></fill-question-item>
      <choice-question-item v-else-if="qst.type == 'choice'"
        :index="index + 1" :question="qst" :showResult="showResult"></choice-question-item>
    </v-card-text>

    <v-card-actions class="btn-bar">
      <v-spacer></v-spacer>
      <v-btn color="error" round
        @click="abort"
        v-if="!finished">
        Abort and go back
      </v-btn>
      <v-btn color="success" round
        @click="submitAnswers"
        v-if="!finished">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FillQuestionItem from '@/components/FillQuestionItem'
import ChoiceQuestionItem from '@/components/ChoiceQuestionItem'

export default {
  components: {
    FillQuestionItem, ChoiceQuestionItem
  },
  data() {
    return {
      showResult: false,
      finished: false
    }
  },
  props: {
    questions: Array,
    article_id: String,
    height: String
  },
  methods: {
    submitAnswers() {
      this.showResult = true
    },
    abort() {

    }
  }
}
</script>

<style>
.demargin {
  margin-bottom: -20px;
}
</style>
