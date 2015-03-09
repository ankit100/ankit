var  express = require('express');
var  app = express();
var  mongojs = require('mongojs');
var  db = mongojs('contactlist',['contactlist']);
var  bodyparser = require('body-parser');


//app.get('', function(req, res){

	//res.send("Hi from server.js");});
app.use(express.static(__dirname + "/public"));
app.use(bodyparser());

app.get('/contactlist',function (req, res){
	//console.log("hi");
	db.contactlist.find(function (err, docs){
		//console.log(docs);
		res.json(docs);

	});
});
app.post('/contactlist', function (req, res, next) {
	console.log(req.body);
	//db check
	var bool ={};
	var ID = null;
	/*
		var authenticate = {};
  userauth.find({username: req.body.username},function(err, user){
    if(err){ return next(err); }
if ( user.length != 0){//username already exists
authenticate.status = false;
res.json (authenticate);
}else {//new user
authenticate.status = true;
new userauth (req.body).save(function (err,data) {
if (err) return console.error(err);  
authenticate.user = data;
new userprofile ({  username: data.username,  name: '',  profilephotospath: [],  birthdate: '',  age: '',  weight: '',  height: '',  waist: ''})
.save(function (err,data) {
if(err) return console.error(err);  
});
res.json (authenticate);
  
});
}
  });

	*/
	db.contactlist.find({name: req.body.name}, function (err, user) {
		if (err) { return next(err);}
		if (user.length !=0) {
			bool.status = false;
			res.json(false);
			
		}
		else{
			db.contactlist.insert(req.body, function (err, doc){
			//console.log(res.json(doc));
			res.json(doc);
		});

		}

	//db.contactlist.insert(req.body, function (err, doc){
	//	res.json(doc);
	//});

});

});
app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err , doc) {
		res.json(doc);
	});

});

app.get('/contactlist/:id', function (req, res) {
	//console.log(req.params);
	//console.log(req);
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});
app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {	
			res.json(doc);
		
	});
});

app.listen(3000);
console.log("server running on 3000");