// Get references to page elements
var $userID = $("#userID");
var $userEmail = $("#userEmail");
var $userImage = $("#userImage");
var $submitBtn = $("#submit");
var $usersList = $("#user-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUsers: function(users) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUsers: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

// refreshPage gets new examples from the db and repopulates the list
var refreshPage = function() {
  API.getUsers().then(function(data) {
    var $users = data.map(function(users) {
      var $a = $("<a>")
        .text(users.userID)
        .attr("href", "/users/" + users.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": users.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $usersList.empty();
    $usersList.append($users);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
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

  API.saveUsers(users).then(function() {
    refreshPage();
  });

  $userID.val("");
  $userEmail.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteUsers(idToDelete).then(function() {
    refreshPage();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$usersList.on("click", ".delete", handleDeleteBtnClick);
