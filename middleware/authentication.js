import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'
const verifyUser = async (req, res, next) => {
  const token = req.header("Authorization").split(" ");
  console.log(token[1]);
  if (!token) {
    return res.status(401).send("Access-Denied");
  }

  try {
    const payload = jsonwebtoken.verify(token[1], process.env.JWT_SECRET);
    req.user = {
        userID: payload.userID,
        name: payload.name,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid token");
  }
}

export default verifyUser;
