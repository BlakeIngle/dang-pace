import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {

  // load pace ->
  //  if pace -> display pace
  //  else -> + create goal

  return (
    <div className="App">
      <h1>Pace Picante*</h1>

      <Link to="/new">
        <button>+ Get Started</button>
      </Link>
    </div>
  );
}

export default App;
