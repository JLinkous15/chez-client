import { Navigate, Outlet } from "react-router-dom"
import { ChatGPT } from "../components/ChatGPT/ChatGPT"
import { NavBar } from "../components/NavBar/NavBar"
import { PostArticle } from "../components/PostArticle/PostArticle"

export const Authorized = ({toggle, setToggle}) => {
  if (localStorage.getItem("authorization_token")) {
    return (<>
      <NavBar toggle={toggle} setToggle={setToggle} />
      <PostArticle setToggle={setToggle} />
      <Outlet />
      <ChatGPT navToggle={toggle} setNavToggle={setToggle} />
      </>
      )
  }
  return <Navigate to='/login' replace />
}
