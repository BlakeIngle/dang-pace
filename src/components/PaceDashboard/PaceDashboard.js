import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'
import { db } from '../../firebase/init-firebase';
import Profile from '../profile/Profile';

export default function PaceDashboard() {

    const { activeUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!activeUser) {
            navigate('/')
        }

        // if signed in with twitch, get firebase auth info
        // sendSignInLinkToEmail()
        // signInWithEmailLink()
    }, [])


    function getUsersPace(twitchUserId) {

        const ref = collection(db, `users`)
        //retrieve data for pace
        getDocs(ref)
            .then((docSnap) => {
                if (docSnap.empty) {
                    console.log("doc empty")
                    // create pace
                } else {
                    // do something with pace
                    console.log(docSnap?.docs[0]?.data())
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }


    return (
        <div>
            {activeUser && <Profile {...activeUser} />}
        </div>
    )
}
