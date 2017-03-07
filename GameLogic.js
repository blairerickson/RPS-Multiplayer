


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDkJht_PrmbHzZZ_wOvPQVzaGBFVXNTvfA",
    authDomain: "rps-multiplayer-384ab.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-384ab.firebaseio.com",
    storageBucket: "rps-multiplayer-384ab.appspot.com",
    messagingSenderId: "441630694834"
  };
  firebase.initializeApp(config);


    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var name = "";
    var chat = "";

// selects the player for the round

$(".playpicker li a").click( function() {
  console.log("playerpicker triggered");
   event.preventDefault();
    var player = $(this).text();
    console.log(player);
    $("#PlayerSelected").html(player + " has been selected.");

    $("#LebowskiButton").val(player);
});


 // Capture Button Click for chat
 
    $("#submit-data").on("click", function(event) {
      event.preventDefault();

      console.log("SUBMIT");

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      chat = $("#chat-input").val().trim();
      console.log(chat);

      // Code for handling the push
      database.ref().push({
        name: name,
        chat: chat
      });

    });

    // Firebase watcher + initial loader  
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

             $("#ChatList").append("<div class='list-group-item active'>" + childSnapshot.val().name + "</div>" + "<div class='list-group-item'>" + childSnapshot.val().chat + "</div>" + moment(childSnapshot.val().chatdate).fromNow() + "</div><br>");

                 console.log(moment(childSnapshot.val().startdate).fromNow());

          });


// Drag & Drop functions from interactjs

interact('.draggable')  
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
    // call this function on every dragmove event
    onmove: dragMoveListener,
  });

  function dragMoveListener (event) {
    console.log("event draggable target stuff is : " + event.target.val);
    
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

// enable draggables to be dropped into this
interact('.dropzone').dropzone({  
  // Require a 50% element overlap for a drop to be possible
  overlap: 0.50,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {

    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
  },
  ondrop: function (event) {
    console.log("event target drop stuff is : " + event.target);
    console.dir(event.relatedTarget.attributes.value.nodeValue);

    var weapon = event.relatedTarget.attributes.value.nodeValue;


     event.relatedTarget.textContent = 'Dropped';
         if (weapon == "bomb")
          {
           $(event.relatedTarget).html('<img src="imgs/bomb-iconA.png" width="100%">');
          }
        if (weapon == "scissors")
          {
           $(event.relatedTarget).html('<img src="imgs/scissors-iconA.png" width="100%">');
          }


  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});


// Protocode: 
$(document).ready(function(){

  $("#box-1").html('<img src="imgs/bomb-icon.png" width="100%">');

  });