export const obtainToken = (req) => {
  const headerInfo = req.headers;
  const token = headerInfo["authorization"].split(" ")[1];
  // console.log(token);
  if (!token) {
    return "token not found";
  } else {
    return token;
  }
};