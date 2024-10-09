import React, { useState } from 'react'
import logo from "../img/img1.png"
import "../css/Signup.css"
import {  toast } from 'react-toastify';
import { Link ,useNavigate} from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setemail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const notifyA =(msg) => toast.error(msg)
  const notifyB =(msg) => toast.success(msg)
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const pssRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/


  const postData = ()=>{
    if(!emailRegex.test(email)){
      notifyA("invalid email")
      return
    }else if(!pssRegex.test(password)){
       notifyA("password must contain one uppercase and lowercase and number and symbol")
       return
    }



   fetch("http://localhost:5000/signup",{
    method :"Post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name:name,
      userName:userName,
      email:email,
      password:password
    })
   }).then(res=>res.json())
  
   .then(data =>{
    if(data.error){
      notifyA(data.error)
    }else{
      notifyB(data.message)
      navigate("/signin")
    }
    
    console.log(data)})
  }
  return (
    <>
      <div className="signup">
        <div className='form-container'>
          <img className='signUpLogo' src={logo}  />
          <p className="loginPara">
            signup to see photos and videos <br /> from yours friends
          </p>
          <div className='input-sign'>
            <input type="email" name='email' id='email' value={email} placeholder='Email' onChange={(e) => { setemail(e.target.value) }} />
          </div>
          <div className='input-sign'>
            <input type="text" name="name" id='name' value={name} placeholder='Full name' onChange={(e) => { setName(e.target.value) }} />
          </div>
          <div className='input-sign'>
            <input type="text" name='username' id='username' value={userName} placeholder='username' onChange={(e) => { setUserName(e.target.value) }} />
          </div>
          <div className='input-sign'>
            <input type="password" name='password' id='password' value={password} placeholder='password'onChange={(e) =>{setPassword(e.target.value)}} />
          </div>
          <p className='loginPara'>
            by signing up you agree to out terms
          </p>
          <input type="submit" id='submit-btn' value="Sign Up" onClick={() =>{postData()}} />
        </div>
        <div className="form-2">
          already have account ?
          <Link to="/signin">
            <span>Sign In</span>
          </Link>
        </div>
      </div>

    </>
  )
}
