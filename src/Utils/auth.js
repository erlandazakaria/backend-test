require('dotenv').config();
import { sign, verify } from "jsonwebtoken";
import { USER_ROLE_WORD } from "./enum";

export const generateAuth = (req) => {
  let isAccessTokenValid = false;
  let auth = null;
  // check access token
  try {
    if(req.headers.token) {
      isAccessTokenValid = verify(req.headers.token.replace("Bearer ", ""), process.env.JWT_SECRET);
    }
  } catch(err) {}

  if(isAccessTokenValid) {
    // send user to context if access token valid
    auth = isAccessTokenValid;
  } 
  
  return auth
}

export const refreshTokenValidation = (token) => {
  let isValid = false;
  let user = null;

  try {
    if(token) {
      isValid = verify(token, process.env.JWT_SECRET);
    }
  } catch(err) {}

  if(isValid) { user = isValid }
  return user
}

export const createToken = (user) => {
  const accessToken = sign({
    _id: user._id, 
    role: user.role,
    name: user.name,
    email: user.email,
  }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d" })
  const refreshToken = sign({
    _id: user._id, 
    role: user.role,
    name: user.name,
    email: user.email,
  }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "7d" });
  
  return {
    accessToken,
    refreshToken
  };
}

export const checkAuth = (auth, permission) => {
  let permissionAllowed;
  switch(permission) {
    case "user":
      permissionAllowed = [USER_ROLE_WORD.USER];
      break;
    default:
      permissionAllowed = [];
      break;
  }

  if(auth && permissionAllowed.includes(auth.role)) {
    return true;
  } else {
    return false;
  }
}
