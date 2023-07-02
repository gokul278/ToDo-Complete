require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose')

const routes = require("./routes/TaskRoutes")

const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({origin : "https://todo-complete-u6dv.onrender.com/"}))

app.use('/',routes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("DB Connected & Listening PORT 8000....!");
    })
})

.catch((error)=>{
    console.log(error);
})
