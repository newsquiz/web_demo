<template>
  <v-card flat>
    <v-card-text class="text-xs-center">
      <p class="prefix-text">Your score</p>
      <span :class="`score-text ${scoreColor}--text`">
        {{ `${correctQuestions}/${totalQuestions}` }}
      </span>
      <span :class="`sub-score-text ${scoreColor}--text`">
        {{ `${(correctRatio * 100).toFixed(0)}%` }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    totalQuestions: Number,
    correctQuestions: Number,
  },
  computed: {
    correctRatio() {
      if (this.totalQuestions < 1) return 0
      return this.correctQuestions / this.totalQuestions
    },
    scoreColor() {
      if (this.correctRatio < 0.3) return 'red'
      else if (this.correctRatio < 0.6) return 'yellow'
      else return 'green'
    }
  }
}
</script>

<style>
.prefix-text {
  font-size: 24pt;
}

.score-text {
  font-size: 40pt;
  font-weight: bold;
}

.sub-score-text {
  font-size: 20pt;
  font-weight: bold;
}
</style>
