import {  useState } from "react"
import { FaNewspaper, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { postArticle } from "../../managers/ArticleManager"
import "./PostArticle.css" 

export const PostArticle = () => {
    const [articleToggle, setArticleToggle] = useState(true)
    const [image, setImage] = useState("")
    const [articleContent, setArticleContent] = useState({
        title: "",
        body: "",
        image: ""
    })
    const navigate = useNavigate()
    function handleArticleChange(e) {
        const copy = {...articleContent}
        copy[e.target.name]=e.target.value
        setArticleContent(copy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createArticleImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setImage(base64ImageString)
        });
    }

    const handlePOST = async (event) => {
        event.preventDefault()
        
        const copy = {...articleContent}
        copy.image = image
        await postArticle(copy)
        .then((res)=>console.log(res))
    }

    
    return (<div className={`post-article ${articleToggle?"":"toggle"}`}>
        {articleToggle?
        <FaNewspaper className="lexical-icon" onClick={()=>{setArticleToggle(!articleToggle)}} />
    :<>
        <div>
            <label htmlFor="title">Title:</label>
            <input 
            type="text"
            name="title"
            onChange={handleArticleChange}/>
        </div>
        <textarea 
        className="editor"
        name="body"
        value={articleContent.body}
        onChange={handleArticleChange} />
        <input 
        type="file"
        name="image"
        onChange={createArticleImageString} />
        <div className="article-buttons">
        <FaTimes className="lexical-icon" onClick={()=>{setArticleToggle(!articleToggle)}} />
        <FaNewspaper className="lexical-icon" onClick={handlePOST} />
        </div>

    </>}
    
    </div>)
}