import { Router } from "express";
import {
  allEmployees,
  deleteEmployee,
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

router.route("").get(allEmployees);
router.route("/:id").get(getOneEmployee);
router.route("/:id").put(updateEmployee);
router.route("/:id").delete(deleteEmployee);

export default router;
