import Bid from "../models/bidModel.js"
import Tender from "../models/tenderModel.js"
import User from "../models/userModel.js"

export const postTender = async (req, res) => {
  const updatedDate = req.body.deadline
    ? new Date(req.body.deadline)
    : undefined

  try {
    const newTender = new Tender({
      title: req.body.title,
      description: req.body.description,
      deadline: updatedDate,
      baseAmount: req.body.baseAmount,
      image: `/uploads/${req.file.filename}`,
    })
    console.log("woooo" + req.body.deadline)

    const savedTender = await newTender.save()
    res.status(201).json({
      message: "Tender created successfully!",
      tender: savedTender,
    })
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the tender",
      error: error.message,
    })
  }
}

export const updateBidStatus = async (req, res) => {
  const { id } = req.params // Retrieve id from route parameters
  const updateData = req.body // Data to update

  try {
    const updateBid = await Bid.updateOne(
      { _id: id }, // Use `_id` if `id` is the MongoDB ObjectID
      { $set: updateData } // Spread the update data correctly inside `$set`
    )

    if (updateBid.nModified === 0) {
      return res.status(404).json({ error: "Bid not found or no changes made" })
    }

    res.status(200).json(updateBid)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "User successfully deleted" })
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteTender = async (req, res) => {
  const { id } = req.params
  try {
    const deleteTender = await Tender.deleteOne({ _id: id })
    res.status(200).json(deleteTender)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const userList = async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const bid = async (req, res) => {
  const { id } = req.params
  try {
    const bid = await Bid.findById(id)
    if (!bid) return res.status(404).json({ error: "Bid not found" })

    res.status(200).json(bid)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const updateTenderStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const updatedTender = await Tender.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    res.status(200).json(updatedTender)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateTender = async (req, res) => {
  const { id } = req.params
  const { title, baseAmount, description, status, deadline } = req.body

  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined

  const updateFields = {
    title,
    baseAmount,
    description,
    status,
    deadline,
  }

  if (imagePath) {
    updateFields.image = imagePath
  }

  try {
    const updatedTender = await Tender.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedTender)
  } catch (error) {
    res.status(400).json(error)
  }
}
