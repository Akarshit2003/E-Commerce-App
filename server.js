import express from 'express';
import colors  from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors';
import productRoute from './routes/productRoutes.js'

// configure env
dotenv.config();

//data base config
connectDB();

//rest Object
const app = express()

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoute);

//rest api
app.get('/', function (req, res) {
  res.send("<h1>Hello World</h1>")
})

const PORT = process.env.PORT || 8080; 

app.listen(PORT,function(){
  console.log(`Server Running on ${process.env.DEV_MODE} from MODE ${PORT}`.bgBlue.white) 
});