import express from "express"
import { config } from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import router from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { globalErrorHandler } from "./middleware/globalError.js";


config();
connectDB();

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(globalErrorHandler);

app.use("/api/users",router)
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.get('/', (req, res) => {res.send('Hello World!')})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {

     console.log(`server is running on http://localhost:${PORT}`)
    })
     