<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on }">
      <v-btn icon style="margin-top: -5px;"
        v-on="on" color="#bdbdbd"
        flat>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <span class="caption grey--text">Explanation</span>
        <div class="subheading">
          {{ content }}
        </div>
      </v-card-text>
    </v-card>
    
  </v-menu>  
</template>

<script>
export default {
  props: {
    content: String
  }
}
</script>

<style scoped>

</style>
