import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login,
    logout,
    getCurrentUser,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    changePassword,
    getUserChannelStat,

 } from "../api/auth.api";


 interface loginFormDataInterface{
    username?:string,
    email?:string
    password:string
    }
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (formData:loginFormDataInterface) => login(formData),
    
      onSuccess: () => {
        
        queryClient.invalidateQueries({
            queryKey:["currentUser"]
        })
      },
      retry: 0,
    });
  };
  
  export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => logout(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      },
    });
  };
  
  
  export const useCurrentUser = () => {
    return useQuery({
      queryKey: ["currentUser"],
      queryFn: () => getCurrentUser(),
      staleTime: 1000,
      retry: 0,
    });
  };
  
  interface registerUser{
    userName:string,
    fullName:string,
    email:string,
    password:string,
    avatar:File,
    coverImage?:File

}
  export const useRegisterUser = () => {
    return useMutation({
      mutationFn: (user:registerUser) => registerUser(user),
    });
  };

  export const useGetUserChannelStat = (userId:string,guest:boolean) => {
    return useQuery({
      queryKey: ["userChannelStat",userId],
      queryFn: () => getUserChannelStat(userId,guest),
      staleTime: 1000*60*5,
      retry: 0,
    });
  };

  interface changePasswordInterface{
    oldPassword:string,
    newPassword:string
  }
  export const useChangePassword = () => {
    return useMutation({
      mutationFn: (formData:changePasswordInterface) => changePassword(formData.oldPassword,formData.newPassword),
      
    });
  };

  interface updateAccountDetailsInterface{
    userName? :string,
    fullName?:string,
    email?:string
  }
  export const useUpdateAccountDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (formData:updateAccountDetailsInterface) => updateAccountDetails(formData),
      onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["currentUser"]
        })
      }
    });
  };

  export const useUpdateUserAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (avatar:File) => updateUserAvatar(avatar),
      onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["currentUser"]
        })
      }
    });
  };

  export const useUpdateUserCoverImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (coverImage:File) => updateUserCoverImage(coverImage),
      onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["currentUser"]
        })
      }
    });
  };