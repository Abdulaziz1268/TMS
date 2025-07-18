import { Router } from "express"

import {
  initiatePayment,
  paymentCheck,
} from "../controllers/paymentController.js"

const router = Router()

router.post("/initiatePayment", initiatePayment)
router.get("/paymentCheck", paymentCheck)

export default router
