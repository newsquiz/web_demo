<template>
  <div>
    <v-toolbar app color="primary" flat dark>
      <v-toolbar-title id="app-text">
				<a href="/">{{ title }}</a>
			</v-toolbar-title>
      
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <div class="app-wrapper">
        <slot></slot>
      </div>
    </v-content>

    <v-bottom-nav app
      color="transparent"
      :active="navLocation"
      :value="true">
      <v-btn flat value="home" 
        shift color="primary"
        to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn flat value="profile" 
        shift color="primary"
        to="/profile">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {

    }
  },
  computed: {
    user() {
      return this.$store.state.user
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

.app-wrapper {
  /* padding: 10px; */
}
</style>

