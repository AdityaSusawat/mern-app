import bcrypt from "bcrypt"; //allows us to encrypt our password
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  //req: request we get from the frontend, res: response we send to the frontend (express provides this by default); it has to be async because we will be calling the mongoDB
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(); //generates a random salt
    const passwordHash = await bcrypt.hash(password, salt); //use the generated salt to hash and encrypt the password
    //1. encrypt the password and save it
    //2. when user tries to login, they provide the password, we provide the salt, if the result matches the saved encrypted password then
    //3. we give them a json web token

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //res is provided by express ; Send the user back if no errors occur ; 201 says something has been created
  } catch (err) {
    res.status(500).json({ error: err.message }); //will return whatever error mongoDB sends
  }
};

/* LOGGING IN */ //not very secure
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; //email and password received from frontend
    const user = await User.findOne({ email: email }); //use mongoose to find the one that has the specified email
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password); //uses the same salt to check if their hashes are equal
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
