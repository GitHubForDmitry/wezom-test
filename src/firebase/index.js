import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDJt1lqZO4kS_cIlafJ05d7hOVGlbok3w8",
    authDomain: "wezom-test.firebaseapp.com",
    databaseURL: "https://wezom-test.firebaseio.com",
    projectId: "wezom-test",
    storageBucket: "wezom-test.appspot.com",
    messagingSenderId: "482053676702",
    appId: "1:482053676702:web:cf208d1ca44a1e6edf658f",
    measurementId: "G-JC4WKGPBRM"
};
// Initialize Firebase
const  initialize = firebase.initializeApp(firebaseConfig);
export default initialize;