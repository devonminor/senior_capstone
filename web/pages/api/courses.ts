/*
 *  courses.ts
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This file handles all requests to the /api/courses endpoint.
 *  It is used to create, read, and delete courses.
 *
 *  Last updated: 05/12/2023
 */

import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { API_URL } from "../../lib/constants";

export default withApiAuthRequired(async function courses(req, res) {
    // HANDLE POST REQUESTS
    if (req.method === 'POST' && req.body.action === 'createCourse') {
        // Creates a course
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(`${API_URL}/courses`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(req.body)
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    // TODO: Make this a PUT request
    else if (req.method === 'POST' && req.body.action === 'addStudent') {
        // Adds a student to a course
        const { accessToken } = await getAccessToken(req, res);
        const courseId = req.body.courseId;
        delete req.body.courseId;
        const response = await fetch(`${API_URL}/courses/${courseId}/student`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(req.body)
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    // HANDLE GET REQUESTS
    else if (req.method === 'GET') {
        // Get all courses for a user
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(`${API_URL}/courses`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    }
    // HANDLE DELETE REQUESTS
    else if (req.method === 'DELETE') {
        // Delete a course
        const { accessToken } = await getAccessToken(req, res);
        const courseId = req.body.courseId;
        const response = await fetch(`${API_URL}/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'DELETE'
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});