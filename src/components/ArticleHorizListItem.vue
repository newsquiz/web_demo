<template>
  <v-card hover
    :href="'/quiz/' + article.id" height="100%">
    <v-img
      height="300px"
      :src="thumbnailUrl">
        <v-layout align-end justify-end row fill-height wrap>
          <v-flex xs12 v-if="article.type === 'audio'">
            <div class="text-xs-center">
              <v-btn fab icon depressed outline color="white" large>
                <v-icon size="64">mdi-play</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs12
            class="overlay-text card-item"
            :style="`border-color: ${this.topic.color} !important;`">
            <div class="title-wrap black--text">
              <span class="title" style="">
                {{ shortTitle }}
              </span>
            </div>
            <div>
              <v-icon light>{{ displayIcon }}</v-icon>
            </div>
          </v-flex>
        </v-layout>
      </v-img>
  </v-card>
</template>


<script>
  import { capitalize } from '@/libs/utils'

  export default {
    data() {
      return {
        topic: {}
      }
    },
    props: {
      article: {
        default: {
          id: 1,
          thumbnail: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          title: 'Number 10',
          created_time: '25-07-2019',
          level: 'beginner',
          publisher: 'BBC news',
          source_url: 'https://www.bbc.co.uk/'
        }
      }
    },
    computed: {
      displayDate: function() {
        let current_datetime = new Date(Date.parse(this.article.created_time));
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        return formatted_date
      },
      thumbnailUrl() {
        if (!this.article.thumbnail) return ''
        if (this.article.thumbnail.startsWith('http')) {
          return this.article.thumbnail
        }
        return `http://${this.article.thumbnail}`
      },
      displayIcon() {
        switch (this.article.type) {
          case 'text':
            return 'mdi-clipboard-text-outline'
          case 'audio':
            return 'mdi-headphones'
        }
      },
      displayType() {
        return capitalize(this.article.type)
      },
      shortTitle() {
        // return shorten(this.article.title, 40)
        return this.article.title
      }
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
    }
  }
</script>

<style scoped>
.subtitle-text {
  font-size: small;
}

.title-text {
  font-size: large;
}

.overlay-text {
  padding: 10px;
  background-color: rgb(255, 255, 255);
  opacity: 0.75;
}

.title-wrap {
  margin-bottom: 5px; 
}

.blurred {
  opacity: 0.6;
}

.card-item {
  border-top: solid 3px #424242;
}
</style>
