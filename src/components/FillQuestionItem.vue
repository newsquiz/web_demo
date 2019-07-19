<template>
  <div>
    <span><b>
      {{ `${index}. ${question.content}` }}
    </b></span>
    <v-text-field v-model="question.userAnswer"
      placeholder="Type your answer here..."
      :success-messages="correctStr"
      :error-messages="incorrectStr"
      :readonly="showResult"
      :clearable="!showResult"
      ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    index: Number,
    question: Object,
    showResult: Boolean
  },
  computed: {
    isCorrect() {
      return this.question.answer === this.question.userAnswer
    },
    correctStr() {
      if (this.showResult && this.isCorrect) {
        return 'Correct'
      }
      return []
    },
    incorrectStr() {
      if (this.showResult && !this.isCorrect) {
        return `The correct answer is '${this.question.answer}'`
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
