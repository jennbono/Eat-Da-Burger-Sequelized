var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
  db.burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  db.burger.create({
    burger_name: req.body.burger_name,
    devoured: false
  }).then(function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  db.burger.update(req.body,
  {
    where: {
      id: req.params.id
    }
  })
  .then(function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).send("Can't find burger");
    } else {
      res.status(200).send("Updated Burger");
    }
  });
});

module.exports = router;