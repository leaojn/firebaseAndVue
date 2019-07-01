<template>
  <v-container>
      {{user}}
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters({ user: "user",  }),
    isLogged(){
        return this.user != null
    }
  }
  
};
</script>   