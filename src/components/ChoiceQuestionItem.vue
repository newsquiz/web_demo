<template>
  <div>
    <span><b>
      {{ `${index}. ${question.content}` }}
    </b></span>
    <v-radio-group v-model="question.userAnswer"
      :success-messages="correctStr"
      :error-messages="incorrectStr"
      :readonly="showResult" row>
      <v-layout row wrap>
        <v-flex v-for="opt in question.options" :key="opt"
          xs12 md6>
          <v-radio 
            :label="opt" :value="opt">
          </v-radio> 
        </v-flex>
      </v-layout>
    </v-radio-group>
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

<style>

</style>
