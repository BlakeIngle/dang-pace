import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaceMaker from './components/paceMaker/PaceMaker';
import TwitchCallback from './components/twitch/TwitchCallback';
import TwitchLoginButton from './components/twitch/TwitchLoginButton';
import PaceDashboard from './components/PaceDashboard/PaceDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<PaceDashboard />} />
          <Route path="/new" element={<PaceMaker />} />
          <Route path="/twitchAuth" element={<TwitchCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
