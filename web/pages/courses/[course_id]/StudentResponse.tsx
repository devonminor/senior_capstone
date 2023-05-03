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

    useEffect(() => {
        if (courseData) {
            setCourse(courseData);
            console.log('courseData', courseData);

            // If the course has a live question, get the question data
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
            {course && !course.liveQuestion && <StudentWaiting />}
            {course &&
                course.liveQuestion &&
                question &&
                question.questionType == 'multiple_choice' && (
                    <StudentMultipleChoice question={question} />
                )}
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
