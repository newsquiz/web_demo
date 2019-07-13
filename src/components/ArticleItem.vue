<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
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
              <h2>{{article}}</h2>
            </span>
            <br>
            <span class="gray--text">{{date}}</span><br>
            <span class="green--text">{{level}}</span>
          </div>
        </v-card-title>
        <!-- <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn> -->
        <!-- </v-card-actions> -->
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    data: () => ({
      thumbnailUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      article: 'Number 10',
      date: '25-07-2019',
      level: 'beginner'
    })
  }
</script>