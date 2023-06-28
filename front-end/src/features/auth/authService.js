import axios from "axios"

const API_URL="/api/users"

const register =async(userData)=>{
    const res=await axios.post(API_URL,userData)
    if(res.data){
        console.log(`data ${res.data}`)
        localStorage.setItem("user",JSON.stringify(res.data))
    }
    return res.data
}
const login=async(userData)=>{
    const res=await axios.post(`${API_URL}/login`,userData)
    if(res.data){
        console.log(`data ${res.data}`)
        localStorage.setItem("user",JSON.stringify(res.data))
    }
    return res.data
}
const logout=()=>localStorage.removeItem("user")

const authService={
    register,logout,login
}

export default authService