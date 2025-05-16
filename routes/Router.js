import express from "express";
import userRoutes from "./UserRoutes.js";
import photoRoutes from "./PhotoRoutes.js";
const router = express();

router.use("/api/users", userRoutes);
router.use("/api/photos", photoRoutes);
//test route
router.get("/", (req, res) => {
  res.send("API Working!");
});

export default router;
