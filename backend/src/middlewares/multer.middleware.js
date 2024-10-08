//middelware: if you are going somewhere meet me and then go
import multer from "multer";
import { nanoid } from "nanoid/non-secure";

const id = nanoid();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + id);
  },
});

export const upload = multer({
  storage,
});
