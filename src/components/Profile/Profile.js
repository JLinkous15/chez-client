import { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../managers/ChefManager"
import { getMyChezzes } from "../../managers/ChezManager"
import { Carrousel } from "../Carrousel"
import { unsubscribe } from "../../managers/SubscriptionManager"
import "./Profile.css"

export const Profile = ({setToggle}) => {
    const [me, setMe] = useState({})
    const [myChezzes, setMyChezzes] = useState([])
    const [modal, setModal] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        getMe()
        .then(setMe)

        getMyChezzes()
        .then(setMyChezzes)
    },[])

    const handleManageSubscriptionButton = (e) => {
        e.preventDefault()
        if(me.subscriptions.length > 0){
            setModal(false)
        } else {
            window.alert("You've no subscriptions to manage")
        }
    }

    return (
        <section 
        className="component_container"
        onClick={()=>{
            setToggle(true)}}>
            <div className="profile_card">
                <div className="profile-image">
                    <img 
                    className="profile_photo"
                    src={`http://localhost:8000${me.profile_image}`} 
                    alt="profile_image"/>
                    <button 
                    className="white-button"
                    onClick={()=>{
                        navigate("/profile/edit")
                    }}>Edit Info</button>
                </div>
                <ul className="profile-details">
                    <li>Username: {me.username}</li>
                    <li>Name: {me.full_name}</li>
                    <li>
                        <button 
                        onClick={handleManageSubscriptionButton}
                        className="white-button">
                            Manage Subscriptions
                        </button>
                    </li>
                </ul>
            </div>
            <Carrousel array={myChezzes} />

            {modal?"":
                <section className="subscription-modal">
                    <ul className="subscription-modal-ul">
                    {me.subscriptions.map(subscription=>{
                        return <li 
                        className="profile-subscription-list-item" 
                        key={subscription.id}>
                            <img 
                            className="profile-subscription-list-image" 
                            src={`http://localhost:8000${subscription.profile_image}`}/>
                            <h4>{subscription.username}</h4>
                            <FaTimes
                            className="profile-subscription-x"
                            onClick={()=>{
                                unsubscribe(subscription.id)
                                .then(()=>{
                                    getMe()
                                    .then(setMe)
                                })
                            }} />
                        </li>
                        })}
                    </ul>
                    <button 
                    className="white-button"
                    onClick={()=>{
                        setModal(true)
                    }}>
                        Exit
                    </button>
                </section>}

        </section>
    )
}