import { useEffect, useState } from "react"

function Footer() {
    const [year,setYear]=useState(0)
    useEffect(()=>{
        const thisYear=new Date().getFullYear()
        setYear(thisYear)
    },[])
  return (
    <footer><div className="footer">&copy; {year} copyright <span>Mohamed Zoraa</span></div></footer>
  )
}

export default Footer