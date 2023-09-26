const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors")
const User = require("../models/User")
const sendToken = require("../utils/jwtToken")

// Register
const register = async (req, res) => {
    const { name, email, password } = req.body

    if(!(name && email && password)) {
        throw new BadRequestError("Please provide all values")
    }

    const user = await User.create({ name, email, password })
    
    sendToken(user, StatusCodes.CREATED, res)
}

// Login
const login = async (req, res) => {
    const { email, password } = req.body

    if(!(email && password)) {
        throw new BadRequestError("Please Provide all values")
    }

    const user = await User.findOne({ email })
    if(!user) {
        throw new UnauthenticatedError("Invalid credentials!")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials!")
    }

    sendToken(user, StatusCodes.OK, res)
    
}

// Logout
const logout = async (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    
    res.status(StatusCodes.OK).json({ success: true, message: "logged out successfully!" })
}

module.exports = {
    register,
    login,
    logout
}