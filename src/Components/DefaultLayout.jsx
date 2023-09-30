import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../Contexts/ContextProvider"

export default function DefaultLayout(){
    const {user, token} = useStateContext();

    if(!token){
        return <Navigate to="/login" /> 
    }

    const onLogout = (ev) => {
        ev.preventDefault()
    }

    return(
        <div>
            Default
            {user.name}
            <a href="#" onClick={onLogout}>Logout</a>
            <Outlet />
        </div>
    )
}