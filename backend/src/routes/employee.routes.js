import { Router } from "express";
import {
  allEmployees,
  getOneEmployee,
  newEmployee,
  updateEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/new-employee").post(
  //TODO: Add the verifyJwt middleware
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  newEmployee
);

router.route("/allEmployees").get(allEmployees);
router.route("/:id").get(getOneEmployee);
router.route("/:id").put(updateEmployee);

export default router;
