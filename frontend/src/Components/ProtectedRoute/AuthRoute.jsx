import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function AuthRoute({ children }) {
  const { userIsLoggedIn } = useContext(AuthContext);
  if (userIsLoggedIn && Cookies.get("token")) {
    return <Navigate  to="/home"/>;
  } else {
    return children;
  }
}

export default AuthRoute;
