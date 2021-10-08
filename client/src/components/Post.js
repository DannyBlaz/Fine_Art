import { useState, useEffect } from "react";
import PostContainer from './PostContainer.js';
import PostFrom from './PostForm.js';
import SinglePost from './SinglePost.js';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Logo from "./assets/logo.png";
import Profile from "./assets/profile.png";
// import User from '/User.js';

function Post() {
    const [postArray, setPostArray] = useState([]);
    const [postForm, setPostForm] = useState(false);
    // const [user, setUser] = useState(false);
    const [search, setSearch] = useState("")
    const history = useHistory();
    const [singlePost, setSinglePost] = useState({
        "id": 1,
        "title": "The Green Mile",
        "image": "https://loremflickr.com/300/300/art",
        "category": "Sculpture",
        "description": "The play's the thing wherein I'll catch the conscience of the king.",
        "user": {
            "id": 1,
            "username": "jack",
            "artist_type": "Painter",
            "about": "One! Two! Three!",
            "profile_picture": "https://robohash.org/occaecatiautdelectus.png?size=300x300&set=set1",
            "password_digest": "$2a$12$axnJp.bfMqayjTifc8IR.uTXpcKcAm7g5oq0Z1zdabR48rLKgyOma"
        },
        "comments": [
            {
                "id": 2,
                "body": "I love the smell of napalm in the morning.",
                "user_id": 2,
                "post_id": 1
            },
            {
                "id": 4,
                "body": "May the Force be with you.",
                "user_id": 2,
                "post_id": 1
            },
            {
                "id": 7,
                "body": "button",
                "user_id": 1,
                "post_id": 1
            },
            {
                "id": 9,
                "body": "wait",
                "user_id": 1,
                "post_id": 1
            },
            {
                "id": 11,
                "body": "observe now",
                "user_id": 1,
                "post_id": 1
            }
        ]
    })
    
    let sortedArray = postArray.sort(function (a, b) {
        return parseFloat(b.id) - parseFloat(a.id);
    });

    useEffect(() =>{
        fetch("/posts")
        .then(resp => resp.json())
        .then(data => setPostArray(data))
    },[])

    function handleClick(e){
        setPostForm(!postForm);
    }

    const searchItems = sortedArray.filter((card) => {
        return card.title.toLowerCase().includes(search.toLowerCase()) || card.user.username.toLowerCase().includes(search.toLowerCase())
    })    

    return (
        <>
            {localStorage.user ? (
                <div className="post">
                    <nav className="nav-bar">
                        <Link to={"/me"}>
                            <img
                                src={Profile}
                                alt="profile_picture"
                                style={{
                                    maxWidth: 100, marginLeft: "auto",
                                    marginRight: "auto"
                                }}
                            />
                            <h1>Profile</h1>
                        </Link>
                        <h1 className="nav-profile" style={{ fontSize: "40px" }}>Gallery</h1>
                        <div className="logo">
                            <img
                                src={Logo}
                                alt="logo"
                                style={{
                                    maxWidth: 100, marginLeft: "auto",
                                    marginRight: "auto"
                                }}
                            />
                            <h1>FineArt</h1>
                        </div>
                    </nav>
                    <div className="main">
                        <div className="side-bar">
                            <h2>Works</h2>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="🔍 Search here ..."
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                
                            </div>
                            {searchItems.map(post => <PostContainer setSinglePost={setSinglePost} post={post} key={ post.id } />)}
                        </div>
                        <div className="single-post" style={{
                            width: '74%',
                            height: 'auto'
                        }}>
                            <SinglePost post={singlePost} style={{ height: "auto", position: "fixed" }}/>
                        </div>
                        <div className="form-button">
                            {postForm ? (
                                <PostFrom setPostArray={setPostArray} />
                            ): null}
                            <button onClick={handleClick}>Post Form</button>
                        </div>
                    </div>
                </div>
            ) : history.push("/")}
        </>
    );
}

export default Post;