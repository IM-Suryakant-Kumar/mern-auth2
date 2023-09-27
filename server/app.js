require("dotenv").config()
require("express-async-errors")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connect")
const authRouter = require("./routes/auth")

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(cors(corsOptions))

// Routers
app.use("/api/v1/auth", authRouter)

app.get("/", (req, res) => {
    res.status(200).send("Working")
})

// Custom Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 4000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()