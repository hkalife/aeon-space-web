import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

var firebaseConfig = {
  apiKey: 'AIzaSyDJRp6Y78OmYeAdHb9L7WdeJALF3Daa1g8',
  authDomain: 'aeon-space.firebaseapp.com',
  projectId: 'aeon-space',
  storageBucket: 'aeon-space.appspot.com',
  messagingSenderId: '128100069816',
  appId: '1:128100069816:web:b0f8f3692dac63d624df4d',
  measurementId: 'G-6NGC71DKF8'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
