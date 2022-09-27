import axios from 'axios'
import { twitchConfig } from '../twitch/config'

export function getTwitchToken(code, secret) {

    const twitchUrl = 'https://id.twitch.tv/oauth2/token';
    return axios.post(twitchUrl, {
        client_id: twitchConfig.clientId,
        code,
        client_secret: secret,
        grant_type: 'authorization_code',
        redirect_uri: twitchConfig.redirectUri
    });
}