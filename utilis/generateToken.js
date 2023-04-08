import jwt from "jsonwebtoken";

const generateToken = (id) => {
  console.log( process.env.TOKEN_KEY,process.env.TOKEN_EXPIRES )
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });
};

export default generateToken;