import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error occured", error);
    const originalRequest = error.config;

    if (
      error?.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("this refresh access token called");
        const { accessToken } = await refreshAccessToken();
        console.log("new access token", accessToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const login = async (formData) => {
  try {
    const res = await API.post("/user/login", formData);

    const data = res.data;
    toast.success(data?.message);

    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const logout = async () => {
  try {
    const { data } = await API.get("/user/logout");
    toast.success(data?.message);
    // console.log(data);

    return data;
  } catch (error) {
    //console.log(error);

    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getCurrentUser = async () => {
  console.log("get current user called");
  
  try {
    const { data } = await API.get("/user/current-user");
    console.log(data);
    
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const registerUser = async (data) => {
  const formData = new FormData();

  if (!data.avatar) {
    toast.error("Avatar is required");
    return;
  }
  formData.append("avatar", data.avatar);

  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullname", data.fullname);
  try {
    const { data } = await API.post("/user/register", formData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const refreshAccessToken = async () => {
  console.log("refresh access token called");
  try {
    const { data } = await API.post("/user/refresh-token");
    console.log(data);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
