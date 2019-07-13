<template>
  <div>
    <app-frame>
      <v-layout row v-if="article" style="padding: 10px">
        <v-flex xs12 md10 offset-md1>
          <p class="title-text">
            <span>{{ article.title }}</span>
            <v-chip small dark label color="accent" outline>
              {{ displayType }}
            </v-chip>
            <v-chip small dark label :color="levelColor">{{ displayLevel }}</v-chip>
          </p>
          <p class='subtitle-text'>
            Published by <a :href="article.source_url">{{ article.publisher }}</a> on <span>{{ article.created_time }}</span>
          </p>
          <text-quiz v-if="article.type == 'text'"
            :article="article"></text-quiz>
          <audio-quiz v-else-if="article.type == 'audio'"
            :article="article"></audio-quiz>
        </v-flex>
      </v-layout>
    </app-frame>

    <v-footer app color="secondary" dark height="64"
      v-if="article.type == 'audio'" style="padding: 0">
      <audio-player color="white"
        :file="article.audio"></audio-player>
    </v-footer>
  </div>
</template>

<script>
import AppFrame from '@/components/AppFrame'
import TextQuiz from '@/components/TextQuiz'
import AudioQuiz from '@/components/AudioQuiz'
import AudioPlayer from '@/components/AudioPlayer'

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  components: {
    AppFrame, TextQuiz, AudioQuiz, AudioPlayer
  },
  mounted() {
    this.$store.commit('setFinished', false)
  },
  computed: {
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
    }
  },
  data() {
    var article = {
      id: '1',
      topic: 'politics',
      created_time: '13/07/2019',
      thumbnail: 'https://znews-photo.zadn.vn/w480/Uploaded/jaegtn/2019_07_13/Business_ZuckerbergCapitol944719958_1.jpg',
      type: 'audio',
      publisher: 'Forbes',
      source_url: '#',
      title: 'Mauris egestas ante nisl',
      level: 'easy',
      audio: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nunc urna, sodales nec mauris sit amet, auctor rutrum turpis. Duis vulputate elit a hendrerit faucibus. Pellentesque metus tellus, rutrum et lorem non, vehicula volutpat sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc posuere at ante eget interdum. Suspendisse sagittis id odio consectetur suscipit. In sed rutrum magna. Cras consequat rhoncus eleifend. Aliquam hendrerit sodales dolor, vel vestibulum arcu faucibus vel. Suspendisse lacinia elit id lectus lobortis fermentum sit amet ut turpis. Aenean posuere iaculis ex, sit amet fringilla est pretium ac. Aliquam interdum purus eget enim luctus, ac interdum tellus gravida. Praesent laoreet purus justo, sit amet venenatis nulla feugiat vel.',
      questions: [
        {
          id: '1', article_id: '1',
          content: 'Quisque in nibh et lorem malesuada ullamcorper?',
          type: 'fill',
          answer: 'Quisque'
        },
        {
          id: '2', article_id: '1',
          content: 'Proin ornare, erat non vulputate egestas, nibh enim tempus neque?',
          type: 'choice',
          answer: 'Proin',
          options: [
            'Proin', 'ornare', 'erat', 'vulputate'
          ]
        }
      ]
    }

    return {
      article: article
    }
  }
}
</script>

<style>
.title-text {
  font-size: 20pt;
  font-weight: 500;
  margin-top: 10px;
}

.subtitle-text {
  margin-top: -10px;
  font-style: italic;
}
</style>
