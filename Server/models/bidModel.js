import { Schema, model } from "mongoose"

const bidSchema = new Schema(
  {
    tenderId: { type: String, required: true },
    vendorId: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    documentUrl: { type: String, required: true },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default model("Bid", bidSchema)
