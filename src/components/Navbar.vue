<template>
  <!-- display the navigation bar -->
  <v-toolbar>
    <v-toolbar-items>
      <v-btn flat tag="span" style="cursor: pointer">SHOW CASE</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <!-- navigation bar links -->
    <v-toolbar-items class="hidden-xs-only" v-if="!isLogged">
      <v-btn flat v-for="item in items" :key="item.title" :to="item.link">
        <v-icon right>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    

    <!-- sign out button -->
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn flat @click="logoutFromFirebase">
        <v-icon right>delete_sweep</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
          ...mapGetters({ user: "user",  }),
    isLogged(){
        return this.user != ""
    },
    items() {
      let menuItems = [
        {
          title: "Register",
          icon: "face",
          link: "/register"
        },
        {
          title: "Login",
          icon: "no_encryption",
          link: "/login"
        }
      ];
      return menuItems;
    },
    getUser(){
        return this.$store.user
    }
  },
  methods: {
    logoutFromFirebase() {
      this.$store.dispatch("signOutAction");
    }
  }
  
};
</script>