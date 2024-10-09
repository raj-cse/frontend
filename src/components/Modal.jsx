import React from 'react'
import "../css/Modal.css"
import {RiCloseLine} from "react-icons/ri"
import { useNavigate } from 'react-router-dom'

export default function Modal({setModalOpen}) {
    const navigate = useNavigate()
  return (
    <div className="modal" >
        <div className="modal-heading">
            <h5 className='heading'>Cofirm</h5>
        </div>
        <button className='close-btn' onClick={()=>setModalOpen(false)}>
            <RiCloseLine></RiCloseLine>
        </button>
        <div className="modalcontent">
            Are you really want to logout ?
        </div>
        <div className="modal-action">
            <div className="action-container">
                <button className='logout-btn'onClick={()=>{
                    setModalOpen(false)
                    localStorage.clear()
                    navigate("/signin")
                }}>Log Out</button>
                <button className='cancel-btn'onClick={()=>setModalOpen(false)}>cancel</button>
            </div>
        </div>
    </div>
  )
}
