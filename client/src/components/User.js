import { useState } from "react";
import { useHistory } from "react-router-dom";

function User({ user }) {
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const [updateForm, setUpdateForm] = useState(false);
    const [updatePost, setUpdatePost] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        about: "",
        artist_type: "",
        profile_picture: ""
    });
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        category: ""
    })

    // POST UPDATE_
    function manageFormData(e) {
        let myName = e.target.name;
        let myValue = e.target.value

        setFormData({
            ...formData,
            [myName]: myValue
        });
    }

    function handlePost(e){
        console.log(e.target.innerText)
        setUpdatePost(!updatePost)
        console.log(updatePost)
        user.posts.forEach(post => {
            if (post.title === e.target.innerText){
                localStorage.setItem("post_id", post.id)
                console.log(parseFloat(localStorage.post_id))
                setFormData({
                    title: post.title,
                    image: post.image,
                    description: post.description,
                    category: post.category
                })
            }
        })
    }

    function handlePostSubmit(e) {
        e.preventDefault();
        console.log(parseFloat(localStorage.post_id))
        fetch(`/api/posts/${parseFloat(localStorage.post_id)}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: formData.title,
                image: formData.image,
                description: formData.description,
                category: formData.category,
                user_id: localStorage.user
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    history.push("/api/me");
                    window.location.reload();
                }
            })
        setFormData({
            ...formData,
            title: "",
            image: "",
            description: "",
            category: ""
        });
    }
    
    // PROFILE UPDATE_
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
        fetch(`/api/users/${user.id}`, {
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
                {updatePost ? 
                <form className="profile-post-form" onSubmit={handlePostSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title" placeholder="title" value={formData.title} onChange={manageFormData} /><br />
                    <label >Image:</label>
                    <input type="text" name="image" placeholder="image" value={formData.image} onChange={manageFormData} /><br />
                    <label >Choose a Category:</label>
                    <select name="category" placeholder="category" value={formData.category} onChange={manageFormData} >
                        <option value="" default disabled hidden>Choose here</option>
                        <option value="Painting">Painting</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Literature">Literature</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Photography">Photography</option>
                        <option value="Music">Music</option>
                        <option value="Theater">Theater</option>
                    </select>
                    <br />
                    <label >Description:</label>
                    <input type="text" name="description" placeholder="description" value={formData.description} onChange={manageFormData} /><br />

                    {errors.map((error) => (
                        <div>{error}</div>
                    ))}
                    <br />
                    <button type="submit" value="Submit">Submit</button>
                </form>
                :
                <>
                {user.posts ? (
                        <ul>{user.posts.map(post => <li key={post.id} onClick={handlePost}>{post.title}</li>)}</ul>
                ): null}</>
                }
            </div>}
        </div>
    );
}

export default User;