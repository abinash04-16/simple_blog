import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import firebase from 'firebase';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBSUl9EB7Vz7LyGzq9JpQaCpIoet4-Wt7E",
    authDomain: "vue-app-5f3ae.firebaseapp.com",
    databaseURL: "https://vue-app-5f3ae-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vue-app-5f3ae",
    storageBucket: "vue-app-5f3ae.appspot.com",
    messagingSenderId: "852322054447",
    appId: "1:852322054447:web:155758e2702443f5e6f1da"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
