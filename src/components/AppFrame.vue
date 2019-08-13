<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar app :color="barColor" dark
      :dense="smallScreen"
      scroll-off-screen flat>
      <v-toolbar-side-icon v-if="smallScreen"
        @click="drawer.show = !drawer.show"></v-toolbar-side-icon>
      <v-toolbar-title id="app-text">
				<a href="/">{{ title }}</a>
			</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat icon v-if="!smallScreen"
          disabled>
          <v-icon>mdi-forum</v-icon>
        </v-btn>

        <v-btn flat icon v-if="!smallScreen"
          href="/my-content"
          :disabled="!user.id">
          <v-icon>mdi-wunderlist</v-icon>
        </v-btn>

        <v-btn flat icon v-if="!smallScreen"
          @click="showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn icon ripple
              v-on="on" >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-card v-if="user.id"
            flat>
            <v-card-text>
              <span class="grey--text">
                {{ `You are logged in as ${user.id}` }}
              </span>
            </v-card-text>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile @click="logout">
                <v-list-tile-title 
                  class="error--text font-weight-medium">
                  Logout
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
          
          <v-card v-else width="150px">
            <v-card-text>
              <span class="grey--text">
                Log in to enable more features
              </span>
            </v-card-text>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile href="/login">
                <v-list-tile-title 
                  class="font-weight-medium">
                  Login
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile href="/signup">
                <v-list-tile-title 
                  class="font-weight-medium">
                  Sign up
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
          
        </v-menu>
      </v-toolbar-items>

      <template v-slot:extension v-if="showNav">
        <v-tabs :color="barColor" hide-slider active-class=""
          show-arrows>
          <v-btn v-for="topic in topics" :key="topic.value"
            :href="`/topics/${topic.value}`"
            round flat color="">
            {{ topic.name }}
          </v-btn>
        </v-tabs>
      </template>
    </v-toolbar>

    <!-- Nav drawer -->
    <v-navigation-drawer v-model="drawer.show"
      app v-if="smallScreen">
      <v-list>
        <v-list-tile href="/my-content"
          disabled>
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

        <v-list-tile disabled>
          <v-list-tile-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Forums
          </v-list-tile-content>
          <v-list-tile-action>
            <v-chip small color="error" outline>
              <span class="caption">Coming soon</span>
            </v-chip>
          </v-list-tile-action>
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

    <v-snackbar v-model="snackbar.show" color="accent"
      v-if="!user.id && showNav" bottom dark :timeout="0"
      auto-height :vertical="smallScreen">
      <span> You are not logged in. Some features may not be available.</span>
      <div>
        <v-btn flat
          @click="snackbar.show = false">
          Close
        </v-btn>
      </div>
    </v-snackbar>
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
      },
      snackbar: {
        show: true
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    topics() {
      return this.$store.state.topics
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
      window.location.href = targetUrl
      // this.$router.push(targetUrl)
    },
    logout() {
      this.$store.commit('setUserId', null)
      this.$cookies.remove('user-id')
      this.$router.push('/')
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

