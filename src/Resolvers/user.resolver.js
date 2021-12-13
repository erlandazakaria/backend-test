require('dotenv').config();
import UserModel from "../Models/user.model";
import { checkAuth, createToken, refreshTokenValidation } from "../Utils/auth";

// QUERY
export const login = async (root, args, { auth }, info) => {
  try {
    const { email, password } = args;

    const userData = await UserModel.find({email, status: 1}).exec();
    if(userData.length > 0) {
      const checkUser = userData.find(data => data.password === password);
      if(checkUser) {
        const token = createToken(checkUser);
        return token;
      } else {
        return { message: "Wrong Password" };  
      }
    }
    return { message: "Email not Registered" };
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};

export const refreshToken = async (root, args, { auth }, info) => {
  try {
    const { token } = args;
    const user = refreshTokenValidation(token);
    if(user) {
      const newToken = createToken(user);
      return newToken;
    } else {
      return {
        accessToken: null,
        refreshToken: null
      }
    }

  } catch(err) {
    console.log(err);
  }
}

export const updateToken = async (root, args, { auth }, info) => {
  try {
    const { _id } = auth;
    const user = await UserModel.findById(_id).exec();
    if(user) {
      const newToken = createToken(user);
      return newToken;
    } else {
      return {
        accessToken: null,
        refreshToken: null
      }
    }

  } catch(err) {
    console.log(err);
  }
}
