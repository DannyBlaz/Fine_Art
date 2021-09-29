import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    function loginOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user, //spreading the userInput
            [name]: value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    localStorage.setItem("user", data.id)
                    history.push("/home");
                    window.location.reload();
                }
            });
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} float="right">
                <input type="text"
                    value={user.username}
                    label="Username"
                    placeholder="Username"
                    name="username"
                    onChange={loginOnChange}
                />


                <input
                    type="password"
                    value={user.password}
                    label="Password"
                    placeholder="Password"
                    name="password"
                    onChange={loginOnChange}
                />

                {errors.map(error => <div>{error}</div>)}
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;