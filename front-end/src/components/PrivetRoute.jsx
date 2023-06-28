import {Navigate,Outlet} from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from './Spinner'

const PrivetRoute = () => {
    const {logedIn,checkStatus}=useAuthStatus()
    if(checkStatus) return <Spinner/>
  return logedIn ? <Outlet/>:<Navigate to="/login"/>
}

export default PrivetRoute