import React, { useContext,useEffect,useState } from 'react'
import { FaUserAlt } from "react-icons/fa"
import Style from './Status.module.css'
import { ElectionContext } from '../../context/Context'

const Status = () => {

  const { walletAddr,voters,actualVoters } = useContext(ElectionContext)
  const [status,setStatus] = useState("");
  

  useEffect(()=>{
    voters()
  },[voters])
   useEffect(()=>{
  
     if(actualVoters){
      actualVoters.map(item=>{
       if(item.voteraddress.toLowerCase() === walletAddr.toLowerCase()){
        console.log("nigga has been found")
         const tempStatus = item.hasVoted ? "Voted" : "yet to vote";
         setStatus(tempStatus)
       }

      })
     }
   },[])  
   
   return (
    <div className={Style.status}>
      <FaUserAlt className={Style.userIcon}/>
      <p>
        <span>Wallet Address: {`${walletAddr.substring(0, 7)}...${walletAddr.substring(35, 42)}`}</span>
        <span>{status && (<>{status}</>)}</span>
      </p>
    </div>
  )
}

export default Status