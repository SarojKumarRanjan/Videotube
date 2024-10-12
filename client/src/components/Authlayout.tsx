
import { FC,ReactNode,useEffect } from "react"


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
            {auth?children:<h1>Not Authenticated</h1>}
        </div>
    )
}
export default Authlayout;