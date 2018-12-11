<template>
    <div id="eventContent" class="container">
    <div class="page-header">
            <h1>View the list of the current events</h1>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3>Event List</h3>
            </div>
            <div class="panel-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Origanizer</th>
                            <th>Datetime</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in events.slice().reverse()">
                            <th>{{event.title}}</th>
                            <th>{{event.organization}}</th>
                            <th>{{event.datetime}}</th> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../main";

export default {
  name: "eventList",
  data() {
    return {
        events: [],
        event: {},
        start: 0
    };
  },
  firestore () {
    return {
      events: db.collection('event').orderBy('datetime')
    }
  }
}
</script>

<style></style>