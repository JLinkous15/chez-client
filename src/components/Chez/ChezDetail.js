import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getMe } from "../../managers/ChefManager"
import { deleteChez, deleteComment, getSingleChez, postComment } from "../../managers/ChezManager"
import { amISubscribed, getMySubscriptions, subscribe, unsubscribe } from "../../managers/SubscriptionManager"
import { ChezHero } from "../ChezHero"
import "./ChezList.css"

export const ChezDetail = ({setToggle}) => {
    const [chez, setChez] = useState({
        chef:{
        },
        cheeses:[],
        chez_comments:[]
    })
    const [me, setMe] = useState({})
    const [commentToggle, setCommentToggle] = useState(true)
    const [subscribed, setSubscribed] = useState(false)
    const [comment, setComment] = useState({
        body: ""
    })
    const {chezId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getSingleChez(chezId)
        .then(setChez)

        getMe()
        .then(setMe)
    }, [])

    useEffect(()=>{
        amISubscribed(chez.chef.id)
        .then(setSubscribed)
    }, [chez.chef.id])

    const handleInputChange = (event) => {
        const copy = {...comment}
        copy[event.target.name] = event.target.value
        setComment(copy)
    }

    return (
        <section 
        className="component_container"
        onClick={()=>{setToggle(true)}}>
            <ChezHero article={chez} />
            <div className = "chez-detail-card">
                    <p>{chez.recipe}</p>
            </div>
            <div className="chez-detail-buttons">
                {me.id === chez.chef.id?
                <>
                    <button 
                    className="orange-button"
                    onClick={()=>{
                        deleteChez(chezId)
                        .then(()=>{navigate(`/chezList`)})
                    }}>
                        Delete
                    </button>
                    <button 
                    className="orange-button"
                    onClick={()=>{
                        navigate(`/chezList/${chez.id}/edit`)
                    }}>
                        Edit
                    </button>
                </>
                :""}
                <button 
                className = "comment orange-button"
                onClick={()=>{
                    setCommentToggle(!commentToggle)
                }}>
                    Leave a comment
                </button>
            {subscribed
            ?<button
            className = "unsubscribe orange-button"
            onClick={()=>{
                unsubscribe(chez.chef.id)
                .then(()=>{
                    amISubscribed(chez.chef.id)
                    .then(setSubscribed)})
            }}>
                Unsubscribe
            </button>
            :<button
                className = "subscribe orange-button"
                onClick={()=>{
                    subscribe(chez.chef.id)
                    .then(()=>{
                    amISubscribed(chez.chef.id)
                    .then(setSubscribed)})
                }}>
                    Subscribe
                </button>
                }
            </div>
            {commentToggle
            ?""
            :<>
            <textarea 
            name="body"
            onChange={handleInputChange}
            cols="60" 
            rows="20"/>
            <button 
            className="button"
            onClick={()=>{
                postComment(chezId, comment, "POST")
                .then(getSingleChez(chezId).then(setChez))
                setCommentToggle(true)
            }}>
                Submit
            </button>
            </>}
            {chez.chez_comments.length > 0
            ?<ul className = "chez-comment-list">
            {chez.chez_comments.map(comment=>{
            return <li className = "chez-comment-list-item" key={comment.id}>
                <img className="chez-comment-list-profileImage" src={comment.chef.profile_image} />
                <p className="chez-comment-list-body">{comment.body} </p>
                {me.id === comment.chef.id
                    ?<button 
                    className="orange-button"
                    onClick={()=>{
                        deleteComment(comment.id)
                        .then(()=>getSingleChez(chezId).then(setChez))
                    }}>
                        delete comment
                    </button>
                    :""}
                </li>
            })}
            </ul>
            :""}
    </section>
    )
}