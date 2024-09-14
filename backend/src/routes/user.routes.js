import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  //NOTE: Change single to field is not working
  upload.single({
    name: "avatar",
    maxCount: 1,
  }),
  registerUser
);

export default router;
