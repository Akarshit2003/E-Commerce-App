import mongoose, { connect } from 'mongoose'
import  colors  from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${conn.connection.host}`.bgMagenta.white)

    } catch (error){
        console.log(`Error on MongoDB ${error}`.bgRed.white)
    }
}

export default connectDB;