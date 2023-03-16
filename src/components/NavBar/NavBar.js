import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { NavBarLinks } from './NavBarLinks'

export const NavBar = ({toggle, setToggle}) => {
    
    return <>
        <ul className='navbar'>
            <li onClick={()=>{setToggle(true)}}>
                <Link to={'/'}>
                    <img src="../../resources/chez.svg" alt="home" className="navbar-logo" />
                </Link>
            </li>
            <li onClick={()=>{setToggle(!toggle)}}>
                {toggle?
                <FaBars className="navbar-bars"/>
                :
                <FaTimes className="navbar-bars"/>
                }
            </li>
        </ul>
        <ul 
        className={`navbar2 ${toggle?"":"toggle"}`}
        onClick={()=>{setToggle(true)}}>
            {NavBarLinks.map((link, index)=>{
                return (
                <li 
                key={index}
                className="navbar-listitem">
                    <Link 
                    to={link.path} 
                    className="navbar2-links">
                        {link.name}
                    </Link>
                </li>
                )
            })}
            <li
            className="navbar-listitem">
                <Link onClick={()=>{localStorage.removeItem("authorization_token")}} to="/login">
                    Logout
                </Link>
            </li>
        </ul>
        </>
}