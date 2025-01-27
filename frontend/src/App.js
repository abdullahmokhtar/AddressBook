import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AuthRoute from "./Components/ProtectedRoute/AuthRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import AuthContextProvider from "./context/AuthContext";
import Department from "./Components/Departments/Department";
import CreateDepartment from "./Components/Departments/CreateDepartment";
import JobTitle from "./Components/JobTitles/JobTitle";
import CreateJobTitle from "./Components/JobTitles/CreateJobTitle";
import AddressBook from "./Components/AddressBooks/AddressBook";
import CreateAddressBook from "./Components/AddressBooks/CreateAddressBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Navigate to="home" /> },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <h1>Home Page</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <Register />
          </AuthRoute>
        ),
      },
      {
        path: "departments",
        element: (
          <ProtectedRoute>
            <Department />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-department",
        element: (
          <ProtectedRoute>
            <CreateDepartment />
          </ProtectedRoute>
        ),
      },
      {
        path: "job-titles",
        element: (
          <ProtectedRoute>
            <JobTitle />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-Job-title",
        element: (
          <ProtectedRoute>
            <CreateJobTitle />
          </ProtectedRoute>
        ),
      },
      {
        path: "address-books",
        element: (
          <ProtectedRoute>
            <AddressBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-Address-book",
        element: (
          <ProtectedRoute>
            <CreateAddressBook />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <h1>Page Not Found</h1> }, // Default route if no other matches
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
