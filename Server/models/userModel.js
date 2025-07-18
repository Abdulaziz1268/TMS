import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "vendor" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

userSchema.index({ email: 1 }, { unique: true })

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export default model("User", userSchema)
