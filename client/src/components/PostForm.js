import { useHistory } from "react-router-dom";
import { useState } from "react";

function PostForm({ setPostArray }) {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        category: ""
    })


    function onSubmit(e) {
        e.preventDefault();
        fetch(`/posts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // title: title,
                // image: image,
                // description: description,
                // category: category
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setPostArray((prevPosts) => [data, ...prevPosts]);
            });
    }

    return (
        <div>
            <h2>Post Form</h2>
            <form onSubmit={onSubmit}>
                <label>Title:</label>
                <input type="text"  placeholder="title" value={formData.title} /><br/>
                <label >Image:</label>
                <input type="text"  placeholder="image" value={formData.image}/><br/>
                <label >Choose a Category:</label>
                <select placeholder="category" value={formData.category}>
                    <option value="Painting">Painting</option>
                    <option value="Sculpture">Sculpture</option>
                    <option value="Literature">Literature</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    <option value="Theater">Theater</option>
                </select>
                <br/>
                <label >Description:</label>
                <input type="text" placeholder="description" value={formData.description} /><br/>
                
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default PostForm;