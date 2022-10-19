const mongoose = require("mongoose")
const colors = require("colors")
const env = require("dotenv").config()
const app = require("./app")
const port = process.env.PORT || 5000

// database running here
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.rehmmti.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri).then(() => {
    console.log("Mongodb connected in mongodb atlas ".bgBlack.yellow.bold)
})

// server running from here
app.listen(port, () => {
    console.log(`Server is running in ${port}`.bgBlack.red.bold)
})