import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login,
    logout,
    getCurrentUser,
    registerUser
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        queryClient.invalidateQueries('currentUser')
      },
      retry: 0,
    });
  };
  
  export const useLogout = () => {
    return useMutation({
      mutationFn: () => logout(),
    });
  };
  
  
  export const useCurrentUser = () => {
    return useQuery({
      queryKey: ["currentUser"],
      queryFn: () => getCurrentUser(),
      staleTime: 1000 * 60 * 5,
      retry: 0,
    });
  };
  
  interface registerUser{
    username:string,
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