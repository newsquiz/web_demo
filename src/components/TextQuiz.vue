<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <span class="heading-text">
              Read the article and answer the questions.
            </span>
          </v-card-title>

          <v-card-text>
            <div v-html="article.content"></div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    article: Object
  }
}
</script>

<style>
.heading-text {
  font-style: italic;
}
</style>
