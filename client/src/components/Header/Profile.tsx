import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from ".././ui/dropdown-menu";
import { Button } from ".././ui/button";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth.hook";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { unSetUser } from "../../store/authSlice";



function Profile() {
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const auth = useSelector((state) =>state?.auth?.authStatus )
  const {mutateAsync: logout} = useLogout();

const handleLogout = async() => {
 const session =  await logout();
 
 
 if(session){
  dispatch(unSetUser());
 }
}
  return auth?(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  ):(
    <Link to="/login">
  <Button >Login</Button>
</Link>
)
}

export default Profile;