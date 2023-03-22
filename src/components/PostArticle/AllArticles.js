import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllArticles } from "../../managers/ArticleManager"
import { Hero } from "../Hero"

export const AllArticles = ({setToggle}) => {
    const [articles, setArticles] = useState([])
    useEffect(()=>{
        getAllArticles()
        .then(setArticles)
    },[])
    return (
        <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
        {
            articles.map(article=>{
                return <div><Hero article={article} /></div>
            })
        }
    </section>
    )
}