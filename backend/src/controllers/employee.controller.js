import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Employee } from "../models/employee.model.js";

//NOTE: Routes to save/create a new employee
const newEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, designation, gender, course } = req.body;

  try {
    if (
      [name, email, phone, designation, gender, course].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "Please provide all required fields");
    }

    if (phone.length !== 10) {
      throw new ApiError(400, "Phone number should be 10 digits");
    }

    // Check if employee with the same email or phone number already exists
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingEmployee) {
      throw new ApiError(
        409,
        "Employee already exists with that email/phone number"
      );
    }

    const imageLocalPath = req.files?.image[0]?.path;

    if (!imageLocalPath) {
      throw new ApiError(400, "Please provide an image");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
      throw new ApiError(500, "Failed to upload image");
    }

    const employee = await Employee.create({
      image: image.url,
      name,
      email,
      phone,
      designation,
      gender,
      course,
    });

    const createdEmployee = await Employee.findById(employee._id);

    if (!createdEmployee) {
      throw new ApiError(500, "Failed to create employee");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdEmployee, "Employee created"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, "Catch :: Failed to create employee");
  }
});

//NOTE: Route to get all employees from the database
const allEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          count: employees.length,
          data: employees,
        },
        "All employees fetched successfully"
      )
    );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, "Catch :: Failed to get employees");
  }
};

export { newEmployee, allEmployees };
