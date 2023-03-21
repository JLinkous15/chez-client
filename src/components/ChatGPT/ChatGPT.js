import { FaTimes } from 'react-icons/fa'
import { useEffect, useState } from "react"
import "./ChatGPT.css"
import { postChatGPT } from '../../managers/ChatGPTManager'
export const ChatGPT = () => {
    const [toggle, setToggle] = useState(true)
    const [conversation, setConversation] = useState([])
    const [dialogue, setDialogue] = useState({
        user_input: "",
        GPTResponse: ""
    })

    
    const handleUserInput = (e) => {
        const copy = {...dialogue}
        copy[e.target.name] = e.target.value
        setDialogue(copy)
    }


    async function handleSubmit (e) {
        if(dialogue.user_input){
            postChatGPT(dialogue)
            .then((res)=>{
                console.log(res)
                const copy = {...dialogue}
                copy.GPTResponse = res
                setDialogue(copy)
                const copyConversation = [...conversation]
                copyConversation.push(copy)
                setConversation(copyConversation)
                setDialogue({
                    user_input: "",
                    GPTResponse: ""
                })
            })
        }else{
            setToggle(false)
        }
    }

    return (
    <div className={`chatGPT ${toggle?"":"toggle"}`}>
        <div className={`chatGPT-responses ${toggle?"":"toggle"}`}>
            {conversation.map(statement=>{
                return (<>
                <p className="chatGPT-user-input">
                    {statement.user_input}
                </p>
                <p className="chatGPT-response">
                    {statement.GPTResponse}
                    <button
                    className="white-button"
                    onClick={()=>{
                        navigator.clipboard.writeText(statement.GPTResponse)
                    }}>Copy</button>
                </p>
                </>)
            })}
        </div>
        <div className="chatGPT-inputs">
            <FaTimes 
            className={`chatGPT-x ${toggle?"":"toggle"}`}
            onClick={()=>{setToggle(true)}} />
            <input 
            value={dialogue.user_input}
            name="user_input"
            className={`chatGPT-input ${toggle?"":"toggle"}`}
            type="text" 
            style={{backgroundColor:"#E8AB13"}}
            onChange={handleUserInput}/>
            <img 
            src="../../resources/chez_bot.svg"
            className="chatGPT-bot"
            onClick={handleSubmit}/>
        </div>
    </div>
    )
}