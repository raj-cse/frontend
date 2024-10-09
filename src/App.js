
import './App.css';
import Navbar from './components/Navbar';
import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost';
import { LoginContext } from './components/context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './components/MyFollowingPost';

function App() {
  const [userLogin , setUserLogin] = useState(false)
  const [modalOpen , setModalOpen] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setModalOpen}}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
            <Route path='/createPost' element={<Createpost />}></Route>
            <Route path='/profile/:userid' element={<UserProfile />}></Route>
            <Route path='/followingpost' element={<MyFollowingPost />}></Route>

          </Routes>
          <ToastContainer theme='dark' />
         {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>

      </div>
    </BrowserRouter>
  );
}

export default App;
