var express = require('express');
const education_controllers= require('../controllers/education');
var router = express.Router();

/* GET education */
router.get('/', education_controllers.education_view_all_Page );
/* GET detail education page */
router.get('/detail', education_controllers.education_view_one_Page)
//Create education page
router.get('/create', education_controllers.education_create_Page)
/* GET create update education page */
router.get('/update', education_controllers.education_update_Page);
/* GET delete education page */
router.get('/delete', education_controllers.education_delete_Page);



router.get('/', function(req, res) {
	res.render('education', { title: 'Search Result for Education'});
   });

module.exports = router;