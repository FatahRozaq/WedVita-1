import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../Contexts/ContextProvider"

export default function Guest() {
    const {token} = useStateContext()

    if(token){
        return <Navigate to="/users" />
    }

    return (
        <div>
            <Outlet />
        </div>
        
    )
}