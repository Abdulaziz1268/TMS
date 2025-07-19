import { Router } from "express"

import {
  initiatePayment,
  paymentCheck,
} from "../controllers/paymentController.js"
import { authenticate } from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/initiatePayment", authenticate, initiatePayment)
router.get("/paymentCheck", authenticate, paymentCheck)

export default router
