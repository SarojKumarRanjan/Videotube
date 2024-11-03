import {HomePage} from "./pages/index"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setUser } from "./store/authSlice"
import { useEffect } from "react"
import { useCurrentUser } from "./hooks/auth.hook"


function App() {
  
  const dispatch = useDispatch()
  const {data,isFetching} = useCurrentUser()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.authStatus)
  useEffect(() => {
    if (!isFetching && !user) {
      if (data) {
        dispatch(setUser(data));
      }
    }
  }, [user,data]);
  return (
    <>
     <HomePage/>
    </>
  )
}

export default App
