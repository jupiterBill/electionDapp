import React, { useState, useEffect, useContext } from 'react'
import { Button } from '../componentsIndex'
import Style from './NavBar.module.css'
import { ElectionContext } from '../../context/Context'
import Link from 'next/link'

const NavBar = () => {
const { connectWallet, walletAddr,getAdmin } = useContext(ElectionContext)
const [admin,setAdmin] = useState();
const [buttonConnected, setButtonConnected] = useState(false)
const [isAdmin, setIsAdmin] = useState(false);
  
 useEffect(()=>{
  async function getAd (){
  const admin = await getAdmin();
  if(walletAddr && admin.toLowerCase() === walletAddr.toLowerCase()){
    setIsAdmin(true);
    console.log("admin in the building")
  }
  setAdmin(admin)
 }
getAd();
},[walletAddr])

const itemsArray = [


  {
    item: "Register Voters",
    link: "register-voters"
  },

  {
    item: "Cast Vote",
    link: "cast-vote"
  },

  {
    item: "Result",
    link: "result"
  }
]

if(walletAddr && walletAddr.length>0 && isAdmin){
  itemsArray.unshift({
    item:"Candidates",
    link:"candidates"
  })
}

  return (
    <div className={Style.navbar}>
        <p className={Style.logo}>
            PROWESS
        </p>

        <div className={Style.items}>
          {itemsArray.map((el, i) => (
            <div key={i + 1} className={Style.item}>
              <Link href={{ pathname: `${el.link}` }}>{el.item}</Link> 
            </div>
          ))}
        </div>

        <div className= {Style.button}>
            <Button btnName={walletAddr && walletAddr.length > 0 ? "Connected" : "Connect"} handleClick={connectWallet} />
        </div>
        
    </div>
  )
}

export default NavBar