const mongoose = require('mongoose')

//creating the Company Schema
const companySchema = mongoose.Schema({
   companyName : {type: String, required: true},
   email : {type:String, required:true, unique:true },
   password :{type: String, required:true},
   phone :{type: String, required:true}, 
   logo :{type: String, required:true},
   address :{type: String, required:true},
   country : {type:[String], required:true},
   isRegistered : {type: String, required:true},
   founderName : {type: String}
   
},{timestamps:true})

//creating the Company model 
const companyModel = mongoose.model('Company',companySchema)

module.exports = companyModel;