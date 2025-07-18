import { Schema, model } from "mongoose"

const tenderSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    baseAmount: { type: Number, default: 0 },
    deadline: { type: Date, default: Date.now },
    status: { type: String, default: "open" },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, default: null },
    bids: [{ type: Schema.Types.ObjectId, ref: "Bid" }],
  },
  { timestamps: true }
)

export default model("Tender", tenderSchema)
