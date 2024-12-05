import { Link } from "react-router-dom"

import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useRegisterUser,useLogin } from "../hooks/auth.hook"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

interface registerUser{
  userName:string,
  fullName:string,
  email:string,
  password:string,
  avatar:File,
  coverImage?:File
}


export function SignupForm() {
  const {mutateAsync:registerUser} = useRegisterUser()
  const {mutateAsync:loginUser} = useLogin()
  const navigate = useNavigate()
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data: registerUser = {
      userName: formData.get('userName') as string,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      avatar: formData.get('avatar') as File,
      coverImage: formData.get('coverImage') as File | undefined
    }
  const res = await registerUser(data)
  if(res?.success){ toast.success(res?.message)
    const loginRes = await loginUser({email:data.email,password:data.password})
    if(loginRes?.success){ toast.success(loginRes?.message)
      navigate('/')
    }
  }
  else toast.error(res?.message)
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Input id="avatar" type="file" accept="image/*" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input id="coverImage" type="file" accept="image/*" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userName">User Name</Label>
              <Input id="userName" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button
            onClick={handleSubmit}

            type="submit" className="w-full">
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
      </CardContent>
    </Card>
  )
}
