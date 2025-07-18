import express, { json } from "express"
import { configDotenv } from "dotenv"
import { fileURLToPath } from "url"
import path from "path"
import cors from "cors"

import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/db.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import vendorRoutes from "./routes/vendorRoutes.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

configDotenv()
connectDB()

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
}

app.use(json())
app.use(cors(corsOptions))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/vendor", vendorRoutes)

const port = process.env.PORT || 2005
app.listen(port, () => console.log(`listening on port ${port} ...`))

// mongoose
//   .connect("mongodb://localhost:27017/TMS", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connected to mongodb"))
//   .catch((err) => console.log("error connecting to mongodb", err))

// const userSchema = new Schema({
//   fname: { type: String, required: true },
//   lname: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "vendor" },
//   createdAt: { type: Date, default: Date.now },
// })

// userSchema.index({ email: 1 }, { unique: true })

// const tenderSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   baseAmount: { type: Number, default: 0 },
//   deadline: { type: Date, default: Date.now },
//   status: { type: String, default: "open" },
//   createdAt: { type: Date, default: Date.now },
//   image: { type: String, default: null },
//   bids: [{ type: Schema.Types.ObjectId, ref: "Bid" }],
// })

// const bidSchema = new Schema({
//   tenderId: { type: String, required: true },
//   vendorId: { type: String, required: true },
//   bidAmount: { type: Number, required: true },
//   documentUrl: { type: String, required: true },
//   status: { type: String, default: "pending" },
//   createdAt: { type: Date, default: Date.now },
// })

// // hashing password with bycript
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt()
//   this.password = await bcrypt.hash(this.password, salt)
//   next()
// })

// const User = model("User", userSchema)
// const Tender = model("Tender", tenderSchema)
// const Bid = model("Bid", bidSchema)

// Configure storage options
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/") // Specify the upload directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname)
//   },
// })

// Create the multer instance with the storage options
// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (
//       file.mimetype === "application/pdf" ||
//       file.mimetype.startsWith("image/")
//     ) {
//       cb(null, true)
//     } else {
//       cb(new Error("Invalid file type. Only PDF and image files are allowed."))
//     }
//   },
// })

// app.get("/api/userList", async (req, res) => {
//   try {
//     const users = await User.find()
//     console.log(users)
//     res.status(200).json(users)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.get("/api/tenderList", async (req, res) => {
//   try {
//     const tenders = await Tender.find()
//     res.status(200).json(tenders)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.get("/api/tender/:id", async (req, res) => {
//   const tenderId = req.params.id
//   const tender = await Tender.findById(tenderId)
//   try {
//     if (tender) {
//       res.status(200).json(tender)
//     } else {
//       res.status(404).json("Tendor not found")
//     }
//   } catch (error) {
//     res.status(500).json(error.message)
//   }
// })

// app.get("/api/tender/:tenderId/highest-bid", async (req, res) => {
//   try {
//     const tenderId = req.params.tenderId
//     const tender = await Tender.findById(tenderId).populate("bids")

//     if (!tender) {
//       return res.status(404).json({ error: "Tender not found" })
//     }

//     // Find the highest bid
//     const highestBid = tender.bids.reduce(
//       (maxBid, bid) => {
//         return bid.bidAmount > maxBid.bidAmount ? bid : maxBid
//       },
//       { bidAmount: 0 }
//     )

//     res.status(200).json(highestBid)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })

// app.get("/api/bid/:id", async (req, res) => {
//   const { id } = req.params
//   try {
//     const bid = await Bid.findById(id)
//     if (!bid) return res.status(404).json({ error: "Bid not found" })

//     res.status(200).json(bid)
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" })
//   }
// })

// app.post("/api/payment", async (req, res) => {
//   const data = req.body
//   const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY
//   try {
//     const response = await axios.post(
//       `https://api.chapa.co/v1/transaction/initialize`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     res.json(response.data)
//     console.log(response.data)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

// app.get("/api/paymentCheck", async (req, res) => {
//   const { status, trx_ref } = req.query

//   if (status !== "success")
//     res.status(400).json({ message: "Payment Failed or cancelled" })
//   try {
//     const response = await axios.get(
//       `https://api.chapa.co/v1/transaction/verify/${trx_ref}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     if (
//       response.data.status === "success" &&
//       response.data.data.status === "success"
//     ) {
//       res
//         .status(200)
//         .json({ status: "success", message: "payment verified successfully" })
//     } else {
//       res.status(200).json({
//         status: "pending",
//         message: "payment is verification is pending",
//       })
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error, message: "Error occured while verifing payment" })
//     console.log("error occured", error)
//   }
// })

// app.post("/api/user", async (req, res) => {
//   try {
//     const newUser = new User(req.body)
//     const savedUser = await newUser.save()
//     res.status(201).json(savedUser)
//   } catch (error) {
//     if (error.code === 11000) {
//       // Duplicate key error
//       res.status(400).json({ error: "Email already exists" })
//     } else {
//       res.status(400).json(error)
//     }
//   }
// })

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body
//   try {
//     const user = await User.findOne({ email })

//     //check if user exists
//     if (!user) return res.status(400).json({ message: "The user does't exist" })

//     //compare the password
//     const isMatch = await bcrypt.compare(password, user.password)

//     //check if password matches
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" })

//     // generate jwt
//     const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" })
//     res.json({
//       token,
//       email,
//       fname: user.fname,
//       role: user.role,
//       _id: user._id,
//     })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

// app.post("/api/bid", upload.single("document"), async (req, res) => {
//   try {
//     // Create a new bid with the uploaded file information
//     const newBid = new Bid({
//       tenderId: req.body.tenderId,
//       vendorId: req.body.vendorId,
//       bidAmount: req.body.bidAmount,
//       documentUrl: `/uploads/${req.file.filename}`, // Save relative the file path
//       status: req.body.status || "pending",
//       createdAt: Date.now(), // Set timestamp for bid submission
//     })

//     const savedBid = await newBid.save()

//     // Find the tender and update its bids array
//     const tender = await Tender.findById(req.body.tenderId)
//     if (!tender) {
//       return res.status(404).json({ error: "Tender not found" })
//     }
//     tender.bids.push(savedBid._id)
//     await tender.save()

//     res.status(201).json(savedBid)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })

// app.post("/api/tenderPost", upload.single("image"), async (req, res) => {
//   const updatedDate = req.body.deadline
//     ? new Date(req.body.deadline)
//     : undefined

//   try {
//     const newTender = new Tender({
//       title: req.body.title,
//       description: req.body.description,
//       deadline: updatedDate,
//       baseAmount: req.body.baseAmount,
//       image: `/uploads/${req.file.filename}`,
//     })
//     console.log("woooo" + req.body.deadline)

//     const savedTender = await newTender.save()
//     res.status(201).json({
//       message: "Tender created successfully!",
//       tender: savedTender,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred while creating the tender",
//       error: error.message,
//     })
//   }
// })

// app.patch("/api/bidStatus/:id", async (req, res) => {
//   const { id } = req.params // Retrieve id from route parameters
//   const updateData = req.body // Data to update

//   try {
//     const updateBid = await Bid.updateOne(
//       { _id: id }, // Use `_id` if `id` is the MongoDB ObjectID
//       { $set: updateData } // Spread the update data correctly inside `$set`
//     )

//     if (updateBid.nModified === 0) {
//       return res.status(404).json({ error: "Bid not found or no changes made" })
//     }

//     res.status(200).json(updateBid)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.patch("/api/updateUser/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     const updatedUser = await User.findByIdAndUpdate(id, req.body, {
//       new: true,
//     })
//     res.status(200).json(updatedUser)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.patch("/api/tender/updateStatus/:id", async (req, res) => {
//   const { id } = req.params
//   const { status } = req.body
//   try {
//     const updatedTender = await Tender.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     )
//     res.status(200).json(updatedTender)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.delete("/api/deleteTender/:id", async (req, res) => {
//   const { id } = req.params
//   try {
//     const deleteTender = await Tender.deleteOne({ _id: id })
//     res.status(200).json(deleteTender)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.delete("/api/deleteUser/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     await User.findByIdAndDelete(id)
//     res.status(200).json({ message: "User successfully deleted" })
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })
