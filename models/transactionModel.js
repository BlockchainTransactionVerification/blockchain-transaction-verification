import mongoose from 'mongoose'

const transactionSchema = mongoose.Schema({
    ProdID:{
		type:String,
		required:true
	},
	BuyerID:{
		type:Number,
		required:true
	},
	SellerID:{
		type:String,
		required:true
	},
	Active: {
		type: Boolean,
		required: true
	},
	Documents: [{
		DocName: String,
		Responsible: String,
		Done: Boolean
	}]
})

const Transaction = mongoose.model('Transactions', transactionSchema)

export default Transaction
