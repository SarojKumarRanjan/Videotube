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
    //console.log("error occured", error);
    const originalRequest = error.config;

    if (
      error?.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        //console.log("this refresh access token called");
        const { accessToken } = await refreshAccessToken();
        //console.log("new access token", accessToken);

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
    const res = await API.post("/users/login", formData);

    const data = res.data;
    toast.success(data?.message);

    return data?.data?.user;
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
    const { data } = await API.post("/users/logout");
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
 // console.log("get current user called");
  
  try {
    const { data } = await API.get("/users/current-user");
   // console.log(data);
    
    return data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
       // toast.error(error?.response?.data?.error||"error getting user info")
    } else {
       // toast.error("something went wrong while getting user detail")
    }
   // console.log(error);
    
    throw error
  }
};

interface registerUser{
  userName:string,
  fullName:string,
  email:string,
  password:string,
  avatar:File,
  coverImage?:File

}

export const registerUser = async (formdata:registerUser) => {

  
  
 
  try {
    const res = await API.post("/users/register", formdata);
    const data = res?.data;
    //toast.success(data?.message);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error?.response?.data?.error|| "error while registering user");
    } else {
        toast.error("something went wrong while registering user")
    }
   console.log(error);
   
    throw error
  }
}

export const refreshAccessToken = async () => {
 // console.log("refresh access token called");
  try {
    const res = await API.post("/users/refresh-token");
    const data = res.data;
    return data?.data;
    
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
       // toast.error(error?.response?.data?.error||"error while refreshing access token")
    } else {
       // toast.error("something went wrong while refreshing access token")
    }
    console.log(error);
    
    throw error
  }
}


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
export const getUserChannelStat = async(userId:string,guest:boolean) => {
    try {
        const res = await API.get("/users/channel/"+userId+"?guest="+guest);
        const data = res?.data
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(error?.response?.data?.error||"error while getting user channel info")
        } else {
            toast.error("something went wrong while getting user's channel info")
        }

        console.log(error);
        throw error; 
    }

}

interface userdetails{
    userName?:string
    fullName?:string
    email?:string
}

export const updateAccountDetails = async(userDetails:userdetails) => {
    try {
        const res = await API.patch("/users/update-account",userDetails);
        const data = res?.data
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(error?.response?.data?.error||"error while updating user info")
        } else {
            toast.error("something went wrong while updating user info")
        }

        console.log(error);
        throw error; 
    }

}

export const updateUserAvatar = async(avatar:File) => {
    const formData = new FormData();
    formData.append("avatar",avatar);
    
    try {
        const res = await API.patch("/users/update-avatar",formData);
        const data = res?.data
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(error?.response?.data?.error||"error while updating user avatar")
        } else {
            toast.error("something went wrong while updating user avatar")
        }

        console.log(error);
        throw error; 
    }
}

export const updateUserCoverImage = async(coverImage:File) => {
  const formData = new FormData();
  formData.append("coverImage",coverImage);
try {
    const res = await API.patch("/users/update-cover-image",formData);
    const data = res?.data;
    return data;
} catch (error) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error?.response?.data?.error||"error while updating user coverImage")
    } else {
        toast.error("something went wrong while updating user coverImage")
    }

    console.log(error);
    throw error; 
}
}

export const changePassword = async(oldPassword:string,newPassword:string) => {
  try {
    const res = await API.post("/users/change-password",{currentPassword:oldPassword,newPassword});
    const data = res?.data;
    return data;
  } catch (error) {
    
  }
}