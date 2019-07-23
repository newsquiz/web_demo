<template>
  <v-card flat class="demargin">
    <v-card-text class="text-xs-center">
      <p class="prefix-text">Your score</p>
      <span :class="`score-text ${scoreColor}`">
        {{ `${correctQuestions}/${totalQuestions}` }}
      </span>
      <span :class="`sub-score-text ${scoreColor}`">
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
      if (this.correctRatio < 0.3) return 'low-score'
      else if (this.correctRatio < 0.6) return 'avg-score'
      else return 'high-score'
    }
  }
}
</script>

<style scoped>
.demargin {
  margin-bottom: -5px;
}

.prefix-text {
  font-size: 24pt;
  margin-bottom: -5px;
  font-weight: bold;
}

.score-text {
  font-size: 40pt;
  font-weight: bold;
}

.sub-score-text {
  font-size: 20pt;
  font-weight: bold;
}

.low-score {
  color: red;
}

.avg-score {
  color: #f5b810;
}

.high-score {
  color: green;
}
</style>
