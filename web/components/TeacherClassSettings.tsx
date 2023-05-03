import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useSWRMutation from 'swr/mutation';
import { deleteRequest } from '../lib/server_requests';

interface ITeacherClassSettings {
    course: any;
}

export default function TeacherClassSettings({
    course,
}: ITeacherClassSettings) {
    const router = useRouter();
    const { course_id } = router.query;
    const [courseData, setCourseData] = useState<any>(null);

    const { trigger } = useSWRMutation('/api/courses', deleteRequest);

    // TODO: Add a 'are you sure' modal and fix the issue with navigating to the home page
    const deleteCourse = () => {
        trigger({
            courseId: course_id,
        });
        router.push('/courses');
    };

    useEffect(() => {
        if (course) {
            setCourseData(course);
        }
    }, [course]);

    return (
        <div>
            {courseData && (
                <>
                    <h2>{courseData.name}</h2>
                    <h5>Description: {courseData.description}</h5>
                    <h5>Season: {courseData.season}</h5>
                    <h5>Course Code: {courseData.numId}</h5>
                    <Button
                        onClick={deleteCourse}
                        style={{
                            backgroundColor: '#ce2029',
                            borderColor: '#ce2029',
                        }}
                    >
                        Delete Course
                    </Button>
                </>
            )}
        </div>
    );
}
