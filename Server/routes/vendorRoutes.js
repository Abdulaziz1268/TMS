import { Router } from "express"

import {
  highestBid,
  submitBid,
  tender,
  tenderList,
} from "../controllers/vendorController.js"
import upload from "../config/storage.js"
import { authenticate, authorize } from "../middlewares/authMiddleware.js"

const router = Router()

router.get(
  "/tenderList",
  authenticate,
  authorize("admin", "vendor"),
  tenderList
)
router.get("/tender/:id", authenticate, authorize("admin", "vendor"), tender)
router.get(
  "/highestBid/:tenderId",
  authenticate,
  authorize("admin", "vendor"),
  highestBid
)
router.post(
  "/submitBid",
  authenticate,
  authorize("admin", "vendor"),
  upload.single("document"),
  submitBid
)

export default router
