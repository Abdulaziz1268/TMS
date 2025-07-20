import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import User from "../models/userModel.js"

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    //check if user exists
    if (!user) return res.status(400).json({ message: "The user does't exist" })

    //compare the password
    const isMatch = await bcrypt.compare(password, user.password)

    //check if password matches
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    // generate jwt
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    )
    res.json({
      token,
      email,
      fname: user.fname,
      role: user.role,
      _id: user._id,
    })
  } catch (error) {
    res.status(500).json({ error, message: "something went wrong pl" })
  }
}

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: "Email already exists" })
    } else {
      res.status(400).json(error)
    }
  }
}
