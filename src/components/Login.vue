<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="validate">Login</v-btn>

          <v-btn color="error" to='/social'>Social Login</v-btn>
        </v-form>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui';

/* eslint-disable */
export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is Required"]
  }),
   mounted() {
    var uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],

      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          this.$store.dispatch.commit("setUser", authResult);
        }
      },
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.$router.push({ path: '/' });

    ui.start('#firebaseui-auth-container', uiConfig);
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.loginWithFirebase();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    /* eslint-disable */
    loginWithFirebase() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signInAction", user);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>