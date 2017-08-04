// *********************************************************************************
// routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

// GET: Find all burgers
// ===============================================
    app.get("/", function(req, res) {
        db.Burger.findAll(
                      {
                        order: ['burger_name'],
                        include: [db.Customer]
                      }
                ).then(function(data) {
                      var hbsObject = {
                                        burgers: data
                                      };
                      res.render("index", hbsObject);
                  });
    });

// POST: save a new burger
// ===============================================
    app.post("/", function(req, res) {
        db.Burger.create({
                          burger_name : req.body.name,
                          devoured    : false
                         })
                 .then(function(data) {
                      res.redirect("/");
        });
    });

// POST: update a burger
// ===============================================
    // POST route for updating the burger to 'devoured':
    // we retrieve or create the customer to get its id 
    // (so we can associate the burger with it) 
    // then we update the burger with the Customer's id and set it to 'devoured'
    app.post("/:id", function(req, res) {
      
      db.Customer.findOrCreate({where: {customer_name: req.body.custname}})
                 .spread((user, created) => {

                         db.Burger.update(
                        {
                          devoured   : true,
                          CustomerId : user.id
                        },
                        {where: {id : req.params.id}}
                        )
                        .then((data) => {
                              res.redirect("/");
                        });
                 })
                 .catch((err) => { 
                      console.log(err)
                 }); 
    });
};