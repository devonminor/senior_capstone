import { QuestionTypeEnum } from "./types";

const API_URL = 'http://localhost:5002';

/******************************************************************************
 ****************************************************************************** 
 ******************************************************************************
 ******************************      COURSES     ******************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************/

export const getCourses = () => {
    return fetch(`${API_URL}/courses`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

export const getCourse = (course_id: string) => {
    return fetch(`${API_URL}/courses/${course_id}`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

/******************************************************************************
 ****************************************************************************** 
 ******************************************************************************
 ******************************     LECTURES     ******************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************/

export const getLecturesForCourse = (course_id: string) => {
    return fetch(`${API_URL}/courses/${course_id}/lectures`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

/******************************************************************************
 ****************************************************************************** 
 ******************************************************************************
 ******************************     QUESTIONS    ******************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************/

export const getQuestionsForLecture = (course_id: string, lecture_id: string) => {
    return fetch(`${API_URL}/courses/${course_id}/lectures/${lecture_id}/questions`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

export const addQuestionToLecture = (course_id: string, lecture_id: string, question_type: string, title: string, options: { name: string, order: number }[]) => {
    if (question_type === QuestionTypeEnum.MULTIPLE_CHOICE)
        return fetch(`${API_URL}/courses/${course_id}/lectures/${lecture_id}/questions?questionType=${QuestionTypeEnum.MULTIPLE_CHOICE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mcq: { title, options: options } })
        })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });
    throw new Error("Question type not supported");
}

export const removeQuestionFromLecture = (course_id: string, lecture_id: string, question_id: string) => {
    return fetch(`${API_URL}/courses/${course_id}/lectures/${lecture_id}/questions/${question_id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}
