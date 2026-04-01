import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: [true, "Username aleady taken, Try diffferent"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      url: "", // cloudanary URL
      required: true,
    },
    acoverImage: {
      type: String,
      url: "", // cloudanary URL
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: string,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next){

    if (!this.isModified("password")) return next();

     this.password = bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.ispasswordCorrect = async function(password){

    return await bcrypt.compare(password , this.password);
}


userSchema.methods.generateAccessToken =  function(){

   return  jwt.sign(
        {
            id :  this._id,
            userName: this.userName,
            email: this.email,
            fullname:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    
    )

}
userSchema.methods.generateRefreshToken =  function(){

       return  jwt.sign(
        {
            id :  this._id,
            
        },
        process.env.REFRESH_TOKEN_SCERET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    
    )

}

export const User = mongoose.model("User", userSchema);
