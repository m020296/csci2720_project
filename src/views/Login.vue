<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <!-- <v-text-field
                    v-model="email"
                    id="email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                  ></v-text-field>-->
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="white" to="/signup">Sign up</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "login",
  data() {
    return {
      username: "",
      //   email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      console.log("User input: " + this.username + " " + this.password);

      const usersRef = db.collection("user");

      usersRef
        .where("username", "==", this.username)
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            let pw = this.password;
            if (pw.length <= 5) {
              console.log("in");
              pw = "00" + pw;
            }
            console.log("success" + this.username + " " + pw);
            console.log("Email " + querySnapshot.docs[0].data().email);
            firebase
              .auth()
              .signInWithEmailAndPassword(
                querySnapshot.docs[0].data().email,
                pw
              )
              .then(
                user => {
                  this.$router.replace("welcome");
                  // alert("login-ed")
                },
                err => {
                  alert("Oops. " + err.message);
                }
              );
          } else {
            alert("User does not exists");
          }
        });
    }
  }
};
</script>