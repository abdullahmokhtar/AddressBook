import React, { useEffect, useState } from "react";
import {
  getAddressBooks,
  updateAddressBook,
  deleteAddressBook,
} from "../../util/http";
import { Link } from "react-router-dom";
import DeleteButton from "../Layout/DeleteButton ";
import EditForm from "./EditForm";
import { utils, writeFile } from "xlsx";

const AddressBook = () => {
  const [addressBooks, setAddressBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchAddressBooks();
  }, []);

  const fetchAddressBooks = async (search, searchDate) => {
    try {
      const response = await getAddressBooks(search, searchDate);
      setAddressBooks(response);
    } catch (error) {
      console.error("Error fetching AddressBooks:", error);
    }
  };

  const handelSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== undefined) {
      fetchAddressBooks(search);
    }
  };

  const handelSearchDate = (e) => {
    setSearchDate(e.target.value);
    if (e.target.value !== undefined) {
      fetchAddressBooks(null, searchDate);
    }
  };

  const exportHandler = () => {
    var wb = utils.book_new();
    var ws = utils.json_to_sheet(addressBooks);

    utils.book_append_sheet(wb, ws, "AddressBooks");

    writeFile(wb, "AddressBooks.xlsx");
  };

  return (
    <div>
      <h1>Address Books</h1>
      <div className="row justify-content-between my-5">
        <div className="col-md-8 row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onChange={handelSearch}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              onChange={handelSearchDate}
            />
          </div>
        </div>

        <div className="col-md-4 text-end">
          <Link to="/create-Address-book" className="btn btn-primary me-3">
            Add New Entry
          </Link>
          <button className="btn btn-secondary" onClick={exportHandler}>
            Export to excel
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-primary table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addressBooks.map((addressBook) => (
              <tr key={addressBook.id}>
                <td>{addressBook.fullName}</td>
                <td className="text-truncate">{addressBook.email}</td>
                <td>{addressBook.mobileNumber}</td>
                <td>{addressBook.address}</td>
                <td>{addressBook.jobTitle}</td>
                <td>{addressBook.department}</td>
                <td>{addressBook.dob}</td>
                <td>{addressBook.age}</td>
                <td>
                  <EditForm
                    onEdit={updateAddressBook}
                    id={addressBook.id}
                    data={addressBook}
                    onSuccess={fetchAddressBooks}
                  />
                  <DeleteButton
                    onDelete={deleteAddressBook}
                    id={addressBook.id}
                    onSuccess={fetchAddressBooks}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressBook;
