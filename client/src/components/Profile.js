import { useState, useEffect } from "react";
import User from './User.js';

function Profile() {
    const [userArr, setUserArr] = useState([])

    useEffect(() =>{
        fetch("/users")
        .then(res => res.json())
        .then(data => setUserArr(data))
    },[])

    return (
        <div className="profile">
            <h1>Profile</h1>
            {userArr.map(user => <User user={user} key={user.id} />)}
        </div>
    );
}

export default Profile;