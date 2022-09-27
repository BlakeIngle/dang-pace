import './App.css';
import { Link } from 'react-router-dom';
import { useLocalStorage } from './services/localStorage.service'
import PaceDashboard from './components/PaceDashboard/PaceDashboard';
import TwitchLoginButton from './components/twitch/TwitchLoginButton';

function App() {

  return (
    <div className="App">

      <TwitchLoginButton />

      {/* {!pace && (
        <Link to="/new">
          <button>+ Get Started</button>
        </Link>
      )}

      {pace && <PaceDashboard pace={pace} />} */}
    </div >
  );
}

export default App;
