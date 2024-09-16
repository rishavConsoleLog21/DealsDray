import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "1000kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

//routes use
app.get("/api/v1/", (req, res) => {
  res.send("Welcome to Employee Management System API");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/employees", employeeRoutes);

export { app };
