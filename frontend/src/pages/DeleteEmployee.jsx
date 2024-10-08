import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DeleteEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handelDeleteEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/v1/employees/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("Employee deleted successfully");
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
      <h1 className="text-3xl my-4">Delete Employee</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h2 className="text-2xl ">Sure Want to Delete This Employee ?</h2>
        <button
          className="p-4 bg-red-600 text-white m-4 w-fit hover:bg-red-700 rounded-xl transition duration-500"
          onClick={handelDeleteEmployee}
        >
          Yes, Delete Employee
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;