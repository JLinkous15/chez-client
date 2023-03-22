import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DateConverter } from "./DateConverter"

export const ChezHero = ({article}) => {
    return<>
            <div 
            to={`/articles/${article?.id}`}
            className="chez-hero" 
            style={{backgroundImage: `url(${article.image})`}} 
            key={article?.id}>
                <div className="hero-content">
                    <h1 className="hero-item">{article?.name}</h1>
                    <h3 className="hero-item"><DateConverter date={article?.date} /> | by: {article?.chef?.username}</h3>
                </div>
            </div>
            
        </>
}