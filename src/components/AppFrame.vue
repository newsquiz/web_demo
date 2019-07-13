<template>
  <div>
    <v-toolbar app color="primary" flat dark>
      <v-toolbar-title id="app-text">
				{{ title }}
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
      default: 'AppName'
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
.app-wrapper {
  /* padding: 10px; */
}
</style>

