import { Link } from "react-router-dom"
import { DateConverter } from "./DateConverter"

export const DoubleHero = ({array}) => {

    return <div className="doubleHero-container">
                {array.map(article=>{return <Link to={`/articles/${article.id}`} className="doubleHero" style={{backgroundImage: `url(http://localhost:8000${article.image})`}} key={article.id}>
                    <div className="doubleHero-content">
                        <h1 className="doubleHero-item">{article.title}</h1>
                        <h4 className="doubleHero-item"><DateConverter date={article.date} /> | by: {article?.chef.username}</h4>
                    </div>
                </Link>
                })}
        </div>
}