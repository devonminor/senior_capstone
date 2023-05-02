import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function courses(req, res) {
    const { course_id } = req.query;
    if (req.method === 'GET') {
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(`http://127.0.0.1:5002/courses/${course_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});