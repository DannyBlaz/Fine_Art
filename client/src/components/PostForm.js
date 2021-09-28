import { useState } from "react";

function PostForm({ setPostArray, currentUser }) {
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
        // console.log(formData);
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
                user_id: currentUser.id
            }),
        })
        .then(res => res.json())
        .then(data => {
            let error = false;
            if ((data.title && data.title.includes("can't be blank")) || (data.image && data.image.includes("can't be blank")) || (data.description && data.description.includes("can't be blank")) || (data.category && data.category.includes("can't be blank"))) {
                error = true
                console.log("yes")
            }
            if (error) {
                setErrors(["Most fill every box"])
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
            <h2>Post Form</h2>
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
                
                <input type="submit" value="Submit"/>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </form>
        </div>
    );
}

export default PostForm;