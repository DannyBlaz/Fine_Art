import './App.css';
import Auth from './components/Auth.js';
import Post from './components/Post.js';
import Profile from './components/Profile.js';
import { useState } from "react";
import { Route, Switch } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  // console.log(user)
  return (
    <div className="App">
      <h1>App</h1>
      <Switch>
        <Route path="/home" component={() => <Post currentUser={user} />} />
        <Route path="/me" component={() => <Profile owner={user} />} />
        <Route path="/" component={() => <Auth setUser={setUser} />} />
      </Switch>
    </div>
  );
}

export default App;
