
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCmDgwaG_2TXTgidWbITgIGsj42hudwxCE",
    authDomain: "train-posting-activity.firebaseapp.com",
    databaseURL: "https://train-posting-activity.firebaseio.com",
    projectId: "train-posting-activity",
    storageBucket: "train-posting-activity.appspot.com",
    messagingSenderId: "607239274325"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$(document).ready(function(){
$("#new-train").on("click", function(event) {

    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        nextTrain: nextTrain,
        tMinutesTillTrain: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  
    });     
});

    database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
        var results = snapshot.val();
        var tName = $("<th>").attr("scope", "row").text(results.trainName);
        var place = $("<td>").text(results.destination);
        var timing = $("<td>").text(results.frequency);
        var nextArrival = $("<td>").text(results.nextTrain);
        var minutesAway = $("<td>").text(results.tMinutesTillTrain);
        var tr = $("<tr>").append(tName, place, timing, nextArrival, minutesAway);
        $("#newest-train").append(tr);
      });












});