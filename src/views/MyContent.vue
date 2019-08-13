<template>
  <app-frame navLocation="my-content">
    <v-container fluid fill-height>
      <v-layout fill-height row wrap>
        <v-flex xs12>
          <div>
            <p class="headline">Upload content</p>
            <p>Paste your own custom document or a news article URL to generate a quiz</p>
          </div>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12>
          <upload-pane height="60vh"></upload-pane>
        </v-flex>
      </v-layout>
    </v-container>
  </app-frame>
</template>

<script>
import AppFrame from '../components/AppFrame'
import UploadPane from '../components/UploadPane'

export default {
  components: {
    AppFrame,
    UploadPane
  },
  data() {
    return {

    }
  },
  computed: {
    topics() {
      return this.$store.state.topics
    }
  }
}
</script>
