  <template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-start justify-center>
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
              <div>
                <v-toolbar flat color="white">
                  <v-toolbar-title>List of Activities</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="blue darken-1" flat @click.native="temp">Temp</v-btn> -->
                  <v-dialog v-model="dialog" max-width="500px">
                    <!-- <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn> -->
                    <!-- <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <hr>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.datetime" label="Datetime"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.organization" label="Organization"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.venue" label="Venue"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.district" label="District"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
                    </v-card>-->
                  </v-dialog>
                </v-toolbar>

                <v-data-table
                  :headers="headers"
                  :items="activities"
                  :rows-per-page-items="[10,5]"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.title }}</td>
                    <td class="text-xs-left">{{ props.item.datetime }}</td>
                    <td class="text-xs-left">{{ props.item.organization }}</td>
                    <td class="text-xs-left">{{ props.item.venue }}</td>
                    <td class="text-xs-left">{{ props.item.district }}</td>
                    <!-- <td class="justify-center layout pa-3">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
                    </td>-->
                  </template>
                </v-data-table>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { db } from "../main";
export default {
  data: () => ({
    drawer: null,
    dialog: false,
    headers: [
      {
        text: "Title",
        align: "left",
        value: "title"
      },
      { text: "Datetime", value: "datetime" },
      { text: "Organization", value: "organization" },
      { text: "Venue", value: "venue" },
      { text: "District", value: "district" }
    ],
    activities: [],
    // editedIndex: -1,
    editedItem: {
      id: "",
      title: "",
      datetime: "",
      organization: "",
      venue: "",
      district: ""
    }
    // defaultItem: {
    //   id: "",
    //   title: "",
    //   datetime: "",
    //   organization: "",
    //   venue: "",
    //   district: ""
    // }
  }),
  firestore() {
    return {
      activities: db.collection("event").orderBy("title")
    };
  },
  computed: {
    // formTitle () {
    //   return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    // }
  },

  watch: {
    // dialog (val) {
    //   val || this.close()
    // }
  },

  methods: {
    // editItem (item) {
    //   // console.log(item);
    //     this.editedIndex = this.activities.indexOf(item)
    //     this.editedItem = Object.assign({}, item)
    //     this.editedItem.id = item.id
    //     // console.log(this.editedItem);
    //     this.dialog = true
    //   },
    //   deleteItem (item) {
    //     // const index = this.activities.indexOf(item)
    //     var r = confirm('Are you sure you want to delete this item?');
    //       if(r==true){
    //         // this.activities.splice(index, 1);
    //         db.collection('event').doc(item.id).delete().then(()=>{
    //           console.log(item);
    //           console.log("Item Deleted.");
    //         });
    //       }else{
    //         //
    //       }
    //   },
    //   close () {
    //     this.dialog = false
    //     setTimeout(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     }, 300)
    //   },
    //   save () {
    //     if (this.editedIndex > -1) {
    //       //edit item
    //       let id = this.editedItem.id;
    //       let tempItem = { title: this.editedItem.title,
    //         datetime: this.editedItem.datetime,
    //         organization: this.editedItem.organization,
    //         venue: this.editedItem.venue,
    //         district: this.editedItem.district};
    //       const updateRef = db.collection('event').doc(id);
    //       console.log(updateRef);
    //       updateRef.set(tempItem).then((docRef)=>{
    //         console.log(tempItem);
    //         console.log("Item Updated.");
    //       });
    //       // Object.assign(this.activities[this.editedIndex], tempItem);
    //       // this.activities[this.editedIndex].title = this.editedItem.title;
    //       // this.activities[this.editedIndex].datetime = this.editedItem.datetime;
    //       // this.activities[this.editedIndex].organization = this.editedItem.organization;
    //       // this.activities[this.editedIndex].venue = this.editedItem.venue;
    //       // this.activities[this.editedIndex].district = this.editedItem.district;
    //     } else {
    //       //new item
    //       let tempItem = { title: this.editedItem.title,
    //         datetime: this.editedItem.datetime,
    //         organization: this.editedItem.organization,
    //         venue: this.editedItem.venue,
    //         district: this.editedItem.district};
    //       db.collection('event').add(tempItem).then((docRef)=>{
    //         console.log(tempItem);
    //         console.log("New Item Added.");
    //       });
    //       // this.activities.push(this.editedItem)
    //     }
    //     this.close()
    //   }
    // ,
    // temp(){
    //   console.log(this.activities);
    // }
  }
};
</script>