
import { FC,ReactNode,useEffect } from "react"
import GuestPage from "./GuestPage"


interface AuthlayoutProps {
    children: ReactNode
    auth: boolean
    }

const Authlayout:FC<AuthlayoutProps> = ({children,auth}) => {

    useEffect(() => {
        console.log(auth);
        
    }, [auth])
    return (
        <div>
            {auth?children:<GuestPage/>}
        </div>
    )
}
export default Authlayout;