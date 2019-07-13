<template>
  <v-container>
  {{title}}
  <hr>
  </v-container>
</template>


<script>
  export default {
    data: () => ({
      title: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      article: 'Number 10',
      date: '25-07-2019',
      level: 'beginner'
    })
  }
</script>