import mongoose from "mongoose";

export default ()=>{
    const connect = () =>{
      

        mongoose.connect('mongodb+srv://chatty-backend.kikn1pw.mongodb.net/Chatty-Backend')
        .then(()=>{
            console.log('database connected')
        })
        .catch((err)=>{
            console.log(err)
            return process.exit(1);
        })
    };
    connect();
    mongoose.connection.on('disconnected', connect);
}
