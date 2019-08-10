<template>
  <div>
    <span><b>
      {{ `${index}. ${displayContent}` }}
    </b></span>
    <v-radio-group v-model="question.userAnswer"
      :success-messages="correctStr"
      :error-messages="incorrectStr"
      :readonly="showResult" :row="useRow">
      <v-radio v-for="opt in question.options" :key="opt"
      xs12 md6
        :label="opt" :value="opt">
      </v-radio> 
    </v-radio-group>
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
    },
    useRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return false
        case 'md':
        case 'lg':
        case 'xl':
          return true
      }
    }
  }
}
</script>

<style scoped>

</style>
