import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
      username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:3,
        index:true,
      },
      email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
      },
      fullname:{
        type:String,
        trim:true,
      },
      password:{
        type:String,
        required:[true,"password is required"],
        minlength:6,

      },
      isEmailVerified:{
          type:Boolean,
          defalut:true,
      },
      refreshToken:{
        type:String,
      },
      forgotPasswordToken:{
            type:String
        },
        forgotPasswordExpiry:{
            type:Date
        },
        emailVerificationToken:{
            type:String
        },
        emailVerificationExpiry:{
            type:Date
        }
    },{
        timestamps:true,
    },
);
userSchema.pre("save", async function(next){
   if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next();
});
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
};
userSchema.methods.generateAccessToken=function(){
  return   jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id
       },
       process.env.REFRESH_TOKEN_SECRET,
       {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  )
}
userSchema.methods.generateTemporaryToken=function(){
    const unHasedToken=crypto.randomBytes(20).toString("hex")
    const hasedToken=crypto
    .createHash("sha256")
    .update(unHasedToken)
    .digest("hex")

    const tokenExpiry=Date.now()+(20*60*1000) //20minute
    return {unHasedToken,hasedToken,tokenExpiry}
};
export const User=mongoose.model("User",userSchema);
