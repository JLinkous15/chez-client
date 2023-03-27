import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteChez, getAllChezzes, getMyChezzes, subscribedChezzes } from "../../managers/ChezManager"
import "./ChezList.css"

export const ChezList = ({setToggle}) => {
    const [chezzes, setChezzes] = useState([])
    const [isFiltered, setIsFiltered] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
        getAllChezzes().then(setChezzes)
    }, [])

    useEffect(()=>{
        if(isFiltered===1){
            subscribedChezzes().then(setChezzes)
        }else if (isFiltered===2){
            getMyChezzes().then(setChezzes)
        }else{
            getAllChezzes().then(setChezzes)
        }
    },[isFiltered])

    return (
        <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
        <div className="selectors">
            <select 
            className="chezList-select"
            onChange={(e)=>{
                setIsFiltered(parseInt(e.target.value))
            }}>
                <option value="0">All Chezzes</option>
                <option value="1">Subscriptions</option>
                <option value="2">My Chezzes</option>
            </select>
        </div>
        <ul className="chezList">
        {chezzes.map(chez=>{return (<>
        <Link key={chez.id} to={`/chezList/${chez.id}`}>
            <li
            className="chezList-item">
                <img 
                src={`${chez.image}`} 
                alt="chez"
                className="chezList-image" />
                <h1 style={{padding: "1rem"}}>{chez.name}</h1>
                <h2 style={{padding: "1rem"}}>by: {chez.chef.username}</h2>
            </li>
        </Link>
        </>)})}
        </ul>
    </section>
    )
}