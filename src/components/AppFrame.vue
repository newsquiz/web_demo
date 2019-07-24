<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar app :color="barColor" flat dark>
      <v-toolbar-title id="app-text">
				<a href="/">{{ title }}</a>
			</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon ripple>
          <v-avatar size="40">
            <img :src="user.imageUrl" alt="">
          </v-avatar>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Slot content -->
    <v-content>
      <slot></slot>
    </v-content>
    
    <!-- Bottom nav -->
    <v-bottom-nav app
      color="white"
      :active.sync="navLocation_"
      :value="true"
      class="bottom-nav"
      v-if="showNav">

      <v-btn flat value="home" 
        shift :color="accentColor"
        to="/" large>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn flat value="topics" 
        shift :color="accentColor"
        id="topics-btn" large
        @click="topicsMenu.show = true">
        <span>Topics</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      
      <v-btn flat value="my-content" 
        shift :color="accentColor"
        to="/my-content" large>
        <span>My Content</span>
        <v-icon>mdi-wunderlist</v-icon>
      </v-btn>

      <v-btn flat value="search" 
        shift :color="accentColor"
        @click="showSearch" large>
        <span>Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-bottom-nav>
    
    <!-- Search sheet -->
    <v-bottom-sheet v-model="search.show"
      inset>
      <v-card flat>
        <v-text-field v-model="search.query"
          append-icon="mdi-magnify"
          solo single-line flat autofocus
          class="search-field"
          ref="searchField"
          clearable
          placeholder="Use keywords to search for articles eg. soccer, celebrities,..."
          @keyup.enter="startSearch"></v-text-field>
        
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                <v-icon small style="margin-right: 5px">mdi-settings</v-icon>
                <span>Advanced</span>
              </div>
              
            </template>
            <v-card>

            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
    </v-bottom-sheet>

    <!-- Topics menu -->
    <v-dialog
      attach="body"
      scrollable
      v-model="topicsMenu.show"
      lazy>
      <v-card height="70vh">
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="menu-header-text">Choose a topic</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text style="margin-top: -10px">
          <topics-pane></topics-pane>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="topicsMenu.show = false"
            round color="error">
            Close
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { setTimeout } from 'timers'

import TopicsPane from '../components/TopicsPane'

export default {
  components: {
    TopicsPane
  },
  props: {
    title: {
      default: 'NewsQuiz'
    },
    showNav: {
      default: true
    },
    navLocation: {
      default: ''
    },
    barColor: {
      default: 'primary'
    },
    accentColor: {
      default: 'primary'
    }
  },
  data() {
    return {
      search: {
        show: false,
        query: '',
        prevNav: '',
        advancedOpts: {

        }
      },
      navLocation_: '',
      topicsMenu: {
        show: false
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    searchShowed() {
      return this.search.show
    }
  },
  watch: {
    searchShowed(newVal) {
      if (!newVal) {
        this.navLocation_ = this.search.prevNav
      }
    }
  },
  mounted() {
    this.navLocation_ = this.navLocation
  },
  methods: {
    showSearch() {
      this.search.prevNav = this.navLocation
      this.search.show = true

      const component = this
      setTimeout( () => {
        component.$refs.searchField.focus()
      }, 400)
    },
    startSearch() {
      var targetUrl = `/search?query=${this.search.query}`
      this.search.show = false
      this.$router.push(targetUrl)
    }
  }
}
</script>

<style scoped>
#app-text {
  font-family: 'Comfortaa', sans-serif;
  font-size: 20pt;
}

#app-text a {
  text-decoration: none;
  color: inherit;
}

.search-field {
  margin-bottom: -20px;
}

.bottom-nav {
  border-top: solid 1px #424242 !important;
}

.menu-header-text {
  font-size: 24pt;
  font-weight: 400;
}
</style>

