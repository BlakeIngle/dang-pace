import React from 'react'
import { collection, getDocs } from 'firebase/firestore/lite';

import { db } from '../../firebase/init-firebase'
import { twitchConfig } from '../../twitch/config';

export default function TwitchLoginButton() {


    function getTwitchAuthUrl(secret) {
        const { clientId, redirectUri, scope } = twitchConfig
        return `https://id.twitch.tv/oauth2/authorize`
            + `?response_type=code`
            + `&client_id=${clientId}`
            + `&redirect_uri=${redirectUri}`
            + `&scope=${scope}`;
    }

    async function handleButtonClicked() {
        // get client secret from api
        // build url
        // send off to twitch
        // const twitch = firestore
        const twitchCol = collection(db, 'appData');
        console.log(twitchCol)
        const twitchSnapshot = await getDocs(twitchCol);
        console.log(twitchSnapshot)
        const cityList = twitchSnapshot.docs[0].data();
        console.log(twitchSnapshot?.docs[0]?.data()?.twitchClientSecret)
        console.log(getTwitchAuthUrl())
        window.open(getTwitchAuthUrl(), '_blank');
    }

    return (
        <button onClick={handleButtonClicked}>
            Login With Twitch
        </button>
    )
}
