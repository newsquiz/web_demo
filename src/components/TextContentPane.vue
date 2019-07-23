<template>
  <v-card :height="height"
    class="right-border scroll">
    <v-card-text style="margin-bottom: -20px;">
      <p class="title-text">
        <span>{{ article.title }}</span>
      </p>
      
      <p class="subtitle-text">
        Published by <a :href="article.source_url">{{ article.publisher }}</a> on <span>{{ displayDate }}</span>
        <v-chip dark small :color="levelColor"
          class="ml-2 mb-2">{{ displayLevel }}</v-chip>
      </p>
    </v-card-text>
    <v-divider light></v-divider>

    <slot name="subheader"></slot>

    <v-card-text>
      <div v-html="article.content" 
      class="article-text"></div>
    </v-card-text>
  </v-card>
</template>

<script>

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  data() {
    return {

    }
  },
  props: {
    article: Object,
    height: {
      default: '100%'
    }
  },
  computed: {
    displayLevel() {
      return capitalize(this.article.level)
    },
    displayType() {
      return capitalize(this.article.type)
    },
    levelColor() {
      switch (this.article.level) {
        case 'easy':
          return 'green'
        case 'medium':
          return '#ffb300'
        case 'hard':
          return 'red'
        default:
          return ''
      }
    },
    displayDate: function() {
      let current_datetime = new Date(Date.parse(this.article.created_time));
      let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
      return formatted_date
    },
  }
}
</script>

<style scoped>
.article-text {
  font-size: large;
  height: 100%;
}

.heading-text {

}

.scroll {
  overflow-y: auto;
}

.right-border {
  border-right: solid 2px #959595;
}

.title-text {
  font-size: 24pt;
  font-weight: 600;
  margin-top: 10px;
}

.subtitle-text {
  margin-top: -10px;
}
</style>
