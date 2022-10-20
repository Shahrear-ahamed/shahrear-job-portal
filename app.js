const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express();

// import routers file
const jobsRouter = require("./routers/jobs.router")
const managerRouter = require("./routers/manager.router")
const userRouter = require("./routers/user.router")

app.use(express.json())
app.use(cors())

// router are here

app.use("/api/v1/jobs", jobsRouter)
app.use("/api/v1/manager/jobs", managerRouter)
app.use("/api/v1/user", userRouter)

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/template/home.html"))
})

module.exports = app
