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

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
 userSchema.statics.getUserById = async function (id) {
	try {
	  const user = await this.findOne({ _id: id });
	  if (!user) throw ({ error: 'No user with this id found' });
	  return user;
	} catch (error) {
	  throw error;
	}
  }

   /**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
	try {
	  const users = await this.find();
	  return users;
	} catch (error) {
	  throw error;
	}
  }
  
  /**
   * @param {Array} ids, string of user ids
   * @return {Array of Objects} users list
   */
  userSchema.statics.getUserByIds = async function (ids) {
	try {
	  const users = await this.find({ _id: { $in: ids } });
	  return users;
	} catch (error) {
	  throw error;
	}
  }

const User = mongoose.model('User', userSchema)

export default User
