import React, { useState, useEffect } from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import {
  getDepartments,
  getJobTitles,
  updateAddressBook,
} from "../../util/http";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditForm = ({ onEdit, id, onSuccess, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch options on component mount
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [jobTitles, departments] = await Promise.all([
        getJobTitles(),
        getDepartments(),
      ]);
      setJobTitleOptions(jobTitles);
      setDepartmentOptions(departments);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const validationSchema = object({
    fullName: string()
      .required("Name is required")
      .min(3, "Minimum length must be at least 3"),
    jobTitleId: string().required("Job Title is required"),
    departmentId: string().required("Department is required"),
    address: string().required("Address is required"),
    email: string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    mobileNumber: string()
      .required("Mobile Number is required")
      .matches(/^(01)[0125][0-9]{8}$/i, "Invalid Mobile Number"),
    dob: string().required("Date of Birth is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...data,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        await updateAddressBook(id, values);
        setIsOpen(false);
        await onSuccess();
      } catch (err) {
        if (err.response?.status === 400) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage(
            err.response?.status === 401
              ? "You must log in before making changes."
              : "Something went wrong. Please try again."
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="d-inline-block me-3">
      <button onClick={() => setIsOpen(true)} className="btn btn-success">
        Edit
      </button>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div className="bg-white col-4 rounded p-4 shadow-lg">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="fullName" className="my-1">
                Full Name:
              </label>
              <input
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                type="text"
                name="fullName"
                id="fullName"
                className="form-control mb-3"
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <div className="alert alert-danger">
                  {formik.errors.fullName}
                </div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="jobTitleId">Job Title</label>
                  <select
                    name="jobTitleId"
                    id="jobTitleId"
                    className="form-control mb-3"
                    onChange={formik.handleChange}
                    value={formik.values.jobTitleId}
                  >
                    <option value="">-- Select Job Title --</option>
                    {jobTitleOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.jobTitleId && formik.touched.jobTitleId && (
                    <div className="alert alert-danger">
                      {formik.errors.jobTitleId}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="departmentId">Department</label>
                  <select
                    name="departmentId"
                    id="departmentId"
                    className="form-control mb-3"
                    onChange={formik.handleChange}
                    value={formik.values.departmentId}
                  >
                    <option value="">-- Select Department --</option>
                    {departmentOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.departmentId &&
                    formik.touched.departmentId && (
                      <div className="alert alert-danger">
                        {formik.errors.departmentId}
                      </div>
                    )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="email" className="my-1">
                    Email:
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control mb-3"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="alert alert-danger">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="mobileNumber" className="my-1">
                    Mobile Number:
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    className="form-control mb-3"
                  />
                  {formik.errors.mobileNumber &&
                    formik.touched.mobileNumber && (
                      <div className="alert alert-danger">
                        {formik.errors.mobileNumber}
                      </div>
                    )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="dob" className="my-1">
                    Date of Birth:
                  </label>
                  <DatePicker
                    selected={new Date(formik.values.dob)}
                    onChange={(date) =>
                      formik.setFieldValue(
                        "dob",
                        date.toISOString().split("T")[0]
                      )
                    }
                    dateFormat="yyyy-MM-dd"
                    className="form-control mb-3"
                  />
                  {formik.errors.dob && formik.touched.dob && (
                    <div className="alert alert-danger">
                      {formik.errors.dob}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="address" className="my-1">
                    Address:
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    type="text"
                    name="address"
                    id="address"
                    className="form-control mb-3"
                  />
                  {formik.errors.address && formik.touched.address && (
                    <div className="alert alert-danger">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
              </div>

              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <div className="d-flex">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-secondary me-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn px-3 ms-auto ${
                    isLoading
                      ? "bg-main text-white"
                      : "bg-main bg-primary text-white"
                  }`}
                  disabled={isLoading || !(formik.isValid && formik.dirty)}
                >
                  {isLoading ? (
                    <i className="fas fa-spin fa-spinner"></i>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditForm;
