<template>
    <v-content>
  <v-container>
    
    <v-layout
      text-xs-left ma-3
      wrap
      pl-5
      pr-5
    >
      <v-flex xs12 sm12 md12 text-xs-left ma-3>
            <v-card class="elevation-12">
    <v-card-text>
    
        <h1># csci2720_project</h1>
    </v-card-text>
    </v-card>
</v-flex>
<v-flex xs12 sm12 md12 text-xs-left ma-3>
            <v-card class="elevation-12">
    <v-card-text>
    
        <h3>1. Names and workload distribution of each group member</h3>
        <table>
            <thead>
              <tr>
                <th>
                  Names
                </th>
                <th>
                  Workload
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Shum Hiu Tung  
                </td>
                <td>
                    Admin + User + Non-User
                </td>
              </tr>
              <tr>
                <td>
                  So Hon Chuen  
                </td>
                <td>
                    User 
                </td>
              </tr>
              <tr>
                <td>
                  Suen Ka Leong  
                </td>
                <td>
                    Admin + User
                </td>
              </tr>
            </tbody>
          </table>
    </v-card-text>
    </v-card>
</v-flex>
<v-flex xs12 sm12 md12 text-xs-left ma-3>
            <v-card class="elevation-12">
                <v-card-text>

        <h3>2. Basic “how-to” of your project app</h3><hr>
        <h5>## Project setup</h5>
        ```<br>
        npm install<br>
        ```<br>

        <h4>## 1. Vue.js Part:</h4>

        <h5>### Compiles and hot-reloads for development</h5>
        ```<br>
        npm run serve<br>
        ```<br>
        <h5>### Compiles and minifies for production</h5>
        ```<br>
        npm run build<br>
        ```<br>

        <h5>### Run your tests</h5>
        ```<br>
        npm run test<br>
        ```<br>
        <h5>### Lints and fixes files</h5>
        ```<br>
        npm run lint<br>
        ```<br>

        <h5>### Customize configuration</h5>
        See [Configuration Reference](https://cli.vuejs.org/config/).<br>

        <h4>## 2. Node.js Part:</h4>
        <h5>## run</h5>
        ```<br>
        node server/server.js<br>
        ```<br>
        <h5>## hot-reloads</h5>
        ```<br>
        nodemon server/server.js<br>
        ```<br>
</v-card-text></v-card></v-flex>
<v-flex xs12 sm12 md12 text-xs-left ma-3>
            <v-card class="elevation-12">
                <v-card-text>
        <h3>3. Design of data schemas and models of your database</h3><hr>
        There are two collections in the database: event, user<br>
        user(String username, String email, Array favEvents)<br>
        event(String title, String datetime, String organization, String venue, String district)<br>
        For user password, it is saved in the Authenication of the Firebase. The password is automaticaly hashed by Firebase.<br>

</v-card-text></v-card></v-flex>
<v-flex xs12 sm12 md12 text-xs-left ma-3>
            <v-card class="elevation-12">
                <v-card-text>
        <h3>4. Technologies and frameworks/libraries in use</h3><hr>
        <h5>Node.js Express</h5>
        <h5>Vue.js Vuetify.js</h5>
            Advantages: <br>
            - the coding is simplier than Angular<br>
            - the size is smaller than Angular<br>
            Disadvantages:
            - a new frameworks with not much resources in the Internet<br>
            - WE DIDN'T LEARN VUE.JS IN CLASS, use more time to learn<br>
        <h5>Firebase</h5>
            Advantages: <br>
            - Authenication of the application can be easily done<br>
            - Great GUI of the database console<br>
            Disadvantages: <br>
            - does not provide high performance like MongoDB<br>
            - there is daily usage limit (50K read operations)<br>
            - Firebase Admin SDK only support some programming language, that's why we need an extra Node.js server<br>
</v-card-text></v-card></v-flex>

</v-layout>
</v-container>
</v-content>
</template>
<style>
/* table {
  border: 2px solid #000000;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #000000;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
} */

</style>
