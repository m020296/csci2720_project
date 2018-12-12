<template>
  <v-container>
    
    <v-layout
      text-xs-left
      wrap
      pl-5
      pr-5
    >
      <v-flex xs12>
  <div class="about">
    
    
        <h1># csci2720_project</h1>

          
        <h2>## Project Requirement</h2>

        <h3>### User</h3>
        | Requirement | Progress | <br>
        |--|--|<br>
        | 1. SignUp + Login | **Need testing** |<br>
        | 2. List event in table (allow sorting) | **Need testing** |<br>
        | 3. Search by one field |  |<br>
        | 4. Separate view of a event: detail + comment(non-threaded) |  |<br>
        | 5. Add event to favourite + see list in another view |  |<br>
        | 6. See user name in top right corner + Logout | **Need testing** |<br>
        <h3>### Admin</h3>
        | Requirement | Progress |<br>
        |--|--|<br>
        | 1. Flush Data | **Need testing** |<br>
        | 2. CRUD event data | **Need testing** |<br>
        | 3. CRUD user data | **Need testing** |<br>
        | 4. Load CSV | **Need testing** |<br>
        | 5. Logout | **Need testing** |<br>

        <h3>### Non-user</h3>
        | Requirement | Progress |<br>
        |--|--|<br>
        | 1. Login + SignUp | **Need testing** |<br>
        | 2. Login as admin | **Need testing** |<br>


        <h2>## Project setup</h2>
        ```<br>
        npm install<br>
        ```<br>

        <h3>## 1. Vue.js Part:</h3>

        <h4>### Compiles and hot-reloads for development</h4>
        ```<br>
        npm run serve<br>
        ```<br>
        <h4>### Compiles and minifies for production</h4>
        ```<br>
        npm run build<br>
        ```<br>

        <h4>### Run your tests</h4>
        ```<br>
        npm run test<br>
        ```<br>
        <h4>### Lints and fixes files</h4>
        ```<br>
        npm run lint<br>
        ```<br>

        <h4>### Customize configuration</h4>
        See [Configuration Reference](https://cli.vuejs.org/config/).<br>

        <h3>## 2. Node.js Part (server):</h3>
        <h4>## run</h4>
        ```<br>
        node server/server.js<br>
        ```<br>
        <h4>## hot-reloads</h4>
        ```<br>
        nodemon server/server.js<br>
        ```<br>
  </div>
</v-flex>
</v-layout>
</v-container>
</template>
