import React, { useEffect, useState } from "react";
import { getJobTitles, updateJobTitle, deleteJobTitle } from "../../util/http";
import { Link } from "react-router-dom";
import DeleteButton from "../Layout/DeleteButton ";
import PopupForm from "../Layout/PopupForm";
const JobTitle = () => {
  const [JobTitles, setJobTitles] = useState([]);

  useEffect(() => {
    fetchJobTitles();
  }, []);

  const fetchJobTitles = async () => {
    try {
      const response = await getJobTitles();
      setJobTitles(response);
    } catch (error) {
      console.error("Error fetching JobTitles:", error);
    }
  };

  return (
    <div>
      <h1>JobTitles</h1>
      <Link to="/create-Job-title" className="btn btn-primary my-5">
        Add New Entry
      </Link>
      <table className="table table-primary">
        <thead>
          <tr>
            <th>JobTitle Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {JobTitles.map((JobTitle) => (
            <tr key={JobTitle.id}>
              <td>
                <input
                  className="form-control bg-secondary text-white"
                  type="text"
                  value={JobTitle.name}
                  readOnly
                />
              </td>
              <td className="text-end">
                <PopupForm
                  onEdit={updateJobTitle}
                  id={JobTitle.id}
                  onSuccess={fetchJobTitles}
                />
                <DeleteButton
                  onDelete={deleteJobTitle}
                  id={JobTitle.id}
                  onSuccess={fetchJobTitles}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTitle;
