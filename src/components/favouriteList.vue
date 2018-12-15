<template>
<!-- Shum Hiu Tung (1155063707)
Suen Ka Leong (1155062592)
So Hon Chuen (1155062753) -->
    <v-content>
  <v-container fluid fill-height>
        <v-layout align-start justify-center>
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
             <div>
                <v-toolbar flat color="white">
        <v-toolbar-title>List of Your Favourite</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
    </v-toolbar>
        <v-data-table
                  :headers="headers"
                  :items="eventContent"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.title }}</td>
                    <td class="text-xs-left">{{ props.item.datetime }}</td>
                    <td class="justify-center layout pa-3">
                        <!-- <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon> -->
                    <!-- <router-link :to="'/events/' + props.item.id +'/'+ props.item.title + '/' + props.item.datetime + '/' + props.item.organization + '/' + props.item.venue + '/' + props.item.district"> -->
                        <router-link :to="'/events/' + props.item.id">
                        <v-icon>more_horiz</v-icon>
                    </router-link>
                        <v-icon @click="deleteFav(props.item.id)">delete</v-icon>
                    </td>
                  </template>
                </v-data-table>
    </div></v-card></v-flex></v-layout></v-container></v-content>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default{
    data: () => ({
        favEvent: [],
        eventContent: [],
        headers: [
        {
            text: "Title",
            align: "left",
            value: "title"
        },
        { text: "Datetime", value: "datetime" },
        ]
    }),
    created() {
        //get the favEvent from user
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid);

        db.collection("user").doc(currentUser.uid).get().then((data) => {
            const ref = data.data();
            this.favEvent = ref.favEvents;
            console.log(this.favEvent);
            this.favEvent.map((ele) => {
                db.collection("event").doc(ele).get().then((data) => {
                    const eventRef = data.data();
                    //console.log(eventRef.title);
                    this.eventContent.push({id: ele, title: eventRef.title , datetime: eventRef.datetime, organization: eventRef.organization, venue: eventRef.venue, district: eventRef.district, favEvent: eventRef.favEvent})
                    console.log(this.eventContent);
                })
            })
        //get the name and date of the event
        //for(item in this.favEvent){
        })
    },
    methods: {
        deleteFav: function(id){
            const currentUser = firebase.auth().currentUser;
            const valueToRemove = id
            const filteredItems = this.favEvent.filter(function(item) {
                return  item !== valueToRemove
            })
            db.collection('user').doc(currentUser.uid).update({
                  favEvents: filteredItems
            })
            this.favEvent = filteredItems;
            this.eventContent = [];
            this.favEvent.map((ele) => {
                db.collection("event").doc(ele).get().then((data) => {
                    const eventRef = data.data();
                    //console.log(eventRef.title);
                    this.eventContent.push({id: ele, title: eventRef.title , datetime: eventRef.datetime, organization: eventRef.organization, venue: eventRef.venue, district: eventRef.district, favEvent: eventRef.favEvent})
                    console.log(this.eventContent);
                })
            })
        }
    }
}
</script>

<style></style>