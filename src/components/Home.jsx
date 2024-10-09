import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Home() {
   var picLink = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('./signup');
    }

    fetch('http://localhost:5000/allposts', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const toggleComment = (posts) => {
    setShow((prevShow) => !prevShow); 
    setItem(posts); 
    setComment(''); 
  };

  const likePost = (id) => {
    fetch('http://localhost:5000/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => (posts && posts._id === result._id ? result : posts));
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch('http://localhost:5000/unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => (posts && posts._id === result._id ? result : posts));
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (text, id) => {
    fetch('http://localhost:5000/comment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ text: text, postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => (posts && posts._id === result._id ? result : posts));
        setData(newData);
        notifyB('Comment posted');
        setComment('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="home">
        {data && data.map((posts) => {
          const postedByName = typeof posts.postedBy === 'object' && posts.postedBy.name
            ? posts.postedBy.name
            : 'Unknown';

          return (
            <div className="card" key={posts._id}>
              <div className="card-header">
                <div className="card-pic">
                  <img
                    src={posts.postedBy.photo? posts.postedBy.photo : picLink}
                    alt=""
                  />
                </div>
                <h5>
                  <Link to={`/profile/${posts.postedBy ? posts.postedBy._id : ''}`}>
                    {postedByName}
                  </Link>
                </h5>
              </div>
              <div className="card-image">
                {posts.photo ? <img src={posts.photo} alt="Post" /> : <p>No photo available</p>}
              </div>
              <div className="card-content">
                {posts.likes && posts.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ? (
                  <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikePost(posts._id) }}>
                    favorite
                  </span>
                ) : (
                  <span className="material-symbols-outlined" onClick={() => { likePost(posts._id) }}>
                    favorite
                  </span>
                )}
                <p>{posts.likes ? posts.likes.length : 0} Likes</p>
                <p>{posts.body ? posts.body : 'No description'}</p>
                <p style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { toggleComment(posts); }}>
                  View all comments
                </p>
              </div>
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value); }} />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, posts._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          );
        })}

        {show && item && (
          <div className="showComment">
            <div className="container">
              <div className="postPics">
                {item.photo && <img src={item.photo} />}
              </div>
              <div className="postDetails">
                <div className="card-header">
                  <div className="card-pic">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <h5>
                    <Link to={`/profile/${item.postedBy ? item.postedBy._id : ''}`}>
                      {item.postedBy.name}
                    </Link>
                  </h5>
                </div>
                <div className="comment-section">
                  {item.comments.map((comment) => (
                    <p className='comm' key={comment._id}>
                      <span className='commenter' style={{ fontWeight: 'bolder' }}>{comment.postedBy.name}   </span>
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
                    value={comment}
                    onChange={(e) => { setComment(e.target.value); }}
                  />
                  <button
                    className="comment"
                    onClick={() => {
                      makeComment(comment, item._id);
                      toggleComment();
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div className="close-comment">
              <span className="material-symbols-outlined material-symbols-outlined-comment" onClick={() => { toggleComment(); }}>
                close
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
