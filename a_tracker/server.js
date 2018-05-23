var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(express.static(__dirname+'/SB-Admin-BS4-Angular-5/dist'))
var path=require('path');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/a_tracker');

var TeacherSchema=mongoose.Schema({
	first_name:{type:String},
	last_name:{type:String},
	email:{type:String},
	password:{type:String},
	classes:[{type:mongoose.Schema.ObjectId,ref:'classes'}]
},{timestamps:true});

var Teacher=mongoose.model('teachers',TeacherSchema);

var ClassSchema=mongoose.Schema({
	title:{type:String},
	students:[{type:mongoose.Schema.ObjectId,ref:'students'}]
},{timestamps:true});

var Class=mongoose.model('classes',ClassSchema);

var StudentSchema=mongoose.Schema({
	first_name:{type:String},
	last_name:{type:String},
	address:{type:String},
	attendance:[{type:mongoose.Schema.ObjectId,ref:'attendance'}]
},{timestamps:true});

var Student=mongoose.model('students',StudentSchema);

var AttendanceSchema=mongoose.Schema({
	status:{type:String}
},{timestamps:true});

var Attendance=mongoose.model('attendance',AttendanceSchema);

app.get('/students',function(req,res){
	Student.find({},function(err,data){
		if(err){
			res.json({message:"error happened",error:err});
		}
		else{
			res.json({data:data});
		}
	})
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./SB-Admin-BS4-Angular-5/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})