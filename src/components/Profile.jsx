import React, { useState, useEffect } from 'react';
import "../css/Profile.css";
import PostDetail from './PostDetail';
import ProfilePic from './ProfilePic';

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    setShow((prevShow) => !prevShow);
    if (posts) setPosts(posts);
  };

  const chnageprofile = () => {
    setChangePic((prev) => !prev);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result.posts);
        setUser(result.user)
      });
  }, []);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={chnageprofile}
            src={user.photo? user.photo: picLink}
            alt="Profile"
          />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info">
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="gallery">
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              onClick={() => {
                toggleDetails(pics);
              }}
              alt="Gallery Item"
            />
          );
        })}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && (
        <>
          <div className="backdrop"></div>
          <ProfilePic onClose={chnageprofile} />
        </>
      )}
    </div>
  );
}
