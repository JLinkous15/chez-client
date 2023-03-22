import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ChatGPT } from "../components/ChatGPT/ChatGPT"
import { NavBar } from "../components/NavBar/NavBar"
import { PostArticle } from "../components/PostArticle/PostArticle"
import { getMe } from "../managers/ChefManager"

export const Authorized = ({toggle, setToggle}) => {
  const [me, setMe] = useState({})

  useEffect(()=>{
      getMe()
      .then(setMe)
  },[])

  if (localStorage.getItem("authorization_token")) {
    return (<>
      <NavBar toggle={toggle} setToggle={setToggle} />
      {me.is_staff
      ?<PostArticle setToggle={setToggle} />
      :""
      }
      <Outlet />
      <ChatGPT navToggle={toggle} setNavToggle={setToggle} />
      </>
      )
  }
  return <Navigate to='/login' replace />
}
