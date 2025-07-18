import axios from "axios"
import { configDotenv } from "dotenv"

configDotenv()

export const initiatePayment = async (req, res) => {
  const data = req.body
  const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY
  try {
    const response = await axios.post(
      `https://api.chapa.co/v1/transaction/initialize`,
      data,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    res.json(response.data)
    console.log(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const paymentCheck = async (req, res) => {
  const { status, trx_ref } = req.query

  if (status !== "success")
    res.status(400).json({ message: "Payment Failed or cancelled" })
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${trx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    if (
      response.data.status === "success" &&
      response.data.data.status === "success"
    ) {
      res
        .status(200)
        .json({ status: "success", message: "payment verified successfully" })
    } else {
      res.status(200).json({
        status: "pending",
        message: "payment is verification is pending",
      })
    }
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Error occured while verifing payment" })
    console.log("error occured", error)
  }
}
