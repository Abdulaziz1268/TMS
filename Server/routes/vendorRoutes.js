import { Router } from "express"

import {
  highestBid,
  submitBid,
  tender,
  tenderList,
} from "../controllers/vendorController.js"
import upload from "../config/storage.js"

const router = Router()

router.get("/tenderList", tenderList)
router.get("/tender/:id", tender)
router.get("/highestBid/:tenderId", highestBid)
router.post("/submitBid", upload.single("document"), submitBid)

export default router
