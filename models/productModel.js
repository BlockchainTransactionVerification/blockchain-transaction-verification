import mongoose from 'mongoose'

const supplySchema = mongoose.Schema({
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
	Price: {
		type: String,
		required: true
	},
	Brand: {
		type: String,
		required: true
	},
	NDA: {
		type: Boolean,
		required: true
	},
	SellerID: {
		type: String,
		required: true
	},
	Region: {
		type: String,
		required: true
	},
	ProdRate: {
		type: String,
		required: true
	},
    ShipRestrict: {
		type: String,
		required: true
	}
})

const Supply = mongoose.model('Supplys', supplySchema)

export default Supply
