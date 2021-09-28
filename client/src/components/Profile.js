import { useState, useEffect } from "react";
import User from './User.js';
import { Link } from "react-router-dom";

function Profile({ owner }) {
    console.log(owner.id);
    const [userArr, setUserArr] = useState([])

    useEffect(() =>{
        fetch("/users")
        .then(res => res.json())
        .then(data => setUserArr(data))
    },[])
     
    let user = {}
    userArr.forEach(ele =>  {
        if(ele.id === owner.id){
            user = ele
        }}
    )

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