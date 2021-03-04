<template>
  <div id="sc-edprofile">
    <h1>Edit Profile</h1>
    <div class="sc-container">
      <form>
         <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  md6 offset-sm3 >
       <div>
         <div >
           <v-btn @click="click1">choose a photo</v-btn>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/*" >                
         </div>
 
       <div v-if="imageData!=null">                     
          <img class="preview" height="268" width="356" :src="img1">
       <br>
       </div>   
      
       </div>
       </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="pink" @click="create">upload</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
        <input type="text" placeholder="Name" v-model="user.name" />
        <textarea placeholder="Bio" v-model="user.bio" />
        <input type="text" placeholder="phone" v-model="user.phone" />
        <input type="text" placeholder="Email Address" v-model="user.email" />
        <input type="password" />
        <button type="submit" @click.prevent="handleSubmit" >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
export default {
  name: " editProfile",
  data() {
    return {
      meUser: [],
      user: {
        name: "",
        bio: "",
        phone: "",
      },
    };
  },
  methods: {
    create () {
      
      const post = {
        photo: this.img1,
        caption: this.caption        
      }

      firebase.database().ref('PhotoGallery').push(post)
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleSubmit() {
      let newUser = {
        name: this.user.name,
        bio: this.user.bio,
        phone: this.user.phone,
      };
      firebase
        .auth()
        .signInWithEmailAndPassword(
          "you@domain.com",
          "correcthorsebatterystaple"
        )
        .then(function(userCredential) {
          userCredential.user.updateEmail("newyou@domain.com");
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log(newUser);
      axios
        .post("http://localhost:8081/updateprofile", newUser)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    click1() {
  this.$refs.input1.click()   
},

previewImage(event) {
  this.uploadValue=0;
  this.img1=null;
  this.imageData = event.target.files[0];
  this.onUpload()
},

onUpload(){
  this.img1=null;
  const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
  storageRef.on(`state_changed`,snapshot=>{
  this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    }, error=>{console.log(error.message)},
  ()=>{this.uploadValue=100;
      storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.img1 =url;
          console.log(this.img1)
        });
      }      
    );
 },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);

/* css class for the edit profile generated errors */
.profilepress-edit-profile-status {
  width: 400px;
  text-align: center;
  background-color: #e74c3c;
  color: #ffffff;
  border: medium none;
  border-radius: 4px;
  font-size: 17px;
  font-weight: normal;
  line-height: 1.4;
  padding: 8px 5px;
  margin: auto;
}

.memo-edprofile-success {
  width: 400px;
  text-align: center;
  background-color: #2ecc71;
  color: #ffffff;
  border: medium none;
  border-radius: 4px;
  font-size: 17px;
  font-weight: normal;
  line-height: 1.4;
  padding: 8px 5px;
  margin: auto;
}

#sc-edprofile {
  background: #f0f0f0;
  width: 400px;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 2%;
  transition: opacity 1s;
  -webkit-transition: opacity 1s;
}

#sc-edprofile h1 {
  background: #3399cc;
  padding: 20px 0;
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
}

div#sc-edprofile .sc-container {
  background: #f0f0f0;
  padding: 6% 4%;
}

div#sc-edprofile input[type="email"],
div#sc-edprofile input[type="text"],
div#sc-edprofile input[type="password"],
div#sc-edprofile select,
div#sc-edprofile textarea {
  width: 92%;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 4%;
  font-family: "Open Sans", sans-serif;
  font-size: 95%;
  color: #555;
}

div#sc-edprofile select {
  width: 100%;
}

div#sc-edprofile textarea {
  height: 100px;
}

div#sc-edprofile input[type="submit"] {
  width: 100%;
  background: #3399cc;
  border: 0;
  padding: 4%;
  font-family: "Open Sans", sans-serif;
  font-size: 100%;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-transition: background 0.3s;
}

div#sc-edprofile input[type="submit"]:hover {
  background: #2288bb;
}
</style>
