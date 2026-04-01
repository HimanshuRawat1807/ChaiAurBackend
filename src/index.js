import dotenv from "dotenv" 

import express from "express"
// const express = require("express");
import DBConnection from "./db/dbConnection.js";
// const DBConnection = require("./db/dbConnection");

const app = express();

const PORT = process.env.PORT || 8000;

dotenv.config({
  path:"./.env"
})


DBConnection()
.then(()=>{
  const server = app.listen(PORT,() => {
    console.log("Server is running on PORT :", PORT );
    
  })

  server.on("error",(error)=>{
    console.log("Sever Error: ", error);
    
  })
})











/*
*****************************************

mongoose.connect(process.env.MONGODB_URI)

  (async()=>{

   try {

     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

     app.on('error',(error)=>{
      console.log("Error :", error);
      throw error;
      
     });
    
     app.listen(process.env.PORT,()=>{
      console.log(`Server is running on PORT : ${process.env.PORT}`);
      
     });

    
   } catch (error) {
        console.error("ERROR :", error);
        throw new Error("Database Connection Error");
        
        
   }


  })()

  */