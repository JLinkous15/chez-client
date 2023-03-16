import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllCheeses } from "../../managers/CheeseManager"
import { deleteChez, getAllChezzes, subscribedChezzes } from "../../managers/ChezManager"
import "./ChezList.css"

export const ChezList = ({setToggle}) => {
    const [chezzes, setChezzes] = useState([])
    const [filteredChezzes, setFilteredChezzes] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [isFiltered, setIsFiltered] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
        getAllChezzes().then(setChezzes)
        getAllCheeses().then(setCheeses)
    }, [])

    useEffect(()=>{
        setFilteredChezzes(chezzes)
    }, [chezzes])

    useEffect(()=>{
        if(isFiltered===0){
            setFilteredChezzes(chezzes)
        }
        else if(isFiltered===1){
            subscribedChezzes().then(setFilteredChezzes)
        }
    },[isFiltered])

    return (
        <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
        <div className="selectors">
            <select className="chezList-select">
                <option value="0">All Cheeses</option>
                {cheeses.map(cheese=>{
                    return <option 
                    value={cheese.id}
                    key={cheese.id}>
                        {cheese.name}
                    </option>
                })}
            </select>
            <select 
            className="chezList-select"
            onChange={(e)=>{
                setIsFiltered(parseInt(e.target.value))
            }}>
                <option value="0">All Chezzes</option>
                <option value="1">Subscriptions</option>
            </select>
        </div>
        <ul className="chezList">
        {filteredChezzes.map(chez=>{return (
        <><li
        className="chezList-item">
            <img 
            src={`${chez.image}`} 
            alt="chez"
            className="chezList-image" />
            <h1>{chez.chef.username}</h1>
            <Link to={`/chezList/${chez.id}`}>{chez.name} </Link>
        </li>
        {chez.chef.is_chef
            ?<>
            <button 
            className="orange-button"
            onClick={()=>{navigate(`/chezList/${chez.id}/edit`)}}>edit</button>
            <button 
            className="orange-button"
            onClick={()=>{
                deleteChez(chez.id)
                .then(()=>getAllChezzes()
                .then(setChezzes))
                }}>delete</button>
            </>
        :""}
        </>
        )})}
        </ul>
    </section>
    )
}