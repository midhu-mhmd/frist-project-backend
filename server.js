import express from "express"
import { config } from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import router from "./routes/userRoutes.js";

config();
connectDB();

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/users",router)

app.get('/', (req, res) => {res.send('Hello World!')})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {

     console.log(`server is running on http://localhost:${PORT}`)
    })
     