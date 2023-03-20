import { useEffect, useState } from "react"
import { DoubleHero } from "../DoubleHero"
import { Hero } from "../Hero"
import { getAllArticles } from "../../managers/ArticleManager"
import { getAllChezzes } from "../../managers/ChezManager"
import { Carrousel } from "../Carrousel"

export const Home = ({ setToggle}) => {
    const [chezzes, setChezzes] = useState([])
    const [articles, setArticles] = useState([])
    const [firstRow, setFirstRow] = useState({})
    const [secondRow, setSecondRow] = useState([])
    const [thirdRow, setThirdRow] = useState([])

    useEffect(()=>{
        getAllArticles()
        .then(setArticles)

        getAllChezzes()
        .then(setChezzes)
    },[])

    useEffect(()=>{
        setFirstRow(articles[0])
        setSecondRow(articles.splice(1, 2))
        setThirdRow(articles.splice(3, 4))
    },[articles])

    return <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
    <Hero article={firstRow} />
    <DoubleHero array={secondRow} />
    <Carrousel array={chezzes} />
    <DoubleHero array={thirdRow} />
    </section>
}