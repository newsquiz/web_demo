<template>
  <v-container fill-height fluid>
    <v-layout fill-height row wrap>
      <v-flex md6 fill-height>
        <v-card :height="height"
          style="border-right: solid 1px #959595; overflow-y: auto;">
          <v-card-text>
            <v-icon class="mr-1">mdi-cloud-upload</v-icon>
            <span class="title">Upload</span>
          </v-card-text>
          <v-card-text>
            <v-text-field label="URL"
              v-model="url" box type="url"
              placeholder="Enter an article url..."
              @keyup.enter="parseUrl"
              clearable autofocus
              append-outer-icon="mdi-progress-download"
              @click:append-outer="parseUrl"
              :readonly="parsing"
              :loading="parsing"></v-text-field>

            <v-textarea label="Title"
              clearable box class="font-weight-medium"
              :rows="1" auto-grow v-model="title">
            </v-textarea>

            <editor-content :editor="editor"
              :editable="!parsing && !generating && !article.id"
              class="editor-pane"></editor-content>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex md6 fill-height>
        <questions-pane :height="height"
          :article_id="article.id" :questions="article.questions"
          :isUserContent="true"></questions-pane>
      </v-flex>
      <v-flex md12 class="text-xs-center"
        style="margin-top: -15px">
        <v-btn round color="success" large
          @click="fetchQuestions"
          :disabled="parsing || article.id"
          :loading="generating"
          v-if="!article.id">
          Upload
        </v-btn>
        <v-btn v-else round large
          color="error" @click="discard">
          Discard
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
import axios from 'axios'
import { JSDOM } from 'jsdom'
import Readability from 'readability'
import { Editor, EditorContent } from 'tiptap'

import QuestionsPane from '@/components/QuestionsPane'

export default {
  components: {
    QuestionsPane, EditorContent
  },
  data() {
    return {
      url: 'https://www.theguardian.com/commentisfree/2019/aug/12/rock-sea-meaing-tel-aviv-beach-refugee',
      title: '',
      article: {},
      parsing: false,
      generating: false,
      editor: null
    }
  },
  props: {
    height: {
      default: '100%'
    }
  },
  mounted() {
    this.editor = new Editor()
  },
  methods: {
    parseUrl() {
      const component = this
      if (this.parsing || !this.url) return

      const url = `https://cors-anywhere.herokuapp.com/${this.url}`
      this.parsing = true
      
      return axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => {
        const data = response.data
        const doc = new JSDOM(data, {
          url: url
        })
        const reader = new Readability(doc.window.document)
        const article = reader.parse()

        component.title = article.title
        component.editor.setContent(article.content, true)
      }).catch(error => {
        alert(error.message)
        console.log(error)
      }).then(() => {
        component.parsing = false
      })
    },
    fetchQuestions() {
      const content = this.editor.getHTML()
      if (!content) return

      const component = this
      const url = `${process.env.VUE_APP_API_URL}/api/generate_questions`
      const payload = {
        content: content
      }

      this.generating = true
      var headers = {}
      if (this.$store.state.user.id) {
        headers['User-Id'] = this.$store.state.user.id
      }
      return axios.post(url, payload, {
        headers: headers
      }).then(response => {
        const article = response.data.data
        component.article = article
      }).catch(error => {
        alert(error.message)
        console.log(error)
      }).then(() => {
        component.generating = false
      })
    },
    discard() {
      this.article = {}
    }
  }
}
</script>

<style scoped>
.editor-pane {
  background-color: #eeeeee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid black;
  min-height: 30px;
  font-size: medium;
  padding: 5px;
}
</style>
