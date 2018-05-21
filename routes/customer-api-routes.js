var db = require("../models");

module.exports = function(app) {
  app.get("/api/customers", function (req, res) {
    // 1. Add a join to include all of each Customer's Burgers
    db.Customer.findAll({
      includes: [db.Burger]
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

  app.get("/api/customers/:id", function(req, res) {
    // 2; Add a join to include all of the Customer's Burgers here
    db.Customer.findOne({
      where: {
        id: req.params.id
      },
      includes: [db.Burger]
    }).then(function (dbCustomer) {
      res.json(dbCustomer);
    });
  });

  app.post("/api/customers", function (req, res) {
    db.Customer.create(req.body).then(function (dbCustomer) {
      res.json(dbCustomer);
    });
  });

  app.delete("/api/customers/:id", function (req, res) {
    db.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbCustomer) {
      res.json(dbCustomer);
    });
  });

};
