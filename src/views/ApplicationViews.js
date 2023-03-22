import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Home } from "../components/Home/Home"
import { ChezForm } from "../components/ChezForm/ChezForm"
import { Profile } from "../components/Profile/Profile"
import { ChezDetail } from "../components/Chez/ChezDetail"
import { ChezList } from "../components/Chez/ChezList"
import { AllArticles } from "../components/PostArticle/AllArticles"
import { ArticleDetail } from "../components/PostArticle/ArticleDetail"
import { ProfileEdit } from "../components/Profile/ProfileEdit"
import { EditArticle } from "../components/PostArticle/EditArticle"


export const ApplicationViews = ({toggle, setToggle}) => {
    return <>

    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized toggle={toggle} setToggle={setToggle} />}>
            <Route path="/" element={<Home toggle={toggle} setToggle={setToggle} />} />
            <Route path="chezForm" element={<ChezForm setToggle={setToggle} />} />
            <Route path="profile" element={<Profile setToggle={setToggle} />} />
            <Route path="profile/edit" element={<ProfileEdit setToggle={setToggle} />} />
            <Route path="chezList" element={<ChezList setToggle={setToggle} />} />
            <Route path="chezList/:chezId" element={<ChezDetail setToggle={setToggle} />} />
            <Route path="chezList/:chezId/edit" element={<ChezForm setToggle={setToggle} />} />
            <Route path="articles" element={<AllArticles setToggle={setToggle} />} />
            <Route path="articles/:articleId" element={<ArticleDetail setToggle={setToggle} />} />
            <Route path="articles/:articleId/edit" element={<EditArticle setToggle={setToggle} />} />


        </Route>
    </Routes>
</>
}