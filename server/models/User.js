const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true,
            unique: true
        },
        password: { 
            type: String, 
            required: true,
            minLength: 6
        }
    },
    { timestamps: true }
)

UserSchema.pre("save", async function () {
    if(!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

UserSchema.methods.createJWTToken = function () {
    return jwt.sign(
        { _id: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

module.exports = mongoose.model("User", UserSchema)