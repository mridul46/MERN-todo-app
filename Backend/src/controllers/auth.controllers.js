import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/User.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import bcrypt from "bcrypt"; 


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    console.log("generateAccessAndRefreshTokens called with userId:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found in DB");
      throw new ApiError(404, "User not found while generating tokens");
    }

    console.log("ENV ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
    console.log("ENV REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation failed:", error.message);
    throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
  }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  

  // Create new user
  const user = await User.create({
    fullname,
    email,
    password,
    username,
    // isEmailVerified: false,
  });
   // If you want to generate tokens after registration:
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  return res.status(201).json(
    new ApiResponse(
      201,
      {  accessToken, refreshToken, user }, // you can also include tokens if you want
      "User registered successfully"
    )
  );
});



const login = asyncHandler(async (req, res) => {
  const {username,password } = req.body
   console.log("Incoming Body:", req.body);
  // find user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(409, "Incorrect username");
  }

  // compare password securely
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(409, "Incorrect password");
  }
  const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id)
  
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  
 const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ only secure in production
  sameSite: "lax"
};

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
      200,{
        user: loggedInUser,
        accessToken,
        refreshToken
      },
      "User logged in successfully."
    )
  )
});

const getProfile = asyncHandler(async (req, res) => {
  const user = req.user; 

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      { accessToken, refreshToken, user },
      "getProfile successful"
    )
  );
});
const logout = asyncHandler(async (req, res) => {
  // Clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only in https
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "User logged out successfully")
  );
});

export {
  registerUser,
  generateAccessAndRefreshTokens,
  login,
  getProfile,logout
};
