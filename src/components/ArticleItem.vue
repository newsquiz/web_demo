<template>
  <v-card>
    <v-img
      class="white--text"
      height="200px"
      :src="thumbnailUrl"
    >
      <!-- <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">Top 10 Australian beaches</span>
          </v-flex>
        </v-layout>
      </v-container> -->
    </v-img>
    <v-card-title>
      <div>
        <span class="black--text">
          <h2>{{article.title}}</h2>
        </span>
        <br>

        <span class="gray--text">{{article.date}}</span><br>
        <span class="green--text">{{article.level}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>


<script>
  export default {
    data: () => ({
      thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      title: 'Number 10',
      date: '25-07-2019',
      level: 'beginner'
    }),
    props: {
      article: {
        default: {
          id: 1,
          thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          title: 'Number 10',
          date: '25-07-2019',
          level: 'beginner'
        }
      }
    }
  }
</script>