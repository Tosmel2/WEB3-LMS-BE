import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.Token_Key, (error, decoded) => {
    if (error) {
      return false;
    } else {
      return decoded;
    }
  });
};