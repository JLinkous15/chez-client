import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"

export const Register = () => {
    const [image, setImage] = useState("")
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value,
                "profile_image": image
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("authorization_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
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


    return (
        <section className="container--register">

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <div className="form-container">
                <form className="form--login" onSubmit={handleRegister}>
                    <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                    <fieldset>
                        <label htmlFor="firstName"> First Name </label>
                        <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="lastName"> Last Name </label>
                        <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputUsername">Username</label>
                        <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="bio"> Bio </label>
                        <textarea ref={bio} name="bio" className="form-control" cols={40} rows={5} placeholder="Tell us why you love grilled cheeses so much..." />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="avatarImage"> Avatar Image </label>
                        <input type="file" onChange={createChezImageString}/>
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                    </fieldset>
                </form>
            </div>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </section>
    )
}
