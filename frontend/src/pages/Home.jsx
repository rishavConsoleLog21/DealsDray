import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Change items per page as per your requirement
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/v1/employees");
        setEmployees(res.data.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Sorting
  const sorting = (col) => {
    if (sortOrder === "asc") {
      const sortedEmployees = [...employees].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setEmployees(sortedEmployees);
      setSortOrder("desc");
    }
    if (sortOrder === "desc") {
      const sortedEmployees = [...employees].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setEmployees(sortedEmployees);
      setSortOrder("asc");
    }
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl py-4 text-blue-600 text-center font-bold uppercase tracking-wider">
          Employee Lists
        </h1>
        <h2 className="text-xl text-blue-600 my-8">
          Total Employees: {filteredEmployees.length}
        </h2>
        <Link to="/employees/create">
          <MdOutlineAddBox className="text-4xl text-emerald-600" />
        </Link>
      </div>
      <div className="flex justify-end items-center gap-x-4 mr-2">
        <input
          type="text"
          placeholder="Search Employee"
          className="p-2 border border-slate-600 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />
      {loading ? (
        <Spinner />
      ) : (
        // Add Search option
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="bg-slate-300">
              <th
                onClick={() => sorting("_id")}
                className="border border-slate-600 rounded-md hover:cursor-pointer"
              >
                Unique ID
              </th>
              <th className="border border-slate-600 rounded-md">Image</th>
              <th
                onClick={() => sorting("name")}
                className="border border-slate-600 rounded-md max-md:hidden hover:cursor-pointer"
              >
                Name
              </th>
              <th
                onClick={() => sorting("email")}
                className="border border-slate-600 rounded-md hover:cursor-pointer"
              >
                Email Id
              </th>
              <th className="border border-slate-600 rounded-md">Mobile No</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Designation
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Gender
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Course
              </th>
              <th
                onClick={() => sorting("createdAt")}
                className="border border-slate-600 rounded-md max-md:hidden hover:cursor-pointer"
              >
                Created At
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2 flex justify-center">
                  {employee._id}
                </td>
                <td className="border border-slate-700 rounded-md py-0">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2 flex justify-center">
                  {employee.name}
                </td>
                <td className="border border-slate-700 rounded-md py-2">
                  {employee.email}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2 flex justify-center">
                  {employee.phone}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2">
                  {employee.designation}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2 flex justify-center">
                  {employee.gender}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2">
                  {employee.course}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2 flex justify-center">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden py-2">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/employees/details/${employee._id}`}>
                      <BsInfoCircle className="text-2xl text-blue-600 mx-2" />
                    </Link>
                    <Link to={`/employees/edit/${employee._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-300 mx-2" />
                    </Link>
                    <Link to={`/employees/delete/${employee._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600 mx-2" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Pagination */}
      <ul className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredEmployees.length / itemsPerPage) },
          (_, i) => (
            <li key={i} className="mx-1">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Home;
