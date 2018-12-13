<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <v-layout row wrap text-xs-center>
                <v-flex xs12 sm6>
                    <v-btn flat color="indigo" @click="addFav">
                        <v-icon>star</v-icon>
                        <p>Add to favourite</p>
                    </v-btn>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-btn left small color="primary" to="/events">Back</v-btn>
                </v-flex>

            </v-layout>

            <h1>Title: <br><span>{{title}}</span></h1>
            <div>
                
                <h3 class="headline mb-0">Datetime: <br><span class="font-weight-bold">{{datetime}}</span></h3>
                <br>
                <h3 class="headline mb-0">Organization: <br><span class="font-weight-bold">{{organization}}</span></h3>
                <br>
                <h3 class="headline mb-0">Venue: <br><span class="font-weight-bold">{{venue}}</span></h3>
                <br>
                <h3 class="headline mb-0">District: <br><span class="font-weight-bold">{{district}}</span></h3>
            </div>
            
          </div>
          <v-divider ></v-divider>
          <v-layout row class="mt-5">
                
          </v-layout>
        </v-card-title>

        
        
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
export default {
    props:{
        
    },
    data: () => ({ 
        id: "",
        title: "",
        datetime: "",
        organization: "",
        venue: "",
        district: ""
    }),
    created() {
        this.id = this.$route.params.id;
        this.title = this.$route.params.title;
        this.datetime = this.$route.params.datetime;
        this.organization = this.$route.params.organization;
        this.venue = this.$route.params.venue;
        this.district = this.$route.params.district;
    },
    methods: {
        addFav: function() {
           
        }
    }
}
</script>