var express = require('express');
const education_controllers= require('../controllers/education');
var router = express.Router();

/* GET education */
router.get('/', education_controllers.education_view_all_Page );

/* GET detail education page */
router.get('/detail', education_controllers.education_view_one_Page);

/* GET create education page */
router.get('/create',secured, education_controllers.education_create_Page);

/* GET create update page */
router.get('/update',secured, education_controllers.education_update_Page);

/* GET delete education page */
router.get('/delete',secured, education_controllers.education_delete_Page);

router.get('/', function(req, res) {
	res.render('education', { title: 'Search Result for Education'});
   });

module.exports = router;