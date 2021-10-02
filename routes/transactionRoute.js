import { addTransaction, getTransaction, getDocuments, updateDocuments } from "../controllers/transactionController.js";
import express from 'express'

import transaction from '../models/transactionModel.js'
const transactionRouter = express.Router()



// express router method to create route for uploading information on an item to be sold
transactionRouter.route('/addTransaction').post(addTransaction)

// express router method to create route for logging in users
transactionRouter.route('/updateDocuments').post(updateDocuments)

// express router method to create route for deleting users
transactionRouter.route('/getDocuments').get(getDocuments)

transactionRouter.route('/getTransaction').get(getTransaction)


export default transactionRouter
