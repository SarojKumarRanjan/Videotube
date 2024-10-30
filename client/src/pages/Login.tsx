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
import { useLogin } from "../hooks/auth.hook";
import { useForm } from "react-hook-form";
import { setUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface formInput {
  userName?: string;
  email?: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading,setisLoading] = useState<boolean>(false)
  const { mutateAsync: login, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>();

  const loginUser = async (data: formInput) => {
    try {
      setisLoading(true);
      const session = await login(data);
      console.log(session);
      if (session) {
        dispatch(setUser(session));
        navigate("/");
      }
      setisLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {isError && (
              <p className="text-red-500 text-sm mt-2">
                {error?.message || "Login failed"}
              </p>
            )}
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
