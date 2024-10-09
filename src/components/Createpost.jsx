import React, { useState, useEffect } from 'react'
import "../css/Createpost.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Createpost() {
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    useEffect(() => {
        if (url) {
            fetch("http://localhost:5000/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },


                body: JSON.stringify({
                    body,
                    pic: url
                })

            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error)
                    } else {
                        notifyB("Successfully Posted")
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))
        }

    }, [url])

    const postDetails = () => {
        console.log(body, image)
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "dz0f4jwv2")
        fetch(" https://api.cloudinary.com/v1_1/dz0f4jwv2/image/upload", {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))




    }

    const loadfile = (event) => {
        const file = event.target.files[0];

        // Check if a file was selected
        if (file) {
            const output = document.getElementById('output');
            output.src = URL.createObjectURL(file);
            output.onload = () => {
                URL.revokeObjectURL(output.src);
            }
        }
    }

    return (
        <div className="creatPost">
            <div className="post-header">
                <h4>Create New Post</h4>
                <button id='post-btn' onClick={() => { postDetails() }}>Share</button>
            </div>
            <div className="main">
                <img id='output'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrVLGzO55RQXipmjnUPh09YUtP-BW3ZTUeAA&s'
                    alt="Selected file preview"
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '10px' }} />
                <input type="file" accept='image/*' onChange={(event) => {
                    loadfile(event)
                    setImage(event.target.files[0])
                }} />
            </div>
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User profile" />
                    </div>
                    <h5>lucifier</h5>
                </div>
                <textarea type="text" value={body} onChange={(e) => {
                    setBody(e.target.value)
                }} placeholder='Write a caption....'></textarea>
            </div>
        </div>
    )
}
