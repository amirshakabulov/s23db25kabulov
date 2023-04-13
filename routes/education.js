var express = require('express');
const education_controllers= require('../controllers/education');
var router = express.Router();

/* GET education */
router.get('/', education_controllers.education_view_all_Page );


router.get('/', function(req, res) {
	res.render('education', { title: 'Search Result for Education'});
   });

module.exports = router;