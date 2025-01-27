import React, { useEffect, useState, useCallback } from "react";
import {
  getAddressBooks,
  updateAddressBook,
  deleteAddressBook,
} from "../../util/http";
import { Link } from "react-router-dom";
import DeleteButton from "../Layout/DeleteButton ";
import EditForm from "./EditForm";
import { utils, writeFile } from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddressBook = () => {
  const [addressBooks, setAddressBooks] = useState([]);
  const [filters, setFilters] = useState({ search: "", searchDate: null });

  const fetchAddressBooks = useCallback(async () => {
    try {
      const { search, searchDate } = filters;
      const response = await getAddressBooks(search, searchDate);
      setAddressBooks(response);
    } catch (error) {
      console.error("Error fetching AddressBooks:", error.message || error);
    }
  }, [filters]);

  useEffect(() => {
    fetchAddressBooks();
  }, [fetchAddressBooks]);

  // Debounce handler for search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleSearchDate = (date) => {
     if (date) {
       const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
       setFilters((prevFilters) => ({
         ...prevFilters,
         searchDate: formattedDate, // Store just the date
       }));
     } else {
       setFilters((prevFilters) => ({
         ...prevFilters,
         searchDate: null,
       }));
     }
  };

  // Export data to Excel
  const exportHandler = () => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(addressBooks);
    utils.book_append_sheet(workbook, worksheet, "AddressBooks");
    writeFile(workbook, "AddressBooks.xlsx");
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
              value={filters.search}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-6">
            <DatePicker
              selected={filters.searchDate}
              onChange={handleSearchDate}
              dateFormat="MM/dd/yyyy"
              className="form-control"
              placeholderText="Select a date"
            />
          </div>
        </div>

        <div className="col-md-4 text-end">
          <Link to="/create-address-book" className="btn btn-primary me-3">
            Add New Entry
          </Link>
          <button className="btn btn-secondary" onClick={exportHandler}>
            Export to Excel
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Photo</th>
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
            {addressBooks.length > 0 ? (
              addressBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img
                      src={`https://localhost:7260/images/${book.photo}`}
                      alt={book.fullName}
                      className="img-fluid rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{book.fullName}</td>
                  <td>{book.email}</td>
                  <td>{book.mobileNumber}</td>
                  <td>{book.address}</td>
                  <td>{book.jobTitle}</td>
                  <td>{book.department}</td>
                  <td>{book.dob}</td>
                  <td>{book.age}</td>
                  <td>
                    <div className="d-flex">
                      <EditForm
                        onEdit={updateAddressBook}
                        id={book.id}
                        data={book}
                        onSuccess={fetchAddressBooks}
                      />
                      <DeleteButton
                        onDelete={deleteAddressBook}
                        id={book.id}
                        onSuccess={fetchAddressBooks}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Address Books Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressBook;
