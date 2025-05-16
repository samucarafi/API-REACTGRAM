import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

//register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(422).json({
      errors: ["Por favor, utilize outro e-mail"],
    });
    return;
  }
  //Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  //If user was created successfully, return the token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Sign user in
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  //Check if password matches
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(422).json({ errors: ["Senha inválida."] });
    return;
  }

  //Return user with token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

//get current logged in user
const getCurrentUser = async (req, res) => {
  //user foi inserido no middleware authGuard
  const user = req.user;

  res.status(200).json(user);
};

//update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;
  let profileImage = null;
  if (req.file) {
    profileImage = req.file.filename;
  }
  const reqUser = req.user;
  const user = await User.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }
  if (password) {
    //Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  //atualizar no banco
  await user.save();

  res.status(200).json(user);
};

//Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    //Check if user exists
    if (!user) {
      res.status(422).json({ errors: ["Usuário não encontrado1"] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    // se o id não tiver no padrão do mongodb cai aqui
    res.status(422).json({ errors: ["Usuário não encontrado"] });
    return;
  }
};

export { register, login, getCurrentUser, update, getUserById };
