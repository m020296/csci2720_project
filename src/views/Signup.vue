<template>
  <!-- <div class="sign-up"> -->

      <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>SignUp</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                  <v-text-field id="confim_password" prepend-icon="lock" name="confim_password" label="Enter Password Again" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              
              <v-card-actions>
                <v-btn color="white" to="/login">Back to Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

    <!-- <p>Sign Up</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span> -->
  <!-- </div> -->
</template>

<script>
  
  export default {
    name: 'signUp',
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>