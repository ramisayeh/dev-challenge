<template>
  <div>   
  <form @submit.prevent="login">     
    <h2>Login</h2>     
    <input       
      type="email"       
      placeholder="Email address..."       
      v-model="email"     
    />     
    <input       
      type="password"       
      placeholder="password..."       
      v-model="password"     
    />     
     <!-- <div>
                <h6 >Login With Social Media :</h6>
                <div >
                  <Button
                    disabled={loading}
                    @Click="HandleOnClick(facebookProvider)"
                  >
                    <FaFacebook /> Facebook
                  </Button>
                  <Button
                    disabled={loading}
                    @Click="HandleOnClick(googleProvider)"
                  >
                    <FaGoogle /> Google
                  </Button>
                  <Button
                    disabled={loading}
                    @Click="HandleOnClick(githubProvider)"
                  >
                    <FaGithub /> Github
                  </Button>
                </div>
     </div> -->
    <button type="submit">
       Login
    </button>   
  </form> 
</div>
</template>

<script>
import firebase from "firebase";
// import {
//   facebookProvider,
//   githubProvider,
//   googleProvider,
// } from "./service/authmeth";
  const HandleOnClick = async (provider) => {
    const res = await socialMedia(provider);
    history.push("/");
    console.log(res);
  };


export default {
  name: "Home",
  components: {
   
  },
  
  methods: {
  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('Successfully logged in');
        this.$router.push('/dashboard');
      })
      .catch(error => {
        alert(error.message);
      });
  },
  HandleOnClick,
      
},
};
</script>
