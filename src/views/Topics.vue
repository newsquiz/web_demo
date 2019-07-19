<template>
  <app-frame navLocation="topics">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex v-for="topic in tiledTopics"      
                :key="topic.value"
                xs12 sm6>
                
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </app-frame>
</template>

<script>
import AppFrame from '../components/AppFrame'

export default {
  components: {
    AppFrame
  },
  data() {
    return {

    }
  },
  computed: {
    topics() {
      return this.$store.state.topics
    },
    tiledTopics() {
      return this.topics.filter(v => {
        return v.tile
      })
    }
  }
}
</script>

<style scoped>
.topic-text {
  font-size: 40pt;
}
</style>

