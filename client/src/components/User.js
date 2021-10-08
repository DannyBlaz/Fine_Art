import { useState } from "react";
import { useHistory } from "react-router-dom";

function User({ user }) {
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const [updateForm, setUpdateForm] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        about: "",
        artist_type: "",
        profile_picture: ""
    });

    function handleClick(e) {
        setUpdateForm(!updateForm)
        setUserData({
            username: user.username,
            password: "",
            about: user.about,
            artist_type: user.artist_type,
            profile_picture: user.profile_picture
        })
    }

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
         console.log("I was clicked")
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            if (data.errors) {
                setErrors(data.errors)
            } else {
                history.push("/me");
                window.location.reload();
            }
        });
    }

    return (
        <div className="user-container">
            {updateForm ? 
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
                    {errors.map(error => <div>{error}</div>)}
                    <button type="submit">Update</button>
                    <button onClick={handleClick} style={{ marginLeft: "20px" }}>View Profile</button>
                </form>
            :
            <div className="user">
                <img
                    src={user.profile_picture}
                    alt="profile_picture"
                    style={{
                        maxWidth: 250, marginLeft: "auto",
                        marginRight: "auto"
                    }}
                />
                <h1>{user.username}</h1>
                <button onClick={handleClick} style={{ marginLeft: "20px" }}>Update Form</button>
                <h3>Artist Type: {user.artist_type}</h3>
                <p>About: {user.about}</p>
                <br/>
                <h3>Projects</h3>
                {user.posts ? (
                    <ul>{user.posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
                ): null}
            </div>}
        </div>
    );
}

export default User;