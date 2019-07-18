<template>
  <v-card hover :href="'/quiz/' + article.id" height="100%">    
    <v-img
      class="white--text"
      height="200px"
      :src="thumbnailUrl"></v-img>
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
      <v-spacer></v-spacer>
      <v-chip small label outline color="accent">
        {{ displayType }}
      </v-chip>
      <v-chip small label dark :color="levelColor">
        {{ displayLevel }}
      </v-chip>
    </v-card-actions>
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
        return shorten(this.article.title, 60)
      }
    }
  }
</script>

<style>
.capitalize:first-letter { 
  text-transform: uppercase; 
}

.subtitle-text {
  font-style: italic;
}
</style>
