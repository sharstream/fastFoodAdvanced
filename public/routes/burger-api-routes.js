// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Burgers
  app.get("/api/burgers", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // 1. Add a join here to include all of the Customers to these Burgers
    db.Burger.findAll({
      where: query,
      include: [{
        model: db.Customer
      }]
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // Get route for retrieving a single Burger
  app.get("/api/burgers/:id", function(req, res) {
    // 2. Add a join here to include the Customer who ate the Burger
    db.Burger.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.Customer,
        where: {
          name: req.body.name
        }
      }]
    }).then(function (dbBurger) {
      console.log(dbBurger);
      res.json(dbBurger);
    });
  });

  // POST route for saving a new Burger
  app.post("/api/burgers", function(req, res) {
    db.Post.create(req.body).then(function (dbBurger) {
      res.json(dbBurger);
    });
  });

  // DELETE route for deleting Burgers
  app.delete("/api/burgers/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbBurger) {
      res.json(dbBurger);
    });
  });

  // PUT route for updating Burgers
  app.put("/api/burgers", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbBurger) {
      res.json(dbBurger);
    });
  });
};
