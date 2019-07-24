<template>
  <app-frame navLocation="topics">
    <v-layout row wrap>
      <v-flex xs12 offset-xl2 xl8>
        <topics-pane></topics-pane>
      </v-flex>
    </v-layout>
    
  </app-frame>
</template>

<script>
import AppFrame from '../components/AppFrame'
import TopicsPane from '../components/TopicsPane'

export default {
  components: {
    AppFrame, TopicsPane
  },
  data() {
    return {

    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
.welcome-text {
  font-weight: 500;
  font-size: 24pt;
}
</style>

