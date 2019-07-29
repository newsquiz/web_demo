<template>
  <div>
    <v-list-tile v-for="topic in topics" :key="topic.value"
      :href="`/topics/${topic.value}`"
      :class="`sidelist-item card-${topic.value}`">
      <v-list-tile-content>
        <span>{{ topic.name }}</span>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
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

.topic-text {
  font-size: 32pt;
  font-weight: 500;
}
</style>
