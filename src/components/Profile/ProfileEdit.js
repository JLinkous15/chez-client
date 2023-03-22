import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMe, updateMyProfile } from "../../managers/ChefManager"

export const ProfileEdit = ({setToggle}) => {
    const [me, setMe] = useState({
        first_name: "",
        last_name: "",
        bio: ""
    })
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        getMe()
        .then((res)=>{
            const copy = {...res}
            const [firstName, lastName] = copy.full_name.split(" ")
            copy.first_name = firstName
            copy.last_name = lastName
            setMe(copy)})
    },[])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createAvatarImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setImage(base64ImageString)
        });
    }

    const handleInputChange = (e) => {
        const copy = {...me}
        copy[e.target.name] = e.target.value
        setMe(copy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const copy = {...me}
        copy.full_name = `${copy.first_name} ${copy.last_name}`
        copy.image = image
        updateMyProfile(copy)
        .then(()=>{navigate('/profile')})
    }
    
    return (<section className="component_container" onClick={()=>{setToggle(true)}}>
            <h1>Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleInputChange} value={me.first_name} type="text" name="first_name" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleInputChange} value={me.last_name} type="text" name="last_name" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <textarea onChange={handleInputChange} value={me.bio} name="bio" className="form-control" cols={40} rows={5} placeholder="Tell us why you love grilled cheeses so much..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="avatarImage"> Avatar Image </label>
                    <input type="file" onChange={createAvatarImageString}/>
                </fieldset>
                <button
                className="orange-button"
                onClick={handleSubmit}>
                    Edit Profile
                </button>
            </section>)
}