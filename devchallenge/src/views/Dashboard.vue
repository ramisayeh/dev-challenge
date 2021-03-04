<template>

  <table class="data"  >
    
    <tr >
      <td class="content">Profile <button @click="goToHome()">Edit</button></td>
      
    </tr>
    <tr>
      <td class="content" v-for="i in imgUrls" v-bind:key="i">
        PHOTO <img :src="i.downloadUrl" height="150"> 
      </td>
    </tr>
    <tr v-for="users in this.User" v-bind:key="users.bio">
      <td class="content">{{users.name}}</td>
    </tr>
    <tr>
      <td class="content"  v-for="users in this.User" v-bind:key="users.bio" >{{users.bio}}</td>
    </tr>
    <tr>
      <td class="content"  v-for="users in this.User" v-bind:key="users.bio" >{{users.phone}}</td>
    </tr>
    <tr>
      <td class="content" >EMAIL</td>
    </tr>
    <tr>
      <td class="content">PASSWORD</td>
    </tr>
   
  </table>
</template>

<script>
import firebase from "firebase";
import "vuesax/dist/vuesax.css";
import axios from "axios";
import Vuetify from "vuetify";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);
Vue.use(Vuetify);

const db = firebase.firestore();
export default {
  name: " dashboard",
  
  data: () => ({
    User: [],
     photo: null,
      photo_url: null,
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      //image_src: require("imageUrl"),
      imgUrls: []

  }),
  mounted() {
        axios.get('http://localhost:8081/user')
            .then((response) => {
                console.log(response.data);
                this.User.push(response.data);
                 console.log(this.User);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    

  methods: {
     getImages: function() {
      db.collection("images")
        .get()
        .then(snap => {
          const array = [];
          snap.forEach(doc => {
            array.push(doc.data());
          });
          this.imgUrls = array;
        });

      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
    },
   goToHome(){
   this.$router.push('/editprofile'); 
      },
      
 
  }
  
};
</script>

<style scoped>
.data {
  width: 50%;
}

table {
  border-collapse: collapse;
  border-radius: 10px !important;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 1px rgb(196, 193, 194); /* this draws the table border  */
}

td {
  border: 1px solid rgb(196, 193, 194) !important;
}

table tr:first-child th:first-child {
  border-top-left-radius: 10px;
}

table tr:last-child td:first-child {
  border-top-right-radius: 10px;
}

table tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

table tr:last-child th:first-child {
  border-bottom-left-radius: 10px;
}

th {
  border: 1px solid #fbd2da !important;
  background: #f9a4b5;
}

th,
td {
  padding: 1em;
  border-bottom: 2px solid white;
}

body {
  margin: 1.5em;
}

.th-right {
  width: 20%;
  text-align: right;
  font-weight: 100;
  color: #fff;
  padding-right: 23px;
}

.content {
  color: #adadad;
  padding-left: 25px;
  text-align: left;
}
</style>
