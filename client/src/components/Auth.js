import Login from './Login';
import Signup from './Signup';
function Auth({ setUser }) {
    return (
        <div className="Auth">
            <h1>Auth</h1>
            <Login onLogin={setUser}/>
            <Signup onLogin={setUser}/>
        </div>
    );
}

export default Auth;
