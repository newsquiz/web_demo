<template>
  <div>
    <span><b>
      {{ `${index}. ${displayContent}` }}
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
import { capitalize } from '@/libs/utils'

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
    displayContent() {
      return capitalize(this.question.content)
    },
    isCorrect() {
      return this.question.correct
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
