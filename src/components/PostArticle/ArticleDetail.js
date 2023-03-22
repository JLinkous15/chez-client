import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllArticles, getSingleArticle } from "../../managers/ArticleManager"
import { Hero } from "../Hero"

export const ArticleDetail = ({setToggle}) => {
    const [article, setArticle] = useState({})
    const {articleId} = useParams()
    useEffect(()=>{
        getSingleArticle(articleId)
        .then(setArticle)
    },[articleId])
    return (
        <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
            <Hero article={article} />
        <p>
            {article.body}
        </p>
    </section>
    )
}