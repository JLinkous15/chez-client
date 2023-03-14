import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Home } from "../components/Home/Home"
import { ChezForm } from "../components/ChezForm/ChezForm"
import { Profile } from "../components/Profile/Profile"
import { YourChez } from "../components/Profile/YourChez"
import { Browse } from "../components/Browse/Browse"


export const ApplicationViews = ({toggle, setToggle}) => {
    return <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
            <Route path="/" element={<Home toggle={toggle} setToggle={setToggle} />} />
            <Route path="chezForm" element={<ChezForm toggle={toggle} setToggle={setToggle} />} />
            <Route path="profile" element={<Profile toggle={toggle} setToggle={setToggle} />} />
            <Route path="yourChez" element={<YourChez toggle={toggle} setToggle={setToggle} />} />
            <Route path="browse" element={<Browse toggle={toggle} setToggle={setToggle} />} />

        </Route>
    </Routes>
</>
}