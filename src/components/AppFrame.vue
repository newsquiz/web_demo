<template>
  <div>
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

    <v-content>
      <div class="app-wrapper">
        <slot></slot>
      </div>
    </v-content>

    <v-bottom-nav app
      color="secondary"
      :active.sync="navLocation_"
      :value="true" dark
      v-if="showNav">

      <v-btn flat value="home" 
        shift color="accent"
        to="/" large>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn flat value="topics" 
        shift color="accent"
        to="/topics" large>
        <span>Topics</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      
      <v-btn flat value="my-content" 
        shift color="accent"
        to="/my-content" large>
        <span>My Content</span>
        <v-icon>mdi-wunderlist</v-icon>
      </v-btn>

      <v-btn flat value="search" 
        shift color="accent"
        @click="showSearch" large>
        <span>Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-bottom-nav>
    
    <v-bottom-sheet v-model="search.show"
      inset>
        <v-text-field v-model="search.query"
          append-icon="mdi-magnify"
          solo single-line flat autofocus
          class="search-field"
          ref="searchField"
          clearable
          placeholder="Use keywords to search for articles eg. soccer, celebrities,..."
          @keyup.enter="startSearch"></v-text-field>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
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
    }
  },
  data() {
    return {
      search: {
        show: false,
        query: '',
        prevNav: ''
      },
      navLocation_: ''
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
</style>

