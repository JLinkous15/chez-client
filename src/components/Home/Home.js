import { useEffect, useState } from "react"
import { getAllChezzes } from "../../managers/ChezManager"

export const Home = ({ setToggle}) => {

    return <section 
    className="component_container"
    onClick={()=>{setToggle(true)}}>
    Hello World!
    {

    }
    </section>
}