<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile @click="admin">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="flushData">
          <v-list-tile-action>
            <v-icon>cloud_download</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Flush Data Online</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="loadCSV">
          <v-list-tile-action>
            <v-icon>cloud_upload</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Load CSV file</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="eventData">
          <v-list-tile-action>
            <v-icon>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage Event Data</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="userData">
          <v-list-tile-action>
            <v-icon>supervised_user_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage User Data</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CSCI 2720 Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-btn @click="logout" light>Logout</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex xs12 sm12 md12 text-xs-center>
            <v-card class="elevation-12">
              <div>
                <v-toolbar flat color="white">
                  <v-toolbar-title>List of users</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="blue darken-1" flat @click.native="temp">Temp</v-btn> -->
                  <v-dialog v-model="dialog" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">New User</v-btn>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <hr>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="editedItem.username"
                                :rules="usernameRule"
                                label="Username"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12 v-if="this.editedIndex == -1">
                              <v-text-field
                                v-model="editedItem.email"
                                :rules="emailRule"
                                label="Email"
                                type="email"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="editedItem.password"
                                :rules="pwRule"
                                label="Password"
                                type="password"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-bind:disabled="btnDisable" color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn v-bind:disabled="btnDisable" color="blue darken-1" flat @click.native="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>

                <v-data-table
                  :headers="headers"
                  :items="users"
                  :rows-per-page-items="[10,5]"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.username }}</td>
                    <td class="text-xs-left">{{ props.item.password }}</td>
                    <!-- <td class="text-xs-left">{{ props.item.password }}</td> -->
                    <td class="justify-center layout pa-3">
                      <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                      <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { db } from "../../main";
export default {
  created() {
    this.initialize();
  },
  data: () => ({
    drawer: null,
    btnDisable: false,
    dialog: false,
    headers: [
      { text: "Username", value: "username", sortable: false },
      { text: "Password", value: "password", sortable: false }
      // { text: "Password", value: "password", sortable: false }
    ],
    users: [],
    dbUser: [],
    editedIndex: -1,
    editedItem: {
      uid: "",
      username: "",
      ori: "",
      email: "",
      password: ""
    },
    defaultItem: {
      uid: "",
      username: "",
      ori: "",
      email: "",
      password: ""
    },
    pwRule: [
      v => !!v || "Password is required",
      v => v.length <= 20 || "Password must be less than 20 characters",
      v => v.length >= 4 || "Password must be more than or equal 4 characters"
    ],
    emailRule: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    usernameRule: [
      v => !!v || "Username is required",
      v => v.length <= 20 || "Username must be less than 20 characters",
      v => v.length >= 4 || "Username must be more than or equal 4 characters"
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  firestore() {
    return {
      dbUser: db.collection("user")
    };
  },
  methods: {
    logout: function() {
      this.$router.push("login");
    },
    admin: function() {
      this.$router.push("admin");
    },
    flushData: function() {
      this.$router.push("flushData");
    },
    loadCSV: function() {
      this.$router.push("loadCSV");
    },
    eventData: function() {
      this.$router.push("eventData");
    },
    userData: function() {
      this.$router.push("userData");
    },
    clear() {
      this.users = [];
    },
    initialize() {
      var vm = this;
      var url = "http://localhost:3000/listUsers";
      axios.get(url).then(response => {
        console.log(response.data);
        if (response.data.error != "error") {
          console.log(vm.dbUser);
          if (vm.dbUser.length == 0) {
            console.log("do it again");
            this.initialize();
          } else {
            var reusers = response.data.users;
            reusers.forEach(function(user) {
              vm.dbUser.forEach(function(dbu) {
                if (user.email == dbu.email) {
                  console.log(
                    "\nInitialize: \n" +
                      user.uid +
                      "\n" +
                      user.email +
                      "\n" +
                      dbu.username +
                      "\n" +
                      user.passwordHash
                  );
                  // var fav = [];
                  // if (typeof user.favEvents !== "undefined") {
                  //   fav = user.favEvents;
                  // }
                  // console.log(fav);
                  vm.users.push({
                    uid: user.uid,
                    email: user.email,
                    // favEvents: fav,
                    username: dbu.username,
                    ori: dbu.username,
                    password: user.passwordHash
                  });
                  return;
                }
              });
            });
          }
        } else {
          console.log("node js resopnse error, " + response.data.msg);
        }
      });
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.password = "";
      console.log(this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      var vm = this;
      const index = this.users.indexOf(item);
      console.log("delete target: " + item.uid);
      var r = confirm("Are you sure you want to delete this item?");
      if (r == true) {
        var url = "http://localhost:3000/deleteUser";
        axios
          .post(url, {
            uid: item.uid
          })
          .then(function(response) {
            console.log(response.data);
            if (response.data.error != "error") {
              console.log("firebase deleted user: " + item.uid);
              db.collection("user")
                .doc(item.uid)
                .delete()
                .then(() => {
                  console.log("User Deteted.");
                  vm.users.splice(index, 1);
                  vm.close();
                  // vm.clear();
                  // vm.initialize();
                });
            } else {
              console.log("node js resopnse error, " + response.data.msg);
              alert("Delete User Error! " + response.data.msg);
            }
          });
      }
    },
    close() {
      this.btnDisable = false;
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.btnDisable = true;
      if (this.editedIndex > -1) {
        console.log("edit user");
        var vm = this;
        console.log(vm.editedItem);
        const usersRef = db
          .collection("user")
          .where("username", "==", vm.editedItem.username);

        usersRef.get().then(docSnapshot => {
          if (
            !docSnapshot.empty &&
            vm.editedItem.username != vm.editedItem.ori
          ) {
            console.log(vm.editedItem.username + " exists!");
            alert("This username exist! Update fail.");
            vm.close();
          } else {
            console.log(vm.editedItem.username + " not exists / equal to ori");
            console.log(vm.editedItem);
            var url = "http://localhost:3000/updateUser";
            console.log("old PW: " + vm.editedItem.password);
            if (vm.editedItem.password.length <= 5) {
              console.log("in");
              vm.editedItem.password = "00" + vm.editedItem.password;
            }
            console.log("new PW: " + vm.editedItem.password);
            axios
              .post(url, {
                uid: vm.editedItem.uid,
                password: vm.editedItem.password
              })
              .then(function(response) {
                console.log(response.data);
                if (response.data.error != "error") {
                  console.log("firebase updated user: " + response.data.uid);
                  db.collection("user")
                    .doc(response.data.uid)
                    .update({
                      username: vm.editedItem.username
                      // ,email: vm.editedItem.email
                      // ,favEvents: vm.editedItem.favEvents
                    })
                    .then(docRef => {
                      console.log(docRef);
                      console.log("User Updated.");
                      vm.close();
                      vm.clear();
                      vm.initialize();
                    });
                } else {
                  console.log("node js resopnse error, " + response.data.msg);
                  alert("Update User Error! " + response.data.msg);
                }
              });
          }
        });
      } else {
        console.log("new user");
        var vm = this;
        console.log(vm.editedItem);
        const usersRef = db
          .collection("user")
          .where("username", "==", vm.editedItem.username);

        usersRef.get().then(docSnapshot => {
          if (!docSnapshot.empty) {
            console.log(vm.editedItem.username + " exists!");
            alert("This username exist! Create fail.");
            vm.close();
          } else {
            console.log(vm.editedItem.username + " not exists");
            console.log(vm.editedItem);
            var url = "http://localhost:3000/createUser";
            console.log("old PW: " + vm.editedItem.password);
            if (vm.editedItem.password.length <= 5) {
              console.log("in");
              vm.editedItem.password = "00" + vm.editedItem.password;
            }
            console.log("new PW: " + vm.editedItem.password);
            axios
              .post(url, {
                email: vm.editedItem.email,
                password: vm.editedItem.password
              })
              .then(function(response) {
                console.log(response.data);
                if (response.data.error != "error") {
                  console.log("firebase created user: " + response.data.uid);
                  db.collection("user")
                    .doc(response.data.uid)
                    .set({
                      username: vm.editedItem.username,
                      email: vm.editedItem.email,
                      favEvents: []
                    })
                    .then(docRef => {
                      console.log(docRef);
                      console.log("User Created.");
                      vm.close();
                      vm.clear();
                      vm.initialize();
                    });
                } else {
                  console.log("node js resopnse error, " + response.data.msg);
                  alert("Create User Error! " + response.data.msg);
                }
              });
          }
        });
      }
    }
  }
};
</script>