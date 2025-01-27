import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { object, string } from "yup";
import { createAddressBook, getDepartments } from "../../util/http";
import { useNavigate } from "react-router-dom";
import { getJobTitles } from "../../util/http";
function CreateAddressBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobTitleOptions();
    fetchDepartmentOptions();
  }, []);

  const fetchJobTitleOptions = async () => {
    try {
      const response = await getJobTitles();
      setJobTitleOptions(response);
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
  };

  const fetchDepartmentOptions = async () => {
    try {
      const response = await getDepartments();
      setDepartmentOptions(response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const submit = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("fullName", formik.values.fullName);
      formData.append("jobTitleId", formik.values.jobTitleId);
      formData.append("departmentId", formik.values.departmentId);
      formData.append("mobileNumber", formik.values.mobileNumber);
      formData.append("dob", formik.values.dob);
      formData.append("address", formik.values.address);
      formData.append("password", formik.values.password);
      formData.append("email", formik.values.email);

      // Append the photo file (ensure it's not null or undefined)
      if (formik.values.photo instanceof File) {
        formData.append("photo", formik.values.photo);
      }

      const response = await createAddressBook(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        navigate("/address-books", { replace: true });
      }
    } catch (err) {
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = object({
    fullName: string()
      .required("Name is required")
      .min(3, "minimum length must be at least 3"),
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
      .matches(/(01)[0125][0-9]{8}/i, "Invalid Mobile Number"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema,
    onSubmit: submit,
  });
  return (
    <>
      <Helmet>Address Book</Helmet>
      <div className="w-75 m-auto my-5">
        <h1>Create Address Book:</h1>
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
            <div className="alert alert-danger">{formik.errors.fullName}</div>
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
                {formik.errors.departmentId && formik.touched.departmentId && (
                  <div className="alert alert-danger">
                    {formik.errors.departmentId}
                  </div>
                )}
              </select>
            </div>
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
                <div className="alert alert-danger">{formik.errors.email}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="mobileNumber" className="my-1">
                MobileNumber:
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
              {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                <div className="alert alert-danger">
                  {formik.errors.mobileNumber}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="dob" className="my-1">
                Date of Birth:
              </label>
              <input
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                onChange={formik.handleChange}
                type="date"
                name="dob"
                id="dob"
                className="form-control mb-3"
              />
              {formik.errors.dob && formik.touched.dob && (
                <div className="alert alert-danger">{formik.errors.dob}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="photo" className="my-1">
                Photo:
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue("photo", event.currentTarget.files[0]);
                }}
                type="file"
                name="photo"
                id="photo"
                className="form-control mb-3"
              />
              {formik.errors.photo && formik.touched.photo && (
                <div className="alert alert-danger">{formik.errors.photo}</div>
              )}
            </div>
            <div className="col-md-12">
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
            {!isLoading ? (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main bg-primary text-white px-3 ms-auto d-block"
              >
                Save
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="btn bg-main text-white px-3 ms-auto d-block"
              >
                <i className="fas fa-spin fa-spinner"> </i>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAddressBook;
