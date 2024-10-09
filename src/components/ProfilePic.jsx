import React, { useState, useEffect, useRef } from 'react';
import "../css/Profilepic.css";

export default function ProfilePic({ onClose }) {
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "dz0f4jwv2");

        fetch("https://api.cloudinary.com/v1_1/dz0f4jwv2/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.secure_url) { // Use secure_url
                    setUrl(data.secure_url);
                } else {
                    console.error("Error: No URL returned from Cloudinary", data);
                }
            })
            .catch(err => console.log("Cloudinary Upload Error:", err));
    };

    const postPic = () => {
        if (!url) {
            console.error("No image URL to update");
            return;
        }

        fetch("http://localhost:5000/uploadProfilePic", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ pic: url })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error("Error updating profile picture:", data.error);
                } else {
                    console.log("Profile picture updated successfully", data);
                    window.location.reload(); 
                }
            })
            .catch(err => console.log("Profile Picture Update Error:", err));
    };

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const removePhoto = () => {
        
        setUrl(""); 

        
        fetch("http://localhost:5000/uploadProfilePic", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ pic: "" })  
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error("Error removing profile picture:", data.error);
                } else {
                    console.log("Profile picture removed successfully", data);
                    window.location.reload(); 
                }
            })
            .catch(err => console.log("Profile Picture Removal Error:", err));
    };

    useEffect(() => {
        if (image) {
            postDetails();  
        }
    }, [image]);

    useEffect(() => {
        if (url) {
            postPic();  
        }
    }, [url]);

    return (
        <div className="profilepic">
            <div className="changePic">
                <div>
                    <h2>Change Profile Photo</h2>
                </div>
                <div style={{ borderTop: "1px solid black" }}>
                    <button className='upload-btn' style={{ color: "#1EA1F7" }} onClick={handleClick}>
                        Upload Photo
                    </button>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        accept='image/*'
                        style={{ display: "none" }}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div style={{ borderTop: "1px solid black" }}>
                    <button className='upload-btn' style={{ color: "#ED4956" }} onClick={removePhoto}>
                        Remove Current Photo
                    </button>
                </div>
                <div style={{ borderTop: "1px solid black" }}>
                    <button
                        style={{ borderColor: "none", cursor: "pointer", fontSize: "15px" }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
