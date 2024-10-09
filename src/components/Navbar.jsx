import React from 'react'
import "../css/Navbar.css"
import { useContext } from 'react'
import { LoginContext } from './context/LoginContext'
import { Link } from "react-router-dom"
import logo from "../img/img1.png"
import { useNavigate } from 'react-router-dom'



export default function Navbar({login}) {
    const navigate = useNavigate()
  const {setModalOpen} =useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
        return [
            <Link to="/profile" key="profile">
                <li>Profile</li>
            </Link>,
            <Link to="/createPost" key="createPost">
                <li>Create Post</li>
            </Link>,
            <Link to="/followingpost" key="followingpost" style={{padding:"10px"}}>My Following</Link>,
            <Link to={""} key="logout">
                <button className='primary-btn' onClick={() => setModalOpen(true)}>Log Out</button>
            </Link>
        ];
    } else {
        return [
            <Link to="/signup" key="signup">
                <li>SignUp</li>
            </Link>,
            <Link to="/signin" key="signin">
                <li>SignIn</li>
            </Link>
        ];
    }
}

    

    return (
        <>
            <div className="navbar">
                <img src={logo} onClick={()=>{navigate("/")}}/>
                <ul className="nav-menu">
                   {loginStatus()}

                </ul>
            </div>
        </>
    )
}
