import { useState, useEffect } from "react";
import User from './User.js';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Profile({ owner }) {
    const [userArr, setUserArr] = useState([])
    const history = useHistory();

    useEffect(() =>{
        fetch("/users")
        .then(res => res.json())
        .then(data => setUserArr(data))
    },[])
     
    let user = {}
    localStorage.user ? (
        userArr.forEach(ele =>  {
            if (ele.id == localStorage.user){
                user = ele
            }}
        )
    ) : history.push("/")
    return (
        <div className="profile">
            <h1>Profile</h1>
            <Link to={"/home"}>
                <button>Post</button>
            </Link>
            <User user={user} key={user.id} />
        </div>
    );
}

export default Profile;