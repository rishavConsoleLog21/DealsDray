import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const empolyeeSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exists"],
    },
    designation: { type: String, required: [true, "Designation is required"] },
    gender: { type: String, required: [true, "Gender is required"] },
    course: { type: String, required: [true, "Course is required"] },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/consolelog21/image/upload/v1726514028/dealsDray/binkcjqscu9foekzccir.png",
    },
  },
  {
    timestamps: true,
  }
);

empolyeeSchema.plugin(paginate);

export const Employee = mongoose.model("Employee", empolyeeSchema);
