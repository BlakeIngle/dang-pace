import './App.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getUserData } from './services/http.service';
import TwitchLoginButton from './components/twitch/TwitchLoginButton';
import Profile from './components/profile/Profile';
import { getAuth } from 'firebase/auth';

export const AuthContext = createContext(null);

function App() {

  const firebaseAuth = getAuth();
  // auth info for twitch
  const [auth, setAuth] = useLocalStorage('auth') // { access_token: string, refresh_token: string }
  // twitch user info
  const [activeUser, setActiveUser] = useState()

  const { pathname } = useLocation();

  useEffect(() => {
    // check if auth token exists on init
    if (auth?.access_token) {
      // use token to get user data from twitch
      getUserData(auth.access_token)
        .then(response => {
          if (response.data.data?.length > 0) {
            const twitchUser = response.data.data[0]
            setActiveUser(twitchUser);
            console.log(twitchUser)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      activeUser,
      setActiveUser,
      token: auth?.access_token,
      refreshToken: auth?.refresh_token,
      setAuth
    }}>

      <div className="App">
        {(!auth && pathname != '/twitchAuth') && <TwitchLoginButton />}
        {(auth && activeUser && firebaseAuth) && <Profile {...activeUser} />}

        <Outlet />
      </div >
    </AuthContext.Provider>
  );
}

export default App;
