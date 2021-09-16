import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    Username:{
		type:String,
		required:true
	},
	Password:{
		type:String,
		required:true
	},
    Email:{
		type:String,
		required:true
	},
	Firstname:{
		type:String,
		required:true
	},
	Lastname:{
		type:String,
		required:true
	},
	temporarytoken: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: false
	}
})

const User = mongoose.model('User', userSchema)

export default User
