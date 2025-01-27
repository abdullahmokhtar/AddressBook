import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "../Footer/Footer";
// import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      {/* <Toaster /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
