import * as dotenv from 'dotenv' 
import { connect } from 'mongoose'
dotenv.config()


const dbInit = () =>{
    connect(process.env.DB_URI).then((res)=>{
        console.log("Successfully connected to MongoDB!");
    }).catch((err)=>{
        console.log("Trouble Connecting to MongoDB!", err);
    })
    
}

export default dbInit