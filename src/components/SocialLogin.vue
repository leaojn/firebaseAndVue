<template>
  
  <div id="firebaseui-auth-container"></div>

</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
  name: 'auth',
  mounted() {
    var uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
       
        callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
        this.$store.commit('setUser', authResult)
        window.location.href = '/'
        }
        },

                

      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', uiConfig);
    },
    
}
</script>

<style lang="css">
</style>