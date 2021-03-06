import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDtcBFc-0MW9cKoKTkYtdfaZC_cI8YWXEI",
  authDomain: "mcity-6de19.firebaseapp.com",
  databaseURL: "https://mcity-6de19.firebaseio.com",
  projectId: "mcity-6de19",
  storageBucket: "mcity-6de19.appspot.com",
  messagingSenderId: "851460934468"
};

firebase.initializeApp(config);

const database = firebase.database();
const databaseMatches = database.ref('matches');
const databasePromotions = database.ref('promotions');
const databaseTeams = database.ref('teams');
const databasePlayers = database.ref('players');

export {
  firebase,
  database,
  databaseMatches,
  databasePromotions,
  databaseTeams,
  databasePlayers,
}