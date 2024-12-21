/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRegisterUser, useLogin } from "../hooks/auth.hook";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type SignupFormData = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  avatar: FileList;
  coverImage: FileList | undefined;
};

export function SignupForm() {
  const { mutateAsync: registerUser } = useRegisterUser();
  const { mutateAsync: loginUser } = useLogin();
  const navigate = useNavigate();

  const { register, handleSubmit,formState:{errors} } = useForm<SignupFormData>();

  
  
  const onSubmit = handleSubmit(async (data:SignupFormData) => {

    const formData = new FormData();
    formData.append("userName",data.userName);
    formData.append("fullName",data.fullName);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("avatar",data.avatar[0]);
    if(data.coverImage){
      formData.append("coverImage",data.coverImage[0]);
    }

    try{
    const res = await registerUser(formData as any);
    console.log(res);
      
      if (res?.success) {
        toast.success(res.message);

        
        const loginRes = await loginUser({
          email: data.email,
          password: data.password,
        });
  
        if (loginRes?.success) {
          toast.success(loginRes.message);
          navigate("/")
        }
      } else {
        toast.error(res?.message);
      }
    }
    catch (error) {
      console.error("Signup failed:", error);
    }

  })


  
      
  

  return (
    <Card className="mx-auto max-w-xl my-10">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  {...register("avatar")}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  required
                />
                {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  {...register("coverImage")}
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                />
                {errors.coverImage && <p className="text-red-500">{errors.coverImage.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  {...register("userName", { required: true })}
                  id="userName" name="userName" placeholder="Max" required />
                  {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  {...register("fullName", { required: true })}
                  id="fullName" name="fullName" placeholder="Robinson" required />
                  {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", { required: true })}
                id="password"
                name="password"
                type="password"
                required
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
