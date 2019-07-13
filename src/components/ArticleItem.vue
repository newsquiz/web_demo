<template>
  <v-card>    
    <a :href="'/quiz/' + article.id"><v-img
      class="white--text"
      height="200px"
      :src="article.thumbnail"></v-img>
    </a>
    <v-card-title>
      <div>
        <span class="black--text">
          <h2>{{article.title}}</h2>
        </span>
        <br>
        <v-layout row wrap>
          <v-flex align-start>
            <span class="gray--text"><b>{{date}}</b></span> <br>
            <span class="gray--text"><a :href="article.source_url" target="_blank"><b>{{article.publisher}}</b></a></span>
          </v-flex>
          <v-flex align-end>
            <span :class="level_color"><b class="capicalize">{{article.level}}</b></span>
          </v-flex>
        </v-layout>
      </div>
    </v-card-title>
  </v-card>
</template>


<script>
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
      level_color: function(){
        return this.article.level == 'easy' ? 'green--text' : (this.article.level == 'medium' ? 'yellow--text' : 'red--text')
      },
      date: function() {
        let current_datetime = new Date(Date.parse(this.article.created_time));
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        return formatted_date
      }
    }
  }
</script>

<style>
.capitalize:first-letter { 
  text-transform: uppercase; 
}
</style>
