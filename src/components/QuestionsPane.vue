<template>
  <v-card :height="height" style="overflow-y: auto">
    <score-card v-if="finished"
      :totalQuestions="totalQuestions"
      :correctQuestions="totalCorrectQuestions"></score-card>

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
        Back to home
      </v-btn>
      <v-btn color="success" round
        @click="submitAnswers"
        v-if="!finished">
        Submit
      </v-btn>
      <v-btn v-if="finished"
        color="info" round
        @click="abort">
        Back to home
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import FillQuestionItem from '@/components/FillQuestionItem'
import ChoiceQuestionItem from '@/components/ChoiceQuestionItem'
import ScoreCard from '@/components/ScoreCard'

export default {
  components: {
    FillQuestionItem, ChoiceQuestionItem, ScoreCard
  },
  data() {
    return {
      showResult: false,
    }
  },
  computed: {
    finished() {
      return this.$store.state.finished
    },
    totalQuestions() {
      return this.questions.length
    },
    correctQuestions() {
      return this.questions.filter(x => x.userAnswer === x.answer, this.questions)
    },
    totalCorrectQuestions() {
      return this.correctQuestions.length
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
      this.$store.commit('setFinished', true)
    },
    abort() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.demargin {
  margin-bottom: -20px;
}
</style>
