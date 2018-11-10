// Get references to page elements
var $userID = $("#userID");
var $userEmail = $("#userEmail");
var $userImage = $("#userImage");
var $submitBtn = $("#submit");


// The API object contains methods for each kind of request we'll make
var API = {
  saveUsers: function (users) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  getUsers: function () {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUsers: function (id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  },
  getResults: function (id) {
    return $.ajax({
      url: "/results/" + id,
      type: "GET"
    });
  }
};

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// $submitBtn.on("click", function (event) {
//   event.preventDefault();

//   var users = {
//     userID: $userID.val().trim(),
//     userEmail: $userEmail.val().trim(),
//     userImage: $userImage.val().trim()
//   };

//   //if (!(users.userID && users.userEmail && users.userImage)) {
//   //alert("You must enter a Username, Email Address, and Spirit Animal Image!");
//   // return;
//   //}

//   $userID.val("");
//   $userEmail.val("");
//   $userImage.val("");

//   API.saveUsers(users).then(function (res) {
//     console.log(res);
//     if (res.redirect) {
//       document.location.href = res.redirect;
//       return;
//     }
//   });

// });



$submitBtn.on("click", function (event) {
  event.preventDefault();

  var users = {
    userID: $userID.val().trim(),
    userEmail: $userEmail.val().trim(),
    userImage: $userImage.val().trim()
  };

  if (!(users.userID && users.userEmail && users.userImage)) {
    alert("You must enter a Username, Email Address, and Spirit Animal Image!");
    return;
  }
  else{
    $userID.val("");
    $userEmail.val("");
    $userImage.val("");
  
    API.saveUsers(users).then(function (res) {
      console.log(res);
      if (res.redirect) {
        document.location.href = res.redirect;
        return;
      }
    });
  }

});

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function (event) {
  event.preventDefault();
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteUsers(idToDelete).then(function () {
    location.reload();
  });
};

// Add event listeners to the submit and delete buttons

$(".delete").on("click", handleDeleteBtnClick);
$("#questionSubmit1").on("click", function () {
  window.location.href = "/questions/2";
  location.reload();
});

 