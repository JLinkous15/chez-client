import { useState } from "react"
import "./ChatGPT.css"
export const ChatGPT = () => {
    const [toggle, setToggle] = useState(true)
    return (<div className={`chatGPT ${toggle? "":"toggle"}`}>
        {toggle?
        <button 
        className={`chatGPT-button ${toggle?"":"toggle"}`}
        onClick={()=>{setToggle(!toggle)}}>
            <img 
            src="../../resources/chez_bot.svg"
            className="chatGPT-bot"/>
        </button>
        :<>
        <div className="chatGPT-responses"></div>
        <div className="chatGPT-inputs">
            <input type="text" style={{backgroundColor:"#E8AB13"}}/>
            <button 
                className={`chatGPT-button ${toggle?"":"toggle"}`}
                onClick={()=>{setToggle(!toggle)}}>
                    <img 
                    src="../../resources/chez_bot.svg"
                    className="chatGPT-bot"/>
                </button>
        </div>
        </>
        }
                
            </div>
    )
}