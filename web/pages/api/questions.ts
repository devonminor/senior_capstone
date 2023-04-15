
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { QuestionTypeEnum } from "../../lib/types";

export default withApiAuthRequired(async function lectures(req, res) {
    // HANDLE POST REQUESTS
    if (req.method === 'POST') {
        const { accessToken } = await getAccessToken(req, res);
        const courseId = req.body.course_id;
        const lectureId = req.body.lecture_id;
        const response = await fetch(`http://127.0.0.1:5002/courses/${courseId}/lectures/${lectureId}/questions?questionType=${QuestionTypeEnum.MULTIPLE_CHOICE}`, {
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
        const response = await fetch(`http://127.0.0.1:5002/courses/${courseId}/lectures/${lectureId}/questions`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json()
        res.status(200).json(data);
    }
    // HANDLE DELETE REQUESTS
    else if (req.method === 'DELETE') {
        const { accessToken } = await getAccessToken(req, res);
        const { courseId, lectureId, questionId } = req.body;
        const response = await fetch(`http://127.0.0.1:5002/courses/${courseId}/lectures/${lectureId}/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'DELETE',
        });
        const data = await response.json();
        res.status(200).json(data);
    }
});