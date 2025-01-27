import React, { useEffect, useState } from "react";
import { getDepartments,updateDepartment, deleteDepartment } from "../../util/http";
import { Link } from "react-router-dom";
import DeleteButton from "../Layout/DeleteButton ";
import PopupForm from "../Layout/PopupForm";
const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

 

  return (
    <div>
      <h1>Departments</h1>
      <Link to="/create-department" className="btn btn-primary my-5">
        Add New Entry
      </Link>
      <table className="table table-primary">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>
                <input
                  className="form-control bg-secondary text-white"
                  type="text"
                  value={department.name}
                  readOnly
                />
              </td>
              <td className="text-end">
                <PopupForm onEdit={updateDepartment} id={department.id} onSuccess={fetchDepartments} />
                <DeleteButton
                  onDelete={deleteDepartment}
                  id={department.id}
                  onSuccess={fetchDepartments}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
