import Bid from "../models/bidModel.js"
import Tender from "../models/tenderModel.js"

export const submitBid = async (req, res) => {
  try {
    // Create a new bid with the uploaded file information
    const newBid = new Bid({
      tenderId: req.body.tenderId,
      vendorId: req.body.vendorId,
      bidAmount: req.body.bidAmount,
      documentUrl: `/uploads/${req.file.filename}`, // Save relative the file path
      status: req.body.status || "pending",
      createdAt: Date.now(), // Set timestamp for bid submission
    })

    const savedBid = await newBid.save()

    // Find the tender and update its bids array
    const tender = await Tender.findById(req.body.tenderId)
    if (!tender) {
      return res.status(404).json({ error: "Tender not found" })
    }
    tender.bids.push(savedBid._id)
    await tender.save()

    res.status(201).json(savedBid)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const tenderList = async (req, res) => {
  try {
    const tenders = await Tender.find()
    res.status(200).json(tenders)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const highestBid = async (req, res) => {
  try {
    const tenderId = req.params.tenderId
    const tender = await Tender.findById(tenderId).populate("bids")

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" })
    }

    // Find the highest bid
    const highestBid = tender.bids.reduce(
      (maxBid, bid) => {
        return bid.bidAmount > maxBid.bidAmount ? bid : maxBid
      },
      { bidAmount: 0 }
    )

    res.status(200).json(highestBid)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const tender = async (req, res) => {
  const tenderId = req.params.id
  const tender = await Tender.findById(tenderId)
  try {
    if (tender) {
      res.status(200).json(tender)
    } else {
      res.status(404).json("Tendor not found")
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
