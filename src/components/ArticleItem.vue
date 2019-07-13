<template>
  <v-card>    
    <a :href="'/quiz/' + article.id"><v-img
      class="white--text"
      height="200px"
      :src="article.thumbnailUrl"></v-img>
    </a>
    <v-card-title>
      <div>
        <span class="black--text">
          <h2>{{article.title}}</h2>
        </span>
        <br>
        <v-layout row wrap>
          <v-flex align-start>
            <span class="gray--text"><b>{{article.date}}</b></span> <br>
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
          date: '25-07-2019',
          level: 'beginner',
          publisher: 'BBC news',
          source_url: 'https://www.bbc.co.uk/'
        }
      }
    },
    computed: {
      level_color: function(){
        return this.article.level == 'easy' ? 'green--text' : (this.article.level == 'medium' ? 'yellow--text' : 'red--text')
      }
    }
  }
</script>

<style>
.capitalize:first-letter { 
  text-transform: uppercase; 
}
</style>
