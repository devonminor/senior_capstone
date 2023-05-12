/*
 *  StudentResponses.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  If a student is in a course that has a live question, this page will
 *  display the question and allow the student to respond to it. If their
 *  isn't a live question, the student will be shown a waiting page.
 *
 *  Last updated: 05/12/2023
 */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import StudentFreeResponse from '../../../components/StudentFreeResponse';
import StudentMultipleChoice from '../../../components/StudentMultipleChoice';
import StudentWaiting from '../../../components/StudentWaiting';
import { fetcher } from '../../../lib/server_requests';

const StudentResponse = () => {
    const router = useRouter();
    const { course_id } = router.query;
    const { data: courseData } = useSWR(`/api/courses/${course_id}`, fetcher);
    const [course, setCourse] = useState<any>(null);
    const [question, setQuestion] = useState<any>(null);

    // Once the course data has been fetched, set the question data
    useEffect(() => {
        if (courseData) {
            setCourse(courseData);
            console.log('courseData', courseData);
            fetch(
                `/api/courses/${course_id}/questions/${courseData.liveQuestion}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setQuestion(data);
                });
        }
    }, [courseData]);

    return (
        <div>
            {/* If there isn't a live question, show waiting screen. */}
            {!course || (course && !course.liveQuestion && <StudentWaiting />)}

            {/* If there is a live question and it's multiple choice,
                show the Multiple Choice Response screen */}
            {course &&
                course.liveQuestion &&
                question &&
                question.questionType == 'multiple_choice' && (
                    <StudentMultipleChoice question={question} />
                )}

            {/* If there is a live question and it's free response,
                show the Free Response screen */}
            {course &&
                course.liveQuestion &&
                question &&
                question.questionType == 'short_answer' && (
                    <StudentFreeResponse question={question} />
                )}
        </div>
    );
};

export default StudentResponse;
