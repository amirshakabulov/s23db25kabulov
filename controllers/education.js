const education = require('../models/education');
var Education = require('../models/education');
// List of all Education
exports.education_list = async function(req, res) {
	try{
		theEducation = await Education.find();
		res.send(theEducation);
	}
	catch(err){
		res.status(500);
		res.send(`{"error": ${err}}`);
	}
   };
// for a specific Education.
exports.education_detail = async function(req, res) {
	console.log("detail" + req.params.id)
	try {
		result = await Education.findById( req.params.id)
		console.log(result, "check")
		res.send(result)
	} catch (error) {
	res.status(500)
	res.send(`{"error": document for id ${req.params.id} not found`);
	}
   };
// Handle Education create on POST.
exports.education_create_post = async function(req, res) {
	console.log(req.body)
	let document = new Education();
	// We are looking for a body, since POST does not have query parameters.
	// Even though bodies can be in many different formats, we will be picky
	// and require that it be a json object
	document.Level = req.body.Level;
	document.Type = req.body.Type;
	document.Cost = req.body.Cost;
	try{
	let result = await document.save();
	res.send(result);
	}
	catch(err){
	res.status(500);
	res.send(`{"error": ${err}}`);
	}
   };
// Handle Education delete form on DELETE.
exports.education_delete = async function(req, res) {
	console.log("delete " + req.params.id)
	try {
	result = await Education.findByIdAndDelete( req.params.id)
	console.log("Removed " + result)
	res.send(result)
	} catch (err) {
	res.status(500)
	res.send(`{"error": Error deleting ${err}}`);
	}};
// Handle Education update form on PUT.
exports.education_update_put = async function(req, res) {
	console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
	try {
		let toUpdate = await Education.findById(req.params.id);
		console.log(toUpdate, "check for item")
		// Do updates of properties
		if(req.body.educationlevel) toUpdate.Level = req.body.educationlevel;
		if(req.body.educationtype) toUpdate.Type = req.body.educationtype;
		console.log(req.body.educationcost, "check2")
		if(req.body.educationcost) toUpdate.Cost = req.body.educationcost;
		console.log(toUpdate, "check for update")
		try{
			let result = await toUpdate.save();
			console.log("Sucess " + result)
			res.send(result)

	}
		catch(error){
			console.log(error, "error here")
		}
	} catch (err) {
		res.status(500)
		// alert("Invalid numer of scoops")
		res.send(`{"error": ${err}: Update for id ${req.params.id}failed`);
	}
   };

// VIEWS
// Handle a show all view
exports.education_view_all_Page = async function(req, res) {
	try{
		theEducation = await education.find();
		res.render('Education', { title: 'Education Search Results', results: theEducation });
	}
	catch(err){
		res.status(500);
		res.send(`{"error": ${err}}`);
	}
   };

