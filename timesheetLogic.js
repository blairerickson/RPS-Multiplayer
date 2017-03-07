


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDAAqG02RyCj4h8wysgf-7KYHp0e95aI1A",
    authDomain: "employee-demo-47a07.firebaseapp.com",
    databaseURL: "https://employee-demo-47a07.firebaseio.com",
    storstartdateBucket: "employee-demo-47a07.appspot.com",
    messagingSenderId: "1042883643814"
  };
  firebase.initializeApp(config);






    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var name = "";
    var role = "";
    var startdate = 0;
    var salary = "";


$(".fruitpicker li a").click( function() {
   event.preventDefault();
    var fruit = $(this).text();
    console.log(fruit);
    $("#LebowskiText").html(fruit + " has been selected.");

    $("#LebowskiButton").val(fruit);
});


    // Capture Button Click
    $("#submit-data").on("click", function(event) {
      event.preventDefault();

      console.log("SUBMIT");

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      role = $("#role-input").val().trim();
      startdate = $("#startdate-input").val().trim();
      salary = $("#salary-input").val().trim();
      var fruit = $("#LebowskiButton").val();
      console.log(fruit);

      // Code for handling the push
      database.ref().push({
        name: name,
        role: role,
        startdate: startdate,
        salary: salary,
        fruit:fruit
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      
      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);
		console.log("svARR");
		console.log(svArr);
      // Finding the last user's key
      var lastIndex = svArr.length - 1;

      var lastKey = svArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]

      // Console.logging the last user's data
      console.log(lastObj.name);
      console.log(lastObj.role);
      console.log(lastObj.startdate);
      console.log(lastObj.salary);

      // Change the HTML to reflect
      // $("#name-display").html(lastObj.name);
      // $("#role-display").html(lastObj.role);
      // $("#startdate-display").html(lastObj.startdate);
      // $("#salary-display").html(lastObj.salary);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });




          database.ref().orderByChild("startdate").on("child_added", function(childSnapshot) {
      		console.log("child added");

             $("#EmployeeList").append("<div class='list-group-item active'>" + childSnapshot.val().name + "</div>" + "<div class='list-group-item'>" + childSnapshot.val().role + "</div>" + "<div class='list-group-item'> $" + childSnapshot.val().salary + "</div>" + "<div class='list-group-item'>" + childSnapshot.val().startdate + "</div>" + "<div class='list-group-item'> Started working here " + moment(childSnapshot.val().startdate).fromNow() + "</div><br>");

                 console.log(moment(childSnapshot.val().startdate).fromNow());

          });
