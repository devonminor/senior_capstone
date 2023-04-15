import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function me(req, res) {
    // If your access token is expired and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch('http://127.0.0.1:5002/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const me = await response.json();
    res.status(200).json(me);
});