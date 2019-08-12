<template>
  <v-card :height="height" style="overflow-y: auto" id="pane"
    class="left-border">
    <span id="pane-top"></span>
    <score-card v-if="finished" 
      :totalQuestions="totalQuestions"
      :correctQuestions="totalCorrectQuestions"></score-card>

    <v-card-text>
      <v-icon class="mr-1">mdi-pencil</v-icon>
      <span class="title">Questions</span>
    </v-card-text>

    <v-card-text v-for="(qst, index) in questions" :key="qst._id"
      class="demargin">
      <fill-question-item v-if="qst.type == 'Short-Answer-Question' || qst.type == 'Fullfill'"
        :index="index + 1" :question="qst" :showResult="showResult"></fill-question-item>
      <choice-question-item v-else-if="qst.type == 'Multi-Choice-Question' || qst.type =='Fullfill-MultiChoice'"
        :index="index + 1" :question="qst" :showResult="showResult"></choice-question-item>
      <yes-no-question-item v-else-if="qst.type == 'Yes-No-Question'"
        :index="index + 1" :question="qst" :showResult="showResult"></yes-no-question-item>
      
      <div class="text-xs-right">
        <explanation-menu v-if="qst.explain && showResult"
          :content="qst.explain"></explanation-menu>
      </div>
    </v-card-text>

    <v-card-text v-if="questions.length == 0"
      class="text-xs-center">
      <p class="subheading grey--text">
        Questions for your content will show up here
      </p>
    </v-card-text>

    <br>
    <v-divider></v-divider>
    <v-card-text v-if="showResult">
      <p class="headline">Recommended articles</p>
      <article-horiz-list :itemsPerPage="1"
        :articles="nextArticles"></article-horiz-list>
    </v-card-text>

    <v-card-actions class="btn-bar">
      <v-spacer></v-spacer>
      <v-btn color="success" round
        @click="submitAnswers"
        v-if="!finished && questions.length > 0">
        Submit
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

import ArticleHorizList from '../components/ArticleHorizList'
import ExplanationMenu from '@/components/ExplanationMenu'
import FillQuestionItem from '@/components/FillQuestionItem'
import ChoiceQuestionItem from '@/components/ChoiceQuestionItem'
import YesNoQuestionItem from '@/components/YesNoQuestionItem'
import ScoreCard from '@/components/ScoreCard'

export default {
  components: {
    FillQuestionItem, ChoiceQuestionItem, ScoreCard,
    YesNoQuestionItem, ExplanationMenu, ArticleHorizList
  },
  data() {
    return {
      showResult: false,
      nextArticles: []
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
      return this.questions.filter(x => x.correct)
    },
    totalCorrectQuestions() {
      return this.correctQuestions.length
    }
  },
  props: {
    questions: Array,
    article_id: String,
    height: {
      default: '100%'
    }
  },
  methods: {
    submitAnswers() {
      const component = this
      const url = `${process.env.VUE_APP_API_URL}/api/user_answers`
      const qids = this.questions.map(x => x.id)
      const answers = this.questions.map(x => x.userAnswer || '')
      const payload = {
        questions: qids,
        answers: answers
      }

      var headers = {}
      if (this.$store.state.user.id) {
        headers['User-Id'] = this.$store.state.user.id
      }
      return axios.post(url, payload, {
        headers: headers
      }).then(response => {
        const data = response.data.data
        for (var i=0; i<data.results.length; i++) {
          component.questions[i].correct = data.results[i]
          component.questions[i].explain = data.explains[i]
          component.questions[i].answer = data.answers[i] 
        }
        component.fetchNextArticles()
        component.onResultReady()
      }).catch(error => {
        alert(error.message)
      })
    },
    onResultReady() {
      this.showResult = true
      this.$store.commit('setFinished', true)
      this.$scrollTo('#pane-top', 500, {
        container: '#pane',
        force: true
      })
    },
    fetchNextArticles() {
      const component = this
      const url = `${process.env.VUE_APP_API_URL}/api/recommended_articles?num_item=6`

      var headers = {}
      if (this.$store.state.user.id) {
        headers['User-Id'] = this.$store.state.user.id
      }
      return axios.get(url, {
        headers: headers
      }).then(response => {
        const data = response.data.data
        for (var i=0; i<data.length; i++) {
          component.nextArticles.push(data[i])
        }
      }).catch(error => {
        console.log(error)
      })
    },
    abort() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.demargin {
  margin-bottom: -20px;
}

.left-border {
  border-left: solid 1px #959595;
}

.header-text {
  font-size: 18pt;
  font-weight: 600;
}
</style>
