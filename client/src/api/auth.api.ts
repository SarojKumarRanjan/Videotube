import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";
import { AxiosError } from "axios";

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


interface loginFormDataInterface{
username?:string,
email?:string
password:string
}

type user = {
    _id:string,
    username:string,
    fullName:string,
    avatar:string,
    coverImage:string,
    watchHistory:Array<string>,
    createdAt:string,
    updatedAt:string,
    __v:number
}

interface loginResponse{
    statusCode:number,
    message:string,
    data:user,
    success:boolean,
    accessToken:string,
    refreshToken:string
}

export const login = async (formData:loginFormDataInterface):Promise<loginResponse> => {
  try {
    const res = await API.post("/user/login", formData);

    const data = res.data;
    toast.success(data?.message);

    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error?.response?.data?.error|| "Error while logging in");
    } else {
        toast.error("something went wrong while login")
    }
    console.log(error);
    
    throw error
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
if (error instanceof AxiosError && error.response) {
    toast.error(error?.response?.data?.error|| "error while logout");
} else {
    toast.error("something went wrong while logout")
}
    console.log(error);
    
    throw error
  }
};

export const getCurrentUser = async () => {
  console.log("get current user called");
  
  try {
    const { data } = await API.get("/user/current-user");
    console.log(data);
    
    return data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error?.response?.data?.error||"error getting user info")
    } else {
        toast.error("something went wrong while getting user detail")
    }
    console.log(error);
    
    throw error
  }
};

interface registerUser{
    username:string,
    fullName:string,
    email:string,
    password:string,
    avatar:File,
    coverImage?:File

}

export const registerUser = async (data:registerUser):Promise<loginResponse> => {
  const formData = new FormData();

  
  formData.append("avatar", data.avatar);

  formData.append("userName", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  try {
    const { data } = await API.post("/user/register", formData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error?.response?.data?.error|| "error while registering user");
    } else {
        toast.error("something went wrong while registering user")
    }
   console.log(error);
   
    throw error
  }
};

export const refreshAccessToken = async () => {
  console.log("refresh access token called");
  try {
    const { data } = await API.post("/user/refresh-token");
    console.log(data);
    return data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error?.response?.data?.error||"error while refreshing access token")
    } else {
        toast.error("something went wrong while refreshing access token")
    }
    console.log(error);
    
    throw error
  }
};


export const getUserHistory = async() => {
    try {
        const res = await API.get("/users/history")
        const data = res?.data;
        return data?.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(error?.response?.data?.error||"error while getting user history")
        } else {
            toast.error("something went wrong while getting user's history")
        }

        console.log(error);
        throw error;
        
    }
}
