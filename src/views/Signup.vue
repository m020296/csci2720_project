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
                  <v-text-field
                    v-model="userid"
                    id="userid"
                    prepend-icon="person"
                    name="userid"
                    label="User ID"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    id="email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirm_password"
                    id="confim_password"
                    prepend-icon="lock"
                    name="confim_password"
                    label="Enter Password Again"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="white" to="/login">Back to Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="signUp" color="primary">Sign up</v-btn>
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
  <span>or go back to <router-link to="/login">login</router-link>.</span>-->
  <!-- </div> -->
</template>

<script>
import firebase from "firebase";

export default {
  name: "signUp",
  data() {
    return {
        userid: '',
        email: '',
        password: '',
        confirm_password: ''
    };
  },
  methods: {
    signUp: function() {
      console.log(this.email + " " + this.password);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            // this.$router.replace("welcome");
            alert("nice");
          },
          function(err) {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>

<style scoped>
</style>