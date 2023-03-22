import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteArticle, getAllArticles, getSingleArticle } from "../../managers/ArticleManager"
import { getMe } from "../../managers/ChefManager"
import { Hero } from "../Hero"

export const ArticleDetail = ({setToggle}) => {
    const [article, setArticle] = useState({})
    const [me, setMe] = useState({})
    const {articleId} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        getSingleArticle(articleId)
        .then(setArticle)
        getMe().then(setMe)
    },[articleId])
    return (
        <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
            <Hero article={article} />
            <div className="article-card" dangerouslySetInnerHTML={{__html: `<p>${article.body}</p>`}}>
                {/* <p>
                    {article.body}
                </p> */}
            </div>
            {me.is_staff
            ?<div>
                <button 
                onClick={()=>{navigate(`/articles/${articleId}/edit`)}}
                className="orange-button">Edit</button>
                <button 
                onClick={(e)=>{deleteArticle(articleId)
                .then(()=>{navigate("/articles")})}}
                className="orange-button">Delete</button>
            </div>
            :""}
    </section>
    )
}