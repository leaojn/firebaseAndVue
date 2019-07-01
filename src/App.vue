<template>
  <v-app>
    <Navbar></Navbar>
    <router-view></router-view>
    {{isLogged}}
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import firebase from 'firebase'

export default {
  name: "App",
  components: {
    Navbar
  },
  
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      key_api: process.env.VUE_APP_FIREBASE_API_KEY
      
    };
  },
  created() {
     var vm = this
     firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
         const usuario = {
           usuario: user
         }
         vm.$store.commit('setUser',usuario);
      }
    });
  },
};
</script>
