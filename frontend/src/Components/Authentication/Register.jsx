import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { signup } from "../../util/http";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const { status } = await signup(formik.values).catch((err) => {
      setErrorMessage(err.response.data);
      setIsLoading(false);
    });
    setIsLoading(false);
    if (status === 200) {
      navigate("/login");
    }
  };

  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "minimum length must be at least 3")
      .max(20, "maximum length must be at least 20"),
    email: string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Password must contain a special character, number and greater than 8 characters and less than 16 characters"
      ),
    rePassword: string()
      .required("RePassword is required")
      .oneOf([ref("password")], "Password and Repassword does not match"),
    phone: string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 m-auto my-5">
        <h1>Register Now:</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className="my-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control mb-3"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}

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

          <label htmlFor="password" className="my-1">
            Password:
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}

          <label htmlFor="rePassword" className="my-1">
            RePassword:
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          )}

          <label htmlFor="phone" className="my-1">
            Phone:
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            maxLength="11"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {!isLoading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main btn-primary text-white px-3 ms-auto d-block"
            >
              Register
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="btn bg-main text-white px-3 ms-auto d-block"
            >
              <i className="fas fa-spin fa-spinner "> </i>
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
