import mongoose from 'mongoose'

const supplySchema = mongoose.Schema({
    SellerID:{
		type:String,
		required:true
	},
    ItemName:{
		type:String,
		required:true
	},
	  Quantity:{
		type:Number,
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

const Supply = mongoose.model('Supplys', supplySchema)

export default Supply
