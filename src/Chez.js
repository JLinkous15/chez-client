import logo from './logo.svg';
import './Chez.css';
import { ApplicationViews } from './views/ApplicationViews';
import { NavBar } from './components/NavBar/NavBar'
import { ChatGPT } from './components/ChatGPT/ChatGPT';
import { useState } from 'react';

export const Chez = () =>{
  const [toggle, setToggle] = useState(true)
  return (
    <>
        <NavBar toggle={toggle} setToggle={setToggle} />
        <ApplicationViews toggle={toggle} setToggle={setToggle} />
        <ChatGPT navToggle={toggle} setNavToggle={setToggle} />
    </>
  )
}
