import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]); // Initialize as an empty array
  const [image, setImage] = useState("");

  const handleImageValidation = (e) => {
    const file = e.target.files[0];

    // Validate file size (100 KB = 100 * 1024 bytes)
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/employees/${id}`)
      .then((res) => {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPhone(res.data.data.phone);
        setDesignation(res.data.data.designation);
        setGender(res.data.data.gender);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  const handleEditEmployee = () => {
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
      course.length === 0
    ) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    axios
      .put(`http://localhost:5000/api/v1/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        toast.success("Employee updated successfully");
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4 font-semibold bg-yellow-400">
        Edit Employee
      </h1>
      <BackButton />
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-2">
          <label className="text-xl mr-4 text-slate-600">Name</label>
          <input
            type="text"
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="my-2">
          <label className="text-xl mr-4 text-slate-600">Email📧</label>
          <input
            type="email"
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-2">
          <label className="text-xl mr-4 text-slate-600">Phone📞</label>
          <input
            type="number"
            className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="my-2">
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
        <div className="my-2">
          <label className="text-xl mr-4 text-slate-600">Gender🚹/🚺</label>
          <div>
            <label className="mr-2 text-blue-500">
              <input
                type="radio"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.value)}
                required
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
        <div className="my-2">
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
                required
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
        <div className="my-2">
          <label className="text-xl mr-4 text-slate-600">Image</label>
          <input
            type="file"
            accept=".jpg, .png"
            onChange={handleImageValidation}
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="flex mt-2 w-32 h-32 object-cover rounded-lg items-center justify-center bg-gray-100 border-2 border-gray-200 p-2 mx-auto overflow-hidden"
            />
          )}
        </div>
        <div
          className="
        flex
        justify-center
        items-baseline
        gap-x-4
        mt-4
        bg-gray-100
        p-4
        rounded-lg
        border-2
        border-gray-200
        
        "
        >
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-500"
            onClick={handleEditEmployee}
          >
            Save Employee
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-700 transition-colors duration-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
