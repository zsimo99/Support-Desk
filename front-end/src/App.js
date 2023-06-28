import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Home,Login,NewTicket,Register ,Tickets,Ticket} from "./pages";
import PrivetRoute from "./components/PrivetRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    < >
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/new-ticket" element={<PrivetRoute/>}>
              <Route path="/new-ticket" element={<NewTicket/>}/>
            </Route>
            <Route path="/tickets" element={<PrivetRoute/>}>
              <Route path="/tickets" element={<Tickets/>}/>
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivetRoute/>}>
              <Route path="/ticket/:ticketId" element={<Ticket/>}/>
            </Route>
          </Routes>
        </div>
        <Footer/>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
