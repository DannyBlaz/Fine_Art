import './App.css'
import Auth from './components/Auth.js';
import Post from './components/Post.js';
import Profile from './components/Profile.js';
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const history = useHistory();

  function handleLogout(e){
    fetch("/logout", {
      method: "DELETE",
    })
    .then((r) => {
      localStorage.clear();
      history.push("/");
      window.location.reload();
    });
  }

  return (
    <div className="App">
      {localStorage.user ? (
        <div className="logout">
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null}
      <Switch>
        <Route path="/home" component={() => <Post />} />
        <Route path="/me" component={() => <Profile />} />
        <Route path="/" component={() => <Auth />} />
      </Switch>
    </div>
  );
}

export default App;
