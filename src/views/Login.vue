<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 md8 lg6>
          <v-card>
            <v-card-title>
              <div class="headline">Login</div>
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="user.email"
                type="email" label="Email"></v-text-field>
              <v-text-field v-model="user.password"
                type="password" label="Password"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <a href="/signup">Sign up</a>
              <v-spacer></v-spacer>
              <v-btn color="success" round
                @click="login">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const component = this
      const url = `${process.env.VUE_APP_API_URL}/api/login`
      const payload = new FormData()
      payload.append('email', this.user.email)
      payload.append('password', this.user.password)

      return axios.post(url, payload).then(response => {
        const data = response.data.data
        component.$store.commit('setUserId', data.id)
        component.$router.push('/')        
      }).catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>

<style scoped>

</style>


