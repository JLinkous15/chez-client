import './Chez.css';
import {ApplicationViews} from "../views/ApplicationViews"
import { useState } from 'react';
export const Chez = () =>{
  const [toggle, setToggle] = useState(true)
  return (
        <ApplicationViews toggle={toggle} setToggle={setToggle} />
  )
}
