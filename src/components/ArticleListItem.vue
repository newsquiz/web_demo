<template>
  <v-card hover :href="'/quiz/' + article.id" height="100%"
    >
    <v-layout row wrap>
      <v-flex xs12 sm4 lg3>
        <v-img :src="thumbnailUrl"
          height="150px">
          <v-layout align-center justify-center row fill-height>
            <v-flex xs12 v-if="article.type === 'audio'">
              <div class="text-xs-center">
                <v-btn fab icon depressed outline color="white">
                  <v-icon size="48">mdi-play</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-img>
      </v-flex>
      <v-flex xs12 sm8 lg9 class="card-item"
        :style="`border-color: ${this.topic.color} !important;`">
        <v-card-title>
          <div>
            <h2 class="headline">{{ article.title }}</h2>
            <span class="subtitle-text">
              Published on <span>{{displayDate}}</span> by 
              <a :href="article.source_url" target="_blank">
                <b>{{article.publisher}}</b>
              </a>
            </span>
          </div>
        </v-card-title>

        <v-card-actions style="margin-top: -5px">
          <v-chip small label outline color="accent">
            {{ displayType }}
          </v-chip>
        </v-card-actions>
      </v-flex>

    </v-layout>
    
    
  </v-card>
</template>


<script>
import { capitalize } from '@/libs/utils'

function shorten(s, length) {
  length = length || 20
  if (s.length <= length) return s
  return s.slice(0, length) + '...'
}

export default {
  components: {
    
  },
  mounted() {
    const topics = this.$store.state.topics
    for (var i=0; i<topics.length; i++) {
      const topic = topics[i]
      if (topic.value === this.article.topic) {
        this.topic = topic
        break
      }
    }
  },
  data() {
    return {
      topic: {}
    }
  },
  props: {
    article: {
      default: {
        id: 1,
        thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        title: 'Number 10',
        created_time: '25-07-2019',
        level: 'beginner',
        publisher: 'BBC news',
        source_url: 'https://www.bbc.co.uk/'
      }
    }
  },
  computed: {
    levelColor() {
      switch (this.article.level) {
        case 'easy':
          return 'green'
        case 'medium':
          return '#ffb300'
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
    thumbnailUrl() {
      if (this.article.thumbnail.startsWith('http')) {
        return this.article.thumbnail
      }
      return `http://${this.article.thumbnail}`
    },
    displayType() {
      return capitalize(this.article.type)
    },
    shortTitle() {
      return shorten(this.article.title, 60)
    }
  }
}
</script>

<style scoped>
.subtitle-text {
  font-size: small;
}

.card-item {
  border-top: solid 3px #424242;
}
</style>
