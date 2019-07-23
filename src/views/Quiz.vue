<template>
  <div>
    <app-frame :showNav="false" :barColor="barColor">
      <v-layout row v-if="article" fill-height>
        <v-flex xs12 fill-height>
          <text-quiz v-if="article.type == 'text' && !isMobile"
            :article="article"></text-quiz>
          <text-quiz-mobile v-if="article.type == 'text' && isMobile"
            :article="article"></text-quiz-mobile>
          <audio-quiz v-else-if="article.type == 'audio'"
            :article="article"></audio-quiz>
        </v-flex>
      </v-layout>

      <div class="text-xs-center" style="margin-top: 20%" v-if="loading" >
        <v-progress-circular indeterminate
          size="128" width="10"></v-progress-circular>
      </div>
    </app-frame>

    <v-footer app :color="'white'" dark height="64"
      v-if="article && article.type == 'audio'" style="padding: 0">
      <audio-player :color="barColor"
        :file="audioUrl"></audio-player>
    </v-footer>
  </div>
</template>

<script>
import AppFrame from '@/components/AppFrame'
import TextQuiz from '@/components/TextQuiz'
import TextQuizMobile from '@/components/TextQuizMobile'
import AudioQuiz from '@/components/AudioQuiz'
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
    TextQuizMobile
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
      return axios.get(url, {
        headers: {
          'User-Id': '1'
        }
      }).then(response => {
        const data = response.data.data
        component.article = data
        document.title = component.article.title
        component.article.content = processContent(component.article.content)
        component.barColor = component.article.topic
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
      barColor: 'primary'
    }
  }
}
</script>

<style scoped>

</style>
