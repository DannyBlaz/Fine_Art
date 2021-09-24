import './App.css';
import Auth from './components/Auth.js';
import Post from './components/Post.js';
import Profile from './components/Profile.js';

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Auth/>
      <Post/>
      <Profile/>
    </div>
  );
}

export default App;
