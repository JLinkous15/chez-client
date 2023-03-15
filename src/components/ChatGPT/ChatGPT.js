import { FaTimes } from 'react-icons/fa'
import { useState } from "react"
import "./ChatGPT.css"
export const ChatGPT = () => {
    const [toggle, setToggle] = useState(true)
    
    return (
    <div className={`chatGPT ${toggle?"":"toggle"}`}>
        <div className={`chatGPT-responses ${toggle?"":"toggle"}`}></div>
        <div className="chatGPT-inputs">
            <FaTimes 
            className={`chatGPT-x ${toggle?"":"toggle"}`}
            onClick={()=>{setToggle(true)}} />
            <input 
            className={`chatGPT-input ${toggle?"":"toggle"}`}
            type="text" 
            style={{backgroundColor:"#E8AB13"}}/>
            <img 
            src="../../resources/chez_bot.svg"
            className="chatGPT-bot"
            onClick={()=>{setToggle(!toggle)}}/>
        </div>
    </div>
    )
}