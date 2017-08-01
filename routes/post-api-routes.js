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

//  // GET route for getting all of the posts
//   app.get("/api/posts", function(req, res) {
//     var query = {};
//     if (req.query.author_id) {
//       query.AuthorId = req.query.author_id;
//     }
//     // Here we add an "include" property to our options in our findAll query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Author
//     db.Post.findAll({
//       where: query,
//       include: [db.Author]
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

//   // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.Post.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });
// };

    console.log('post-api-routes -----------------')
    // Create all our routes and set up logic within those routes where required.
    app.get("/", function(req, res) {
      // console.log('get ', req)
        db.Burger.findAll(
                      {include: [db.Customer]}
                  )
                 .then(function(data) {
                      var hbsObject = {
                                        burgers: data
                                      };
                      console.log("data : ", data)
                      console.log("hbsObject : ", hbsObject)
                      res.render("index", hbsObject);
                  });
    });
    // POST route for saving a new burger
    app.post("/", function(req, res) {
        console.log("req.body : ", req.body)
        console.log("------------------------------------------")
        db.Burger.create({
                          burger_name : req.body.name,
                          devoured    : false
                         })
                 .then(function(data) {
                      console.log("Burger : ", db.Burger)
                      res.redirect("/");
        });
    });


    app.post("/:id", function(req, res) {
      // var custKey = 
      db.Customer.findOrCreate({where: {customer_name: req.body.custname}})
                 .spread((user, created, customer_name) => {
                      console.log('user : ', user);
                      console.log("------------------------------------------")
                      console.log(created);
                      console.log("------------------------------------------")
                      console.log("****************")
                      console.log('customer_name = ', req.body.custname)
                      console.log("****************")
                      console.log('customer_id ', user.id);
                      console.log('customer_name : ', user.customer_name)
      db.Burger.update(
                        {
                          devoured   : true,
                          CustomerId : user.id
                        },
                        {where: {id : req.params.id}}
                      )
               .then(function(data) {
                      console.log("****************")
                      console.log('customer_name update = ', req.body.custname)
                      console.log("****************")
                      console.log("Burger : ", db.Burger)
                      console.log("------------------------------------------")
                      res.redirect("/");
               });
      }); 
    });
};