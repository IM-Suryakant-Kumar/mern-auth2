const sendToken = (user, statusCode, res) => {
    const token = user.createJWTToken()

    const options = {
        expires: new Date( Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000 ),
        secure: true,
        httpOnly: true,
        sameSite: "none"
        
    }

    res.status(statusCode).cookie("token", token, options).json({ sucess: true, user })
}

module.exports = sendToken