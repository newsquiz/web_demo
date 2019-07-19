<template>
  <div>
    <app-frame>
      <v-layout row v-if="article" style="padding: 10px">
        <v-flex xs12 md10 offset-md1>
          <div class="text-xs-center">
            <p class="title-text">
              <span>{{ article.title }}</span>
            </p>
            <p class='subtitle-text'>
              Published by <a :href="article.source_url">{{ article.publisher }}</a> on <span>{{ displayDate }}</span>
            </p>
            <p>
              <v-chip small dark label color="accent" outline>
                {{ displayType }}
              </v-chip>
              <v-chip small dark label :color="levelColor">{{ displayLevel }}</v-chip>
            </p>
          </div>
          
          <text-quiz v-if="article.type == 'text'"
            :article="article"></text-quiz>
          <audio-quiz v-else-if="article.type == 'audio'"
            :article="article"></audio-quiz>
        </v-flex>
      </v-layout>

      <div class="text-xs-center" style="margin-top: 20%" v-if="loading" >
        <v-progress-circular indeterminate
          size="128" width="10"></v-progress-circular>
      </div>
    </app-frame>

    <v-footer app color="accent" dark height="64"
      v-if="article && article.type == 'audio'" style="padding: 0">
      <audio-player color="white"
        :file="audioUrl"></audio-player>
    </v-footer>
  </div>
</template>

<script>
import AppFrame from '@/components/AppFrame'
import TextQuiz from '@/components/TextQuiz'
import AudioQuiz from '@/components/AudioQuiz'
import AudioPlayer from '@/components/AudioPlayer'

import axios from 'axios'

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function processContent(s) {
  s = `<p>${s}</p>`
  s = s.replace('\n', '</p></p>')
  return s
}

export default {
  components: {
    AppFrame, TextQuiz, AudioQuiz, AudioPlayer
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
    displayLevel() {
      return capitalize(this.article.level)
    },
    displayType() {
      return capitalize(this.article.type)
    },
    levelColor() {
      switch (this.article.level) {
        case 'easy':
          return 'green'
        case 'medium':
          return 'yellow'
        case 'hard':
          return 'red'
        default:
          return ''
      }
    },
    displayDate: function() {
      let current_datetime = new Date(Date.parse(this.article.created_time));
      let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
      return formatted_date
    },
  },
  data() {
    return {
      article: null,
      loading: false
    }
  }
}
</script>

<style scoped>
.title-text {
  font-size: 20pt;
  font-weight: 500;
  margin-top: 10px;
}

.subtitle-text {
  margin-top: -10px;
}
</style>
