import React, { useContext } from 'react'
import { AuthContext } from '../../App'
import './Profile.css'

export default function Profile({ display_name, profile_image_url }) {

    const { setAuth } = useContext(AuthContext)

    function handleSignOutClicked() {
        // clear token and active user
        setAuth(null);
        window.location.reload();
    }

    return (
        <div className='profile-banner'>
            <div className='main-content'>
                <img src={profile_image_url} alt={display_name + ' twitch profile image'} />
                <h4>{display_name}</h4>
            </div>

            <div className='hidden-menu'>
                <div onClick={handleSignOutClicked}>Sign Out</div>
            </div>
        </div>
    )
}
