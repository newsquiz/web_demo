<template>
  <v-container fill-height>
    <v-layout align-center justify-center 
      row fill-height>
      <v-flex xs12 md6>
        <v-card dark color="secondary"
          :elevation="12" class="card">
          <v-card-title>
            <span class="title-text">
              404 Not Found
            </span>
          </v-card-title>
          <v-card-text>
            <h2>
              Oops, this page doesn't exist...
            </h2>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <a href="/">Back to home</a>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted() {
    
  }
}
</script>

<style scoped>
.card {
  padding: 5px 15px 5px 15px;
}

a, a:visited {
  color: white;
}

.title-text {
  font-size: 40pt;
  font-weight: bold;
  margin-bottom: -20px;
}
</style>
