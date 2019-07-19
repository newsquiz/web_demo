<template>
  <v-card hover :href="'/quiz/' + article.id" height="100%">
    <v-img class="white--text"
      height="250px"
      :src="thumbnailUrl">
        <v-layout align-end justify-end row fill-height wrap>
          <v-flex xs12 class="overlay-text">
            <p class="title" style="margin-bottom: 5px">
              {{ shortTitle }}
            </p>
            <v-chip small label outline color="accent">
              {{ displayType }}
            </v-chip>
            <v-chip small label dark :color="levelColor">
              {{ displayLevel }}
            </v-chip>
          </v-flex>
        </v-layout>
      </v-img>
  </v-card>
</template>


<script>
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function shorten(s, length) {
    length = length || 20
    if (s.length <= length) return s
    return s.slice(0, length) + '...'
  }

  export default {
    data: () => ({
    }),
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
      displayLevel() {
        return capitalize(this.article.level)
      },
      thumbnailUrl() {
        if (this.article.thumbnail.startsWith('http')) {
          return this.article.thumbnail
        }
        return `${process.env.VUE_APP_API_URL}${this.article.thumbnail}`
      },
      displayType() {
        return capitalize(this.article.type)
      },
      shortTitle() {
        return shorten(this.article.title, 25)
      }
    }
  }
</script>

<style scoped>
.capitalize:first-letter { 
  text-transform: uppercase; 
}

.subtitle-text {
  font-size: small;
}

.title-text {
  font-size: large;
}

.overlay-text {
  background-color: rgb(73, 72, 72);
  opacity: 0.85;
  padding: 5px;
}
</style>
