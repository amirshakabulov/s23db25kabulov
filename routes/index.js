var express = require("express");
var passport = require("passport");
var router = express.Router();
var Account = require("../models/account");
router.get("/", function (req, res) {
  res.render("index", { title: "Education App", user: req.user });
});
router.get("/register", function (req, res) {
  res.render("register", { title: "Education App Registration" });
});
// it gave me an error of findOne() no longer accepts a callback, so modified given code a bit to make it work. Logic stays the same.
router.post("/register", function (req, res) {
  Account.findOne({ username: req.body.username })
  .then(user => {
    if (user) {
      return res.render("register", {
        title: "Registration",
        message: "Existing User",
        account: req.body.username,
      });
    }
    let newAccount = new Account({ username: req.body.username });
    Account.register(newAccount, req.body.password, function (err, user) {
      if (err) {
        return res.render("register", {
          title: "Registration",
          message: "access error",
          account: req.body.username,
        });
      }
      console.log("Sucess, redirect");
      res.redirect("/");
    });
  })
  .catch(err => {
    return res.render("register", {
      title: "Registration",
      message: "Registration error",
      account: req.body.username,
    });
  });
});
router.get("/login", function (req, res) {
  res.render("login", { title: "Education App Login", user: req.user });
});
router.post("/login", passport.authenticate("local"), function (req, res) {
	if(req.session.returnTo){
 		res.redirect(req.session.returnTo);
	}
	res.redirect("/");
});
router.get("/logout", function (req, res) {
  req.logout( function(err) {
	if (err) {
		return next(err);
	}
	res.redirect('/');
  });
});
router.get("/ping", function (req, res) {
  res.status(200).send("pong!");
});
module.exports = router;