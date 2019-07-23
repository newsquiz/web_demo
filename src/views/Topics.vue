<template>
  <app-frame navLocation="topics">
    <v-layout row wrap>
      <v-flex xs12 offset-xl2 xl8>
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12>
              <div class="welcome-text">
                <p>Browse by Topics</p>
              </div>
            </v-flex>
            <v-flex v-for="topic in tiledTopics"      
              :key="topic.value"
              xs12 sm6>

              <v-hover>
                <v-card slot-scope="{ hover }"
                  :img="topic.tile.background" dark
                  height="300px" ripple tile
                  :to="`/topics/${topic.value}`">
                  <v-scale-transition>
                    <v-container fill-height 
                      :class="`overlay card-item card-${topic.value}`" 
                      v-if="hover || alwaysShowLabels">
                      <v-layout align-end justify-end row fill-height wrap>
                        <v-flex xs12 class="text-xs-right">
                          <span class="topic-text">
                            <span>{{ topic.name }}</span>
                          </span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-scale-transition>
                </v-card>
              </v-hover>
              
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    
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
    },
    alwaysShowLabels() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true
        case 'md':
        case 'lg':
        case 'xl':
          return false
      }
    }
  }
}
</script>

<style scoped>
.overlay {
  background-color: black;
  opacity: 0.7;
}

.welcome-text {
  font-weight: 500;
  font-size: 24pt;
}

.topic-text {
  font-size: 32pt;
  font-weight: 500;
}
</style>

