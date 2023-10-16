import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../Contexts/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axios-client";
import UP1 from "../UserProfile.jsx";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();

    if(!token){
        return <Navigate to="/login" /> 
    }

    const onLogout = ev => {
        ev.preventDefault()
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
      }
    
      useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    return(
        <div>
            <UP1 user={user} token={token} onLogout={onLogout}/>
        </div>
    )
}