import mongoose from "mongoose";
import { config } from "./config";
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default ()=>{
    const connect = () =>{
        mongoose.connect(config.DATABASE_URL!)
        .then(()=>{
           log.info('database connected', config.DATABASE_URL)
        })
        .catch((err)=>{
            log.error(err)
            return process.exit(1);
        })
    };
    connect();
    mongoose.connection.on('disconnected', connect);
}
