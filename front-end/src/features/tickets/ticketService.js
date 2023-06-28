import axios from "axios";

const API_URL= "/api/tickets"

//create new ticket
const createTicket=async(ticketData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const res= await axios.post(API_URL,ticketData,config) 
    return res.data
}

const getTickets=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const res=await axios.get(API_URL,config)
    
    return res.data
}

const getTicket=async(ticketId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    console.log(`${API_URL}/${ticketId}`)
    const res =await axios.get(`${API_URL}/${ticketId}`,config)
    return res.data
}

const closeTicket=async(ticketId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    console.log(`${API_URL}/${ticketId}`)
    const res =await axios.put(`${API_URL}/${ticketId}`,{status:"closed"},config)
    console.log(res.data)
    return res.data
}

const ticketService={
    createTicket,getTickets,getTicket,closeTicket
}
export default ticketService