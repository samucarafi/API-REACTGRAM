import express from "express";
const photoRoutes = express.Router();

//Controller
import {
  commentPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  insertPhoto,
  likePhoto,
  updatePhoto,
} from "../controllers/PhotoController.js";
//Middlewares
import {
  commentValidation,
  photoInsertValidation,
  photoUpdateValidation,
} from "../middlewares/photoValidation.js";
import authGuard from "../middlewares/authGuard.js";
import validate from "../middlewares/handleValidation.js";
import imageUpload from "../middlewares/imageUpload.js";
//Routes
photoRoutes.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

photoRoutes.delete("/:id", authGuard, deletePhoto);
photoRoutes.get("/", authGuard, getAllPhotos);
photoRoutes.get("/user/:id", authGuard, getUserPhotos);
photoRoutes.get("/:id", authGuard, getPhotoById);
photoRoutes.put(
  "/:id",
  authGuard,
  photoUpdateValidation(),
  validate,
  updatePhoto
);
photoRoutes.put("/like/:id", authGuard, likePhoto);
photoRoutes.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);
export default photoRoutes;
