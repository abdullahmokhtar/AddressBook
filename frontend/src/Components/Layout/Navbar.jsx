import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUserIsLoggedIn(false);
    Cookies.remove("token");
    navigate("/login", { replace: true });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userIsLoggedIn && (
            <ul className="navbar-nav fw-bold m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/departments" className="nav-link">
                  Departments
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/job-titles" className="nav-link">
                  Job Titles
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/address-books" className="nav-link">
                  Address Books
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!userIsLoggedIn && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            {!userIsLoggedIn && (
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            )}
            {userIsLoggedIn && (
              <li className="nav-item">
                <span onClick={logout} className="nav-link" role="button">
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
