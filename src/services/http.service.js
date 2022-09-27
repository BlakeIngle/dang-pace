import axios from 'axios'
import { twitchConfig } from '../twitch/config'

const TWITCH = 'https://api.twitch.tv'

export function getTwitchToken(code, secret) {

    return axios.post(`https://id.twitch.tv/oauth2/token`, {
        client_id: twitchConfig.clientId,
        code,
        client_secret: secret,
        grant_type: 'authorization_code',
        redirect_uri: twitchConfig.redirectUri
    });
}

export function getUserData(token, userId) {
    return axios.get(`${TWITCH}/helix/users`,
        {
            params: {

            },
            headers: {
                Authorization: 'Bearer ' + token,
                'Client-Id': twitchConfig.clientId
            }
        });
}