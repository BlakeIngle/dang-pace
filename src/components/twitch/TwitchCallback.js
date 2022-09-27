import React, { useContext, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase/init-firebase'
import { twitchConfig } from '../../twitch/config';
import { getTwitchToken } from '../../services/http.service';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function TwitchCallback() {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        console.log("callback was init")
        getHash();
    }, [])

    function getHash() {
        var data = window.location.search.substring(1); // cut off the ?
        data = data.split('&').map(pair => pair.split('='))
        console.log(data)
        var pair = data.find(([key, value]) => key == 'code')
        if (pair) {
            let code = pair[1];
            getClientSecret(code);
        } else {
            console.log("no code, auth failed")
        }
    }

    async function getClientSecret(code) {

        // get secret from firestore and send to twitch
        const twitchCol = collection(db, 'appData');
        console.log(twitchCol)
        const twitchSnapshot = await getDocs(twitchCol);
        console.log(twitchSnapshot)
        // const secret = twitchSnapshot?.docs[0]?.data()?.twitchClientSecret

        getTwitchToken(code, twitchSnapshot?.docs[0]?.data()?.twitchClientSecret)
            .then((response) => {
                console.log(response.data)
                setAuth({
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token
                });
                navigate('/') // login successful, we got the token!
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div>
            Setting you up for poggs
        </div>
    )
}
