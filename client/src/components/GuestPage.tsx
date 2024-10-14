import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function GuestPage() {
  return (
    <div className="mt-48 flex justify-center items-center">
    <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You are not signed in
              </h3>
              <p className="text-sm text-muted-foreground">
                You can Login or Signup to see the content.
              </p>
              <Link to="/login">
              <Button className="mt-4">Login</Button>
                </Link>
            </div>
            </div>
  )
}

export default GuestPage