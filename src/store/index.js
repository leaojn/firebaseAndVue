import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: '',
        status: 'inicial',
        error: null
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        },
        removeUser(state){
            state.user = null
        },
        setStatus(state, payload){
            state.status = payload
        },
        setError(state,payload){
            state.error = payload
        },
        getUser(state){
            state.user
        }

    },
    actions:{
        signUpAction ({commit} ,payload){
            commit('setStatus','loading')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((response) => {
                    alert('success')
                    commit('setUser', response.user.uid)
                    commit('setStatus', 'success')
                    commit('setError', null)
                }).catch((error)=>{
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },
        signInAction({commit} ,payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((response) => {
                    commit('setStatus', 'success')
                    commit('setError', null)
                    commit('setUser', response.user.uid)
                }).catch((error)=>{
                    alert('error')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },
        /* eslint-disable */
        signOutAction ({commit}) {
            firebase.auth().signOut()
              .then((response) => {
                commit('setUser', "")
                commit('setStatus', 'success')
                commit('setError', null)
              })
              .catch((error) => {
                commit('setStatus', 'failure')
                commit('setError', error.message)
              })
          }
    },
    getters: {
        status (state){
            return state.status
        },
        user (state){
            return state.user
        },
        error (state){
            return state.error
        }
    }

})