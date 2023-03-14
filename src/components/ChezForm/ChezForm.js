import { useEffect, useState } from "react"
import { getAllCheeses } from "../../managers/CheeseManager"

export const ChezForm = ({toggle, setToggle}) => {
    const [cheeses, setCheese] = useState([])

    useEffect(()=>{
        getAllCheeses()
        .then(setCheese)}, [])
    return (
        <section 
        className="component_container"
        onClick={()=>{setToggle(!toggle)}}>
            <form type="submit">
                <fieldset>
                    <label htmlFor="name">Name:</label>
                    <input type="text"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="cheese">Cheese:</label>
                    <select>
                        <option value="0">Cheese</option>
                        {cheeses.map(cheese=>{
                            return <option value={cheese.id}>{cheese.name}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="recipe">Recipe:</label>
                    <textarea cols="60" rows="25"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="file">Image:</label>
                    <input type="file"/>
                </fieldset>
                <button>Submit</button>
            </form>
        </section>
    )
}