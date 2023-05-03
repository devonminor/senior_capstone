import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { API_URL } from "../../lib/constants";

export default withApiAuthRequired(async function lectures(req, res) {
    // HANDLE POST REQUESTS
    if (req.method === 'POST') {
        const { accessToken } = await getAccessToken(req, res);
        const courseId = req.body.courseId;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures`, {
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
        const { courseId } = req.query;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    }
    // HANDLE DELETE REQUESTS
    else if (req.method === 'DELETE') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId } = req.query;
        const response = await fetch(`${API_URL}/courses/${courseId}/lectures/${lectureId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'DELETE',
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});