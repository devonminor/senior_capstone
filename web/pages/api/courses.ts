import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function courses(req, res) {
    // HANDLE POST REQUESTS
    // -- createCourse
    if (req.method === 'POST' && req.body.action === 'createCourse') {
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch('http://127.0.0.1:5002/courses', {
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
    // -- addStudent
    else if (req.method === 'POST' && req.body.action === 'addStudent') {
        const { accessToken } = await getAccessToken(req, res);
        const courseId = req.body.courseId;
        delete req.body.courseId;
        const response = await fetch(`http://127.0.0.1:5002/courses/${courseId}/student`, {
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
        const response = await fetch('http://127.0.0.1:5002/courses', {
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
        const courseId = req.body.courseId;
        const response = await fetch(`http://127.0.0.1:5002/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'DELETE'
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});