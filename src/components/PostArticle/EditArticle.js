import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editArticle, getSingleArticle } from "../../managers/ArticleManager"
import "./PostArticle.css"

export const EditArticle = ({setToggle}) => {
    const [article, setArticle] = useState({})
    const {articleId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getSingleArticle(articleId).then(setArticle)
    },[articleId])

    const handleOnChange = (e) => {
        const copy = {...article}
        copy[e.target.name] = e.target.value
        setArticle(copy)
    }

    return (<section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
            <form className="edit-article-container">
                <fieldset>
                    <label htmlFor="body">Title: </label>
                    <input 
                    name="title" 
                    value={article.title} 
                    type="text"
                    onChange={handleOnChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="body">Body Copy: </label>
                    <textarea 
                    name="body" 
                    value={article.body}
                    onChange={handleOnChange}
                    cols="50"
                    rows="20" />
                </fieldset>
                <fieldset>
                    <button
                    className="orange-button"
                    onClick={(e)=>{
                        e.preventDefault()
                        editArticle(articleId, article)
                        .then(()=>{
                            navigate(`/articles/${articleId}`)
                        })
                    }}>
                        Submit
                    </button>
                </fieldset>
            </form>
        </section>)
}