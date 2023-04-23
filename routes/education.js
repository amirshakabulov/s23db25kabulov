var express = require('express');
const education_controllers= require('../controllers/education');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
   if (req.user) {
     return next();
   }
   req.session.returnTo = req.originalUrl;
   res.redirect("/login");
 };

/* GET education */
router.get('/', education_controllers.education_view_all_Page );
/* GET detail education page */
router.get('/detail', education_controllers.education_view_one_Page)
//Create education page
router.get('/create', secured, education_controllers.education_create_Page)
/* GET update education page */
router.get('/update', secured, education_controllers.education_update_Page);
/* GET delete education page */
router.get('/delete', secured, education_controllers.education_delete_Page);

router.get('/register', function(req, res) {
	res.render('register', { title: 'Education App Registration'});
   });

module.exports = router;