import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { API_URL } from "../../../../../lib/constants";

export default withApiAuthRequired(async function courses(req, res) {
    const { course_id, question_id} = req.query;

    if (req.method === 'GET') {
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(`${API_URL}/courses/${course_id}/questions/${question_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});