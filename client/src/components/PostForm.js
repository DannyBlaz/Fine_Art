import { useState } from "react";

function PostForm({ setPostArray }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        category: ""
    })
    
    function manageFormData(e){
        let myName = e.target.name;
        let myValue = e.target.value
        
        setFormData({
            ...formData,
            [myName]: myValue
        });
    }
    
    function handleSubmit(e){
        e.preventDefault();
        fetch(`/posts`, {
            method: "POST",
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
            if (data.errors) {
                setErrors(data.errors)
            } else {
                setPostArray((prevPosts) => [data, ...prevPosts]);
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

    return (
        <div className="post-form">
            <h2>Make A Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" placeholder="title" value={formData.title} onChange={manageFormData} /><br/>
                <label >Image:</label>
                <input type="text" name="image" placeholder="image" value={formData.image} onChange={manageFormData} /><br/>
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
                <br/>
                <label >Description:</label>
                <input type="text" name="description" placeholder="description" value={formData.description} onChange={manageFormData} /><br/>
                
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
                <br />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default PostForm;