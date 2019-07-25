<template>
  <div>
    <v-card :height="height"
      class="right-border scroll">
      <v-card-text style="margin-bottom: -20px;">
        <p class="title-text"
          @mouseup.stop="onHighlight">
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

      <v-card-text v-if="showContent">
        <div v-html="article.content" 
          class="article-text"
          @mouseup.stop="onHighlight"></div>
      </v-card-text>

      <v-layout v-else style="height: 60%"
        align-center justify-center row>
        <v-flex xs12 class="text-xs-center">
          <v-icon size="256" style="opacity: 0.5">mdi-cancel</v-icon>
        </v-flex>
      </v-layout>
    </v-card>

    <v-menu absolute
      offset-x offset-y
      :position-x="selected.x"
      :position-y="selected.y"
      v-model="optionMenu.show"
      :close-on-click="false"
      :close-on-content-click="false">
      <v-list v-if="!optionMenu.translation.show">
        <v-list-tile @click="optionMenu.show = false">
          <v-list-tile-title>
            <v-icon>mdi-arrow-left</v-icon>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-if="selected.text.length <= 200"
          @click="translateText(selected.text)">
          <v-list-tile-title>
            <v-icon small>mdi-translate</v-icon>
            {{ `Translate` }}
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="highlightText">
          <v-list-tile-title>
            <v-icon small>mdi-marker</v-icon>
            Highlight
          </v-list-tile-title>
        </v-list-tile>
      </v-list>

      <v-card v-else max-width="300px">
        <v-card-actions>
          <v-btn icon @click="optionMenu.translation.show = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon @click="optionMenu.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        
        <v-card-text >
          <p class="original-text">
            {{ `${optionMenu.translation.original}` }}
          </p>
          <p class="translation-text"
            v-if="optionMenu.translation.content">
            {{ optionMenu.translation.content }}
          </p>
          
          <p class="caption">
            Translations provided by Google Translate &reg;
          </p>
        </v-card-text>

        <v-card-actions v-if="optionMenu.translation.loading">
          <v-spacer></v-spacer>
          <v-progress-circular indeterminate
            size="36"></v-progress-circular>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import axios from 'axios'

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function shorten(s, length) {
  length = length || 40
  if (s.length <= length) return s
  return s.slice(0, length) + '...'
}

export default {
  mounted() {
    
  },
  data() {
    return {
      selected: {
        text: '',
        x: 0, y: 0
      },
      optionMenu: {
        show: false,
        translation: {
          show: false,
          original: '',
          content: null,
          loading: false
        }
      }
    }
  },
  props: {
    article: Object,
    height: {
      default: '100%'
    },
    showContent: {
      default: true
    }
  },
  methods: {
    onHighlight() {
      this.optionMenu.show = false
      this.selected = this.getSelectedText()

      if (this.selected.text !== '') {
        this.optionMenu.show = true
        this.optionMenu.translation = {
          original: this.selected.text,
          show: false,
          content: null,
          loading: false
        }
      }
    },
    translateText(text) {
      const component = this

      this.optionMenu.translation.show = true
      this.optionMenu.translation.loading = true

      const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      const payload = {
        source: 'en',
        target: 'vi',
        q: this.optionMenu.translation.original,
        format: 'text'
      }

      axios.post(url, payload).then(response => {
        const data = response.data.data
        component.optionMenu.translation.content = data.translations[0].translatedText
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        component.optionMenu.translation.loading = false
      })
    },
    highlightText() {
      this.optionMenu.show = false
    },
    getSelectedText() {
      const s = window.getSelection()
      const text = s.toString()
      try {
        const rect = s.getRangeAt(0).getBoundingClientRect()
        return {
          text: text,
          x: rect.x + 25,
          y: rect.y + rect.height + 5
        }
      } catch (error) {
        console.log(error)
        return {
          text: text,
          x: 0,
          y: 0
        }
      }
    },
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
    displaySelectedText() {
      return shorten(this.selected.text)
    }
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
  border-right: solid 1px #959595;
}

.title-text {
  font-size: 24pt;
  font-weight: 600;
  margin-top: 10px;
}

.subtitle-text {
  margin-top: -10px;
}

.translation-text {
  font-size: 16pt;
  font-weight: 500;
}

.original-text {
  color: #959595;
}
</style>
