import React, { useContext, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase/init-firebase'
import { createUserWithEmailAndPassword, getAuth, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth'
import { getTwitchToken } from '../../services/http.service';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function TwitchCallback() {

    const { setAuth, activeUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const firebaseAuth = getAuth()

    useEffect(() => {
        getHash();
    }, [])

    useEffect(() => {
        if (activeUser) {
            signInWithFirebase(activeUser)
        }
    }, [activeUser])

    function getHash() {
        var data = window.location.search.substring(1); // cut off the ?
        data = data.split('&').map(pair => pair.split('='))

        var pair = data.find(([key, value]) => key == 'code')
        if (pair) {
            let code = pair[1];
            getClientSecret(code);
        } else {
            console.log("no code, auth failed")
            navigate('/')
        }
    }

    async function getClientSecret(code) {

        // get secret from firestore and send to twitch
        const twitchCol = collection(db, 'appData');
        const twitchSnapshot = await getDocs(twitchCol);
        // const secret = twitchSnapshot?.docs[0]?.data()?.twitchClientSecret

        getTwitchToken(code, twitchSnapshot?.docs[0]?.data()?.twitchClientSecret)
            .then((response) => {

                setAuth({
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token
                });
                // look at useEffect for activeUser
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function signInWithFirebase(twitchUser) {

        signInWithEmailAndPassword(firebaseAuth, twitchUser.email, twitchUser.id)
            .then((userCredential) => {
                // Signed in 
                // user can be accessed with 'getAuth'
                navigate('/') // go home
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    createNewFirebaseAccount(twitchUser)
                }
            });
    }

    function createNewFirebaseAccount(twitchUser) {

        createUserWithEmailAndPassword(firebaseAuth, twitchUser.email, twitchUser.id)
            .then((userCredential) => {
                // Signed in 
                // user can be accessed with 'getAuth'
                navigate('/') // go home!
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div>
            Setting you up for poggs
        </div>
    )
}
