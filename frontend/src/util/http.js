// import axios from "axios";
import axios from "axios";
import Cookies from "js-cookie";
// import { QueryClient } from "react-query";

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + Cookies.get("token");
  config.baseURL = "http://addressbookmo5.runasp.net/api/";
  // config.baseURL = "https://localhost:7260/api/";
  return config;
});

// export const queryClient = new QueryClient();
// Authentication

export async function signup(data) {
  const response = await axios.post("AddressBooks/register", data);
  return response;
}

export async function signIn(data) {
  const response = await axios.post("AddressBooks/Login", data);
  return response;
}

//Departments
export async function getDepartments() {
  const { data, status } = await axios.get(`Departments`).catch((err) => {
    const error = new Error("An error occurred while fetching the Departments");
    error.code = err.response.status;
    throw error;
  });

  if (status === undefined) {
    const error = new Error("An error occurred while fetching the Departments");
    error.code = status;
    throw error;
  }

  return data;
}

export async function createDepartment(data) {
  const response = await axios.post("Departments", data);
  return response;
}

export async function updateDepartment(id, data) {
  const response = await axios.put(`Departments?id=${id}`, data);
  return response;
}

export async function deleteDepartment(id) {
  const response = await axios.delete(`Departments?id=${id}`);
  return response;
}

// job title
export async function getJobTitles() {
  const { data, status } = await axios.get(`JobTitles`).catch((err) => {
    const error = new Error("An error occurred while fetching the JobTitles");
    error.code = err.response.status;
    throw error;
  });

  if (status === undefined) {
    const error = new Error("An error occurred while fetching the JobTitles");
    error.code = status;
    throw error;
  }

  return data;
}

export async function createJobTitle(data) {
  const response = await axios.post("JobTitles", data);
  return response;
}

export async function updateJobTitle(id, data) {
  const response = await axios.put(`JobTitles?id=${id}`, data);
  return response;
}

export async function deleteJobTitle(id) {
  const response = await axios.delete(`JobTitles?id=${id}`);
  return response;
}

// address books

export async function getAddressBooks(search, searchDate) {
  if (search === undefined || search === null) {
    search = "";
  }
  if (searchDate === undefined || searchDate === null) {
    searchDate = "";
  }
  const { data, status } = await axios
    .get(`AddressBooks?searchKey=${search}&searchDate=${searchDate}`)
    .catch((err) => {
      const error = new Error(
        "An error occurred while fetching the AddressBooks"
      );
      error.code = err.response.status;
      throw error;
    });

  if (status === undefined) {
    const error = new Error(
      "An error occurred while fetching the AddressBooks"
    );
    error.code = status;
    throw error;
  }

  return data;
}

export async function createAddressBook(model) {
  const response = await axios.post(`AddressBooks`, model);
  return response;
}

export async function updateAddressBook(id, data) {
  const response = await axios.put(`AddressBooks?id=${id}`, data);
  return response;
}

export async function deleteAddressBook(id) {
  const response = await axios.delete(`AddressBooks?id=${id}`);
  return response;
}
