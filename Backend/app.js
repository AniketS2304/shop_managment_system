import express from "express"
import dotenv from "dotenv" 
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from "./routes/orderRoutes.js"
import connectDB from "./db.js"

dotenv.config()
connectDB();

const app =  express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())


app.get('/', (req, res)=> { res.status(200).json({message: "Root here"});  console.log('root')})
//all users routes
app.use('/api/users', userRoutes);

///customers router
app.use('/api/customer',  customerRoutes);
// app.user()
//order routes
app.use('/api/orders',  orderRoutes);


const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`Server Listening On ${port}`)
)