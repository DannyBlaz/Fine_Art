import { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
import HomeLogo from "./assets/home-logo.png";
import User from './User.js';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Profile() {
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
            <nav className="nav-bar">
                <Link to={"/home"}>
                    <img
                        src={HomeLogo}
                        alt="profile_picture"
                        style={{
                            maxWidth: 100, marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    />
                    <h1>Home</h1>
                </Link>
                <h1 className="nav-profile" style={{ fontSize: "40px" }}>Profile</h1>
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
            <User user={user} key={user.id} />
        </div>
    );
}

export default Profile;