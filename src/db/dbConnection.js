// const mongoose = require("mongoose");

import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const DBConnection =  async () => {

    
    try {
        const DBConnectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database Connected: ${DBConnectionInstance.connection.host}`, );
        
        
    } catch (error) {
        console.error("Databse COnnection Error :", error.message);
        process.exit(1)
    }
    
}

export default DBConnection;