import React from 'react'
import "../css/PostDetail.css"
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function PostDetail({ item, toggleDetails }) {

    const navigate = useNavigate()
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const removePost = (postId) => {
        if (window.confirm("do you really want to delete the post ?")) {
            fetch(`http://localhost:5000/deletePost/${postId}`, {
                method: "delete",

                headers: {

                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },

            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    toggleDetails()
                    navigate("/")
                    notifyB(result.message)
                })
        }


    }

    return (
        <div className="showComment">
            <div className="container">
                <div className="postPics">
                    {item.photo && <img src={item.photo} alt="" />}
                </div>
                <div className="postDetails">
                    <div className="card-header">
                        <div className="card-pic">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                            />
                        </div>
                        <h5>{item.postedBy.name}</h5>
                        <div className="deletePost">
                            <span className="material-symbols-outlined" onClick={() => { removePost(item._id) }}>
                                delete
                            </span>


                        </div>
                    </div>
                    <div className="comment-section">
                        {item.comments.map((comment) => (
                            <p className='comm' key={comment._id}>
                                <span className='commenter' style={{ fontWeight: 'bolder' }}>{comment.postedBy.name}     </span>
                                <span className='comment-text'>{comment.comment}     </span>
                            </p>
                        ))}
                    </div>
                    <div className="card-content">
                        <p>{item.likes.length} Likes</p>
                        <p>{item.body}</p>
                    </div>
                    <div className="add-comment">
                        <span className="material-symbols-outlined">mood</span>
                        <input
                            type="text"
                            placeholder='Add a Comment'
                        // value={comment}
                        // onChange={(e) => { setComment(e.target.value); }}
                        />
                        <button
                            className="comment"
                        // onClick={() => { 
                        //   makeComment(comment, item._id); 
                        //   toggleComment(); 
                        // }}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <div className="close-comment">
                <span className="material-symbols-outlined material-symbols-outlined-comment" onClick={() => { toggleDetails(); }}>
                    close
                </span>
            </div>
        </div>
    )
}
