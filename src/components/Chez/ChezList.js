import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteChez, getAllChezzes } from "../../managers/ChezManager"

export const ChezList = ({setToggle}) => {
    const [chezzes, setChezzes] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getAllChezzes().then(setChezzes)
    }, [])

    return (
        <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
        <ul>
        {chezzes.map(chez=>{return (
        <li>
            <img src={`${chez.image}`} alt="chez" />
            {chez.name} by {chez.chef.username}
            
            {chez.chef.is_chef
            ?<>
            <button 
            className="button"
            onClick={()=>{navigate(`/chezList/${chez.id}/edit`)}}>edit</button>
            <button 
            className="button"
            onClick={()=>{
                deleteChez(chez.id)
                .then(()=>getAllChezzes()
                .then(setChezzes))
                }}>delete</button>
            </>
        :""}
        </li>
        )})}
        </ul>
    </section>
    )
}