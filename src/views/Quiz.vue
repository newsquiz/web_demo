<template>
  <div>
    <app-frame :showNav="false" :barColor="topic.color">
      <v-layout row v-if="article" fill-height>
        <v-flex xs12 fill-height>
          <text-quiz v-if="article.type == 'text' && !isMobile"
            :article="article"></text-quiz>
          <text-quiz-mobile v-if="article.type == 'text' && isMobile" 
            :barColor="topic.color"
            :article="article"></text-quiz-mobile>
          <audio-quiz v-else-if="article.type == 'audio' && !isMobile"
            :article="article"></audio-quiz>
          <audio-quiz-mobile v-else-if="article.type == 'audio' && isMobile"
            :barColor="topic.color"
            :article="article"></audio-quiz-mobile>
        </v-flex>
      </v-layout>

      <div class="text-xs-center" style="margin-top: 20%" v-if="loading" >
        <v-progress-circular indeterminate
          size="128" width="10"></v-progress-circular>
      </div>
    </app-frame>

    <v-footer app :color="'white'" dark height="64"
      v-if="article && article.type == 'audio'" style="padding: 0">
      <audio-player :color="topic.color || 'primary'"
        :file="audioUrl"></audio-player>
    </v-footer>
  </div>
</template>

<script>
import AppFrame from '@/components/AppFrame'
import TextQuiz from '@/components/TextQuiz'
import TextQuizMobile from '@/components/TextQuizMobile'
import AudioQuiz from '@/components/AudioQuiz'
import AudioQuizMobile from '@/components/AudioQuizMobile'
import AudioPlayer from '@/components/AudioPlayer'

import axios from 'axios'

function processContent(s) {
  s = s.trim()
  s = `<p>${s}</p>`
  s = s.replace(/\n+/g, '</p></p>')
  return s
}

export default {
  components: {
    AppFrame, TextQuiz, AudioQuiz, AudioPlayer,
    TextQuizMobile, AudioQuizMobile
  },
  mounted() {
    this.$store.commit('setFinished', false)
    this.fetchArticle()
  },
  methods: {
    fetchArticle() {
      const component = this
      const id = this.$route.params.quiz_id
      var url = `${process.env.VUE_APP_API_URL}/api/articles/${id}`
      this.loading = true

      var headers = {}
      if (this.$store.state.user.id) {
        headers['User-Id'] = this.$store.state.user.id
      }
      return axios.get(url, {
        headers: headers
      }).then(response => {
        const data = response.data.data
        component.article = data
        document.title = `${component.article.title} - NewsQuiz`
        component.article.content = processContent(component.article.content)
        const topicName = data.topic
        const topics = this.$store.state.topics
        this.topic = topics.find(x => {
          return x.value === topicName
        }) || {}
      }).catch(error => {
        alert(error.message)
      }).finally(() => {
        component.loading = false
      })
    }
  },
  computed: {
    audioUrl() {
      if (this.article.audio.startsWith('http')) {
        return this.article.audio
      }
      return `${process.env.VUE_APP_API_URL}${this.article.audio}`
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true
        case 'md':
        case 'lg':
        case 'xl':
          return false
      }
    }
  },
  data() {
    return {
      article: null,
      loading: false,
      topic: {}
    }
  }
}
</script>

<style scoped>

</style>
