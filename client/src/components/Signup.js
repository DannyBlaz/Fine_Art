import { useState } from "react";
import { useHistory } from "react-router-dom";


function Signup({ onLogin }) {
    const [errors, setErrors] = useState([]);
    const history = useHistory();


    const [userData, setUserData] = useState({
        username: "",
        password: "",
        about: "",
        artist_type: "",
        profile_picture: ""
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({
            ...userData, //spreading the userInput
            [name]: value, //inserting the name and value the user typed in
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        //  console.log("I was clicked")
        fetch(`/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(Object.values(data).flat())
                let error = false;
                if ((data.username && data.username.includes("can't be blank")) || (data.artist_type && data.artist_type.includes("can't be blank")) || (data.password && data.password.includes("is too short (minimum is 6 characters)")) || (data.password && data.password.includes('is too long (maximum is 16 characters)'))) {
                    error = true
                    console.log("yes")
                }
                if (error) {
                    setErrors(Object.values(data).flat())
                } else {
                    onLogin(data);
                    history.push("/home");
                }
            });
    }
    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} >
                <label>Username:</label>
                <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} /><br />
                <label>Password:</label>
                <input type="text" name="password" placeholder="Password" value={userData.password} onChange={handleChange} /><br />
                <label>Profile Picture:</label>
                <input type="text" name="profile_picture" placeholder="image" value={userData.profile_picture} onChange={handleChange} /><br />
                <label>About:</label>
                <input type="text" name="about" placeholder="About" value={userData.about} onChange={handleChange} /><br />
                <label >Type of Artist:</label>
                <select name="artist_type" value={userData.artist_type} onChange={handleChange} >
                    <option value="" default disabled hidden>Choose here</option>
                    <option value="Painter">Painter</option>
                    <option value="Sculptor">Sculptor</option>
                    <option value="Poet">Poet</option>
                    <option value="Architect">Architect</option>
                    <option value="Photographer">Photographer</option>
                    <option value="Musician">Musician</option>
                    <option value="Director">Director</option>
                </select>
                <br />
                <button type="submit">Signup</button>
                {errors.map(error => <div>{error}</div>)}
            </form>
        </div>
    );
}

export default Signup;