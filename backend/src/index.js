import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port: ${process.env.PORT || 5000}`);
    });
    app.on("Error", (error) => {
      console.log("Error While connecting MongoDB", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error", error);
  });
