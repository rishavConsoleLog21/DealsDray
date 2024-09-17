import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]); // Initialize as an empty array
  const [image, setImage] = useState("");

  const handleLimitPhoneNumber = (e) => {
    const value = e.target.value;
    // Allow only numbers and restrict the length to 10 digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleImageValidation = (e) => {
    const file = e.target.files[0];

    // Validate file size (100 KB = 20 * 1024 bytes)
    if (file && file.size > 100 * 1024) {
      alert("File size exceeds 20 KB. Please select a smaller file.");
      return; // Exit if the file is too large
    }

    // If file size is within the limit, proceed to read the file
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set image data URL
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEmployee = () => {
    const data = {
      name,
      email,
      phone,
      designation,
      gender,
      course: course.join(", "),
      image,
    };
    setLoading(true);
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      designation === "" ||
      gender === "" ||
      course.length === 0 ||
      image === ""
    ) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number should be 10 digits");
      setLoading(false);
      return;
    }

    axios
      .post("http://localhost:5000/api/v1/employees/new-employee", data)
      .then(() => {
        setLoading(false);
        toast.success("Employee added successfully");
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-semibold">Add New Employee</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Name</label>
          <input
            type="text"
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Email📧</label>
          <input
            type="email"
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Phone📞</label>
          <input
            type="text"
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            value={phone}
            onChange={handleLimitPhoneNumber}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Designation</label>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Gender🚹/🚺</label>
          <div>
            <label className="mr-2 text-blue-500">
              <input
                type="radio"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.value)}
              />
              M
            </label>
            <label className="mr-2 text-pink-500">
              <input
                type="radio"
                value="F"
                checked={gender === "F"}
                onChange={(e) => setGender(e.target.value)}
              />
              F
            </label>
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Course</label>
          <div>
            <label className="mr-2">
              <input
                type="checkbox"
                value="MCA"
                checked={course.includes("MCA")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCourse([...course, "MCA"]);
                  } else {
                    setCourse(course.filter((c) => c !== "MCA"));
                  }
                }}
              />
              MCA
            </label>
            <label className="mr-2">
              <input
                type="checkbox"
                value="BCA"
                checked={course.includes("BCA")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCourse([...course, "BCA"]);
                  } else {
                    setCourse(course.filter((c) => c !== "BCA"));
                  }
                }}
              />
              BCA
            </label>
            <label className="mr-2">
              <input
                type="checkbox"
                value="BSC"
                checked={course.includes("BSC")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCourse([...course, "BSC"]);
                  } else {
                    setCourse(course.filter((c) => c !== "BSC"));
                  }
                }}
              />
              BSC
            </label>
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-600">Image</label>
          <input
            type="file"
            accept=".jpg, .png"
            onChange={handleImageValidation}
            required
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="flex mt-2 w-32 h-32 object-cover rounded-lg items-center justify-center bg-gray-100 border-2 border-gray-200 p-2 mx-auto overflow-hidden"
            />
          )}
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSaveEmployee}
        >
          Save Employee
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;
