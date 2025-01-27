import { useFormik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { signIn } from "../../util/http";

const Login = () => {
  const { setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const { data, status } = await signIn(formik.values).catch((err) => {
      setErrorMessage("email or password incorrect");
      setIsLoading(false);
    });
    setIsLoading(false);
    if (status === 200) {
      setUserIsLoggedIn(true);
      Cookies.set("token", data?.token, { expires: 1 });
      navigate("/home", { replace: true });
    }
  };

  const validationSchema = object({
    email: string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <Helmet>Login</Helmet>
      <div className="w-75 m-auto my-5">
        <h1>Login Now:</h1>
        <form onSubmit={formik.handleSubmit}>
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
                Login
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
};

export default Login;
