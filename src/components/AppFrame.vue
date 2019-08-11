<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar app :color="barColor" dark>
      <v-toolbar-side-icon v-if="smallScreen"
        @click="drawer.show = !drawer.show"></v-toolbar-side-icon>
      <v-toolbar-title id="app-text">
				<a href="/">{{ title }}</a>
			</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat icon v-if="!smallScreen"
          to="/my-content">
          <v-icon>mdi-wunderlist</v-icon>
          <!-- <span>My Content</span> -->
        </v-btn>

        <v-btn flat icon v-if="!smallScreen"
          @click="showSearch">
          <v-icon>mdi-magnify</v-icon>
          <!-- <span>Search</span> -->
        </v-btn>

        <v-btn icon ripple>
          <v-avatar size="40">
            <!-- <img :src="user.imageUrl" alt=""> -->
            <v-icon >mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Nav drawer -->
    <v-navigation-drawer v-model="drawer.show"
      app v-if="smallScreen">
      <v-list>
        <v-list-group prepend-icon="mdi-apps">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                Topics
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <topics-pane></topics-pane>
        </v-list-group>
        
        <v-list-tile to="/my-content">
          <v-list-tile-action>
            <v-icon>mdi-wunderlist</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            My Content
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showSearch">
          <v-list-tile-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Search
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Slot content -->
    <v-content>
      <slot></slot>
    </v-content>
    
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
        advancedOpts: {

        }
      },
      topicsMenu: {
        show: false
      },
      drawer: {
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
    },
    smallScreen() {
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
  },
  watch: {
  },
  mounted() {

  },
  methods: {
    showSearch() {
      this.search.show = true
      this.drawer.show = false

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

