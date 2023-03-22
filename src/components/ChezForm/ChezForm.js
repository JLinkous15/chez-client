import { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCheeses } from "../../managers/CheeseManager"
import { getSingleChez, postChez, updateChez } from "../../managers/ChezManager"

export const ChezForm = ({ setToggle}) => {
    const navigate = useNavigate()
    const [cheeses, setCheese] = useState([])
    const [image, setImage] = useState("")
    const [chez, setChez] = useState({
        name: "",
        recipe: "",
        image: "",
        cheeses: [],
        is_published: false
    })

    const {chezId} = useParams()
    
    useEffect(()=>{
        getAllCheeses()
        .then(setCheese)
        if(chezId){
            getSingleChez(chezId)
            .then(setChez)
        }
    }
        , [])
        
    const handleInputChange = (event) => {
        const copy = {...chez}
        copy[event.target.name] = event.target.value
        setChez(copy)
    }
        
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createChezImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setImage(base64ImageString)
        });
    }

    const handlePOST = async () => {
        const copy = {...chez}
        copy.image = image
        await postChez(copy)
        .then((res)=>{navigate(`/chezList/${res.id}`)})
    }
    
    const handlePUT = async (e) => {
        const copy = {...chez}
        if(image){
            copy.image = image
        }
        await updateChez(chezId, copy)
        .then(()=>navigate(`/chezList/${chezId}`))
    }

    const handleIsPublished = () => {

    }
    
    return (
        <section 
        className="component_container"
        onClick={()=>{setToggle(true)}}>
            <form type="submit" onSubmit={(e)=>{
                e.preventDefault()
            }}>
                <fieldset>
                    <label 
                    htmlFor="name">
                        Name:
                    </label>
                    <input 
                    value = {chez.name}
                    type="text" 
                    name="name"
                    onChange={handleInputChange}/>
                </fieldset>
                {/* Cheeses */}
                <fieldset>
                    <label 
                    htmlFor="cheese">
                        Cheeses:
                    </label>
                    <select 
                    value = {chez.cheese}
                    name="cheeses"
                    onChange={(e)=>{
                        const copy = {...chez}
                        const [cheeseId, cheeseName] = e.target.value.split("--")
                        const cheeseObj = {
                            id: cheeseId,
                            name: cheeseName
                        }
                        copy.cheeses.push(cheeseObj)
                        setChez(copy)
                    }}>
                        <option 
                        value="0">
                            Cheese Choice
                        </option>
                        {cheeses.map(cheese=>{
                            return <option 
                            key={cheese.id}
                            value={`${cheese.id}--${cheese.name}`}>
                                {cheese.name}
                            </option>
                        })}
                    </select>
                    <ul>
                    {chez.cheeses.map((cheese, index)=>{return(
                        <li key={index}>
                            {cheese.name} 
                            <FaTimes 
                            onClick={()=>{
                                const copy = {...chez}
                                copy.cheeses.splice(index, 1)
                                setChez(copy)

                            }} />
                        </li>
                    )})
                    }
                    </ul>
                </fieldset>
                <fieldset>
                    <label 
                    htmlFor="recipe">
                        Recipe:
                    </label>
                    <textarea 
                    value = {chez.recipe}
                    cols="60" 
                    rows="25" 
                    name="recipe"
                    onChange={handleInputChange}/>
                </fieldset>
                <fieldset>
                    <label 
                    htmlFor="file">
                        Image:
                    </label>
                    <input 
                    type="file" 
                    name="image"
                    className="image"
                    accept="image/*"
                    onChange={createChezImageString}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="is_published">Do you want to publish your chez?</label>
                    <input 
                    name="is_published"
                    type="checkbox"
                    defaultChecked={chez.is_published}
                    value={chez.is_published}
                    onClick={()=>{
                        if(chez.is_published){
                            const copy = {...chez, is_published: false}
                            setChez(copy)
                        }else{
                            const copy = {...chez, is_published: true}
                            setChez(copy)
                        }
                    }}/>
                </fieldset>
                <button
                className="orange-button"
                onClick={(e)=>{
                    e.preventDefault()
                    chezId
                    ?handlePUT()
                    :handlePOST()
                }}
                >
                    Submit
                </button>
            </form>
        </section>
    )
}