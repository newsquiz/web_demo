<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 md8 lg6>
          <v-card>
            <v-card-title>
              <div class="headline">Sign up for NewsQuiz</div>
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="user.email"
                type="email" label="Email"></v-text-field>
              <v-text-field v-model="user.name"
                label="Display name"></v-text-field>
              <v-text-field v-model="user.password"
                type="password" label="Password"></v-text-field>
              <v-text-field v-model="user.passwordConfirm"
                type="password" label="Confirm password"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" round
                @click="signUp">
                Sign up
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
        name: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  methods: {
    signUp() {
      const component = this
      const url = `${process.env.VUE_APP_API_URL}/api/register`
      const payload = new FormData()
      payload.append('email', this.user.email)
      payload.append('name', this.user.name)
      payload.append('password', this.user.password)

      return axios.post(url, payload).then(response => {
        const data = response.data.data
        component.$store.commit('setUserId', data.id)
        component.$cookies.set('user-id', data.id)
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
