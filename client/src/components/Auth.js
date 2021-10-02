import { useState} from "react";
import Login from './Login';
import Signup from './Signup';
import Logo from "./assets/logo.png";

function Auth() {
    const[login, setLogin] = useState(false);
    const[signup, setSignup] = useState(false);

    function handleClick(e){
        console.log(e.target.innerText)
        if (e.target.innerText === "Already have an account?") {
            setLogin(!login)
        } else if (e.target.innerText === "Signup") {
            setSignup(!signup)
        }
    }

    return (
        <div className="auth">
            <nav className="nav-bar">
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
            <div className="form-box">
                <Signup />
                {login ? (
                    <Login />
                    ) : null}
                    {/* <p>or</p> */}
                <button onClick={handleClick} style={{ marginLeft: "20px" }}>Already have an account?</button>
            </div>
        </div>
    );
}

export default Auth;
