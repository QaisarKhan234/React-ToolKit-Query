const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./models")
const config = require("./config/db.config")
const userRoutes = require("./routes/user.routes")
const loginRoute = require("./routes/login.routes")

// cors is used to send data from one port to another 
const corsOptions = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

// it allows the db to read data in json formate
app.use(express.json())

app.use(userRoutes)
app.use(loginRoute)
// Atemptting connection to the database
db.mongoose.connect(`mongodb+srv://Users:Users@cluster0.jiv90vd.mongodb.net/Users-Data?retryWrites=true&w=majority`, 
// add these values below from the terminal to remove depreciated warning
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: config.dbName
}) // as it returns promises so if fullfilled then show success else no connection
    .then(() => console.log("connection to the database was successful"))
    .catch((err) => console.log("connection to the database failed", err))
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})
