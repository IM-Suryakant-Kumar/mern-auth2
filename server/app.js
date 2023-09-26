require("dotenv").config()
require("express-async-errors")
const express = require("express")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connect")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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