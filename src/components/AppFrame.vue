<template>
  <div>
    <v-toolbar app color="primary" flat dark>
      <v-toolbar-title id="app-text">
				<a href="/">{{ title }}</a>
			</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <div>
        <span class="hidden-sm-and-down">
          {{ `Welcome, ${user.name}` }}
        </span>
        <v-btn icon>
          <v-avatar size="40px">
            <img :src="user.imageUrl" alt="profile">
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>

    <v-content>
      <div class="app-wrapper">
        <slot></slot>
      </div>
    </v-content>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'EVA'
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

<style>
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

