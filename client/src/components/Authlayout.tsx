
import { FC,ReactNode,useEffect } from "react"
import GuestPage from "./GuestPage"
import { useSelector } from "react-redux"


interface AuthlayoutProps {
    children: ReactNode
    auth: boolean
    }

const Authlayout:FC<AuthlayoutProps> = ({children}) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authStatus = useSelector((state:any) => state?.auth?.authStatus)

    useEffect(() => {
        
        
    }, [authStatus])
    return (
        <div>
            {authStatus?children:<GuestPage/>}
        </div>
    )
}
export default Authlayout;