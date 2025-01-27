import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { object, string } from "yup";
import { createDepartment } from "../../util/http";
import { useNavigate } from "react-router-dom";

function CreateDepartment() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const { status } = await createDepartment(formik.values).catch((err) => {
      setErrorMessage(err);
      setIsLoading(false);
    });
    setIsLoading(false);
    if (status === 200) {
      navigate("/departments", { replace: true });
    }
  };

  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "minimum length must be at least 3"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: submit,
  });
  return (
    <>
      <Helmet>Department</Helmet>
      <div className="w-75 m-auto my-5">
        <h1>Create Department:</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className="my-1">
            name:
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            type="name"
            name="name"
            id="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}

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

export default CreateDepartment;
