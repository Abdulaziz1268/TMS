import { Router } from "express"

import {
  bid,
  deleteTender,
  deleteUser,
  postTender,
  updateBidStatus,
  updateTenderStatus,
  updateUser,
  userList,
} from "../controllers/adminController.js"
import upload from "../config/storage.js"
import { tenderList } from "../controllers/vendorController.js"

const router = Router()

router.get("/userList", userList)
router.get("/bid/:id", bid)
router.get("/tenderList", tenderList)
router.post("/postTender", upload.single("image"), postTender)
router.patch("/updateUser/:id", updateUser)
router.patch("/updateBidStatus/:id", updateBidStatus)
router.patch("/updateTenderStatus/:id", updateTenderStatus)
router.delete("/deleteUser/:id", deleteUser)
router.delete("/deleteTender/:id", deleteTender)

export default router
