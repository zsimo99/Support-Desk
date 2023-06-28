import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { getTicket,reset,closeTicket } from "../features/tickets/ticketSlice"
import { getNotes,reset as noteReset ,createNote} from "../features/note/noteSlice"
import {toast} from "react-toastify"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import NoteItem from "../components/NoteItem"
import Modal from "react-modal"
import {FaPlus} from "react-icons/fa"
import { useParams,useNavigate } from "react-router-dom"

const customeStyle={
  content:{
    width:"600px",
    top:"50%",
    left:"50%",
    right:"auto",
    bottom:"auto",
    marginRight:"-50%",
    transform:"translate(-50%,-50%)",
    position:"relative"
  }
}

Modal.setAppElement("#root")




function Ticket() {
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const [noteText,setNoteText]=useState("")

  const {ticket,isError,isLoading,isSuccess,message}=useSelector((state)=>state.ticket)
  const {Notes,isLoading:notLoading}=useSelector((state)=>state.note)
  const dispatch=useDispatch()
  const params=useParams()
  const navigate=useNavigate()


  useEffect(()=>{
    if(isError) toast.error(message)
    dispatch(getTicket(params.ticketId))
    dispatch(getNotes(params.ticketId))
    return ()=> {
      if(isSuccess) dispatch(reset())
    }
    //eslint-disable-next-line
  },[params.ticketId,message,isError])

  const onTicketClose=()=>{
    dispatch(closeTicket(params.ticketId))
    toast.success("Ticket Closed")
    navigate("/tickets")
  }

  // open/close Modal 
  const openModal=()=>setModalIsOpen(true)
  const closeModal=()=>setModalIsOpen(false)

  const onNoteSubmit=(e)=>{
    e.preventDefault()
    dispatch(createNote({noteText,ticketId:params.ticketId}))
    closeModal()
  }

  if(isLoading || notLoading) return <Spinner/>
  if(isError) return <h3>somthing went wrong</h3>
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets"/>
        <h2>
          Ticket ID : {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString("en-us")}</h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Discription of the issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status!== "closed"&& (<button onClick={openModal} className="btn"><FaPlus/> Add Note</button>)}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customeStyle} contentLabel="Add Note">
        <h2>Add Note</h2>
        <button onClick={closeModal} className="btn-close">X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" placeholder="Note Text" className="form-control" value={noteText} onChange={(e)=>setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </Modal>
      {Notes.map(note=>(
        <NoteItem key={note._id} note={note}/>
      ))}
      {ticket.status !=="closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket