// SUPER CONFUSED AND TIRED ... going to bed trying again tommorow

// // Get references to page elements
// var $questionID = $("#questionID");
// var $submitBtn = $("#submit");
// var $answersList = $("#answers-list");
// var questionsCount;

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveAnswers: function(answers) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/answers",
//       data: JSON.stringify(answers)
//     });
//   },
//   getAnswers: function() {
//     return $.ajax({
//       url: "api/answers",
//       type: "GET"
//     });
//   },
//   deleteAnswers: function(id) {
//     return $.ajax({
//       url: "api/answers/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshPage gets new questions from the questions table and repopulates the list
// var refreshPage = function() {
//   API.getUsers().then(function(data) {
//     var $users = data.map(function(users) {
//       var $a = $("<a>")
//         .text(users.userID)
//         .attr("href", "/users/" + users.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": users.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $usersList.empty();
//     $usersList.append($users);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var users = {
//     userID: $userID.val().trim(),
//     userEmail: $userEmail.val().trim(),
//     userImage: $userImage.val().trim()
//   };

//   if (!(users.userID && users.userEmail && users.userImage)) {
//     alert("You must enter a Username, Email Address, and Spirit Animal Image!");
//     return;
//   }

//   API.saveUsers(users).then(function() {
//     refreshPage();
//   });

//   $userID.val("");
//   $userEmail.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteUsers(idToDelete).then(function() {
//     refreshPage();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $usersList.on("click", ".delete", handleDeleteBtnClick);
