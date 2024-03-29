import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import {FaUser, FaLock} from "react-icons/fa"
import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("authorization_token", res.token)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <section className="form-container">
                <img
                style={{width: "500px"}}
                src="../../resources/chez.svg"/>
                <dialog className="dialog dialog--auth" ref={invalidDialog}>
                    <div>Username or password was not valid.</div>
                    <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
                </dialog>
                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h2>Please sign in</h2>
                        <fieldset className="fieldset-login">
                            <label className="inputUsername" htmlFor="inputUsername">Username</label>
                            <input 
                            ref={username} 
                            type="username" 
                            id="username" 
                            className="form-control" 
                            required autoFocus />
                        </fieldset>
                        <fieldset className="fieldset-login">
                            <label className="inputPassword" htmlFor="inputPassword">Password</label>
                            <input 
                            ref={password} 
                            type="password" 
                            id="password" 
                            className="form-control" 
                            required />
                        </fieldset>
                        <fieldset>
                            <button className="orange-button" type="submit">Sign In</button>
                        </fieldset>
                    </form>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </section>

        </main>
    )
}
