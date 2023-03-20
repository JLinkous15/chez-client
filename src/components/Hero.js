import { Link } from "react-router-dom"
import { DateConverter } from "./DateConverter"

export const Hero = ({article}) => {

    return<>
            <Link 
            to={`/articles/${article?.id}`}
            className="hero" 
            style={{backgroundImage: `url(http://localhost:8000${article?.image})`}} 
            key={article?.id}>
                <div className="hero-content">
                    <h1 className="hero-item">{article?.title}</h1>
                    <h3 className="hero-item"><DateConverter date={article?.date} /> | by: {article?.chef?.username}</h3>
                </div>
            </Link>
            
        </>
}