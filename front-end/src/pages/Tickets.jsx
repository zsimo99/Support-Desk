import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"
import {toast} from "react-toastify"


function Tickets() {
    const {tickets,isLoading,isSuccess,isError,message}=useSelector(state=>state.ticket)
    const dispatch=useDispatch()
    useEffect(()=>{
        return ()=>{
            if(isSuccess){
            dispatch(reset())
        }
    }
    },[dispatch,isSuccess])
    useEffect(()=>{
        dispatch(getTickets())
        if(isError) toast.error(message)
    //eslint-disable-next-line
    },[dispatch])

    if(isLoading) return <Spinner/>
  return (
    <>
        <BackButton url="/"/>
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets.map(ticket=>(
                <TicketItem key={ticket._id} ticket={ticket}/>
            ))}
        </div>
    </>
  )
}

export default Tickets