var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var education_controller = require('../controllers/education');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

router.get('/education/:id', education_controller.education_detail)
// PUT request to update education.
router.put('/education/:id', education_controller.education_update_put);


// GET request for list of all Education items.
router.get('/education', education_controller.education_list);
module.exports = router;