import express from "express";

const userRoutes = express.Router();

//Controller
import {
  getCurrentUser,
  getUserById,
  login,
  register,
  update,
} from "../controllers/userController.js";

//middleware
import validate from "../middlewares/handleValidation.js";
import {
  loginValidation,
  userCreateValidation,
  userUpdateValidation,
} from "../middlewares/userValidations.js";
import authGuard from "../middlewares/authGuard.js";
import imageUpload from "../middlewares/imageUpload.js";

//Routes
userRoutes.post("/register", userCreateValidation(), validate, register);
userRoutes.post("/login", loginValidation(), validate, login);
userRoutes.get("/profile", authGuard, getCurrentUser);
userRoutes.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
userRoutes.get("/:id", getUserById);
export default userRoutes;
