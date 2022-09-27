import './App.css';
import { Link, Outlet } from 'react-router-dom';
import PaceDashboard from './components/PaceDashboard/PaceDashboard';
import TwitchLoginButton from './components/twitch/TwitchLoginButton';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getUserData } from './services/http.service';
import Profile from './components/profile/Profile';

export const AuthContext = createContext(null);

function App() {

  const [auth, setAuth] = useLocalStorage('auth')
  const [activeUser, setActiveUser] = useState()

  useEffect(() => {
    // check if auth token exists on init
    if (auth?.access_token) {
      // use token to get user data
      getUserData(auth.access_token)
        .then(response => {
          // console.log(response.data.data[0])
          if (response.data.data?.length > 0) {
            setActiveUser(response.data.data[0]);
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{
      activeUser,
      token: auth?.access_token,
      refreshToken: auth?.refresh_token,
      setAuth
    }}>

      <div className="App">
        {activeUser
          ? <Profile {...activeUser} />
          : <TwitchLoginButton />
        }

        <Outlet />
      </div >
    </AuthContext.Provider>
  );
}

export default App;
