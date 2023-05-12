/*
 *  [...auth0].ts
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This file handles all requests to the /api/auth/[...auth0] endpoint.
 *  It is the default for all auth0 requests.
 *
 *  Last updated: 05/12/2023
 */

import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    async login(req, res) {
        try {
            await handleLogin(req, res, {
                authorizationParams: {
                    audience: "pollanywhereAPI", 
                    scope: "openid profile email", // or AUTH0_SCOPE
                },
            });
        } catch (error: any) {
            res.status(error.status || 400).end(error.message);
        }
    },
});