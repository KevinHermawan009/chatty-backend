import mongoose from "mongoose";
import { config } from "./config";

export default ()=>{
    const connect = () =>{
      

        mongoose.connect(config.DATABASE_URL)
        .then(()=>{
            console.log('database connected', config.DATABASE_URL)
        })
        .catch((err)=>{
            console.log(err)
            return process.exit(1);
        })
    };
    connect();
    mongoose.connection.on('disconnected', connect);
}
