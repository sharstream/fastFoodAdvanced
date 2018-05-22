$(document).ready(function() {
  var bodyInput = $("#body");
  var burgerInput = $("#burger");
  var cmsForm = $("#cms");
  var customerSelect = $("#customer");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var burgerId;
  var customerId;
  // Sets a flag for whether or not we're updating a burger to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the burger id from the url
  // In '?post_id=1', burgerId is 1
  if (url.indexOf("?burger_id=") !== -1) {
    burgerId = url.split("=")[1];
    getPostData(burgerId, "burger");
  }
  // Otherwise if we have an customer_id in our url, preset the customer select box to be our Customer
  else if (url.indexOf("?customer_id=") !== -1) {
    customerId = url.split("=")[1];
  }

  // Getting the customers, and their burgers
  getCustomers();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!burgerInput.val().trim() || !bodyInput.val().trim() || !customerSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newBurger = {
      burger_name: burgerInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      customerId: customerSelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = burgerId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/burgers", post, function() {
      window.location.href = "/burgers";
    });
  }

  // Gets burger data for the current burger if we're editing, or if we're adding to an customer's existing burgers
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
    case "burger":
      queryUrl = "/api/burgers/" + id;
      break;
    case "customer":
      queryUrl = "/api/customers/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.customerId || data.id);
        // If this post exists, prefill our cms forms with its data
        burgerInput.val(data.title);
        bodyInput.val(data.body);
        customerId = data.customerId || data.id;
        // If we have a burger with this id, set a flag for us to know to update the burger
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Customers and then render our list of Customers
  function getCustomers() {
    $.get("/api/customers", renderCustomerList);
  }
  // Function to either render a list of customers, or if there are none, direct the user to the page
  // to create an customer first
  function renderCustomerList(data) {
    if (!data.length) {
      window.location.href = "/cms";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCustomerRow(data[i]));
    }
    customerSelect.empty();
    console.log(rowsToAdd);
    console.log(customerSelect);
    customerSelect.append(rowsToAdd);
    customerSelect.val(customerId);
  }

  // Creates the customer options in the dropdown
  function createCustomerRow(customer) {
    var listOption = $("<option>");
    listOption.attr("value", customer.id);
    listOption.text(customer.name);
    return listOption;
  }

  // Update a given burger, bring user to the burger page when done
  function updatePost(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    })
      .then(function() {
        window.location.href = "/burgers";
      });
  }
});
