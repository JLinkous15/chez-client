import { useEffect, useState } from "react"
import { getMe } from "../../managers/ChefManager"
import { getMyChezzes } from "../../managers/ChezManager"
import { Carrousel } from "../Carrousel"
import "./Profile.css"

export const Profile = ({setToggle}) => {
    const [me, setMe] = useState({})
    const [myChezzes, setMyChezzes] = useState([])

    useEffect(()=>{
        getMe()
        .then(setMe)

        getMyChezzes()
        .then(setMyChezzes)
    },[])

    return (
        <section 
        className="component_container"
        onClick={()=>{setToggle(true)}}>
            <div className="profile_card">
                <div className="profile-image">
                    <img 
                    className="profile_photo"
                    src={`url(${me.image})`} 
                    alt="profile_image"/>
                    <button className="white-button">Edit Info</button>
                </div>
                <ul>
                    <li>{me.username}</li>
                    <li>{me.id}</li>
                    <li></li>
                </ul>
            </div>
            <Carrousel array={myChezzes} />

        </section>
    )
}