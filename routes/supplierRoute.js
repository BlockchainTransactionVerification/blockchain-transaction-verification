import { saveItem} from "../controllers/supplierController.js";
import express from 'express'

import Supply from '../models/supplierModel.js'
const supplyRouter = express.Router()



// express router method to create route for uploading information on an item to be sold
supplyRouter.route('/addItem').post(saveItem)

// express router method to create route for logging in users
//supplyRouter.route('/login').post(loginUser)

// express router method to create route for deleting users
//supplyRouter.route('/delete/:id').delete(deleteUser)


export default supplyRouter
