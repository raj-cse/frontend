import React, { useState, useContext } from 'react'
import "../css/Signin.css"
import logo from "../img/img1.png"
import {  toast } from 'react-toastify';
import { Link , useNavigate } from 'react-router-dom'
import { LoginContext } from './context/LoginContext';

export default function Signin() {

  const {setUserLogin}=useContext(LoginContext)

  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")

  const notifyA =(msg) => toast.error(msg)
  const notifyB =(msg) => toast.success(msg)
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  

  const postData = ()=>{
    if(!emailRegex.test(email)){
      notifyA("invalid email")
      return
    }

   fetch("http://localhost:5000/signin",{
    method :"Post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email:email,
      password:password
    })
   }).then(res=>res.json())
  
   .then(data =>{
    if(data.error){
      notifyA(data.error)
    }else{
      notifyB("Signed in successfuly")
      console.log(data.token)
      localStorage.setItem("jwt" , data.token)
      localStorage.setItem("user" , JSON.stringify(data.user))
      setUserLogin(true)
      navigate("/")
    }
    
    console.log(data)})
  }

  return (
    <>
      <div className='signin'>
        <div className="Loginform">
          <img className='signInLogo' src={logo} />
          <div className='login-input'>
            <input type="email" name='email' id='email' value={email} placeholder='Email' onChange={(e) => { setemail(e.target.value) }} />
          </div>
          <div className='login-input'>
            <input type="password" name='password' id='password' value={password} placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <input type="submit" id='login-btn' onClick={()=>{postData()}} value="Sign In" />
        </div>
        <div className="loginform2">
          dont have account .
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </>
  )
}
