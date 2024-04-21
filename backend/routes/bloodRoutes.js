import express from "express";
import { bloodNeedController, deleteBloodNeedController, getBloodNeedController, getSingleBloodController, needAcceptedController, needConfirmedController } from "../controller/bloodController.js";

const router=express.Router()

//Blood Needs
router.post('/blood-need',bloodNeedController) 

// Get all blood needs
router.get('/get-blood-needs',getBloodNeedController)

//Get Single Blood
router.get('/get-single-blood/:id',getSingleBloodController)

// delete Blood needs
router.delete('/delete-blood-need/:id',deleteBloodNeedController)

//update Blood need(accepted ans user id)
router.put('/update-accepted/:id',needAcceptedController)

// Update Blood Donation confirmed
router.put('/update-confirmed/:id',needConfirmedController)

export default router