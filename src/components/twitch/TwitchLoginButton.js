import React from 'react'
import './TwitchLogin.css'
import { collection, getDocs } from 'firebase/firestore/lite';

import { db } from '../../firebase/init-firebase'
import { twitchConfig } from '../../twitch/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

export default function TwitchLoginButton() {

    const { clientId, redirectUri, scope } = twitchConfig
    const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize`
        + `?response_type=code`
        + `&client_id=${clientId}`
        + `&redirect_uri=${redirectUri}`
        + `&scope=${scope}`;

    return (
        <a href={twitchAuthUrl}>
            <button className='twitch'>
                Login With Twitch <FontAwesomeIcon icon={faTwitch} />
            </button>
        </a>
    )
}
