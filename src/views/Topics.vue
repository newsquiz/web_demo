<template>
  <app-frame>
    <v-tabs v-model="activeTab"
      color="secondary" dark slider-color="accent"
      mandatory>
      <v-tab v-for="topic in topics" 
        :key="topic.value" ripple>
        {{ topic.name }}
      </v-tab>

      <v-tab-item v-for="(topic, index) in topics" :key="topic.value">
        <article-group v-if="activeTab === index" 
          :topic="topic"></article-group>
      </v-tab-item>
    </v-tabs>
  </app-frame>
</template>

<script>
  import AppFrame from '../components/AppFrame'
  import ArticleItem from '../components/ArticleItem'
  import ArticleGroup from '../components/ArticleGroup'
  export default {
    components: {
      AppFrame,
      ArticleGroup
    },
    data() {
      return {
        activeTab: 0
      }
    },
    computed: {
      topics() {
        return this.$store.state.topics
      }
    }
  }
</script>
