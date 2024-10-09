import React, { useState, useEffect } from 'react';
import "../css/Profile.css";
import { useParams } from 'react-router-dom';

export default function UserProfile() {
     var picLink = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    const { userid } = useParams();
    const [user, setUser] = useState({});  
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    // Fetch user data
    useEffect(() => {
        fetch(`http://localhost:5000/user/${userid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setUser(result.user || {});  
            setPosts(result.posts || []); 
            setIsFollowing(result.user?.followers?.includes(localStorage.getItem("userId")));
        })
        .catch(err => console.error("Error fetching user data:", err));
    }, [userid]);

    // Follow user
    const followUser = (userId) => {
        fetch("http://localhost:5000/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: userId,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // Update state directly to reflect the follow action
            setIsFollowing(true);  
            setUser((prevUser) => ({
                ...prevUser,
                followers: [...prevUser.followers, localStorage.getItem("userId")], // Add the user ID to followers
            }));
        })
        .catch((err) => console.error("Error following user:", err));
    };

    // Unfollow user
    const unfollowUser = (userId) => {
        fetch("http://localhost:5000/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: userId,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // Update state directly to reflect the unfollow action
            setIsFollowing(false);  
            setUser((prevUser) => ({
                ...prevUser,
                followers: prevUser.followers.filter(id => id !== localStorage.getItem("userId")), // Remove the user ID from followers
            }));
        })
        .catch((err) => console.error("Error unfollowing user:", err));
    };

    return (
        <div className="profile">
            <div className="profile-frame">
                <div className="profile-pic">
                    <img src={user.photo? user.photo: picLink} alt="" />
                </div>
                <div className="profile-data">
                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>{user?.name ? user.name : "Loading..."}</h1>
                    {isFollowing ? (
                        <button className='followBtn' onClick={() => unfollowUser(user._id)}>Unfollow</button>
                    ) : (
                        <button className='followBtn' onClick={() => followUser(user._id)}>Follow</button>
                    )}
                   </div>
                    <div className="profile-info">
                        <p>{posts.length} posts</p>
                        <p>{user.followers?.length} followers</p>
                        <p>{user.following?.length} following</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="gallery">
                {posts.map((pics) => {
                    return (
                        <img
                            key={pics._id}
                            src={pics.photo}
                            className="item"
                        />
                    );
                })}
            </div>
        </div>
    );
}
