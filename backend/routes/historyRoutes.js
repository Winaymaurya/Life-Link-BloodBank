import express from "express";
import { createHistoryController, getHistoryController } from "../controller/historyController.js";

const router=express.Router()

//create History
router.post('/create-history',createHistoryController)

// Get Name by History
router.get('/get-history',getHistoryController)

export default router