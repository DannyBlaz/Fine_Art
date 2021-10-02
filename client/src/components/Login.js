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
        <div className="auth-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} float="right">
                <label>Username</label>
                <input type="text"
                    value={user.username}
                    placeholder="Username"
                    name="username"
                    onChange={loginOnChange}
                />
                <br />

                <label>Password</label>
                <input
                    type="password"
                    value={user.password}
                    placeholder="Password"
                    name="password"
                    onChange={loginOnChange}
                />
                <br />

                {errors.map(error => <div>{error}</div>)}
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;