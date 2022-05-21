import UserModel from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";

//function to hash the password
const hashPassword = async (inputPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(inputPassword, salt);
  return hashedPassword;
};

//compare the input password with hashed password in the database
const comparePassword = async (inputPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
};

//create the JWT token
const createJWT = (_id, name) => {
  return jsonwebtoken.sign({ userID: _id, name: name }, process.env.JWT_SECRET);
};

//register controller
export const register = async (req, res) => {
  //TODO: use spread function to create user model
  // const user = await UserModel.create({...req.body});

  const { name, email, password } = req.body;
  const emailExists = await UserModel.findOne({
    email:email
  });
  console.log(emailExists);
  if(emailExists){
    return res.send('Email already exists, try logging in!');
  }
  //create a user from request body
  const user = new UserModel({
    name: name,
    email: email,
    //FIXME: without the await keyword, the function is not working WHY???
    password: await hashPassword(password),
  });
  try {
    const userSaveData = await user.save();
    res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log(`error while saving data ${err}`);
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
  });
  if (!user) {
    return res.send("Wrong email or password");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  console.log(password);
  console.log(user.password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    return res.send("Wrong email or password");
  }

  const token = createJWT(user._id, user.name);
  res.header("auth-token", token).send(token);
};
