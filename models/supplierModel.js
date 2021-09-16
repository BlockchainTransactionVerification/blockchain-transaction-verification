import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    SellerID:{
		type:String,
		required:true
	},
    ItemName:{
		type:String,
		required:true
	},
	  Quantity:{
		type:Int,
		required:true
	},
    Quality:{
		type:String,
		required:true
	},
	  LevelSafety: {
		type: String,
		required: true
	},
	  Region: {
		type: String,
		required: true
	},
    NDA: {
		type: Boolean,
		required: true
	},
    Commission: {
		type: String
	}
})

const User = mongoose.model('Supplys', userSchema)

export default Supply
