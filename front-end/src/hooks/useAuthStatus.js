import {useState,useEffect} from "react"
import {useSelector} from "react-redux"

export const useAuthStatus=()=>{
    const [logedIn,setLogedIn]=useState(false)
    const [checkStatus,setCheckStatus]=useState(true)

    const {user}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(user){
            setLogedIn(true)
        }else{
            setLogedIn(false)
        }
        setCheckStatus(false)
    },[user])
    return {logedIn,checkStatus}
}