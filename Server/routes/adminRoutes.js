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
import { authenticate, authorize } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/userList", authenticate, authorize("admin"), userList)
router.get("/bid/:id", authenticate, authorize("admin"), bid)
router.get("/tenderList", authenticate, tenderList)
router.post(
  "/postTender",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  postTender
)
router.patch("/updateUser/:id", authenticate, authorize("admin"), updateUser)
router.patch(
  "/updateBidStatus/:id",
  authenticate,
  authorize("admin"),
  updateBidStatus
)
router.patch(
  "/updateTenderStatus/:id",
  authenticate,
  authorize("admin"),
  updateTenderStatus
)
router.delete("/deleteUser/:id", authenticate, authorize("admin"), deleteUser)
router.delete(
  "/deleteTender/:id",
  authenticate,
  authorize("admin"),
  deleteTender
)

export default router
