
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCmDgwaG_2TXTgidWbITgIGsj42hudwxCE",
  authDomain: "train-posting-activity.firebaseapp.com",
  databaseURL: "https://train-posting-activity.firebaseio.com",
  projectId: "train-posting-activity",
  storageBucket: "",
  messagingSenderId: "607239274325"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";


$("#new-train").on("click", function(event) {

    event.preventDefault();

    trainName = $("train-name-imput").val().trim();
    destination = $("destination-imput").val().trim();
    frequency = $("frequency-imput").val().trim();
    nextArrival = $("next-arrival-imput").val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival
    });
});