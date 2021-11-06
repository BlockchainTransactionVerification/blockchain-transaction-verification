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
	CompanyName:{
		type:String,
	},
	BusinessAddress:{
		type:String,
	},
    RepFirstName:{
		type:String,
	},
	RepLastName: {
		type: String,
	},
	Position: {
		type: String,
	},
	WalletID:{
		type:String,
	},
	temporarytoken: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: false
	},
	isSeller: {
		type: Boolean,
		required: true
	}
})

const User = mongoose.model('User', userSchema)

export default User
