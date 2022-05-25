import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { useLocalStorage } from './services/localStorage.service'
import PaceDisplay from './components/paceDisplay/PaceDisplay';

function App() {

  // load pace ->
  //  if pace -> display pace
  //  else -> + create goal

  const localStorageService = useLocalStorage()
  var pace = localStorageService.getPace();
  console.log(pace);

  return (
    <div className="App">

      {!pace && (
        <Link to="/new">
          <button>+ Get Started</button>
        </Link>
      )}
      {pace && <PaceDisplay pace={pace} />}
    </div>
  );
}

export default App;
