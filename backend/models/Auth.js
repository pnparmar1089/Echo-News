const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
email:{
	type: String,
	required: true,
},
token: {
	type: String,
	required: true,
},
},
{
timestamps: true
})

const AuthModel = mongoose.model("Auth",AuthSchema)

module.exports = AuthModel