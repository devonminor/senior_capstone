
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { API_URL } from "../../lib/constants";

export default withApiAuthRequired(async function lectures(req, res) {
    // HANDLE POST REQUESTS
    if (req.method === 'POST') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId, questionType } = req.body;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}/questions?questionType=${questionType}`, {
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
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId } = req.query;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}/questions`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    // HANDLE PUT REQUESTS
    else if (req.method === 'PUT' && req.body.action === 'updateLive') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId, questionId } = req.body;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}/questions/${questionId}/live?live=${req.body.live}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    else if (req.method === 'PUT' && req.body.action === 'addMCQResponse') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId, questionId, order } = req.body;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}/questions/${questionId}/mcq?order=${order}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    else if (req.method === 'PUT' && req.body.action === 'addSAQResponse') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId, questionId, freeResponse } = req.body;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}/questions/${questionId}/saq`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ freeResponse: freeResponse })
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    // HANDLE DELETE REQUESTS
    else if (req.method === 'DELETE') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId, questionId } = req.body;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'DELETE',
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});