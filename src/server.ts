import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server : Server


const startServer = async()=> {
  try {
    
    await mongoose.connect(envVars.DB_URL)


    // await mongoose.connect("mongodb+srv://touradmin:tourAdmin@cluster0.n0rkl.mongodb.net/digital-wallet-system-backend?retryWrites=true&w=majority&appName=Cluster0  ")

    console.log("connected to MongoDb database")
  
    // server = app.listen(5000, () => {
    //   console.log("Server is running on port 5000");
    // });

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
    

  } catch (error) {
     
    console.log(error)
  }
}
(async() => {
  await startServer();
})();