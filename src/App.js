import './App.css';
import { Link, Outlet } from 'react-router-dom';
import PaceDashboard from './components/PaceDashboard/PaceDashboard';
import TwitchLoginButton from './components/twitch/TwitchLoginButton';
import { createContext } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

export const AuthContext = createContext(null);

function App() {

  const [auth, setAuth] = useLocalStorage('auth')

  return (
    <AuthContext.Provider value={{
      token: auth?.access_token,
      refreshToken: auth?.refresh_token,
      setAuth
    }}>

      <div className="App">

        <TwitchLoginButton />

        <Outlet />
      </div >
    </AuthContext.Provider>
  );
}

export default App;
